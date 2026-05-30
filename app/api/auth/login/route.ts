export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { comparePassword, generateToken, setAuthCookie } from '@/lib/auth';
import User from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { phone, password } = await request.json();

    if (!phone || !password) {
      return NextResponse.json(
        { error: 'Téléphone et mot de passe requis' },
        { status: 400 }
      );
    }

    // ✅ Normalisation robuste → toujours "6XXXXXXXX"
    let cleanPhone = phone.toString()
      .replace(/\s+/g, '')
      .replace(/^\+/, '')
      .replace(/^237/, '');
    if (cleanPhone.startsWith('0')) cleanPhone = cleanPhone.substring(1);

    const uniqueFormats = [...new Set([
      cleanPhone,
      `+237${cleanPhone}`,
      `237${cleanPhone}`,
    ])];

    console.log('Tentative de connexion pour:', phone);
    console.log('Recherche avec les formats:', uniqueFormats);

    const user = await User.findOne({ phone: { $in: uniqueFormats } });

    if (!user) {
      console.log('❌ Utilisateur non trouvé');
      return NextResponse.json(
        { error: 'Téléphone ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    console.log('✅ Utilisateur trouvé:', user.name);
    console.log('📞 Format stocké en base:', user.phone);

    // ✅ Vérifier le mot de passe (s'assurer que comparePassword = bcrypt.compare(plain, hash))
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      console.log('❌ Mot de passe incorrect');
      return NextResponse.json(
        { error: 'Téléphone ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    // ✅ Vérifier restriction AVANT de générer le token
    if (user.isRestricted) {
      return NextResponse.json(
        { error: "Compte restreint. Contactez l'administrateur." },
        { status: 403 }
      );
    }

    const token = generateToken(user._id.toString(), user.role);
    await setAuthCookie(token);

    // ✅ Destructuring propre sans delete
    const { password: _, ...userResponse } = user.toObject();

    console.log('✅ Connexion réussie pour:', user.name);
    return NextResponse.json({ user: userResponse, token });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
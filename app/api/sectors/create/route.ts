export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { comparePassword, generateToken, setAuthCookie } from '@/lib/auth';
import User from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { phone, password } = await request.json();
    
    console.log('Tentative de connexion pour:', phone);
    
    if (!phone || !password) {
      return NextResponse.json({ error: 'Téléphone et mot de passe requis' }, { status: 400 });
    }
    
    // Nettoyer le numéro
    let cleanPhone = phone.toString().replace(/\s/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = cleanPhone.substring(1);
    }
    
    // 🔥 GÉNÉRER TOUS LES FORMATS POSSIBLES
    const formatsToTry = [
      cleanPhone,                           // "699999999"
      `+237${cleanPhone}`,                  // "+237699999999"
      cleanPhone.replace(/^\+237/, ''),     // Enlever +237 si présent
      cleanPhone.startsWith('237') ? `+${cleanPhone}` : null,  // "237699999999" -> "+237699999999"
      cleanPhone.replace(/^\+/, '')         // Enlever + si présent
    ].filter(Boolean); // Enlever les null
    
    const uniqueFormats = [...new Set(formatsToTry)];
    
    console.log('🔍 Recherche avec formats:', uniqueFormats);
    
    // Rechercher l'utilisateur avec n'importe quel format
    const user = await User.findOne({
      phone: { $in: uniqueFormats }
    });
    
    if (!user) {
      console.log('❌ Utilisateur non trouvé');
      return NextResponse.json({ error: 'Téléphone ou mot de passe incorrect' }, { status: 401 });
    }
    
    console.log('✅ Utilisateur trouvé:', user.name);
    console.log('📞 Format stocké:', user.phone);
    
    // Vérifier le mot de passe
    const isValidPassword = await comparePassword(password, user.password);
    
    if (!isValidPassword) {
      console.log('❌ Mot de passe incorrect');
      return NextResponse.json({ error: 'Téléphone ou mot de passe incorrect' }, { status: 401 });
    }
    
    if (user.isRestricted) {
      return NextResponse.json({ error: 'Compte restreint. Contactez l\'administrateur.' }, { status: 403 });
    }
    
    const token = generateToken(user._id.toString(), user.role);
    await setAuthCookie(token);
    
    const userResponse = user.toObject();
    delete userResponse.password;
    
    console.log('✅ Connexion réussie pour:', user.name);
    
    return NextResponse.json({ user: userResponse, token });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
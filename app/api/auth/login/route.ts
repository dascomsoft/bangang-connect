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
    
    // Nettoyer le numéro de téléphone
    let cleanPhone = phone.toString().replace(/\s/g, '');
    
    // Si le numéro commence par 0, enlever le 0
    if (cleanPhone.startsWith('0')) {
      cleanPhone = cleanPhone.substring(1);
    }
    
    // Si le numéro ne commence pas par +237, l'ajouter
    if (!cleanPhone.startsWith('+237')) {
      // Si le numéro commence par 237, ajouter +
      if (cleanPhone.startsWith('237')) {
        cleanPhone = '+' + cleanPhone;
      } else {
        // Sinon, ajouter +237
        cleanPhone = '+237' + cleanPhone;
      }
    }
    
    console.log('Numéro nettoyé:', cleanPhone);
    
    // Chercher l'utilisateur par téléphone
    const user = await User.findOne({ phone: cleanPhone });
    
    if (!user) {
      console.log('Utilisateur non trouvé pour:', cleanPhone);
      return NextResponse.json({ error: 'Téléphone ou mot de passe incorrect' }, { status: 401 });
    }
    
    console.log('Utilisateur trouvé:', user.name);
    
    const isValidPassword = await comparePassword(password, user.password);
    
    if (!isValidPassword) {
      console.log('Mot de passe incorrect');
      return NextResponse.json({ error: 'Téléphone ou mot de passe incorrect' }, { status: 401 });
    }
    
    if (user.isRestricted) {
      return NextResponse.json({ error: 'Compte restreint. Contactez l\'administrateur.' }, { status: 403 });
    }
    
    const token = generateToken(user._id.toString(), user.role);
    await setAuthCookie(token);
    
    const userResponse = user.toObject();
    delete userResponse.password;
    
    return NextResponse.json({ user: userResponse, token });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
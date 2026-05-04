// import { NextRequest, NextResponse } from 'next/server';
// import { connectDB } from '@/lib/db';
// import { hashPassword, generateToken, setAuthCookie } from '@/lib/auth';
// import User from '@/models/User';

// export async function POST(request: NextRequest) {
//   try {
//     await connectDB();
    
//     const { name, phone, password } = await request.json();
    
//     // Validation
//     if (!name || !phone || !password) {
//       return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 });
//     }
    
//     if (password.length < 6) {
//       return NextResponse.json({ error: 'Le mot de passe doit contenir au moins 6 caractères' }, { status: 400 });
//     }
    
//     // Nettoyer le numéro
//     const cleanPhone = phone.replace(/\s/g, '');
    
//     // Vérifier si l'utilisateur existe
//     const existingUser = await User.findOne({ phone: cleanPhone });
//     if (existingUser) {
//       return NextResponse.json({ error: 'Ce numéro est déjà utilisé' }, { status: 400 });
//     }
    
//     // Créer l'utilisateur (sans communauté ni secteur pour l'instant)
//     const hashedPassword = await hashPassword(password);
//     const user = await User.create({
//       name,
//       phone: cleanPhone,
//       password: hashedPassword,
//       role: 'member'
//       // Pas de communityId, pas de sectorId pour l'instant
//     });
    
//     const token = generateToken(user._id.toString(), user.role);
//     await setAuthCookie(token);
    
//     const userResponse = user.toObject();
//     delete userResponse.password;
    
//     return NextResponse.json({ user: userResponse, token }, { status: 201 });
//   } catch (error) {
//     console.error('Registration error:', error);
//     return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
//   }
// }







































































import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { hashPassword, generateToken, setAuthCookie } from '@/lib/auth';
import User from '@/models/User';

const SUPER_ADMIN_SECRET = process.env.SUPER_ADMIN_SECRET || 'SuperSecret123!';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { name, phone, password, secretCode } = await request.json();
    
    // Validation
    if (!name || !phone || !password) {
      return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 });
    }
    
    if (password.length < 6) {
      return NextResponse.json({ error: 'Mot de passe trop court' }, { status: 400 });
    }
    
    const cleanPhone = phone.replace(/\s/g, '');
    
    // Vérifier si l'utilisateur existe
    const existingUser = await User.findOne({ phone: cleanPhone });
    if (existingUser) {
      return NextResponse.json({ error: 'Numéro déjà utilisé' }, { status: 400 });
    }
    
    // Déterminer le rôle
    let role = 'member';
    if (secretCode && secretCode === SUPER_ADMIN_SECRET) {
      role = 'super_admin';
    }
    
    // Créer un email temporaire
    const tempEmail = `${Date.now()}@temp.bangangconnect.com`;
    
    // Créer l'utilisateur
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name,
      phone: cleanPhone,
      email: tempEmail,
      password: hashedPassword,
      role
    });
    
    // Générer le token
    const token = generateToken(user._id.toString(), user.role);
    await setAuthCookie(token);
    
    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.email;
    
    return NextResponse.json({ 
      success: true,
      message: role === 'super_admin' ? 'Compte Super Admin créé !' : 'Inscription réussie',
      user: userResponse 
    }, { status: 201 });
    
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
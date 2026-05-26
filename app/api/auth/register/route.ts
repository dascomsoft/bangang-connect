export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { hashPassword, generateToken, setAuthCookie } from '@/lib/auth';
import User from '@/models/User';
import { rateLimit } from '@/middleware/rateLimit';

const SUPER_ADMIN_SECRET = process.env.SUPER_ADMIN_SECRET || 'SuperSecret123!';

// 🔥 Validation téléphone internationale
const validateAndCleanPhone = (phone: string): string | null => {
  let clean = phone.replace(/\s/g, '');
  
  // Format local camerounais (6XXXXXXXX)
  if (/^[2368]\d{8}$/.test(clean)) {
    return '+237' + clean;
  }
  
  // Format avec indicatif camerounais (237XXXXXXXX)
  if (/^237[2368]\d{8}$/.test(clean)) {
    return '+' + clean;
  }
  
  // Format international (+237XXXXXXXX)
  if (/^\+237[2368]\d{8}$/.test(clean)) {
    return clean;
  }
  
  // 🔥 FORMATS INTERNATIONAUX (Diaspora)
  // Format +XX... (n'importe quel pays)
  if (/^\+\d{1,3}\d{6,12}$/.test(clean)) {
    return clean;
  }
  
  // Format sans + mais avec indicatif (33XXXXXXXX pour France)
  if (/^\d{2,3}\d{6,10}$/.test(clean) && clean.length >= 8 && clean.length <= 13) {
    // Garder tel quel, l'utilisateur devra mettre + au début
    return '+' + clean;
  }
  
  return null;
};

export async function POST(request: NextRequest) {
  try {
    const rateLimitError = rateLimit(request, 5, 60 * 1000);
    if (rateLimitError) return rateLimitError;
    
    await connectDB();
    
    const { name, phone, password, secretCode } = await request.json();
    
    if (!name || !phone || !password) {
      return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 });
    }
    
    if (password.length < 6) {
      return NextResponse.json({ error: 'Mot de passe trop court (minimum 6 caractères)' }, { status: 400 });
    }
    
    // Validation du nom
    if (name.length < 2 || name.length > 100) {
      return NextResponse.json({ error: 'Nom invalide (2-100 caractères)' }, { status: 400 });
    }
    
    // Validation du téléphone (supporte tous les pays)
    const cleanPhone = validateAndCleanPhone(phone);
    if (!cleanPhone) {
      return NextResponse.json({ 
        error: 'Numéro de téléphone invalide. Formats acceptés: 6XXXXXXXX (Cameroun) ou +33XXXXXXXXX (International)' 
      }, { status: 400 });
    }
    
    // Vérifier si l'utilisateur existe
    const existingUser = await User.findOne({ phone: cleanPhone });
    if (existingUser) {
      return NextResponse.json({ error: 'Ce numéro est déjà utilisé' }, { status: 400 });
    }
    
    // Déterminer le rôle
    let role = 'member';
    if (secretCode && secretCode === SUPER_ADMIN_SECRET) {
      role = 'super_admin';
    } else if (secretCode) {
      return NextResponse.json({ error: 'Code secret invalide' }, { status: 400 });
    }
    
    // Créer un email temporaire unique
    const tempEmail = `${Buffer.from(cleanPhone).toString('base64').substring(0, 20)}@temp.bangangconnect.com`;
    
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name: name.trim(),
      phone: cleanPhone,
      email: tempEmail,
      password: hashedPassword,
      role,
      strikes: 0,
      isRestricted: false,
      photo: '/default-avatar.png'
    });
    
    const token = generateToken(user._id.toString(), user.role);
    await setAuthCookie(token);
    
    const userResponse = {
      _id: user._id,
      name: user.name,
      phone: user.phone,
      role: user.role,
      photo: user.photo
    };
    
    return NextResponse.json({ 
      success: true,
      message: role === 'super_admin' ? 'Compte Super Admin créé' : 'Inscription réussie',
      user: userResponse 
    }, { status: 201 });
    
  } catch (error: any) {
    console.error('Registration error:', error);
    
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Ce numéro est déjà utilisé' }, { status: 400 });
    }
    
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
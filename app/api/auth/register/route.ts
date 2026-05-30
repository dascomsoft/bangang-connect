export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { generateToken, setAuthCookie } from '@/lib/auth';
import User from '@/models/User';
import { rateLimit } from '@/middleware/rateLimit';

const SUPER_ADMIN_SECRET = process.env.SUPER_ADMIN_SECRET || 'SuperSecret123!';

const validateAndCleanPhone = (phone: string): string | null => {
  const clean = phone.replace(/\s/g, '');
  if (/^[2368]\d{8}$/.test(clean))     return '+237' + clean;
  if (/^237[2368]\d{8}$/.test(clean))  return '+' + clean;
  if (/^\+237[2368]\d{8}$/.test(clean)) return clean;
  if (/^\+\d{7,15}$/.test(clean))      return clean;
  return null;
};

export async function POST(request: NextRequest) {
  try {
    const rateLimitError = rateLimit(request, 5, 60 * 1000);
    if (rateLimitError) return rateLimitError;

    await connectDB();

    const { name, phone, password, secretCode } = await request.json();

    if (!name || !phone || !password)
      return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 });

    if (password.length < 6)
      return NextResponse.json({ error: 'Mot de passe trop court (min 6 caractères)' }, { status: 400 });

    if (name.trim().length < 2 || name.trim().length > 100)
      return NextResponse.json({ error: 'Nom invalide (2-100 caractères)' }, { status: 400 });

    const cleanPhone = validateAndCleanPhone(phone);
    if (!cleanPhone)
      return NextResponse.json({ error: 'Numéro de téléphone invalide' }, { status: 400 });

    const existingUser = await User.findOne({ phone: cleanPhone });
    if (existingUser)
      return NextResponse.json({ error: 'Ce numéro est déjà utilisé' }, { status: 400 });

    let role = 'member';
    if (secretCode && secretCode === SUPER_ADMIN_SECRET) role = 'super_admin';
    else if (secretCode)
      return NextResponse.json({ error: 'Code secret invalide' }, { status: 400 });

    const tempEmail = `${Buffer.from(cleanPhone).toString('base64').substring(0, 20)}@temp.bangangconnect.com`;

    // ✅ password EN CLAIR — le hook pre('save') va le hasher automatiquement
    const user = await User.create({
      name: name.trim(),
      phone: cleanPhone,
      email: tempEmail,
      password,   // ← PAS de hash ici
      role,
      strikes: 0,
      isRestricted: false,
      photo: '/default-avatar.png'
    });

    const token = generateToken(user._id.toString(), user.role);
    await setAuthCookie(token);

    return NextResponse.json({
      success: true,
      message: role === 'super_admin' ? 'Compte Super Admin créé' : 'Inscription réussie',
      user: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
        role: user.role,
        photo: user.photo
      }
    }, { status: 201 });

  } catch (error: any) {
    console.error('Registration error:', error);
    if (error.code === 11000)
      return NextResponse.json({ error: 'Ce numéro est déjà utilisé' }, { status: 400 });
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
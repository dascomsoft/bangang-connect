import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import User from '@/models/User';

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }
    
    const decoded = verifyToken(token);
    if (!decoded || typeof decoded === 'string') {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
    }
    
    const { name, email } = await request.json();
    
    const user = await User.findByIdAndUpdate(
      decoded.userId,
      { name, email },
      { new: true }
    ).select('-password');
    
    return NextResponse.json({ user });
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
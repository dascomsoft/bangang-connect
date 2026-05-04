import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { comparePassword, generateToken, setAuthCookie } from '@/lib/auth';
import User from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json({ error: 'Erreure' }, { status: 400 });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ error: 'Mot de passe incorrecte' }, { status: 401 });
    }
    
    if (user.isRestricted) {
      return NextResponse.json({ error: 'Rectriction de compte' }, { status: 403 });
    }
    
    const token = generateToken(user._id.toString(), user.role);
    await setAuthCookie(token);
    
    const userResponse = user.toObject();
    delete userResponse.password;
    
    return NextResponse.json({ user: userResponse, token });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
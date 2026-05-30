import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) {
      return NextResponse.json({ hasAccess: false }, { status: 401 });
    }
    
    const decoded = verifyToken(token);
    if (!decoded || typeof decoded === 'string') {
      return NextResponse.json({ hasAccess: false }, { status: 401 });
    }
    
    const { searchParams } = new URL(request.url);
    const sectorId = searchParams.get('sectorId');
    
    const user = await User.findById(decoded.userId);
    
    const hasAccess = user?.sectorId?.toString() === sectorId;
    
    return NextResponse.json({ hasAccess });
  } catch (error) {
    return NextResponse.json({ hasAccess: false }, { status: 500 });
  }
}
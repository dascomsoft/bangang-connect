import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { getAuthToken, verifyToken } from '@/lib/auth';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const token = await getAuthToken();
    
    if (!token) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }
    
    const decoded = verifyToken(token);
    if (!decoded || typeof decoded === 'string') {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
    }
    
    const user = await User.findById(decoded.userId)
      .select('-password')
      .populate('sectorId', 'name')
      .populate('communityId', 'name type');
    
    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 401 });
    }
    
    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error in /api/auth/me:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
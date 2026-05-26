export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyToken, JWTPayload, getAuthToken } from '@/lib/auth';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const token = await getAuthToken();
    if (!token) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }
    
    const decoded = verifyToken(token) as JWTPayload;
    if (!decoded || !decoded.userId) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
    }
    
    // 🔥 AJOUT DE .lean() pour obtenir des objets JS purs
    const user = await User.findById(decoded.userId)
      .select('-password')
      .populate('sectorId', 'name')
      .populate('communityId', 'name type')
      .lean();
    
    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }
    
    // 🔥 SÉRIALISATION EXPLICITE DES IDS
    const serializedUser = {
      ...user,
      _id: user._id.toString(),
      sectorId: user.sectorId
        ? {
            _id: (user.sectorId as any)._id.toString(),
            name: (user.sectorId as any).name
          }
        : null,
      communityId: user.communityId
        ? {
            _id: (user.communityId as any)._id.toString(),
            name: (user.communityId as any).name,
            type: (user.communityId as any).type
          }
        : null,
    };
    
    return NextResponse.json({ user: serializedUser });
  } catch (error) {
    console.error('Error in /api/auth/me:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
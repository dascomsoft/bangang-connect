import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { getAuthToken, verifyToken } from '@/lib/auth';
import Sector from '@/models/Sector';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Récupérer l'utilisateur connecté
    const token = await getAuthToken();
    let currentUser = null;
    
    if (token) {
      const decoded = verifyToken(token);
      if (decoded && typeof decoded !== 'string') {
        currentUser = await User.findById(decoded.userId);
      }
    }
    
    const { searchParams } = new URL(request.url);
    const communityId = searchParams.get('communityId');
    
    let query: any = { status: 'active' };
    if (communityId) query.communityId = communityId;
    
    const sectors = await Sector.find(query)
      .populate('communityId', 'name type')
      .populate('presidentId', 'name')
      .sort({ name: 1 });
    
    // Si l'utilisateur a un secteur, le mettre en premier
    if (currentUser?.sectorId) {
      const userSector = sectors.find(s => s._id.toString() === currentUser.sectorId.toString());
      if (userSector) {
        const others = sectors.filter(s => s._id.toString() !== currentUser.sectorId.toString());
        return NextResponse.json([userSector, ...others]);
      }
    }
    
    return NextResponse.json(sectors);
  } catch (error) {
    console.error('Error fetching sectors:', error);
    return NextResponse.json([], { status: 200 });
  }
}
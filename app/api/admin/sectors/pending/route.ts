export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { authMiddleware } from '@/middleware/authMiddleware';
import Sector from '@/models/Sector';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { user, error } = await authMiddleware(request);
    if (error) return error;
    
    if (!user || user.role !== 'super_admin') {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
    }
    
    const pendingSectors = await Sector.find({ status: 'pending' })
      .populate('communityId', 'name type')
      .populate('presidentId', 'name email')
      .sort({ createdAt: -1 });
    
    return NextResponse.json(pendingSectors);
  } catch (error) {
    console.error('Error fetching pending sectors:', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
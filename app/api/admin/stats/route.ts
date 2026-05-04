import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { getAuthToken, verifyToken } from '@/lib/auth';
import User from '@/models/User';
import Community from '@/models/Community';
import Sector from '@/models/Sector';
import Event from '@/models/Event';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const token = await getAuthToken();
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const decoded = verifyToken(token);
    if (!decoded || typeof decoded === 'string') {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
    
    const currentUser = await User.findById(decoded.userId);
    
    if (!currentUser || currentUser.role !== 'super_admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    const [totalUsers, totalCommunities, totalSectors, totalEvents] = await Promise.all([
      User.countDocuments(),
      Community.countDocuments(),
      Sector.countDocuments(),
      Event.countDocuments()
    ]);
    
    return NextResponse.json({
      totalUsers,
      totalCommunities,
      totalSectors,
      totalEvents,
      totalRevenue: 0,
      pendingSectors: 0
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
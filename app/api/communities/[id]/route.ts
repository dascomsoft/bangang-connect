export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Community from '@/models/Community';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { id } = await params;
    const community = await Community.findById(id);
    
    if (!community) {
      return NextResponse.json({ error: 'Communauté non trouvée' }, { status: 404 });
    }
    
    return NextResponse.json(community);
  } catch (error) {
    console.error('Error fetching community:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
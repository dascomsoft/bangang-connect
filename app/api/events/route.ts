import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Event from '@/models/Event';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const sectorId = searchParams.get('sectorId');
    
    let query = {};
    if (sectorId && sectorId !== 'undefined' && sectorId !== 'null') {
      query = { sectorId };
    }
    
    const events = await Event.find(query)
      .populate('sectorId', 'name')
      .populate('createdBy', 'name')
      .populate('participants', 'name photo')
      .sort({ is_boosted: -1, date: 1 });
    
    return NextResponse.json(events);
  } catch (error) {
    console.error('GET /api/events error:', error);
    return NextResponse.json([], { status: 200 });
  }
}

// POST - Création d'événement (nécessite authentification)
export async function POST(request: NextRequest) {
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
    
    // ... reste du code POST (inchangé)
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
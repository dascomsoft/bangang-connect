import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import Event from '@/models/Event';
import User from '@/models/User';
import Sector from '@/models/Sector';

// GET - Récupérer tous les événements
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const sectorId = searchParams.get('sectorId');
    
    let query: any = {};
    if (sectorId) {
      query.sectorId = sectorId;
    }
    
    const events = await Event.find(query)
      .populate('sectorId', 'name')
      .populate('createdBy', 'name')
      .sort({ is_boosted: -1, date: 1 });
    
    return NextResponse.json(events);
  } catch (error) {
    console.error('GET /api/events error:', error);
    return NextResponse.json([], { status: 200 });
  }
}

// POST - Créer un événement
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
    
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }
    
    const { title, description, date, location, sectorId, is_boosted } = await request.json();
    
    if (!title || !description || !date || !location || !sectorId) {
      return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 });
    }
    
    const sector = await Sector.findById(sectorId);
    if (!sector) {
      return NextResponse.json({ error: 'Secteur non trouvé' }, { status: 404 });
    }
    
    const event = await Event.create({
      title,
      description,
      date: new Date(date),
      location,
      sectorId,
      createdBy: user._id,
      is_boosted: is_boosted || false,
      participants: []
    });
    
    const populatedEvent = await event.populate('sectorId', 'name');
    
    return NextResponse.json(populatedEvent, { status: 201 });
  } catch (error) {
    console.error('POST /api/events error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
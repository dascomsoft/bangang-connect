import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Event from '@/models/Event';
import User from '@/models/User';
import Sector from '@/models/Sector';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const sectorId = searchParams.get('sectorId');
    const upcoming = searchParams.get('upcoming');
    const mySector = searchParams.get('mySector');

    let query: any = {};

    if (sectorId && sectorId !== 'undefined' && sectorId !== 'null') {
      query.sectorId = sectorId;
    }

    if (upcoming === 'true') {
      query.date = { $gte: new Date() };
    }

    if (mySector === 'true') {
      const cookieStore = await cookies();
      const token = cookieStore.get('token')?.value;
      if (token) {
        const decoded = verifyToken(token);
        if (decoded && typeof decoded !== 'string') {
          const user = await User.findById(decoded.userId);
          if (user?.sectorId) {
            query.sectorId = user.sectorId;
          }
        }
      }
    }

    const events = await Event.find(query)
      .populate('sectorId', 'name')
      .populate('createdBy', 'name email photo')
      .populate('participants', 'name email phone photo')
      .sort({ is_boosted: -1, date: 1 });

    return NextResponse.json(events); // ✅ Retour explicite

  } catch (error) {
    console.error('GET /api/events error:', error);
    return NextResponse.json([], { status: 500 }); // ✅ Retour avec status 500
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

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

    console.log('📥 Création événement par:', user.name, '| role:', user.role);
    console.log('📥 sectorId reçu:', sectorId);
    console.log('📥 user.sectorId:', user.sectorId);

    if (!title || !description || !date || !location || !sectorId) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis (titre, description, date, lieu, secteur)' },
        { status: 400 }
      );
    }

    const sector = await Sector.findById(sectorId);
    if (!sector) {
      return NextResponse.json({ error: 'Secteur non trouvé' }, { status: 404 });
    }

    const isAdmin = user.role === 'super_admin';
    const isCommunityChief = ['village_chief', 'community_chief'].includes(user.role);
    const isPresident =
      user.role === 'sector_president' &&
      user.sectorId != null &&
      user.sectorId.toString() === sectorId.toString();

    console.log('🔐 isAdmin:', isAdmin, '| isPresident:', isPresident, '| isCommunityChief:', isCommunityChief);

    if (!isAdmin && !isPresident && !isCommunityChief) {
      return NextResponse.json(
        { error: 'Vous n\'avez pas les droits pour créer un événement dans ce secteur' },
        { status: 403 }
      );
    }

    const event = await Event.create({
      title: title.trim(),
      description: description.trim(),
      date: new Date(date),
      location: location.trim(),
      sectorId,
      createdBy: user._id,
      is_boosted: is_boosted || false,
      participants: []
    });

    const populatedEvent = await Event.findById(event._id)
      .populate('sectorId', 'name')
      .populate('createdBy', 'name email photo');

    console.log('✅ Événement créé:', populatedEvent?.title);
    return NextResponse.json(populatedEvent, { status: 201 });

  } catch (error: any) {
    console.error('🔴 POST /api/events error:', error.message, error.stack);
    return NextResponse.json({ error: error.message || 'Erreur serveur' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

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

    const { eventId, title, description, date, location, is_boosted } = await request.json();

    if (!eventId) {
      return NextResponse.json({ error: 'ID événement requis' }, { status: 400 });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json({ error: 'Événement non trouvé' }, { status: 404 });
    }

    const isAdmin = user.role === 'super_admin';
    const isCreator = event.createdBy.toString() === user._id.toString();

    if (!isAdmin && !isCreator) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }

    if (title) event.title = title;
    if (description) event.description = description;
    if (date) event.date = new Date(date);
    if (location) event.location = location;
    if (is_boosted !== undefined) event.is_boosted = is_boosted;

    await event.save();

    const updatedEvent = await Event.findById(eventId)
      .populate('sectorId', 'name')
      .populate('createdBy', 'name email photo');

    return NextResponse.json(updatedEvent);

  } catch (error: any) {
    console.error('🔴 PUT /api/events error:', error.message);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

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

    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('id');

    if (!eventId) {
      return NextResponse.json({ error: 'ID événement requis' }, { status: 400 });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json({ error: 'Événement non trouvé' }, { status: 404 });
    }

    const isAdmin = user.role === 'super_admin';
    const isCreator = event.createdBy.toString() === user._id.toString();

    if (!isAdmin && !isCreator) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }

    await Event.findByIdAndDelete(eventId);
    return NextResponse.json({ success: true, message: 'Événement supprimé' });

  } catch (error: any) {
    console.error('🔴 DELETE /api/events error:', error.message);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
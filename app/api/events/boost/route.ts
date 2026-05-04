import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { canBoostEvents, Role } from '@/lib/roles';
import Event from '@/models/Event';
import User from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    // 1. Récupérer le token
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }
    
    // 2. Vérifier le token
    const decoded = verifyToken(token);
    if (!decoded || typeof decoded === 'string') {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
    }
    
    // 3. Récupérer l'utilisateur
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }
    
    // 4. Vérifier les permissions
    if (!canBoostEvents(user.role as Role)) {
      return NextResponse.json({ error: 'Permissions insuffisantes' }, { status: 403 });
    }
    
    // 5. Récupérer l'eventId
    const { eventId } = await request.json();
    if (!eventId) {
      return NextResponse.json({ error: 'ID de l\'événement requis' }, { status: 400 });
    }
    
    // 6. Vérifier que l'événement existe
    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json({ error: 'Événement non trouvé' }, { status: 404 });
    }
    
    // 7. Vérifier que l'utilisateur a le droit de booster cet événement
    if (user.role === 'sector_president' && event.sectorId?.toString() !== user.sectorId?.toString()) {
      return NextResponse.json({ error: 'Vous ne pouvez booster que les événements de votre secteur' }, { status: 403 });
    }
    
    // 8. Vérifier que l'événement n'est pas déjà passé
    if (new Date(event.date) < new Date()) {
      return NextResponse.json({ error: 'Impossible de booster un événement passé' }, { status: 400 });
    }
    
    // 9. Vérifier que l'événement n'est pas déjà boosté
    if (event.is_boosted) {
      return NextResponse.json({ error: 'Cet événement est déjà boosté' }, { status: 400 });
    }
    
    // 10. Booster l'événement
    const boostExpiry = new Date();
    boostExpiry.setDate(boostExpiry.getDate() + 7);
    
    event.is_boosted = true;
    event.boost_expires_at = boostExpiry;
    await event.save();
    
    return NextResponse.json({ 
      success: true,
      message: 'Événement boosté avec succès pour 7 jours', 
      event: {
        id: event._id,
        title: event.title,
        is_boosted: event.is_boosted,
        boost_expires_at: event.boost_expires_at
      }
    });
  } catch (error) {
    console.error('Boost event error:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
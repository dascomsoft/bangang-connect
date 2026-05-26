import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import Event from '@/models/Event';
import User from '@/models/User';

export async function GET(request: NextRequest) {
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
    
    const currentUser = await User.findById(decoded.userId);
    if (currentUser?.role !== 'super_admin') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }
    
    // Récupérer tous les événements
    const events = await Event.find().populate('sectorId', 'name');
    
    // Calculer les stats
    const totalEvents = events.length;
    const totalParticipants = events.reduce((sum, e) => sum + (e.participants?.length || 0), 0);
    const averageParticipants = totalEvents > 0 ? Math.round(totalParticipants / totalEvents) : 0;
    
    // Top événements par nombre de participants
    const topEvents = [...events]
      .sort((a, b) => (b.participants?.length || 0) - (a.participants?.length || 0))
      .slice(0, 5)
      .map(e => ({
        id: e._id,
        title: e.title,
        sector: e.sectorId?.name,
        participantsCount: e.participants?.length || 0,
        is_boosted: e.is_boosted
      }));
    
    // Évolution mensuelle
    const monthlyStats: Record<string, { events: number; participants: number }> = {};
    events.forEach(event => {
      const month = new Date(event.date).toLocaleString('fr-FR', { month: 'long', year: 'numeric' });
      if (!monthlyStats[month]) {
        monthlyStats[month] = { events: 0, participants: 0 };
      }
      monthlyStats[month].events++;
      monthlyStats[month].participants += event.participants?.length || 0;
    });
    
    return NextResponse.json({
      success: true,
      stats: {
        totalEvents,
        totalParticipants,
        averageParticipants,
        topEvents,
        monthlyStats
      }
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
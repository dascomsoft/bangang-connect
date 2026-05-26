export const dynamic = "force-dynamic";
// app/api/sectors/stats/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import Sector from '@/models/Sector';
import Event from '@/models/Event';
import SectorRequest from '@/models/SectorRequest';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }
    
    const decoded = verifyToken(token);
    if (!decoded || typeof decoded === 'string' || !decoded.userId) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
    }
    
    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }
    
    // Vérifier que l'utilisateur est président
    if (currentUser.role !== 'sector_president') {
      return NextResponse.json({ 
        error: 'Accès refusé - Vous devez être président de secteur' 
      }, { status: 403 });
    }
    
    // Vérifier que le président a un secteur assigné
    if (!currentUser.sectorId) {
      return NextResponse.json({ 
        error: 'Vous n\'êtes pas assigné à un secteur' 
      }, { status: 400 });
    }
    
    // Récupérer le secteur
    const sector = await Sector.findById(currentUser.sectorId);
    if (!sector) {
      return NextResponse.json({ 
        error: 'Secteur non trouvé' 
      }, { status: 404 });
    }
    
    // Récupérer toutes les statistiques en parallèle
    const [eventsCount, pendingRequests, membersCount, totalEvents] = await Promise.all([
      Event.countDocuments({ sectorId: currentUser.sectorId }),
      SectorRequest.countDocuments({ 
        sectorId: currentUser.sectorId, 
        status: 'pending' 
      }),
      sector.members ? sector.members.length : 0,
      Event.find({ sectorId: currentUser.sectorId })
        .sort({ date: 1 })
        .limit(5)
        .select('title date is_boosted')
    ]);
    
    // Calculer les événements à venir
    const upcomingEvents = totalEvents.filter(
      (event: any) => new Date(event.date) > new Date()
    );
    
    // Calculer les événements boostés
    const boostedEvents = totalEvents.filter((event: any) => event.is_boosted);
    
    return NextResponse.json({
      success: true,
      stats: {
        members: membersCount,
        events: eventsCount,
        pendingRequests: pendingRequests,
        upcomingEvents: upcomingEvents.length,
        boostedEvents: boostedEvents.length,
        revenue: 0 // À implémenter avec le système de paiement
      },
      sector: {
        id: sector._id,
        name: sector.name,
        description: sector.description,
        createdAt: sector.createdAt
      }
    });
  } catch (error) {
    console.error('Error GET /api/sectors/stats:', error);
    return NextResponse.json({ 
      error: 'Erreur interne du serveur' 
    }, { status: 500 });
  }
}
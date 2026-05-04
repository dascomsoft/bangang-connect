import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import Sector from '@/models/Sector';
import Event from '@/models/Event';
import User from '@/models/User';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    if (!user || user.role !== 'super_admin') {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
    }
    
    const { id } = params;
    const body = await request.json();
    
    const sector = await Sector.findByIdAndUpdate(id, body, { new: true });
    
    if (!sector) {
      return NextResponse.json({ error: 'Secteur non trouvé' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, sector });
  } catch (error) {
    console.error('Error updating sector:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    if (!user || user.role !== 'super_admin') {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
    }
    
    const { id } = params;
    
    // Vérifier si des événements dépendent de ce secteur
    const eventsCount = await Event.countDocuments({ sectorId: id });
    if (eventsCount > 0) {
      return NextResponse.json({ 
        error: `Impossible de supprimer ce secteur car ${eventsCount} événement(s) y sont rattachés. Supprimez d'abord les événements.` 
      }, { status: 400 });
    }
    
    const sector = await Sector.findByIdAndDelete(id);
    
    if (!sector) {
      return NextResponse.json({ error: 'Secteur non trouvé' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: 'Secteur supprimé' });
  } catch (error) {
    console.error('Error deleting sector:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
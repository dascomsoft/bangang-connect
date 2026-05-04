import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
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
    
    const event = await Event.findByIdAndUpdate(id, body, { new: true });
    
    if (!event) {
      return NextResponse.json({ error: 'Événement non trouvé' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error('Error updating event:', error);
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
    
    const event = await Event.findByIdAndDelete(id);
    
    if (!event) {
      return NextResponse.json({ error: 'Événement non trouvé' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: 'Événement supprimé' });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
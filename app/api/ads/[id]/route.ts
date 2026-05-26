export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import Ad from '@/models/Ad';
import User from '@/models/User';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
    
    const { id } = await params;
    const body = await request.json();
    
    const ad = await Ad.findByIdAndUpdate(id, body, { new: true });
    
    if (!ad) {
      return NextResponse.json({ error: 'Annonce non trouvée' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, ad });
  } catch (error) {
    console.error('Error updating ad:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
    
    const { id } = await params;
    
    const ad = await Ad.findByIdAndDelete(id);
    
    if (!ad) {
      return NextResponse.json({ error: 'Annonce non trouvée' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: 'Annonce supprimée' });
  } catch (error) {
    console.error('Error deleting ad:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
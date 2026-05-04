import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import Community from '@/models/Community';
import User from '@/models/User';

export async function GET() {
  try {
    await connectDB();
    const communities = await Community.find().sort({ type: -1, name: 1 });
    return NextResponse.json(communities);
  } catch (error) {
    console.error('Error fetching communities:', error);
    return NextResponse.json([], { status: 200 });
  }
}

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
    if (!user || user.role !== 'super_admin') {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
    }
    
    const body = await request.json();
    
    // Validation de la région pour les villes
    if (body.type === 'city' && !body.region) {
      return NextResponse.json({ error: 'La région est requise pour les communautés de type ville' }, { status: 400 });
    }
    
    const community = await Community.create(body);
    return NextResponse.json(community, { status: 201 });
  } catch (error) {
    console.error('Error creating community:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
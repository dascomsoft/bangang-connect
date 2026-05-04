import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Ad from '@/models/Ad';

export async function GET() {
  try {
    await connectDB();
    const ads = await Ad.find()
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });
    
    // Toujours retourner un tableau
    return NextResponse.json(ads || []);
  } catch (error) {
    console.error('Erreur API ads:', error);
    // En cas d'erreur, retourner un tableau vide
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }
    
    const { title, content } = await request.json();
    
    if (!title || !content) {
      return NextResponse.json({ error: 'Titre et contenu requis' }, { status: 400 });
    }
    
    // Récupérer l'utilisateur
    const { verifyToken } = await import('@/lib/auth');
    const decoded = verifyToken(token);
    
    const ad = await Ad.create({
      title,
      content,
      createdBy: decoded?.userId,
      is_sponsored: false
    });
    
    return NextResponse.json(ad, { status: 201 });
  } catch (error) {
    console.error('Erreur création ad:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
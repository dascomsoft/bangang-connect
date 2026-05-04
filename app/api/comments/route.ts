import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import Comment from '@/models/Comment';
import User from '@/models/User';

// GET - Récupérer les commentaires
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const adId = searchParams.get('adId');
    const eventId = searchParams.get('eventId');
    
    let query: any = {};
    if (adId) query.adId = adId;
    if (eventId) query.eventId = eventId;
    
    const comments = await Comment.find(query)
      .populate('userId', 'name email photo')
      .sort({ createdAt: -1 });
    
    return NextResponse.json(comments);
  } catch (error) {
    console.error('GET comments error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// POST - Créer un commentaire
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
    
    const { content, adId, eventId } = await request.json();
    
    if (!content || (!adId && !eventId)) {
      return NextResponse.json({ error: 'Contenu et ID requis' }, { status: 400 });
    }
    
    const user = await User.findById(decoded.userId);
    if (!user || user.isRestricted) {
      return NextResponse.json({ error: 'Action non autorisée' }, { status: 403 });
    }
    
    const comment = await Comment.create({
      content: content.trim(),
      userId: decoded.userId,
      adId: adId || null,
      eventId: eventId || null
    });
    
    const populatedComment = await comment.populate('userId', 'name email photo');
    
    return NextResponse.json(populatedComment, { status: 201 });
  } catch (error) {
    console.error('POST comment error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyToken, JWTPayload } from '@/lib/auth';
import Message from '@/models/Message';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }
    
    const decoded = verifyToken(token) as JWTPayload;
    if (!decoded || !decoded.userId) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
    }
    
    const { searchParams } = new URL(request.url);
    const chatType = searchParams.get('chatType');
    const roomId = searchParams.get('roomId');
    
    // 🔥 Accepter les paramètres chatType et roomId
    if (!chatType || !roomId) {
      return NextResponse.json({ error: 'chatType et roomId requis' }, { status: 400 });
    }
    
    const messages = await Message.find({ chatType, roomId, isDeleted: false })
      .populate('senderId', 'name photo email')
      .sort({ createdAt: 1 })
      .limit(100);
    
    return NextResponse.json(messages);
  } catch (error) {
    console.error('GET /api/chat error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }
    
    const decoded = verifyToken(token) as JWTPayload;
    if (!decoded || !decoded.userId) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
    }
    
    const { content, chatType, roomId } = await request.json();
    
    if (!content || !content.trim()) {
      return NextResponse.json({ error: 'Message requis' }, { status: 400 });
    }
    
    if (!chatType || !roomId) {
      return NextResponse.json({ error: 'chatType et roomId requis' }, { status: 400 });
    }
    
    const message = await Message.create({
      content: content.trim(),
      senderId: decoded.userId,
      chatType,
      roomId
    });
    
    const populatedMessage = await message.populate('senderId', 'name photo email');
    
    return NextResponse.json(populatedMessage, { status: 201 });
  } catch (error) {
    console.error('POST /api/chat error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
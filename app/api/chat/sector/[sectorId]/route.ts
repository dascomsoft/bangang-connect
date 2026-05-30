import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Message from '@/models/Message';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sectorId: string }> }
) {
  try {
    await connectDB();
    
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }
    
    const decoded = verifyToken(token);
    if (!decoded || typeof decoded === 'string') {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
    }
    
    const { sectorId } = await params;
    
    // 🔥 Vérifier que l'utilisateur appartient à ce secteur
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }
    
    // Seul un membre du secteur ou un admin peut voir les messages
    const isMemberOfSector = user.sectorId?.toString() === sectorId;
    const isAdmin = user.role === 'super_admin';
    
    if (!isMemberOfSector && !isAdmin) {
      return NextResponse.json({ 
        error: 'Vous n\'avez pas accès à ce chat de secteur' 
      }, { status: 403 });
    }
    
    const messages = await Message.find({ 
      chatType: 'sector', 
      roomId: sectorId,
      isDeleted: false 
    })
      .populate('senderId', 'name photo')
      .sort({ createdAt: 1 })
      .limit(100);
    
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ sectorId: string }> }
) {
  try {
    await connectDB();
    
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }
    
    const decoded = verifyToken(token);
    if (!decoded || typeof decoded === 'string') {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
    }
    
    const { sectorId } = await params;
    const { content } = await request.json();
    
    // 🔥 Vérifier que l'utilisateur appartient à ce secteur
    const user = await User.findById(decoded.userId);
    
    const isMemberOfSector = user.sectorId?.toString() === sectorId;
    const isAdmin = user.role === 'super_admin';
    
    if (!isMemberOfSector && !isAdmin) {
      return NextResponse.json({ 
        error: 'Vous ne pouvez pas envoyer de message dans ce secteur' 
      }, { status: 403 });
    }
    
    const message = await Message.create({
      content,
      senderId: decoded.userId,
      chatType: 'sector',
      roomId: sectorId,
      isDeleted: false
    });
    
    const populatedMessage = await message.populate('senderId', 'name photo');
    
    return NextResponse.json(populatedMessage, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyToken, JWTPayload } from '@/lib/auth';
import Message from '@/models/Message';
import User from '@/models/User';

export async function DELETE(request: NextRequest) {
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
    
    const currentUser = await User.findById(decoded.userId);
    const isAdmin = currentUser?.role === 'super_admin';
    
    const { messageId } = await request.json();
    
    const message = await Message.findById(messageId);
    if (!message) {
      return NextResponse.json({ error: 'Message non trouvé' }, { status: 404 });
    }
    
    // Vérifier permissions
    const isOwner = message.senderId.toString() === decoded.userId;
    if (!isOwner && !isAdmin) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }
    
    message.isDeleted = true;
    message.deletedBy = decoded.userId;
    message.deletedAt = new Date();
    await message.save();
    
    return NextResponse.json({ success: true, message: 'Message supprimé' });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
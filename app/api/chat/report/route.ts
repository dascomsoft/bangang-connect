import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyToken, JWTPayload } from '@/lib/auth';
import Message from '@/models/Message';
import User from '@/models/User';

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
    
    const { messageId, reason } = await request.json();
    
    const message = await Message.findById(messageId);
    if (!message) {
      return NextResponse.json({ error: 'Message non trouvé' }, { status: 404 });
    }
    
    // Vérifier si l'utilisateur a déjà signalé
    const alreadyReported = message.reports.some(
      (r: any) => r.userId.toString() === decoded.userId
    );
    
    if (alreadyReported) {
      return NextResponse.json({ error: 'Vous avez déjà signalé ce message' }, { status: 400 });
    }
    
    // Ajouter le signalement
    message.reports.push({
      userId: decoded.userId,
      reason: reason || 'Comportement inapproprié'
    });
    message.reportCount = message.reports.length;
    
    // Si 5 signalements, supprimer automatiquement
    if (message.reportCount >= 5) {
      message.isDeleted = true;
      message.deletedBy = decoded.userId;
      message.deletedAt = new Date();
    }
    
    await message.save();
    
    // Notifier les admins (optionnel)
    // TODO: envoyer notification aux admins
    
    return NextResponse.json({ 
      success: true, 
      message: 'Message signalé',
      autoDeleted: message.isDeleted 
    });
  } catch (error) {
    console.error('Report error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import Event from '@/models/Event';

export async function POST(
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
    
    const userId = decoded.userId;
    const { id: eventId } = params;
    
    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json({ error: 'Événement non trouvé' }, { status: 404 });
    }
    
    if (!event.participants) {
      event.participants = [];
    }
    
    const isAlreadyParticipating = event.participants.some(
      (id: any) => id.toString() === userId
    );
    
    if (isAlreadyParticipating) {
      event.participants = event.participants.filter(
        (id: any) => id.toString() !== userId
      );
      await event.save();
      
      return NextResponse.json({ 
        success: true, 
        message: 'Vous ne participez plus à cet événement',
        participants: event.participants 
      });
    } else {
      event.participants.push(userId);
      await event.save();
      
      return NextResponse.json({ 
        success: true, 
        message: 'Participation enregistrée avec succès',
        participants: event.participants 
      });
    }
    
  } catch (error) {
    console.error('Error in participate API:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
export const dynamic = "force-dynamic";
// import { NextRequest, NextResponse } from 'next/server';
// import { connectDB } from '@/lib/db';
// import { verifyToken } from '@/lib/auth';
// import Event from '@/models/Event';
// import mongoose from 'mongoose';

// export async function POST(
//   request: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params;

//     if (!id || !mongoose.Types.ObjectId.isValid(id)) {
//       return NextResponse.json(
//         { error: 'ID événement invalide' },
//         { status: 400 }
//       );
//     }

//     await connectDB();

//     const token = request.cookies.get('token')?.value;
//     if (!token) {
//       return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
//     }

//     const decoded = verifyToken(token);
//     if (!decoded || typeof decoded === 'string') {
//       return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
//     }

//     const event = await Event.findById(id);
//     if (!event) {
//       return NextResponse.json({ error: 'Événement non trouvé' }, { status: 404 });
//     }

//     const userId = decoded.userId;
//     const isParticipating = event.participants?.includes(userId);

//     if (isParticipating) {
//       event.participants = event.participants.filter(
//         (pid: any) => pid.toString() !== userId
//       );
//       await event.save();
//       return NextResponse.json({ message: 'Vous ne participez plus' });
//     } else {
//       if (!event.participants) event.participants = [];
//       event.participants.push(userId);
//       await event.save();
//       return NextResponse.json({ message: 'Participation enregistrée' });
//     }

//   } catch (error: any) {
//     console.error('❌ ERROR:', error);
//     return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
//   }
// }














import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Event from '@/models/Event';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { id } = await params;
    
    const event = await Event.findById(id).populate('participants', 'name email phone photo');
    
    if (!event) {
      return NextResponse.json({ error: 'Événement non trouvé' }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      participants: event.participants || [],
      count: event.participants?.length || 0
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
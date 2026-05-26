export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import SectorRequest from '@/models/SectorRequest';
import mongoose from 'mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // 🔍 LOG POUR DEBUG
    console.log('>>> [API] id reçu requests:', id, typeof id);
    
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      console.error('>>> [API] ID invalide:', id);
      return NextResponse.json(
        { error: 'ID secteur invalide' },
        { status: 400 }
      );
    }

    await connectDB();

    const requests = await SectorRequest.find({
      sectorId: id,
      status: 'pending'
    }).populate({
      path: 'userId',
      select: 'name email phone',
      options: { strictPopulate: false }
    });

    console.log(`>>> [API] ${requests.length} demande(s) trouvée(s)`);
    return NextResponse.json(requests || []);

  } catch (error: any) {
    console.error('❌ ERROR:', error);
    return NextResponse.json(
      { error: 'Erreur serveur', details: error?.message },
      { status: 500 }
    );
  }
}
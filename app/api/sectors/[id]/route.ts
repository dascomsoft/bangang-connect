import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Sector from '@/models/Sector';
import mongoose from 'mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // 🔍 LOG POUR DEBUG
    console.log('>>> [API] id reçu sector:', id, typeof id);
    
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      console.error('>>> [API] ID invalide:', id);
      return NextResponse.json(
        { error: 'ID secteur invalide' },
        { status: 400 }
      );
    }

    await connectDB();

    const sector = await Sector.findById(id).populate('communityId', 'name');

    if (!sector) {
      return NextResponse.json(
        { error: 'Secteur non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json(sector);

  } catch (error: any) {
    console.error('❌ ERROR /api/sectors/[id]:', error);
    return NextResponse.json(
      { error: 'Erreur serveur', details: error?.message },
      { status: 500 }
    );
  }
}
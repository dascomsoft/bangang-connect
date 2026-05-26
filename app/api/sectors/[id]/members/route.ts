import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import mongoose from 'mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'ID secteur invalide' },
        { status: 400 }
      );
    }

    await connectDB();

    const members = await User.find({ sectorId: id })
      .select('name email phone photo')
      .sort({ name: 1 });

    return NextResponse.json(members || []);

  } catch (error: any) {
    console.error('❌ ERROR /api/sectors/[id]/members:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
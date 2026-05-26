export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import Sector from '@/models/Sector';
import User from '@/models/User';
import mongoose from 'mongoose';

export async function PUT(
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

    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded || typeof decoded === 'string') {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
    }

    const currentUser = await User.findById(decoded.userId);
    if (!currentUser || currentUser.role !== 'super_admin') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }

    const body = await request.json();
    const sector = await Sector.findByIdAndUpdate(id, body, { new: true });

    if (!sector) {
      return NextResponse.json({ error: 'Secteur non trouvé' }, { status: 404 });
    }

    return NextResponse.json(sector);

  } catch (error: any) {
    console.error('❌ ERROR:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(
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

    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded || typeof decoded === 'string') {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
    }

    const currentUser = await User.findById(decoded.userId);
    if (!currentUser || currentUser.role !== 'super_admin') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }

    const sector = await Sector.findByIdAndDelete(id);
    if (!sector) {
      return NextResponse.json({ error: 'Secteur non trouvé' }, { status: 404 });
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('❌ ERROR:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
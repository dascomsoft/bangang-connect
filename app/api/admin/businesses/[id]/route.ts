export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Business from '@/models/Business';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const user = await getCurrentUser();
    if (!user || user.role !== 'super_admin') return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    const business = await Business.findById((await params).id).populate('ownerId', 'name email photo');
    if (!business) return NextResponse.json({ error: 'Non trouvé' }, { status: 404 });
    return NextResponse.json(business);
  } catch { return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 }); }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const user = await getCurrentUser();
    if (!user || user.role !== 'super_admin') return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    const data = await req.json();
    const updated = await Business.findByIdAndUpdate((await params).id, data, { new: true });
    if (!updated) return NextResponse.json({ error: 'Non trouvé' }, { status: 404 });
    return NextResponse.json(updated);
  } catch { return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 }); }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const user = await getCurrentUser();
    if (!user || user.role !== 'super_admin') return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    await Business.findByIdAndDelete((await params).id);
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 }); }
}
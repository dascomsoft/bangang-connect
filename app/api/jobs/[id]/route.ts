// export const dynamic = "force-dynamic";
// import { NextRequest, NextResponse } from 'next/server';
// import { connectDB } from '@/lib/db';
// import { verifyToken } from '@/lib/auth';
// import Job from '@/models/Job';
// import User from '@/models/User';
// import { cookies } from 'next/headers';

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     await connectDB();
    
//     const cookieStore = await cookies();
//     const token = cookieStore.get('token')?.value;
    
//     if (!token) {
//       return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
//     }
    
//     const decoded = verifyToken(token);
//     if (!decoded || typeof decoded === 'string') {
//       return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
//     }
    
//     // Vérifier que l'utilisateur est admin
//     const currentUser = await User.findById(decoded.userId);
//     if (currentUser?.role !== 'super_admin') {
//       return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
//     }
    
//     const { id } = await params;
//     const deleted = await Job.findByIdAndDelete(id);
    
//     if (!deleted) {
//       return NextResponse.json({ error: 'Offre d\'emploi non trouvée' }, { status: 404 });
//     }
    
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error('DELETE /api/jobs/[id] error:', error);
//     return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
//   }
// }





















export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import Job from '@/models/Job';
import User from '@/models/User';
import { cookies } from 'next/headers';

// ✅ GET - Récupérer une offre par ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { id } = await params;
    
    const job = await Job.findById(id)
      .populate('companyId', 'name photo');
    
    if (!job) {
      return NextResponse.json({ error: 'Offre non trouvée' }, { status: 404 });
    }
    
    return NextResponse.json(job);
  } catch (error) {
    console.error('GET /api/jobs/[id] error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// ✅ PUT - Modifier une offre (propriétaire ou admin)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
    
    const { id } = await params;
    const job = await Job.findById(id);
    
    if (!job) {
      return NextResponse.json({ error: 'Offre non trouvée' }, { status: 404 });
    }
    
    // Vérifier propriétaire ou admin
    const currentUser = await User.findById(decoded.userId);
    const isOwner = job.companyId?.toString() === decoded.userId;
    
    if (!isOwner && currentUser?.role !== 'super_admin') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }
    
    const data = await request.json();
    
    // Empêcher la modification du companyId
    delete data.companyId;
    
    const updated = await Job.findByIdAndUpdate(id, data, { new: true });
    
    return NextResponse.json(updated);
  } catch (error) {
    console.error('PUT /api/jobs/[id] error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// ✅ DELETE - Supprimer une offre (propriétaire ou admin)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
    
    const { id } = await params;
    const job = await Job.findById(id);
    
    if (!job) {
      return NextResponse.json({ error: 'Offre non trouvée' }, { status: 404 });
    }
    
    // Vérifier propriétaire ou admin
    const currentUser = await User.findById(decoded.userId);
    const isOwner = job.companyId?.toString() === decoded.userId;
    
    if (!isOwner && currentUser?.role !== 'super_admin') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }
    
    await Job.findByIdAndDelete(id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/jobs/[id] error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
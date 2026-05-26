export const dynamic = "force-dynamic";
// // app/api/businesses/[id]/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { connectDB } from '@/lib/db';
// import Business from '@/models/Business';
// import { getCurrentUser } from '@/lib/auth';

// export async function GET(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     await connectDB();
    
//     const business = await Business.findById((await params).id)
//       .populate('ownerId', 'name email photo');
    
//     if (!business) {
//       return NextResponse.json({ error: 'Non trouvé' }, { status: 404 });
//     }
    
//     // Incrémenter les vues
//     business.views += 1;
//     await business.save();
    
//     return NextResponse.json(business);
//   } catch (error) {
//     console.error('Error:', error);
//     return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
//   }
// }

// export async function PUT(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     await connectDB();
//     const user = await getCurrentUser();
//     const business = await Business.findById((await params).id);
    
//     if (!business) {
//       return NextResponse.json({ error: 'Non trouvé' }, { status: 404 });
//     }
    
//     // Vérifier permissions
//     const isOwner = business.ownerId.toString() === user?.userId;
//     const isAdmin = user?.role === 'super_admin';
    
//     if (!isOwner && !isAdmin) {
//       return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
//     }
    
//     const data = await req.json();
//     const updated = await Business.findByIdAndUpdate(
//       (await params).id,
//       { ...data },
//       { new: true }
//     );
    
//     return NextResponse.json(updated);
//   } catch (error) {
//     console.error('Error:', error);
//     return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
//   }
// }

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     await connectDB();
//     const user = await getCurrentUser();
//     const business = await Business.findById((await params).id);
    
//     if (!business) {
//       return NextResponse.json({ error: 'Non trouvé' }, { status: 404 });
//     }
    
//     // Vérifier permissions
//     const isOwner = business.ownerId.toString() === user?.userId;
//     const isAdmin = user?.role === 'super_admin';
    
//     if (!isOwner && !isAdmin) {
//       return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
//     }
    
//     await Business.findByIdAndDelete((await params).id);
    
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error('Error:', error);
//     return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
//   }
// }

























// app/api/admin/businesses/[id]/approve/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Business from '@/models/Business';
import { getCurrentUser } from '@/lib/auth';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const user = await getCurrentUser();
    
    if (!user || user.role !== 'super_admin') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }
    
    const { status, rejectionReason } = await req.json();
    
    if (!['approved', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'Status invalide' }, { status: 400 });
    }
    
    const business = await Business.findByIdAndUpdate(
      (await params).id,
      {
        status: status,
        approvedBy: user.userId,
        approvedAt: status === 'approved' ? new Date() : null,
        rejectionReason: status === 'rejected' ? rejectionReason : null,
        isVerified: status === 'approved' ? true : false
      },
      { new: true }
    ).populate('ownerId', 'name email photo');
    
    if (!business) {
      return NextResponse.json({ error: 'Entreprise non trouvée' }, { status: 404 });
    }
    
    return NextResponse.json({ 
      success: true, 
      business,
      message: status === 'approved' ? 'Entreprise approuvée' : 'Entreprise rejetée'
    });
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
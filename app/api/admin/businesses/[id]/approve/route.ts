import { NextRequest, NextResponse } from 'next/server';
// ✅ Correction : utiliser db.ts au lieu de mongodb
import { connectDB } from '@/lib/db';
import Business from '@/models/Business';
import { getCurrentUser } from '@/lib/auth';
export const dynamic = 'force-dynamic';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { id } = await params;
    const user = await getCurrentUser();
    
    // Vérifier si l'utilisateur est super admin
    if (!user || user.role !== 'super_admin') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }
    
    const { status, rejectionReason } = await req.json();
    
    // Validation du status
    if (!['approved', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'Status invalide' }, { status: 400 });
    }
    
    const business = await Business.findByIdAndUpdate(
      id,
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
      message: status === 'approved' 
        ? 'Entreprise approuvée avec succès' 
        : 'Entreprise rejetée'
    });
    
  } catch (error) {
    console.error('Error approving business:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
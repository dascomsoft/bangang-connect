import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { authMiddleware } from '@/middleware/authMiddleware';
import Sector from '@/models/Sector';
import User from '@/models/User';
import Payment from '@/models/Payment';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { user, error } = await authMiddleware(request);
    if (error) return error;
    
    if (!user || user.role !== 'super_admin') {
      return NextResponse.json({ error: 'Accès refusé - Admin requis' }, { status: 403 });
    }
    
    const { sectorId, action, paymentReceived } = await request.json();
    
    if (!sectorId || !action) {
      return NextResponse.json({ error: 'Secteur et action requis' }, { status: 400 });
    }
    
    const sector = await Sector.findById(sectorId);
    if (!sector) {
      return NextResponse.json({ error: 'Secteur non trouvé' }, { status: 404 });
    }
    
    if (action === 'approve') {
      // Vérifier le paiement
      if (!paymentReceived && sector.paymentStatus !== 'free') {
        return NextResponse.json({ error: 'Paiement requis avant validation' }, { status: 400 });
      }
      
      sector.status = 'approved';
      sector.paymentStatus = 'paid';
      sector.paymentDate = new Date();
      sector.approvedBy = user._id;
      sector.approvedAt = new Date();
      
      // Enregistrer le paiement
      await Payment.create({
        userId: sector.presidentId,
        sectorId: sector._id,
        amount: sector.paymentAmount,
        type: 'sector_creation',
        status: 'completed',
        reference: `SECTOR_${sector._id}_${Date.now()}`
      });
      
      await sector.save();
      
      // Mettre à jour le rôle du président
      await User.findByIdAndUpdate(sector.presidentId, {
        role: 'sector_president',
        sectorId: sector._id
      });
      
      return NextResponse.json({
        success: true,
        message: 'Secteur validé avec succès',
        sector
      });
    }
    
    if (action === 'reject') {
      sector.status = 'rejected';
      sector.rejectedReason = 'Non conforme aux règles de la plateforme';
      await sector.save();
      
      return NextResponse.json({
        success: true,
        message: 'Secteur refusé',
        sector
      });
    }
    
    return NextResponse.json({ error: 'Action non reconnue' }, { status: 400 });
  } catch (error) {
    console.error('Error validating sector:', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
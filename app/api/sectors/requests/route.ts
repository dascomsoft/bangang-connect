import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import SectorRequest from '@/models/SectorRequest';
import Sector from '@/models/Sector';
import User from '@/models/User';

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }
    
    const decoded = verifyToken(token);
    if (!decoded || typeof decoded === 'string') {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
    }
    
    const { requestId, status } = await request.json();
    
    if (!requestId || !['approved', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'Requête invalide' }, { status: 400 });
    }
    
    // Récupérer la demande
    const sectorRequest = await SectorRequest.findById(requestId);
    if (!sectorRequest) {
      return NextResponse.json({ error: 'Demande non trouvée' }, { status: 404 });
    }
    
    // Récupérer l'utilisateur connecté
    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }
    
    // Récupérer le secteur
    const sector = await Sector.findById(sectorRequest.sectorId);
    if (!sector) {
      return NextResponse.json({ error: 'Secteur non trouvé' }, { status: 404 });
    }
    
    // 🔍 LOGS POUR DEBUG
    console.log('=== DEBUG AUTORISATION ===');
    console.log('User ID:', decoded.userId);
    console.log('User Role:', currentUser.role);
    console.log('Sector President ID:', sector.presidentId?.toString());
    console.log('Sector Name:', sector.name);
    
    // 🔥 Vérifier que l'utilisateur est le président OU super_admin
    const isPresident = sector.presidentId?.toString() === decoded.userId;
    const isSuperAdmin = currentUser.role === 'super_admin';
    
    if (!isPresident && !isSuperAdmin) {
      console.log('❌ Non autorisé - President ID:', sector.presidentId, 'User ID:', decoded.userId);
      return NextResponse.json({ error: 'Non autorisé - Vous n\'êtes pas le président de ce secteur' }, { status: 403 });
    }
    
    console.log('✅ Autorisation OK');
    
    // Mettre à jour la demande
    sectorRequest.status = status;
    sectorRequest.respondedBy = decoded.userId;
    sectorRequest.respondedAt = new Date();
    await sectorRequest.save();
    
    // Si approuvé, ajouter l'utilisateur au secteur
    if (status === 'approved') {
      // Ajouter l'utilisateur aux membres du secteur
      if (!sector.members.includes(sectorRequest.userId)) {
        sector.members.push(sectorRequest.userId);
        sector.membersCount = sector.members.length;
        await sector.save();
        console.log('✅ Utilisateur ajouté aux membres');
      }
      
      // Mettre à jour l'utilisateur
      await User.findByIdAndUpdate(sectorRequest.userId, { 
        sectorId: sectorRequest.sectorId 
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `Demande ${status === 'approved' ? 'approuvée' : 'refusée'}` 
    });
    
  } catch (error) {
    console.error('Error in /api/sectors/requests:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
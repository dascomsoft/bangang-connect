// app/api/sectors/requests/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import SectorRequest from '@/models/SectorRequest';
import Sector from '@/models/Sector';
import User from '@/models/User';

// GET - Récupérer les demandes pour un secteur
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }
    
    const decoded = verifyToken(token);
    if (!decoded || typeof decoded === 'string' || !decoded.userId) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
    }
    
    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }
    
    // Vérifier que l'utilisateur est président
    if (currentUser.role !== 'sector_president') {
      return NextResponse.json({ error: 'Accès refusé - Vous devez être président de secteur' }, { status: 403 });
    }
    
    // Vérifier que le président a un secteur assigné
    if (!currentUser.sectorId) {
      return NextResponse.json({ error: 'Vous n\'êtes pas assigné à un secteur' }, { status: 400 });
    }
    
    // Récupérer les demandes pour son secteur
    const requests = await SectorRequest.find({ 
      sectorId: currentUser.sectorId,
      status: 'pending'
    })
    .populate('userId', 'name email phone photo')
    .sort({ createdAt: -1 });
    
    return NextResponse.json({ 
      success: true,
      count: requests.length,
      requests 
    });
  } catch (error) {
    console.error('Error GET /api/sectors/requests:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}

// PUT - Approuver ou refuser une demande
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }
    
    const decoded = verifyToken(token);
    if (!decoded || typeof decoded === 'string' || !decoded.userId) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
    }
    
    const { requestId, status } = await request.json();
    
    if (!requestId) {
      return NextResponse.json({ error: 'requestId est requis' }, { status: 400 });
    }
    
    if (!status || !['approved', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'Status doit être "approved" ou "rejected"' }, { status: 400 });
    }
    
    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }
    
    // Vérifier que l'utilisateur est président
    if (currentUser.role !== 'sector_president') {
      return NextResponse.json({ error: 'Accès refusé - Vous devez être président de secteur' }, { status: 403 });
    }
    
    const sectorRequest = await SectorRequest.findById(requestId);
    if (!sectorRequest) {
      return NextResponse.json({ error: 'Demande non trouvée' }, { status: 404 });
    }
    
    // Vérifier que la demande est toujours en attente
    if (sectorRequest.status !== 'pending') {
      return NextResponse.json({ error: `Cette demande a déjà été ${sectorRequest.status === 'approved' ? 'approuvée' : 'refusée'}` }, { status: 400 });
    }
    
    // Vérifier que le président gère le bon secteur
    if (!currentUser.sectorId || currentUser.sectorId.toString() !== sectorRequest.sectorId.toString()) {
      return NextResponse.json({ error: 'Vous ne pouvez pas gérer les demandes de ce secteur' }, { status: 403 });
    }
    
    // Mettre à jour la demande
    sectorRequest.status = status;
    sectorRequest.respondedBy = currentUser._id;
    sectorRequest.respondedAt = new Date();
    await sectorRequest.save();
    
    const requestingUser = await User.findById(sectorRequest.userId);
    
    // Si approuvé, ajouter l'utilisateur au secteur
    if (status === 'approved') {
      const sector = await Sector.findById(sectorRequest.sectorId);
      if (!sector) {
        return NextResponse.json({ error: 'Secteur non trouvé' }, { status: 404 });
      }
      
      // Ajouter l'utilisateur aux membres du secteur s'il n'y est pas déjà
      if (!sector.members.includes(sectorRequest.userId)) {
        sector.members.push(sectorRequest.userId);
        await sector.save();
      }
      
      // Mettre à jour l'utilisateur avec son secteur
      await User.findByIdAndUpdate(sectorRequest.userId, { 
        sectorId: sectorRequest.sectorId 
      });
      
      // TODO: Envoyer une notification à l'utilisateur
      // await Notification.create({
      //   userId: sectorRequest.userId,
      //   type: 'request_approved',
      //   title: 'Demande approuvée !',
      //   content: `Votre demande pour rejoindre le secteur ${sector.name} a été approuvée.`,
      //   actionUrl: `/sector/${sector._id}`
      // });
      
    } else {
      // TODO: Envoyer une notification de refus à l'utilisateur
      // await Notification.create({
      //   userId: sectorRequest.userId,
      //   type: 'request_rejected',
      //   title: 'Demande refusée',
      //   content: `Votre demande pour rejoindre le secteur a été refusée.`,
      //   actionUrl: `/sectors`
      // });
    }
    
    return NextResponse.json({ 
      success: true,
      message: `Demande ${status === 'approved' ? 'approuvée' : 'refusée'} avec succès`,
      request: {
        id: sectorRequest._id,
        status: sectorRequest.status,
        user: requestingUser ? {
          id: requestingUser._id,
          name: requestingUser.name,
          email: requestingUser.email
        } : null
      }
    });
  } catch (error) {
    console.error('Error PUT /api/sectors/requests:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
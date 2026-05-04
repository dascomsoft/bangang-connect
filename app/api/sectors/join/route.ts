import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyToken, JWTPayload } from '@/lib/auth';
import SectorRequest from '@/models/SectorRequest';
import Sector from '@/models/Sector';
import User from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    // 1. Vérifier le token
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ 
        success: false,
        error: 'Non authentifié' 
      }, { status: 401 });
    }
    
    const decoded = verifyToken(token) as JWTPayload;
    if (!decoded || !decoded.userId) {
      return NextResponse.json({ 
        success: false,
        error: 'Token invalide' 
      }, { status: 401 });
    }
    
    // 2. Vérifier les paramètres
    const { sectorId, message } = await request.json();
    
    if (!sectorId) {
      return NextResponse.json({ 
        success: false,
        error: 'L\'ID du secteur est requis' 
      }, { status: 400 });
    }
    
    // 3. Vérifier que l'utilisateur existe
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ 
        success: false,
        error: 'Utilisateur non trouvé' 
      }, { status: 404 });
    }
    
    // 4. Vérifier que l'utilisateur n'est pas restreint
    if (user.isRestricted) {
      return NextResponse.json({ 
        success: false,
        error: 'Votre compte est restreint. Vous ne pouvez pas rejoindre de secteur.' 
      }, { status: 403 });
    }
    
    // 5. Vérifier que le secteur existe
    const sector = await Sector.findById(sectorId);
    if (!sector) {
      return NextResponse.json({ 
        success: false,
        error: 'Secteur non trouvé' 
      }, { status: 404 });
    }
    
    // 6. Vérifier que l'utilisateur n'est pas déjà membre
    if (user.sectorId && user.sectorId.toString() === sectorId) {
      return NextResponse.json({ 
        success: false,
        error: 'Vous êtes déjà membre de ce secteur' 
      }, { status: 400 });
    }
    
    // 7. Vérifier les demandes existantes
    const existingRequest = await SectorRequest.findOne({
      userId: decoded.userId,
      sectorId,
      status: { $in: ['pending', 'approved'] }
    });
    
    if (existingRequest) {
      if (existingRequest.status === 'pending') {
        return NextResponse.json({ 
          success: false,
          error: 'Vous avez déjà une demande en attente pour ce secteur',
          requestStatus: 'pending'
        }, { status: 400 });
      }
      if (existingRequest.status === 'approved') {
        return NextResponse.json({ 
          success: false,
          error: 'Vous êtes déjà membre de ce secteur',
          requestStatus: 'approved'
        }, { status: 400 });
      }
    }
    
    // 8. Vérifier les demandes refusées récentes (délai de 7 jours)
    const recentRejected = await SectorRequest.findOne({
      userId: decoded.userId,
      sectorId,
      status: 'rejected',
      respondedAt: { $gt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });
    
    if (recentRejected) {
      const daysLeft = Math.ceil((7 * 24 * 60 * 60 * 1000 - (Date.now() - recentRejected.respondedAt.getTime())) / (24 * 60 * 60 * 1000));
      return NextResponse.json({ 
        success: false,
        error: `Votre demande a été refusée. Veuillez réessayer dans ${daysLeft} jour(s).`,
        daysLeft
      }, { status: 400 });
    }
    
    // 9. Créer la demande
    const sectorRequest = await SectorRequest.create({
      userId: decoded.userId,
      sectorId,
      message: message?.trim() || '',
      status: 'pending',
      createdAt: new Date()
    });
    
    // 10. Populate les infos pour la réponse
    const populatedRequest = await SectorRequest.findById(sectorRequest._id)
      .populate('userId', 'name email photo')
      .populate('sectorId', 'name');
    
    // 11. TODO: Notifier le président via Socket.io
    // const president = await User.findById(sector.presidentId);
    // if (president) {
    //   io.to(`user_${president._id}`).emit('new_sector_request', {
    //     requestId: sectorRequest._id,
    //     userName: user.name,
    //     sectorName: sector.name
    //   });
    // }
    
    return NextResponse.json({ 
      success: true,
      message: 'Votre demande a été envoyée au président du secteur',
      request: {
        id: sectorRequest._id,
        status: sectorRequest.status,
        createdAt: sectorRequest.createdAt,
        message: sectorRequest.message,
        sector: {
          id: sector._id,
          name: sector.name
        }
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error POST /api/sectors/join:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Erreur interne du serveur. Veuillez réessayer plus tard.' 
    }, { status: 500 });
  }
}
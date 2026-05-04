import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { authMiddleware } from '@/middleware/authMiddleware';
import Sector from '@/models/Sector';
import User from '@/models/User';
import Community from '@/models/Community';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    // Vérification admin
    const { user, error } = await authMiddleware(request);
    if (error) return error;
    if (!user || user.role !== 'super_admin') {
      return NextResponse.json({ error: 'Accès refusé - Admin requis' }, { status: 403 });
    }
    
    const { name, description, communityId, presidentPhone, presidentName, sendInvitation } = await request.json();
    
    // Validation
    if (!name || !communityId || !presidentPhone || !presidentName) {
      return NextResponse.json({ error: 'Nom, communauté, téléphone et nom président requis' }, { status: 400 });
    }
    
    // Vérifier la communauté
    const community = await Community.findById(communityId);
    if (!community) {
      return NextResponse.json({ error: 'Communauté non trouvée' }, { status: 404 });
    }
    
    // Nettoyer le téléphone
    const cleanPhone = presidentPhone.replace(/\s/g, '');
    
    // Vérifier doublon (même nom dans même communauté)
    const existingSector = await Sector.findOne({ 
      name: { $regex: new RegExp(`^${name}$`, 'i') }, 
      communityId 
    });
    if (existingSector) {
      return NextResponse.json({ error: 'Un secteur avec ce nom existe déjà dans cette communauté' }, { status: 400 });
    }
    
    // Trouver ou créer l'utilisateur président
    let president = await User.findOne({ phone: cleanPhone });
    
    if (!president) {
      // Créer un compte temporaire pour le président
      const tempPassword = crypto.randomBytes(8).toString('hex');
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash(tempPassword, 10);
      
      president = await User.create({
        name: presidentName,
        phone: cleanPhone,
        email: `${cleanPhone}@temp.bangang.com`,
        password: hashedPassword,
        role: 'member',
        communityId
      });
    }
    
    // Créer le secteur (actif directement car admin)
    const sector = await Sector.create({
      name,
      description: description || '',
      communityId,
      presidentName,
      presidentPhone: cleanPhone,
      presidentId: president._id,
      status: 'active',
      createdBy: 'super_admin',
      members: [president._id]
    });
    
    // Mettre à jour l'utilisateur avec le secteur
    president.sectorId = sector._id;
    if (president.role === 'member') {
      president.role = 'sector_president';
    }
    await president.save();
    
    // Si invitation demandée, créer une invitation
    if (sendInvitation) {
      const Invitation = await import('@/models/Invitation').then(m => m.default);
      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);
      
      await Invitation.create({
        phone: cleanPhone,
        sectorId: sector._id,
        role: 'sector_president',
        token,
        expiresAt
      });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Secteur créé avec succès',
      sector: {
        id: sector._id,
        name: sector.name,
        community: community.name,
        president: presidentName,
        presidentPhone: cleanPhone
      }
    }, { status: 201 });
    
  } catch (error: any) {
    console.error('Error creating sector:', error);
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Un secteur avec ce nom existe déjà dans cette communauté' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
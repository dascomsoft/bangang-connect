import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { authMiddleware } from '@/middleware/authMiddleware';
import bcrypt from 'bcryptjs';
import Sector from '@/models/Sector';
import User from '@/models/User';
import Community from '@/models/Community';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { user, error } = await authMiddleware(request);
    if (error) return error;
    if (!user || user.role !== 'super_admin') {
      return NextResponse.json({ error: 'Non autorisé - Admin requis' }, { status: 403 });
    }
    
    const { name, description, communityId, presidentPhone, presidentName } = await request.json();
    
    if (!name || !communityId || !presidentPhone || !presidentName) {
      return NextResponse.json({ error: 'Nom, communauté, téléphone et nom président requis' }, { status: 400 });
    }
    
    // Nettoyer le téléphone
    let cleanPhone = presidentPhone.replace(/\s/g, '');
    if (!cleanPhone.startsWith('+237')) {
      cleanPhone = '+237' + cleanPhone.replace(/^0+/, '');
    }
    
    // Vérifier la communauté
    const community = await Community.findById(communityId);
    if (!community) {
      return NextResponse.json({ error: 'Communauté non trouvée' }, { status: 404 });
    }
    
    // Vérifier si un secteur avec ce nom existe déjà
    const existingSector = await Sector.findOne({ name, communityId });
    if (existingSector) {
      return NextResponse.json({ error: 'Un secteur avec ce nom existe déjà' }, { status: 400 });
    }
    
    // Trouver ou créer le président
    let president = await User.findOne({ phone: cleanPhone });
    
    if (!president) {
      // 🔑 Mot de passe par défaut : secteur123
      const defaultPassword = 'secteur123';
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);
      
      president = await User.create({
        name: presidentName,
        phone: cleanPhone,
        email: `${cleanPhone}@secteur.bangang.com`,
        password: hashedPassword,
        role: 'sector_president',
        communityId,
        strikes: 0,
        isRestricted: false
      });
    }
    
    // Créer le secteur (actif directement)
    const sector = await Sector.create({
      name,
      description: description || '',
      communityId,
      presidentId: president._id,
      presidentName: presidentName,
      presidentPhone: cleanPhone,
      status: 'active',
      members: [president._id],
      membersCount: 1
    });
    
    // Mettre à jour l'utilisateur avec le secteur
    president.sectorId = sector._id;
    await president.save();
    
    return NextResponse.json({
      success: true,
      message: 'Secteur créé avec succès',
      sector: {
        id: sector._id,
        name: sector.name,
        community: community.name
      },
      president: {
        name: president.name,
        phone: president.phone,
        password: 'secteur123'
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating sector:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
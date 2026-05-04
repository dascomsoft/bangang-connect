import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { authMiddleware } from '@/middleware/authMiddleware';
import Sector from '@/models/Sector';
import User from '@/models/User';
import Community from '@/models/Community';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { user, error } = await authMiddleware(request);
    if (error) return error;
    if (!user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }
    
    const { name, description, communityId, presidentEmail } = await request.json();
    
    if (!name || !communityId || !presidentEmail) {
      return NextResponse.json({ error: 'Nom, communauté et président requis' }, { status: 400 });
    }
    
    // Vérifier la communauté
    const community = await Community.findById(communityId);
    if (!community) {
      return NextResponse.json({ error: 'Communauté non trouvée' }, { status: 404 });
    }
    
    // Trouver ou créer le président
    let president = await User.findOne({ email: presidentEmail });
    
    if (!president) {
      // Créer un compte pour le président
      const tempPassword = Math.random().toString(36).slice(-8);
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash(tempPassword, 10);
      
      president = await User.create({
        name: `President ${name}`,
        email: presidentEmail,
        phone: '0000000000',
        password: hashedPassword,
        role: 'sector_president',
        communityId
      });
    }
    
    // Vérifier si un secteur avec ce nom existe déjà dans la communauté
    const existingSector = await Sector.findOne({ name, communityId });
    if (existingSector) {
      return NextResponse.json({ error: 'Un secteur avec ce nom existe déjà' }, { status: 400 });
    }
    
    // Créer le secteur avec status pending
    const sector = await Sector.create({
      name,
      description,
      communityId,
      presidentId: president._id,
      status: 'pending',
      paymentStatus: 'pending',
      paymentAmount: 5000,
      members: [president._id]
    });
    
    return NextResponse.json({
      success: true,
      message: 'Secteur créé. En attente de validation et paiement.',
      sector
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating sector:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
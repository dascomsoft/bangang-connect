import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    // Vérifier que l'utilisateur est super admin
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }
    
    const decoded = verifyToken(token);
    if (!decoded || typeof decoded === 'string') {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
    }
    
    const currentUser = await User.findById(decoded.userId);
    if (currentUser?.role !== 'super_admin') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }
    
    const { name, phone, password, role, sectorId } = await request.json();
    
    // Validation
    if (!name || !phone || !password || !role) {
      return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 });
    }
    
    if (password.length < 6) {
      return NextResponse.json({ error: 'Le mot de passe doit contenir au moins 6 caractères' }, { status: 400 });
    }
    
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return NextResponse.json({ error: 'Ce numéro de téléphone existe déjà' }, { status: 400 });
    }
    
    // Vérifier le secteur pour les présidents
    if (role === 'sector_president' && !sectorId) {
      return NextResponse.json({ error: 'Un président doit être assigné à un secteur' }, { status: 400 });
    }
    
    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Créer l'utilisateur
    const user = await User.create({
      name,
      phone,
      password: hashedPassword,
      role,
      sectorId: role === 'sector_president' ? sectorId : null,
      isRestricted: false,
      createdAt: new Date()
    });
    
    return NextResponse.json({ 
      success: true, 
      user: { 
        _id: user._id, 
        name: user.name, 
        phone: user.phone, 
        role: user.role,
        sectorId: user.sectorId
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
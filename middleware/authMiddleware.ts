import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import User from '@/models/User';

export interface AuthUser {
  _id: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  communityId?: string;
  sectorId?: string;
  strikes: number;
  isRestricted: boolean;
}

export async function authMiddleware(request: NextRequest): Promise<{ user: AuthUser | null; error: NextResponse | null }> {
  try {
    // Récupérer le token
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      return {
        user: null,
        error: NextResponse.json(
          { error: 'Non authentifié' },
          { status: 401 }
        )
      };
    }
    
    // Vérifier le token
    const decoded = verifyToken(token);
    if (!decoded || typeof decoded === 'string' || !decoded.userId) {
      return {
        user: null,
        error: NextResponse.json(
          { error: 'Token invalide' },
          { status: 401 }
        )
      };
    }
    
    // Connexion à la DB
    await connectDB();
    
    // Récupérer l'utilisateur
    const user = await User.findById(decoded.userId)
      .select('-password')
      .populate('communityId', 'name type')
      .populate('sectorId', 'name');
    
    if (!user) {
      return {
        user: null,
        error: NextResponse.json(
          { error: 'Utilisateur non trouvé' },
          { status: 401 }
        )
      };
    }
    
    // Vérifier si le compte est restreint
    if (user.isRestricted) {
      return {
        user: null,
        error: NextResponse.json(
          { error: 'Compte restreint. Contactez l\'administrateur.' },
          { status: 403 }
        )
      };
    }
    
    return { user, error: null };
  } catch (error) {
    console.error('Auth middleware error:', error);
    return {
      user: null,
      error: NextResponse.json(
        { error: 'Erreur interne du serveur' },
        { status: 500 }
      )
    };
  }
}

// Version simplifiée pour les routes API
export async function requireAuth(request: NextRequest) {
  const { user, error } = await authMiddleware(request);
  if (error) return { user: null, error };
  return { user, error: null };
}

// Version pour les routes qui nécessitent un rôle spécifique
export async function requireRole(request: NextRequest, allowedRoles: string[]) {
  const { user, error } = await authMiddleware(request);
  
  if (error) return { user: null, error };
  
  if (!user || !allowedRoles.includes(user.role)) {
    return {
      user: null,
      error: NextResponse.json(
        { error: 'Accès refusé. Droits insuffisants.' },
        { status: 403 }
      )
    };
  }
  
  return { user, error: null };
}
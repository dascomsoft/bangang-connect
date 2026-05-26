// import { NextRequest, NextResponse } from 'next/server';
// import { connectDB } from '@/lib/db';
// import { verifyToken, JWTPayload } from '@/lib/auth';
// import User from '@/models/User';

// export async function GET(request: NextRequest) {
//   try {
//     await connectDB();
    
//     const token = request.cookies.get('token')?.value;
//     if (!token) {
//       return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
//     }
    
//     const decoded = verifyToken(token) as JWTPayload;
//     if (!decoded || !decoded.userId) {
//       return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
//     }
    
//     const currentUser = await User.findById(decoded.userId);
//     if (!currentUser) {
//       return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
//     }
    
//     if (currentUser.role !== 'super_admin') {
//       return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
//     }
    
//     const users = await User.find()
//       .select('-password')
//       .populate('communityId', 'name')
//       .populate('sectorId', 'name');
    
//     return NextResponse.json(users);
//   } catch (error) {
//     console.error('Error GET /api/admin/users:', error);
//     return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
//   }
// }

// export async function PUT(request: NextRequest) {
//   try {
//     await connectDB();
    
//     const token = request.cookies.get('token')?.value;
//     if (!token) {
//       return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
//     }
    
//     const decoded = verifyToken(token) as JWTPayload;
//     if (!decoded || !decoded.userId) {
//       return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
//     }
    
//     const currentUser = await User.findById(decoded.userId);
//     if (!currentUser) {
//       return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
//     }
    
//     if (currentUser.role !== 'super_admin') {
//       return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
//     }
    
//     const { userId, role } = await request.json();
    
//     if (!userId || !role) {
//       return NextResponse.json({ error: 'userId et role sont requis' }, { status: 400 });
//     }
    
//     // Vérifier les rôles valides
//     const validRoles = ['super_admin', 'village_chief', 'community_chief', 'sector_president', 'member'];
//     if (!validRoles.includes(role)) {
//       return NextResponse.json({ error: 'Rôle invalide' }, { status: 400 });
//     }
    
//     const user = await User.findByIdAndUpdate(userId, { role }, { new: true })
//       .select('-password');
    
//     if (!user) {
//       return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
//     }
    
//     return NextResponse.json({ 
//       success: true, 
//       message: `Rôle mis à jour avec succès`, 
//       user 
//     });
//   } catch (error) {
//     console.error('Error PUT /api/admin/users:', error);
//     return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
//   }
// }




















































import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Vérifier auth admin
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }
    
    const decoded = verifyToken(token);
    
    if (!decoded || decoded.role !== 'super_admin') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;
    
    const [users, total] = await Promise.all([
      User.find()
        .select('-password')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      User.countDocuments(),
    ]);
    
    return NextResponse.json({ users, total, page, limit });
  } catch (error) {
    console.error('GET /api/admin/users error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    // ✅ Correction : Vérifier que token existe avant de le passer à verifyToken
    if (!token) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }
    
    const decoded = verifyToken(token);
    
    if (!decoded || decoded.role !== 'super_admin') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }
    
    const { userId, role } = await request.json();
    
    if (!userId || !role) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
    }
    
    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }
    
    return NextResponse.json(user);
  } catch (error) {
    console.error('PUT /api/admin/users error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
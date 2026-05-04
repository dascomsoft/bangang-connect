import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import User from '@/models/User';
import Sector from '@/models/Sector';
import Event from '@/models/Event';
import Comment from '@/models/Comment';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    const currentUser = await User.findById(decoded.userId);
    if (!currentUser || currentUser.role !== 'super_admin') {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
    }
    
    const { id } = params;
    
    // Ne pas supprimer soi-même
    if (id === decoded.userId) {
      return NextResponse.json({ error: 'Vous ne pouvez pas supprimer votre propre compte' }, { status: 400 });
    }
    
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }
    
    // Supprimer l'utilisateur des secteurs où il est membre
    await Sector.updateMany(
      { members: id },
      { $pull: { members: id } }
    );
    
    // Supprimer ses commentaires
    await Comment.deleteMany({ userId: id });
    
    // Supprimer l'utilisateur
    await User.findByIdAndDelete(id);
    
    return NextResponse.json({ success: true, message: 'Utilisateur supprimé' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
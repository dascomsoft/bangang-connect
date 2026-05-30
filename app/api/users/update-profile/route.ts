export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
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

    const { name, email, currentPassword, newPassword } = await request.json();

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }

    // ✅ Mise à jour nom et email
    if (name) user.name = name;
    if (email) user.email = email;

    // ✅ Changement de mot de passe si demandé
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          { error: 'Mot de passe actuel requis' },
          { status: 400 }
        );
      }

      if (newPassword.length < 6) {
        return NextResponse.json(
          { error: 'Nouveau mot de passe trop court (minimum 6 caractères)' },
          { status: 400 }
        );
      }

      // Vérifier le mot de passe actuel
      const bcrypt = await import('bcryptjs');
      const isValid = await bcrypt.compare(currentPassword, user.password);
      if (!isValid) {
        return NextResponse.json(
          { error: 'Mot de passe actuel incorrect' },
          { status: 401 }
        );
      }

      // ✅ En clair → hook pre('save') hash automatiquement une seule fois
      user.password = newPassword;
    }

    // ✅ user.save() → hook ne re-hashe que si password modifié (isModified guard)
    await user.save();

    const { password: _, ...userResponse } = user.toObject();
    return NextResponse.json({ user: userResponse });

  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
// export const dynamic = "force-dynamic";

// import { NextRequest, NextResponse } from 'next/server';
// import { connectDB } from '@/lib/db';
// import { authMiddleware } from '@/middleware/authMiddleware';
// import Sector from '@/models/Sector';
// import User from '@/models/User';
// import Community from '@/models/Community';
// import crypto from 'crypto';
// import { validateAndCleanPhone } from '@/lib/phone';

// export async function POST(request: NextRequest) {
//   try {
//     await connectDB();

//     // 🔐 Auth admin
//     const { user, error } = await authMiddleware(request);
//     if (error) return error;

//     if (!user || user.role !== 'super_admin') {
//       return NextResponse.json(
//         { error: 'Accès refusé - Admin requis' },
//         { status: 403 }
//       );
//     }

//     const {
//       name,
//       description,
//       communityId,
//       presidentPhone,
//       presidentName,
//       sendInvitation
//     } = await request.json();

//     // 🔴 Validation champs obligatoires
//     if (!name || !communityId || !presidentPhone || !presidentName) {
//       return NextResponse.json(
//         { error: 'Nom, communauté, téléphone et nom président requis' },
//         { status: 400 }
//       );
//     }

//     // 🔥 Validation téléphone (FIX 2)
//     const cleanPhone = validateAndCleanPhone(presidentPhone);
//     if (!cleanPhone) {
//       return NextResponse.json(
//         { error: 'Numéro de téléphone invalide' },
//         { status: 400 }
//       );
//     }

//     const community = await Community.findById(communityId);
//     if (!community) {
//       return NextResponse.json(
//         { error: 'Communauté non trouvée' },
//         { status: 404 }
//       );
//     }

//     // 🔥 FIX ReDoS (escape regex)
//     const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

//     const existingSector = await Sector.findOne({
//       name: { $regex: new RegExp(`^${escapedName}$`, 'i') },
//       communityId
//     });

//     if (existingSector) {
//       return NextResponse.json(
//         { error: 'Un secteur avec ce nom existe déjà dans cette communauté' },
//         { status: 400 }
//       );
//     }

//     // 🔍 Chercher président existant
//     let president = await User.findOne({ phone: cleanPhone });

//     let tempPassword: string | null = null;

//     // 👤 Création user si inexistant
//     if (!president) {
//       tempPassword = crypto.randomBytes(8).toString('hex');

//       president = await User.create({
//         name: presidentName,
//         phone: cleanPhone,
//         email: `${cleanPhone}@temp.bangang.com`,
//         password: tempPassword, // ✅ plain → hook hash UNE seule fois
//         role: 'member',
//         communityId
//       });

//       // 🔐 LOG SERVEUR UNIQUEMENT (DEV)
//       if (process.env.NODE_ENV === 'development') {
//         console.log(`🔐 TEMP PASSWORD (${cleanPhone}):`, tempPassword);
//       }
//     }

//     // 🏗️ Création secteur
//     const sector = await Sector.create({
//       name,
//       description: description || '',
//       communityId,
//       presidentName,
//       presidentPhone: cleanPhone,
//       presidentId: president._id,
//       status: 'active',
//       createdBy: 'super_admin',
//       members: [president._id]
//     });

//     // 🔥 FIX BUG save() → utiliser updateOne (pas de hook pre('save'))
//     await User.updateOne(
//       { _id: president._id },
//       {
//         $set: {
//           sectorId: sector._id,
//           role:
//             president.role === 'member'
//               ? 'sector_president'
//               : president.role
//         }
//       }
//     );

//     // 📩 Invitation optionnelle
//     if (sendInvitation) {
//       const Invitation = (await import('@/models/Invitation')).default;

//       const token = crypto.randomBytes(32).toString('hex');
//       const expiresAt = new Date();
//       expiresAt.setDate(expiresAt.getDate() + 7);

//       await Invitation.create({
//         phone: cleanPhone,
//         sectorId: sector._id,
//         role: 'sector_president',
//         token,
//         expiresAt
//       });
//     }

//     // 🚨 RESPONSE SECURE (FIX 1)
//     return NextResponse.json({
//       success: true,
//       message: 'Secteur créé avec succès',
//       sector: {
//         id: sector._id,
//         name: sector.name,
//         community: community.name,
//         president: presidentName,
//         presidentPhone: cleanPhone
//         // ❌ tempPassword JAMAIS retourné
//       }
//     }, { status: 201 });

//   } catch (error: any) {
//     console.error('Error creating sector:', error);

//     if (error.code === 11000) {
//       return NextResponse.json(
//         { error: 'Un secteur avec ce nom existe déjà dans cette communauté' },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json(
//       { error: 'Erreur interne du serveur' },
//       { status: 500 }
//     );
//   }
// }



























































export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { authMiddleware } from '@/middleware/authMiddleware';
import Sector from '@/models/Sector';
import User from '@/models/User';
import Community from '@/models/Community';
import crypto from 'crypto';
import { validateAndCleanPhone } from '@/lib/phone';

// Générer un mot de passe lisible et mémorisable
function generateTempPassword(presidentName: string): string {
  const prenom = presidentName
    .split(' ')[0]
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // enlever accents
    .replace(/[^a-z]/g, '');         // enlever caractères spéciaux
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${prenom}-${randomNum}`;
  // ex: "polo-4821", "jean-7392"
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { user, error } = await authMiddleware(request);
    if (error) return error;

    if (!user || user.role !== 'super_admin') {
      return NextResponse.json(
        { error: 'Accès refusé - Admin requis' },
        { status: 403 }
      );
    }

    const {
      name,
      description,
      communityId,
      presidentPhone,
      presidentName,
      sendInvitation
    } = await request.json();

    if (!name || !communityId || !presidentPhone || !presidentName) {
      return NextResponse.json(
        { error: 'Nom, communauté, téléphone et nom président requis' },
        { status: 400 }
      );
    }

    const cleanPhone = validateAndCleanPhone(presidentPhone);
    if (!cleanPhone) {
      return NextResponse.json(
        { error: 'Numéro de téléphone invalide' },
        { status: 400 }
      );
    }

    const community = await Community.findById(communityId);
    if (!community) {
      return NextResponse.json(
        { error: 'Communauté non trouvée' },
        { status: 404 }
      );
    }

    // Protection ReDoS
    const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const existingSector = await Sector.findOne({
      name: { $regex: new RegExp(`^${escapedName}$`, 'i') },
      communityId
    });

    if (existingSector) {
      return NextResponse.json(
        { error: 'Un secteur avec ce nom existe déjà dans cette communauté' },
        { status: 400 }
      );
    }

    let president = await User.findOne({ phone: cleanPhone });
    let tempPassword: string | null = null;

    if (!president) {
      // ✅ Mot de passe lisible : "polo-4821"
      tempPassword = generateTempPassword(presidentName);

      // ✅ En clair → hook pre('save') hash une seule fois
      president = await User.create({
        name: presidentName,
        phone: cleanPhone,
        email: `${cleanPhone}@temp.bangang.com`,
        password: tempPassword,
        role: 'member',
        communityId,
        strikes: 0,
        isRestricted: false
      });

      if (process.env.NODE_ENV === 'development') {
        console.log(`🔑 TEMP PASSWORD (${cleanPhone}): ${tempPassword}`);
      }
    }

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

    // ✅ updateOne bypass le hook pre('save')
    await User.updateOne(
      { _id: president._id },
      {
        $set: {
          sectorId: sector._id,
          ...(president.role === 'member' && { role: 'sector_president' })
        }
      }
    );

    if (sendInvitation) {
      const Invitation = (await import('@/models/Invitation')).default;
      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

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
        presidentPhone: cleanPhone,
        tempPassword // ✅ "polo-4821" ou null si user existait déjà
      }
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating sector:', error);
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Un secteur avec ce nom existe déjà dans cette communauté' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
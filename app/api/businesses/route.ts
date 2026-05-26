export const dynamic = "force-dynamic";
// import { NextRequest, NextResponse } from 'next/server';
// import { connectDB } from '@/lib/db';
// import { verifyToken } from '@/lib/auth';
// import Business from '@/models/Business';
// import User from '@/models/User';

// // GET - Récupérer toutes les entreprises (public)
// export async function GET(request: NextRequest) {
//   try {
//     await connectDB();
    
//     const { searchParams } = new URL(request.url);
//     const category = searchParams.get('category');
//     const city = searchParams.get('city');
//     const search = searchParams.get('search');
//     const sponsored = searchParams.get('sponsored');
    
//     let query: any = {};
//     if (category && category !== 'all') query.category = category;
//     if (city) query.city = { $regex: city, $options: 'i' };
//     if (sponsored === 'true') query.isSponsored = true;
//     if (search) {
//       query.$or = [
//         { businessName: { $regex: search, $options: 'i' } },
//         { description: { $regex: search, $options: 'i' } }
//       ];
//     }
    
//     const businesses = await Business.find(query)
//       .populate('ownerId', 'name email photo')
//       .sort({ isSponsored: -1, createdAt: -1 })
//       .limit(50);
    
//     return NextResponse.json(businesses);
//   } catch (error) {
//     console.error('GET /api/businesses error:', error);
//     return NextResponse.json([], { status: 200 });
//   }
// }

// // POST - Créer une entreprise (authentifié)
// export async function POST(request: NextRequest) {
//   try {
//     await connectDB();
    
//     const token = request.cookies.get('token')?.value;
//     if (!token) {
//       return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
//     }
    
//     const decoded = verifyToken(token);
//     if (!decoded || typeof decoded === 'string') {
//       return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
//     }
    
//     const data = await request.json();
    
//     const business = await Business.create({
//       ...data,
//       ownerId: decoded.userId
//     });
    
//     return NextResponse.json(business, { status: 201 });
//   } catch (error) {
//     console.error('POST /api/businesses error:', error);
//     return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
//   }
// }






















// app/api/businesses/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Business from '@/models/Business';
import { getCurrentUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const data = await req.json();
    const isAdmin = user.role === 'super_admin';
    
    const business = await Business.create({
      ...data,
      ownerId: user.userId,
      status: isAdmin ? 'approved' : 'pending',
      isVerified: isAdmin ? true : false,
      approvedBy: isAdmin ? user.userId : null,
      approvedAt: isAdmin ? new Date() : null
    });

    const message = isAdmin 
      ? 'Entreprise ajoutée et publiée avec succès !'
      : 'Entreprise ajoutée avec succès ! En attente de validation par un administrateur.';

    return NextResponse.json({ business, message });
    
  } catch (error) {
    console.error('Error creating business:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const user = await getCurrentUser();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    let filter: any = {};
    
    // Public et membres normaux: voir seulement les approuvés
    if (!user || user.role !== 'super_admin') {
      filter.status = 'approved';
    }
    // Admin voit tout
    
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    if (search) {
      filter.$or = [
        { businessName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } }
      ];
    }
    
    const businesses = await Business.find(filter)
      .populate('ownerId', 'name email photo')
      .sort({ createdAt: -1 });
    
    return NextResponse.json(businesses);
    
  } catch (error) {
    console.error('Error fetching businesses:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
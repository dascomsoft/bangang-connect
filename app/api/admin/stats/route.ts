// export const dynamic = "force-dynamic";
// import { NextResponse } from 'next/server';
// import { connectDB } from '@/lib/db';
// import User from '@/models/User';
// import Community from '@/models/Community';
// import Sector from '@/models/Sector';
// import Event from '@/models/Event';
// import Ad from '@/models/Ad';
// import Business from '@/models/Business';
// import { verifyToken } from '@/lib/auth';
// import { cookies } from 'next/headers';

// // ✅ Mise en cache des stats

//  // Revalider toutes les 60 secondes

// export async function GET() {
//   try {
//     await connectDB();
    
//     const cookieStore = await cookies();
//     const token = cookieStore.get('token')?.value;
//     if (!token) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
//     const decoded = verifyToken(token);
    
//     if (!decoded || decoded.role !== 'super_admin') {
//       return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
//     }
    
//     // ✅ Exécution parallèle des COUNT (optimisé)
//     const [
//       totalUsers,
//       totalCommunities,
//       totalSectors,
//       totalEvents,
//       totalAds,
//       totalBusinesses,
//       pendingBusinesses,
//     ] = await Promise.all([
//       User.countDocuments(),
//       Community.countDocuments(),
//       Sector.countDocuments(),
//       Event.countDocuments(),
//       Ad.countDocuments(),
//       Business.countDocuments(),
//       Business.countDocuments({ status: 'pending' }),
//     ]);
    
//     return NextResponse.json({
//       totalUsers,
//       totalCommunities,
//       totalSectors,
//       totalEvents,
//       totalAds,
//       totalBusinesses,
//       pendingBusinesses,
//       totalRevenue: 0,
//     });
//   } catch (error) {
//     console.error('Stats error:', error);
//     return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
//   }
// }





























































export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import Community from '@/models/Community';
import Sector from '@/models/Sector';
import Event from '@/models/Event';
import Ad from '@/models/Ad';
import Business from '@/models/Business';
import Job from '@/models/Job';
import Product from '@/models/Product';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    await connectDB();
    
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    const decoded = verifyToken(token);
    
    if (!decoded || decoded.role !== 'super_admin') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }
    
    const [
      totalUsers,
      totalCommunities,
      totalSectors,
      totalEvents,
      totalAds,
      totalBusinesses,
      pendingBusinesses,
      totalJobs,
      totalProducts,
    ] = await Promise.all([
      User.countDocuments(),
      Community.countDocuments(),
      Sector.countDocuments(),
      Event.countDocuments(),
      Ad.countDocuments(),
      Business.countDocuments(),
      Business.countDocuments({ status: 'pending' }),
      Job.countDocuments(),
      Product.countDocuments(),
    ]);
    
    // ✅ Retourne directement les données (pas de useState)
    return NextResponse.json({
      totalUsers,
      totalCommunities,
      totalSectors,
      totalEvents,
      totalAds,
      totalBusinesses,
      pendingBusinesses,
      totalJobs,
      totalProducts,
      totalRevenue: 0,
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
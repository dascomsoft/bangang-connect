// // app/api/admin/businesses/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { connectDB } from '@/lib/db';
// import Business from '@/models/Business';
// import { getCurrentUser } from '@/lib/auth';

// export async function GET(req: NextRequest) {
//   try {
//     await connectDB();
//     const user = await getCurrentUser();
    
//     // Vérifier si l'utilisateur est super admin
//     if (!user || user.role !== 'super_admin') {
//       return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
//     }
    
//     const { searchParams } = new URL(req.url);
//     const status = searchParams.get('status');
    
//     let filter: any = {};
//     if (status && status !== 'all') {
//       filter.status = status;
//     }
    
//     const businesses = await Business.find(filter)
//       .populate('ownerId', 'name email photo')
//       .sort({ createdAt: -1 });
    
//     return NextResponse.json(businesses);
    
//   } catch (error) {
//     console.error('Error fetching businesses:', error);
//     return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
//   }
// }






















































// app/api/admin/businesses/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Business from '@/models/Business';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const user = await getCurrentUser();
    
    if (!user || user.role !== 'super_admin') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }
    
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    
    let filter: any = {};
    if (status && status !== 'all') {
      filter.status = status;
    }
    
    const businesses = await Business.find(filter)
      .populate('ownerId', 'name email photo')
      .sort({ createdAt: -1 });
    
    return NextResponse.json(businesses);
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
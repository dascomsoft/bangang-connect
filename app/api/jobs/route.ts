// export const dynamic = "force-dynamic";
// import { NextRequest, NextResponse } from 'next/server';
// import { connectDB } from '@/lib/db';
// import { verifyToken } from '@/lib/auth';
// import Job from '@/models/Job';

// // GET - Récupérer les offres d'emploi
// export async function GET(request: NextRequest) {
//   try {
//     await connectDB();
    
//     const { searchParams } = new URL(request.url);
//     const contractType = searchParams.get('contract');
//     const search = searchParams.get('search');
    
//     let query: any = { isActive: true };
//     if (contractType) query.contractType = contractType;
//     if (search) {
//       query.$or = [
//         { title: { $regex: search, $options: 'i' } },
//         { companyName: { $regex: search, $options: 'i' } }
//       ];
//     }
    
//     const jobs = await Job.find(query)
//       .populate('companyId', 'name photo')
//       .sort({ isSponsored: -1, createdAt: -1 })
//       .limit(50);
    
//     return NextResponse.json(jobs);
//   } catch (error) {
//     console.error('GET /api/jobs error:', error);
//     return NextResponse.json([], { status: 200 });
//   }
// }

// // POST - Publier une offre d'emploi
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
    
//     const job = await Job.create({
//       ...data,
//       companyId: decoded.userId
//     });
    
//     return NextResponse.json(job, { status: 201 });
//   } catch (error) {
//     console.error('POST /api/jobs error:', error);
//     return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
//   }
// }












































export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import Job from '@/models/Job';

// GET - Récupérer les offres d'emploi
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const contractType = searchParams.get('contract');
    const search = searchParams.get('search');
    
    let query: any = { isActive: true };
    if (contractType) query.contractType = contractType;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } }
      ];
    }
    
    const jobs = await Job.find(query)
      .populate('companyId', 'name photo')
      .sort({ isSponsored: -1, createdAt: -1 })
      .limit(50);
    
    return NextResponse.json(jobs);
  } catch (error) {
    console.error('GET /api/jobs error:', error);
    return NextResponse.json([], { status: 200 });
  }
}

// POST - Publier une offre d'emploi
export async function POST(request: NextRequest) {
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
    
    const data = await request.json();
    
    const job = await Job.create({
      ...data,
      companyId: decoded.userId
    });
    
    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error('POST /api/jobs error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// 🆕 PUT - Modifier une offre d'emploi (propriétaire uniquement)
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
    
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID manquant' }, { status: 400 });
    }
    
    const job = await Job.findById(id);
    
    if (!job) {
      return NextResponse.json({ error: 'Offre non trouvée' }, { status: 404 });
    }
    
    // Vérifier que l'utilisateur est le propriétaire
    if (job.companyId.toString() !== decoded.userId) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }
    
    const data = await request.json();
    
    const updatedJob = await Job.findByIdAndUpdate(id, data, { new: true });
    
    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error('PUT /api/jobs error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// 🆕 DELETE - Supprimer une offre d'emploi (propriétaire uniquement)
export async function DELETE(request: NextRequest) {
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
    
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID manquant' }, { status: 400 });
    }
    
    const job = await Job.findById(id);
    
    if (!job) {
      return NextResponse.json({ error: 'Offre non trouvée' }, { status: 404 });
    }
    
    // Vérifier que l'utilisateur est le propriétaire
    if (job.companyId.toString() !== decoded.userId) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }
    
    await Job.findByIdAndDelete(id);
    
    return NextResponse.json({ success: true, message: 'Offre supprimée' });
  } catch (error) {
    console.error('DELETE /api/jobs error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
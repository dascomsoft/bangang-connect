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
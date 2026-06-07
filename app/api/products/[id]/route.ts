// export const dynamic = "force-dynamic";
// import { NextRequest, NextResponse } from 'next/server';
// import { connectDB } from '@/lib/db';
// import { verifyToken } from '@/lib/auth';
// import Product from '@/models/Product';
// import User from '@/models/User';
// import { cookies } from 'next/headers';

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     await connectDB();
    
//     const cookieStore = await cookies();
//     const token = cookieStore.get('token')?.value;
    
//     if (!token) {
//       return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
//     }
    
//     const decoded = verifyToken(token);
//     if (!decoded || typeof decoded === 'string') {
//       return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
//     }
    
//     // Vérifier que l'utilisateur est admin
//     const currentUser = await User.findById(decoded.userId);
//     if (currentUser?.role !== 'super_admin') {
//       return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
//     }
    
//     const { id } = await params;
//     const deleted = await Product.findByIdAndDelete(id);
    
//     if (!deleted) {
//       return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 });
//     }
    
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error('DELETE /api/products/[id] error:', error);
//     return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
//   }
// }















export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import Product from '@/models/Product';
import User from '@/models/User';
import { cookies } from 'next/headers';

// ✅ GET - Récupérer un produit par ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { id } = await params;
    
    const product = await Product.findById(id)
      .populate('sellerId', 'name photo phone whatsapp');
    
    if (!product) {
      return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 });
    }
    
    return NextResponse.json(product);
  } catch (error) {
    console.error('GET /api/products/[id] error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// ✅ PUT - Modifier un produit (propriétaire ou admin)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }
    
    const decoded = verifyToken(token);
    if (!decoded || typeof decoded === 'string') {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
    }
    
    const { id } = await params;
    const product = await Product.findById(id);
    
    if (!product) {
      return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 });
    }
    
    // Vérifier propriétaire ou admin
    const currentUser = await User.findById(decoded.userId);
    const isOwner = product.sellerId?.toString() === decoded.userId;
    
    if (!isOwner && currentUser?.role !== 'super_admin') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }
    
    const data = await request.json();
    
    // Empêcher la modification du sellerId
    delete data.sellerId;
    
    const updated = await Product.findByIdAndUpdate(id, data, { new: true });
    
    return NextResponse.json(updated);
  } catch (error) {
    console.error('PUT /api/products/[id] error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// ✅ DELETE - Supprimer un produit (propriétaire ou admin)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }
    
    const decoded = verifyToken(token);
    if (!decoded || typeof decoded === 'string') {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
    }
    
    const { id } = await params;
    const product = await Product.findById(id);
    
    if (!product) {
      return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 });
    }
    
    // Vérifier propriétaire ou admin
    const currentUser = await User.findById(decoded.userId);
    const isOwner = product.sellerId?.toString() === decoded.userId;
    
    if (!isOwner && currentUser?.role !== 'super_admin') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }
    
    await Product.findByIdAndDelete(id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/products/[id] error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
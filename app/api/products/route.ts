// export const dynamic = "force-dynamic";
// import { NextRequest, NextResponse } from 'next/server';
// import { connectDB } from '@/lib/db';
// import { verifyToken } from '@/lib/auth';
// import Product from '@/models/Product';

// // GET - Récupérer les produits
// export async function GET(request: NextRequest) {
//   try {
//     await connectDB();
    
//     const { searchParams } = new URL(request.url);
//     const category = searchParams.get('category');
//     const search = searchParams.get('search');
    
//     let query: any = { status: 'disponible' };
//     if (category) query.category = category;
//     if (search) {
//       query.$or = [
//         { title: { $regex: search, $options: 'i' } },
//         { description: { $regex: search, $options: 'i' } }
//       ];
//     }
    
//     const products = await Product.find(query)
//       .populate('sellerId', 'name photo phone')
//       .sort({ isSponsored: -1, createdAt: -1 })
//       .limit(50);
    
//     return NextResponse.json(products);
//   } catch (error) {
//     console.error('GET /api/products error:', error);
//     return NextResponse.json([], { status: 200 });
//   }
// }

// // POST - Publier un produit
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
    
//     const product = await Product.create({
//       ...data,
//       sellerId: decoded.userId
//     });
    
//     return NextResponse.json(product, { status: 201 });
//   } catch (error) {
//     console.error('POST /api/products error:', error);
//     return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
//   }
// }











export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import Product from '@/models/Product';

// GET - Récupérer les produits
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    let query: any = { status: 'disponible' };
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const products = await Product.find(query)
      .populate('sellerId', 'name photo phone')
      .sort({ isSponsored: -1, createdAt: -1 })
      .limit(50);
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('GET /api/products error:', error);
    return NextResponse.json([], { status: 200 });
  }
}

// POST - Publier un produit
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
    
    const product = await Product.create({
      ...data,
      sellerId: decoded.userId
    });
    
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('POST /api/products error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// 🆕 PUT - Modifier un produit (propriétaire uniquement)
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
    
    const product = await Product.findById(id);
    
    if (!product) {
      return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 });
    }
    
    // Vérifier que l'utilisateur est le propriétaire
    if (product.sellerId.toString() !== decoded.userId) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }
    
    const data = await request.json();
    
    const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });
    
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('PUT /api/products error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// 🆕 DELETE - Supprimer un produit (propriétaire uniquement)
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
    
    const product = await Product.findById(id);
    
    if (!product) {
      return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 });
    }
    
    // Vérifier que l'utilisateur est le propriétaire
    if (product.sellerId.toString() !== decoded.userId) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }
    
    await Product.findByIdAndDelete(id);
    
    return NextResponse.json({ success: true, message: 'Produit supprimé' });
  } catch (error) {
    console.error('DELETE /api/products error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
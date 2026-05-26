import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get('ids');
    
    console.log('📡 API batch appelée avec ids:', ids);
    
    if (!ids) {
      console.log('❌ Aucun ID fourni');
      return NextResponse.json([]);
    }
    
    const idsArray = ids.split(',');
    console.log(`🔍 ${idsArray.length} IDs reçus:`, idsArray);
    
    const validIds = idsArray.filter(id => mongoose.Types.ObjectId.isValid(id));
    console.log(`✅ ${validIds.length} IDs valides:`, validIds);
    
    if (validIds.length === 0) {
      console.log('❌ Aucun ID valide');
      return NextResponse.json([]);
    }
    
    const users = await User.find({ 
      _id: { $in: validIds } 
    }).select('name email phone photo');
    
    console.log(`✅ ${users.length} utilisateurs trouvés:`, users.map(u => ({ id: u._id, name: u.name })));
    
    return NextResponse.json(users);
  } catch (error) {
    console.error('❌ Erreur dans batch users:', error);
    return NextResponse.json([]);
  }
}
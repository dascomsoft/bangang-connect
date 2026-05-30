const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

async function fix() {
  try {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI non définie');
    }
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connecté');
    
    const db = mongoose.connection.db;
    const tempHash = await bcrypt.hash('ChangeMe123!', 10);

    const result = await db.collection('users').updateMany(
      {},
      { $set: { password: tempHash } }
    );

    console.log(`✅ ${result.modifiedCount} utilisateurs réinitialisés`);
    console.log('📋 Mot de passe temporaire : ChangeMe123!');
    console.log('🔐 Les utilisateurs devront changer leur mot de passe dans "Mon profil"');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

fix();
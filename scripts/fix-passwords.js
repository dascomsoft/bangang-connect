// Lance avec : node scripts/fix-passwords.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

async function fix() {
  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI manquant dans .env.local');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Connecté à MongoDB');

  const db = mongoose.connection.db;
  const users = await db.collection('users').find({}).toArray();
  console.log(`📋 ${users.length} utilisateurs trouvés`);

  // Hash propre généré une seule fois — bypass hook pre('save')
  const tempHash = await bcrypt.hash('ChangeMe123!', 10);

  const result = await db.collection('users').updateMany(
    {},
    { $set: { password: tempHash } }
  );

  console.log(`✅ ${result.modifiedCount} mots de passe réinitialisés`);
  console.log('');
  console.log('🔑 Mot de passe temporaire pour tous : ChangeMe123!');
  console.log('📢 Communique ce mot de passe à tes présidents existants');
  console.log('📢 Ils devront le changer après leur première connexion');

  await mongoose.disconnect();
  process.exit(0);
}

fix().catch((err) => {
  console.error('❌ Erreur:', err);
  process.exit(1);
});
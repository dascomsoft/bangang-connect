const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

async function createPresident() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB');
    
    const sector = await mongoose.connection.collection('sectors').findOne({ presidentPhone: '620292839' });
    
    if (!sector) {
      console.log('❌ Secteur non trouvé pour le téléphone 620292839');
      process.exit(1);
    }
    
    console.log('📋 Secteur trouvé:', sector.name);
    console.log('   Président:', sector.presidentName);
    
    const existingUser = await mongoose.connection.collection('users').findOne({ phone: '+237620292839' });
    
    if (existingUser) {
      console.log('⚠️ Utilisateur existe déjà, mise à jour...');
      await mongoose.connection.collection('users').updateOne(
        { phone: '+237620292839' },
        { $set: { role: 'sector_president', sectorId: sector._id, name: sector.presidentName } }
      );
      console.log('✅ Utilisateur mis à jour en président');
    } else {
      const hashedPassword = await bcrypt.hash('secteur123', 10);
      const user = {
        name: sector.presidentName,
        phone: '+237620292839',
        email: 'momopaul@bangang.com',
        password: hashedPassword,
        role: 'sector_president',
        sectorId: sector._id,
        communityId: sector.communityId,
        strikes: 0,
        isRestricted: false,
        photo: '/default-avatar.png',
        createdAt: new Date()
      };
      await mongoose.connection.collection('users').insertOne(user);
      console.log('✅ Nouveau compte président créé');
    }
    
    console.log('');
    console.log('🔑 IDENTIFIANTS DE CONNEXION:');
    console.log('   Téléphone: 620292839');
    console.log('   Mot de passe: secteur123');
    console.log('   Secteur:', sector.name);
    
    process.exit(0);
  } catch (error) {
    console.error('Erreur:', error);
    process.exit(1);
  }
}

createPresident();

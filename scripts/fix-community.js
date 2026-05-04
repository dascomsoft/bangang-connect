const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function fix() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  // Trouver la communauté
  const community = await mongoose.connection.collection('communities').findOne({ 
    name: { $regex: 'yaounde', $options: 'i' } 
  });
  
  if (community) {
    console.log('Communauté trouvée:', community.name);
    
    // Mettre à jour avec la bonne région
    await mongoose.connection.collection('communities').updateOne(
      { _id: community._id },
      { 
        $set: { 
          region: 'Centre', 
          city: 'Yaoundé',
          country: 'Cameroun',
          type: 'city'
        } 
      }
    );
    console.log('✅ Mise à jour effectuée: région = Centre, ville = Yaoundé');
  } else {
    console.log('❌ Communauté non trouvée');
  }
  
  // Vérifier le résultat
  const updated = await mongoose.connection.collection('communities').findOne({ 
    name: { $regex: 'yaounde', $options: 'i' } 
  });
  console.log('\n📋 Après mise à jour:');
  console.log(`   Nom: ${updated.name}`);
  console.log(`   Ville: ${updated.city}`);
  console.log(`   Région: ${updated.region}`);
  console.log(`   Type: ${updated.type}`);
  
  process.exit(0);
}

fix().catch(console.error);

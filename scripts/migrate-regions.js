const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function migrateRegions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB');
    
    const cityToRegion = {
      'Yaoundé': 'Centre',
      'Douala': 'Littoral',
      'Bafoussam': 'Ouest',
      'Bamenda': 'Nord-Ouest',
      'Buéa': 'Sud-Ouest',
      'Ngaoundéré': 'Adamaoua',
      'Bertoua': 'Est',
      'Garoua': 'Nord',
      'Maroua': 'Extrême-Nord',
      'Ebolowa': 'Sud'
    };
    
    const communities = await mongoose.connection.collection('communities').find({ type: 'city' }).toArray();
    console.log('📊 Communautés trouvées:', communities.length);
    
    if (communities.length === 0) {
      console.log('⚠️ Aucune communauté de type "city" trouvée');
      process.exit(0);
    }
    
    for (const community of communities) {
      let region = null;
      
      if (community.region) {
        console.log(`✅ Déjà OK: ${community.name} → ${community.region}`);
        continue;
      }
      
      // Déduire la région par la ville
      if (community.city && cityToRegion[community.city]) {
        region = cityToRegion[community.city];
      } 
      // Déduire la région par le nom
      else {
        for (const [city, r] of Object.entries(cityToRegion)) {
          if (community.name && community.name.includes(city)) {
            region = r;
            break;
          }
        }
      }
      
      if (region) {
        await mongoose.connection.collection('communities').updateOne(
          { _id: community._id },
          { $set: { region: region, city: community.city || Object.keys(cityToRegion).find(key => community.name.includes(key)) || 'Yaoundé' } }
        );
        console.log(`✅ Mis à jour: ${community.name} → ${region}`);
      } else {
        console.log(`⚠️ Non classée: ${community.name || 'Nom inconnu'}`);
      }
    }
    
    console.log('🎉 Migration terminée !');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
}

migrateRegions();

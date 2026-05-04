import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Sector from '@/models/Sector';
import Community from '@/models/Community';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Récupérer toutes les communautés
    const communities = await Community.find().sort({ type: -1, name: 1 });
    
    // Récupérer tous les secteurs actifs
    const sectors = await Sector.find({ status: 'active' })
      .populate('presidentId', 'name')
      .lean();
    
    // Structurer les données par type
    const cameroonCities = communities.filter(c => c.type === 'city');
    const diasporaCountries = communities.filter(c => c.type === 'country');
    
    // Organiser les secteurs par communauté
    const sectorsByCommunity: Record<string, any[]> = {};
    sectors.forEach(sector => {
      const communityId = sector.communityId.toString();
      if (!sectorsByCommunity[communityId]) {
        sectorsByCommunity[communityId] = [];
      }
      sectorsByCommunity[communityId].push({
        id: sector._id,
        name: sector.name,
        description: sector.description,
        membersCount: sector.membersCount,
        presidentName: sector.presidentName
      });
    });
    
    // Construire la réponse structurée
    const structuredData = {
      cameroon: {
        type: 'country',
        name: 'Cameroun',
        cities: cameroonCities.map(city => ({
          id: city._id,
          name: city.name,
          sectors: sectorsByCommunity[city._id.toString()] || []
        }))
      },
      diaspora: {
        type: 'diaspora',
        countries: diasporaCountries.map(country => ({
          id: country._id,
          name: country.name,
          sectors: sectorsByCommunity[country._id.toString()] || []
        }))
      }
    };
    
    return NextResponse.json(structuredData);
  } catch (error) {
    console.error('Error fetching structured sectors:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
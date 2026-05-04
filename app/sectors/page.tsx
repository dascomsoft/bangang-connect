'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface StructuredSector {
  cameroon: {
    name: string;
    cities: {
      id: string;
      name: string;
      sectors: {
        id: string;
        name: string;
        description: string;
        membersCount: number;
        presidentName: string;
      }[];
    }[];
  };
  diaspora: {
    name: string;
    countries: {
      id: string;
      name: string;
      sectors: {
        id: string;
        name: string;
        description: string;
        membersCount: number;
        presidentName: string;
      }[];
    }[];
  };
}

export default function SectorsPage() {
  const router = useRouter();
  const [data, setData] = useState<StructuredSector | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const response = await fetch('/api/sectors/structured');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching sectors:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleJoinSector = async (sectorId: string) => {
    const response = await fetch('/api/sectors/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sectorId })
    });
    
    if (response.ok) {
      alert('✅ Demande envoyée au président du secteur !');
    } else {
      const error = await response.json();
      alert(error.error || '❌ Erreur lors de la demande');
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">🏘️ Nos Secteurs</h1>
        <p className="text-blue-100">
          Rejoignez le secteur de votre ville ou pays pour participer aux activités
        </p>
      </div>
      
      {/* Cameroun Section */}
      {data?.cameroon && data.cameroon.cities.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">🇨🇲</div>
            <h2 className="text-2xl font-bold text-gray-800">Cameroun</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {data.cameroon.cities.map((city) => (
              <Card key={city.id} className="overflow-hidden">
                <div 
                  className="p-4 bg-gradient-to-r from-green-50 to-blue-50 cursor-pointer flex justify-between items-center"
                  onClick={() => setExpandedItem(expandedItem === city.id ? null : city.id)}
                >
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">📍 {city.name}</h3>
                    <p className="text-gray-600 text-sm">{city.sectors.length} secteur(s)</p>
                  </div>
                  <span className="text-2xl">{expandedItem === city.id ? '▲' : '▼'}</span>
                </div>
                
                {expandedItem === city.id && (
                  <div className="p-4 space-y-3">
                    {city.sectors.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">Aucun secteur pour le moment</p>
                    ) : (
                      city.sectors.map((sector) => (
                        <div key={sector.id} className="border rounded-lg p-4 hover:shadow-md transition">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-lg">{sector.name}</h4>
                              {sector.description && (
                                <p className="text-gray-600 text-sm mt-1">{sector.description}</p>
                              )}
                              <div className="flex space-x-4 mt-2 text-sm text-gray-500">
                                <span>👥 {sector.membersCount} membres</span>
                                <span>👑 Président: {sector.presidentName}</span>
                              </div>
                            </div>
                            <Button size="sm" onClick={() => handleJoinSector(sector.id)}>
                              Rejoindre
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {/* Diaspora Section */}
      {data?.diaspora && data.diaspora.countries.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-3 mt-8">
            <div className="text-3xl">🌍</div>
            <h2 className="text-2xl font-bold text-gray-800">Diaspora</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {data.diaspora.countries.map((country) => (
              <Card key={country.id} className="overflow-hidden">
                <div 
                  className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 cursor-pointer flex justify-between items-center"
                  onClick={() => setExpandedItem(expandedItem === country.id ? null : country.id)}
                >
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">🌍 {country.name}</h3>
                    <p className="text-gray-600 text-sm">{country.sectors.length} communauté(s)</p>
                  </div>
                  <span className="text-2xl">{expandedItem === country.id ? '▲' : '▼'}</span>
                </div>
                
                {expandedItem === country.id && (
                  <div className="p-4 space-y-3">
                    {country.sectors.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">Aucune communauté pour le moment</p>
                    ) : (
                      country.sectors.map((sector) => (
                        <div key={sector.id} className="border rounded-lg p-4 hover:shadow-md transition">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-lg">{sector.name}</h4>
                              {sector.description && (
                                <p className="text-gray-600 text-sm mt-1">{sector.description}</p>
                              )}
                              <div className="flex space-x-4 mt-2 text-sm text-gray-500">
                                <span>👥 {sector.membersCount} membres</span>
                                <span>👑 Responsable: {sector.presidentName}</span>
                              </div>
                            </div>
                            <Button size="sm" onClick={() => handleJoinSector(sector.id)}>
                              Rejoindre
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
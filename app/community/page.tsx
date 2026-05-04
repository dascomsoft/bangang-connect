'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { toast } from 'react-hot-toast';

interface Community {
  _id: string;
  name: string;
  type: 'city' | 'country';
  country: string;
  city?: string;
  region?: string;
  description?: string;
  membersCount?: number;
  chiefId?: {
    _id: string;
    name: string;
  };
  createdAt: string;
}

interface Sector {
  _id: string;
  name: string;
  description?: string;
  membersCount: number;
  presidentName: string;
}

export default function CommunityPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null);
  
  // Structure des 10 régions du Cameroun
  const cameroonRegions = [
    { name: 'Centre', capital: 'Yaoundé', communities: [] },
    { name: 'Littoral', capital: 'Douala', communities: [] },
    { name: 'Ouest', capital: 'Bafoussam', communities: [] },
    { name: 'Nord-Ouest', capital: 'Bamenda', communities: [] },
    { name: 'Sud-Ouest', capital: 'Buéa', communities: [] },
    { name: 'Adamaoua', capital: 'Ngaoundéré', communities: [] },
    { name: 'Est', capital: 'Bertoua', communities: [] },
    { name: 'Nord', capital: 'Garoua', communities: [] },
    { name: 'Extrême-Nord', capital: 'Maroua', communities: [] },
    { name: 'Sud', capital: 'Ebolowa', communities: [] }
  ];
  
  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = async () => {
    setLoading(true);
    try {
      // Charger l'utilisateur
      const userRes = await fetch('/api/auth/me');
      if (!userRes.ok) {
        router.push('/login');
        return;
      }
      const userData = await userRes.json();
      setUser(userData.user);
      
      // Charger toutes les communautés
      const communitiesRes = await fetch('/api/communities');
      const communitiesData = await communitiesRes.json();
      setCommunities(Array.isArray(communitiesData) ? communitiesData : []);
      
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };
  
  const loadSectors = async (communityId: string) => {
    try {
      const response = await fetch(`/api/sectors?communityId=${communityId}`);
      const data = await response.json();
      setSectors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading sectors:', error);
      setSectors([]);
    }
  };
  
  const handleCommunityClick = async (community: Community) => {
    setSelectedCommunity(community);
    await loadSectors(community._id);
  };
  
  const handleJoinCommunity = async (communityId: string) => {
    try {
      const response = await fetch('/api/communities/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ communityId })
      });
      
      if (response.ok) {
        toast.success('✅ Demande envoyée à la communauté');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Erreur lors de la demande');
      }
    } catch (error) {
      console.error('Error joining community:', error);
      toast.error('Erreur serveur');
    }
  };
  
  // Organiser les communautés par région pour le Cameroun
  const getCommunitiesByRegion = () => {
    const cameroonCommunities = communities.filter(c => c.type === 'city');
    
    return cameroonRegions.map(region => ({
      ...region,
      communities: cameroonCommunities.filter(c => 
        c.city === region.capital || c.name.includes(region.capital)
      )
    }));
  };
  
  const diasporaCommunities = communities.filter(c => c.type === 'country');
  
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
        <h1 className="text-3xl font-bold mb-2">🌍 Communautés Bangang</h1>
        <p className="text-blue-100">
          Découvrez et rejoignez les communautés Bangang à travers le Cameroun et le monde
        </p>
      </div>
      
      {/* Statistiques */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <div className="text-3xl mb-2">🇨🇲</div>
          <div className="text-2xl font-bold">{communities.filter(c => c.type === 'city').length}</div>
          <div className="text-gray-600">Communautés au Cameroun</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl mb-2">🌍</div>
          <div className="text-2xl font-bold">{communities.filter(c => c.type === 'country').length}</div>
          <div className="text-gray-600">Communautés dans le monde</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl mb-2">👥</div>
          <div className="text-2xl font-bold">-</div>
          <div className="text-gray-600">Membres actifs</div>
        </Card>
      </div>
      
      {/* Section Cameroun - 10 Régions */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">🇨🇲</div>
          <h2 className="text-2xl font-bold text-gray-800">Communautés du Cameroun</h2>
        </div>
        <p className="text-gray-600 mb-4">
          Les 10 régions du Cameroun et leurs communautés Bangang
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          {getCommunitiesByRegion().map((region) => (
            <Card key={region.name} className="overflow-hidden">
              <div 
                className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 cursor-pointer flex justify-between items-center"
                onClick={() => setExpandedRegion(expandedRegion === region.name ? null : region.name)}
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    📍 {region.name}
                  </h3>
                  <p className="text-sm text-gray-600">Chef-lieu: {region.capital}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                    {region.communities.length} communauté(s)
                  </span>
                  <span className="text-2xl">{expandedRegion === region.name ? '▲' : '▼'}</span>
                </div>
              </div>
              
              {expandedRegion === region.name && (
                <div className="p-4 space-y-3">
                  {region.communities.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">
                      Aucune communauté enregistrée dans {region.name}
                    </p>
                  ) : (
                    region.communities.map((comm) => (
                      <div
                        key={comm._id}
                        className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                        onClick={() => handleCommunityClick(comm)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-lg">{comm.name}</h4>
                            <p className="text-sm text-gray-600">
                              📍 {comm.city}, {comm.country}
                            </p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleJoinCommunity(comm._id);
                              }}
                            >
                              Rejoindre
                            </Button>
                            <Button 
                              size="sm" 
                              variant="secondary"
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/community-chat/${comm._id}`);
                              }}
                            >
                              💬 Chat communautaire
                            </Button>
                          </div>
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
      
      {/* Section Diaspora */}
      <div className="space-y-4 mt-8">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">🌍</div>
          <h2 className="text-2xl font-bold text-gray-800">Communautés de la Diaspora</h2>
        </div>
        <p className="text-gray-600 mb-4">
          Les communautés Bangang à travers le monde
        </p>
        
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          {diasporaCommunities.map((comm) => (
            <Card key={comm._id} className="p-4 hover:shadow-lg transition cursor-pointer">
              <div onClick={() => handleCommunityClick(comm)}>
                <div className="text-4xl mb-3">🌍</div>
                <h3 className="font-bold text-lg">{comm.name}</h3>
                <p className="text-sm text-gray-600">{comm.country}</p>
                {comm.city && (
                  <p className="text-xs text-gray-500 mt-1">📍 {comm.city}</p>
                )}
                <div className="flex flex-col gap-2 mt-3">
                  <Button 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleJoinCommunity(comm._id);
                    }}
                  >
                    Rejoindre
                  </Button>
                  <Button 
                    size="sm" 
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/community-chat/${comm._id}`);
                    }}
                  >
                    💬 Chat communautaire
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Modal Détails Communauté */}
      {selectedCommunity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{selectedCommunity.name}</h2>
              <button
                onClick={() => setSelectedCommunity(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <span>📍</span>
                <span>{selectedCommunity.country}</span>
                {selectedCommunity.city && <span>• {selectedCommunity.city}</span>}
              </div>
              
              {/* Secteurs - seulement pour les communautés du Cameroun */}
              {selectedCommunity.type === 'city' && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-3">🏘️ Secteurs</h3>
                  {sectors.length === 0 ? (
                    <p className="text-gray-500">Aucun secteur pour le moment</p>
                  ) : (
                    <div className="space-y-2">
                      {sectors.map((sector) => (
                        <div key={sector._id} className="border rounded-lg p-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-semibold">{sector.name}</p>
                              <p className="text-sm text-gray-600">
                                👥 {sector.membersCount} membres
                              </p>
                            </div>
                            <Button size="sm">Rejoindre</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {/* Pour la diaspora */}
              {selectedCommunity.type === 'country' && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-blue-700">
                    🌍 Cette communauté vous permet de :
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-gray-700">
                    <li>Participer aux événements de la diaspora</li>
                    <li>Recevoir les annonces importantes</li>
                    <li>Discuter avec les membres</li>
                    <li>Être informé des actualités</li>
                  </ul>
                </div>
              )}
              
              <div className="flex space-x-3 pt-4">
                <Button 
                  className="flex-1"
                  onClick={() => handleJoinCommunity(selectedCommunity._id)}
                >
                  Rejoindre cette communauté
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => setSelectedCommunity(null)}
                >
                  Fermer
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import ChatBox from '@/components/ChatBox';

interface Sector {
  _id: string;
  name: string;
  description?: string;
  communityId: {
    _id: string;
    name: string;
    type: string;
  };
}

interface User {
  _id: string;
  name: string;
  role: string;
  sectorId?: {
    _id: string;
    name: string;
  };
}

export default function ChatPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [selectedSector, setSelectedSector] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [loadingSectors, setLoadingSectors] = useState(false);
  const [error, setError] = useState<string>('');
  
  // Chargement de l'utilisateur
  useEffect(() => {
    loadUser();
  }, []);
  
  // Chargement des secteurs une fois l'utilisateur chargé
  useEffect(() => {
    if (user) {
      loadSectors();
    }
  }, [user]);
  
  const loadUser = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (!response.ok) {
        router.push('/login');
        return;
      }
      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error('Error loading user:', error);
      setError('Erreur de chargement utilisateur');
      setLoading(false);
    }
  };
  
  const loadSectors = async () => {
    setLoadingSectors(true);
    setError('');
    
    try {
      const response = await fetch('/api/sectors');
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      const sectorsList = Array.isArray(data) ? data : [];
      setSectors(sectorsList);
      
      // Logique de sélection intelligente
      if (sectorsList.length > 0) {
        // Priorité: secteur de l'utilisateur
        if (user?.sectorId?._id) {
          const userSector = sectorsList.find(s => s._id === user.sectorId?._id);
          if (userSector) {
            setSelectedSector(userSector._id);
          } else {
            setSelectedSector(sectorsList[0]._id);
          }
        } else {
          setSelectedSector(sectorsList[0]._id);
        }
      }
    } catch (error) {
      console.error('Error loading sectors:', error);
      setError('Impossible de charger les secteurs');
    } finally {
      setLoadingSectors(false);
      setLoading(false);
    }
  };
  
  // État de chargement principal
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }
  
  // Erreur
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-red-700 mb-2">Erreur</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }
  
  // Pas de secteurs
  if (sectors.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
          <div className="text-5xl mb-4">💬</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Aucun secteur disponible
          </h2>
          <p className="text-gray-600">
            Il n'y a pas encore de secteurs pour discuter.
            {user?.role === 'super_admin' && (
              <span> Veuillez créer des secteurs dans l'administration.</span>
            )}
          </p>
          {user?.role === 'super_admin' && (
            <button
              onClick={() => router.push('/dashboard/admin')}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Aller à l'administration
            </button>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 mb-8 text-white">
        <h1 className="text-2xl font-bold mb-2">💬 Chat par Secteur</h1>
        <p className="text-blue-100">
          Discutez avec les membres de votre secteur en temps réel
        </p>
      </div>
      
      {/* Sélecteur de secteur */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          📍 Choisir un secteur
        </label>
        <select
          value={selectedSector}
          onChange={(e) => setSelectedSector(e.target.value)}
          className="w-full md:w-80 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loadingSectors}
        >
          {sectors.map((sector) => (
            <option key={sector._id} value={sector._id}>
              {sector.name} {user?.sectorId?._id === sector._id && '(Votre secteur)'}
            </option>
          ))}
        </select>
        {user?.sectorId && (
          <p className="text-xs text-green-600 mt-2">
            ✅ Vous êtes membre du secteur "{user.sectorId.name}"
          </p>
        )}
      </div>
      
      {/* Chat Box */}
      {selectedSector && user && (
        <ChatBox sectorId={selectedSector} userId={user._id} />
      )}
    </div>
  );
}
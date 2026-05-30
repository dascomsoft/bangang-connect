// 'use client';

// import { useEffect, useState, useCallback } from 'react';
// import { useRouter } from 'next/navigation';
// import ChatBox from '@/components/ChatBox';

// interface Sector {
//   _id: string;
//   name: string;
//   description?: string;
//   communityId: {
//     _id: string;
//     name: string;
//     type: string;
//   };
// }

// interface User {
//   _id: string;
//   name: string;
//   role: string;
//   sectorId?: {
//     _id: string;
//     name: string;
//   };
// }

// export default function ChatPage() {
//   const router = useRouter();
//   const [user, setUser] = useState<User | null>(null);
//   const [sectors, setSectors] = useState<Sector[]>([]);
//   const [selectedSector, setSelectedSector] = useState<string>('');
//   const [loading, setLoading] = useState(true);
//   const [loadingSectors, setLoadingSectors] = useState(false);
//   const [error, setError] = useState<string>('');
  
//   // Chargement de l'utilisateur
//   useEffect(() => {
//     loadUser();
//   }, []);
  
//   // Chargement des secteurs une fois l'utilisateur chargé
//   useEffect(() => {
//     if (user) {
//       loadSectors();
//     }
//   }, [user]);
  
//   const loadUser = async () => {
//     try {
//       const response = await fetch('/api/auth/me');
//       if (!response.ok) {
//         router.push('/login');
//         return;
//       }
//       const data = await response.json();
//       setUser(data.user);
//     } catch (error) {
//       console.error('Error loading user:', error);
//       setError('Erreur de chargement utilisateur');
//       setLoading(false);
//     }
//   };
  
//   const loadSectors = async () => {
//     setLoadingSectors(true);
//     setError('');
    
//     try {
//       const response = await fetch('/api/sectors');
      
//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}`);
//       }
      
//       const data = await response.json();
//       const sectorsList = Array.isArray(data) ? data : [];
//       setSectors(sectorsList);
      
//       // Logique de sélection intelligente
//       if (sectorsList.length > 0) {
//         // Priorité: secteur de l'utilisateur
//         if (user?.sectorId?._id) {
//           const userSector = sectorsList.find(s => s._id === user.sectorId?._id);
//           if (userSector) {
//             setSelectedSector(userSector._id);
//           } else {
//             setSelectedSector(sectorsList[0]._id);
//           }
//         } else {
//           setSelectedSector(sectorsList[0]._id);
//         }
//       }
//     } catch (error) {
//       console.error('Error loading sectors:', error);
//       setError('Impossible de charger les secteurs');
//     } finally {
//       setLoadingSectors(false);
//       setLoading(false);
//     }
//   };
  
//   // État de chargement principal
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[60vh]">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
//           <p className="text-gray-600">Chargement...</p>
//         </div>
//       </div>
//     );
//   }
  
//   // Erreur
//   if (error) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
//           <div className="text-4xl mb-4">⚠️</div>
//           <h2 className="text-xl font-semibold text-red-700 mb-2">Erreur</h2>
//           <p className="text-red-600 mb-4">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Réessayer
//           </button>
//         </div>
//       </div>
//     );
//   }
  
//   // Pas de secteurs
//   if (sectors.length === 0) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
//           <div className="text-5xl mb-4">💬</div>
//           <h2 className="text-xl font-semibold text-gray-900 mb-2">
//             Aucun secteur disponible
//           </h2>
//           <p className="text-gray-600">
//             Il n'y a pas encore de secteurs pour discuter.
//             {user?.role === 'super_admin' && (
//               <span> Veuillez créer des secteurs dans l'administration.</span>
//             )}
//           </p>
//           {user?.role === 'super_admin' && (
//             <button
//               onClick={() => router.push('/dashboard/admin')}
//               className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//             >
//               Aller à l'administration
//             </button>
//           )}
//         </div>
//       </div>
//     );
//   }
  
//   return (

//     <div className='pt-30'>
//     <div className="container mx-auto px-4 py-8">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 mb-8 text-white">
//         <h1 className="text-2xl font-bold mb-2">💬 Chat par Secteur</h1>
//         <p className="text-blue-100">
//           Discutez avec les membres de votre secteur en temps réel
//         </p>
//       </div>
      
//       {/* Sélecteur de secteur */}
//       <div className="bg-white rounded-lg shadow-md p-4 mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           📍 Choisir un secteur
//         </label>
//         <select
//           value={selectedSector}
//           onChange={(e) => setSelectedSector(e.target.value)}
//           className="w-full md:w-80 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           disabled={loadingSectors}
//         >
//           {sectors.map((sector) => (
//             <option key={sector._id} value={sector._id}>
//               {sector.name} {user?.sectorId?._id === sector._id && '(Votre secteur)'}
//             </option>
//           ))}
//         </select>
//         {user?.sectorId && (
//           <p className="text-xs text-green-600 mt-2">
//             ✅ Vous êtes membre du secteur "{user.sectorId.name}"
//           </p>
//         )}
//       </div>
      
//       {/* Chat Box */}
//       {selectedSector && user && (
//         <ChatBox sectorId={selectedSector} userId={user._id} />
//       )}
//     </div>
//     </div>
//   );
// }





































'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import ChatBox from '@/components/ChatBox';
import { toast } from 'react-hot-toast';

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
      
      // 🔥 FILTRAGE : Les membres ne voient que leur secteur
      let filteredSectors = sectorsList;
      
      if (user?.role === 'member') {
        // Un membre ne voit que son secteur
        if (user.sectorId?._id) {
          filteredSectors = sectorsList.filter(s => s._id === user.sectorId?._id);
        } else {
          filteredSectors = [];
        }
      }
      // Les admins et présidents voient tous les secteurs
      
      setSectors(filteredSectors);
      
      // Sélection intelligente
      if (filteredSectors.length > 0) {
        if (user?.sectorId?._id) {
          // Priorité au secteur de l'utilisateur
          const userSector = filteredSectors.find(s => s._id === user.sectorId?._id);
          if (userSector) {
            setSelectedSector(userSector._id);
          } else {
            setSelectedSector(filteredSectors[0]._id);
          }
        } else {
          setSelectedSector(filteredSectors[0]._id);
        }
      }
      
      // 🔥 Message pour les membres sans secteur
      if (user?.role === 'member' && !user.sectorId?._id) {
        toast.error('Vous n\'êtes affilié à aucun secteur. Contactez votre chef de village.');
      }
      
    } catch (error) {
      console.error('Error loading sectors:', error);
      setError('Impossible de charger les secteurs');
    } finally {
      setLoadingSectors(false);
      setLoading(false);
    }
  };
  
  // 🔥 Vérifier si l'utilisateur peut accéder au secteur sélectionné
  const canAccessSector = (sectorId: string): boolean => {
    if (!user) return false;
    
    // Admin a accès à tout
    if (user.role === 'super_admin') return true;
    
    // Président de secteur a accès à son secteur
    if (user.role === 'sector_president') {
      return user.sectorId?._id === sectorId;
    }
    
    // Membre n'a accès qu'à son secteur
    if (user.role === 'member') {
      return user.sectorId?._id === sectorId;
    }
    
    return false;
  };
  
  // Gestionnaire de changement de secteur
  const handleSectorChange = (sectorId: string) => {
    if (!canAccessSector(sectorId)) {
      toast.error('Vous n\'avez pas accès à ce secteur');
      return;
    }
    setSelectedSector(sectorId);
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
            {user?.role === 'member' && !user?.sectorId?._id 
              ? 'Vous n\'êtes pas affilié à un secteur'
              : 'Aucun secteur disponible'}
          </h2>
          <p className="text-gray-600">
            {user?.role === 'member' && !user?.sectorId?._id 
              ? 'Pour accéder au chat, vous devez d\'abord être assigné à un secteur par le president de ce secteur.'
              : 'Il n\'y a pas encore de secteurs pour discuter.'}
          </p>
          {user?.role === 'super_admin' && (
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Aller à l'administration
            </button>
          )}
        </div>
      </div>
    );
  }
  
  // 🔥 Si l'utilisateur est membre et essaie de voir un autre secteur
  const currentSector = sectors.find(s => s._id === selectedSector);
  const hasAccess = currentSector && canAccessSector(currentSector._id);
  
  if (!hasAccess && selectedSector) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <div className="text-5xl mb-4">⛔</div>
          <h2 className="text-xl font-semibold text-red-700 mb-2">Accès interdit</h2>
          <p className="text-gray-600">
            Vous n'avez pas accès à ce chat de secteur.
            {user?.role === 'member' && ' Vous ne pouvez chatter que dans votre propre secteur.'}
          </p>
          <button
            onClick={() => router.push('/chat')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className='pt-30'>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 mb-8 text-white">
          <h1 className="text-2xl font-bold mb-2">💬 Chat</h1>
          <p className="text-blue-100">
            {user?.role === 'member' 
              ? 'Discutez avec les membres de votre secteur'
              : 'Gérez les discussions des secteurs'}
          </p>
        </div>
        
        {/* Sélecteur de secteur - caché pour les membres (un seul secteur) */}
        {(user?.role === 'super_admin' || user?.role === 'sector_president') && sectors.length > 1 && (
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📍 Choisir un secteur
            </label>
            <select
              value={selectedSector}
              onChange={(e) => handleSectorChange(e.target.value)}
              className="w-full md:w-80 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loadingSectors}
            >
              {sectors.map((sector) => (
                <option key={sector._id} value={sector._id}>
                  {sector.name} {user?.sectorId?._id === sector._id && '(Votre secteur)'}
                </option>
              ))}
            </select>
          </div>
        )}
        
        {/* Pour les membres, afficher le secteur directement */}
        {user?.role === 'member' && user?.sectorId && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800">
              ✅ Vous discutez dans le secteur : <strong>{user.sectorId.name}</strong>
            </p>
          </div>
        )}
        
        {/* Chat Box */}
        {selectedSector && user && hasAccess && (
          <ChatBox sectorId={selectedSector} userId={user._id} />
        )}
      </div>
    </div>
  );
}
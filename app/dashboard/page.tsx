// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function DashboardPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
  
//   useEffect(() => {
//     checkUserRole();
//   }, []);
  
//   const checkUserRole = async () => {
//     try {
//       const response = await fetch('/api/auth/me');
//       if (!response.ok) {
//         router.push('/login');
//         return;
//       }
      
//       const data = await response.json();
//       const user = data.user;
      
//       // Rediriger selon le rôle
//       switch (user.role) {
//         case 'super_admin':
//           router.push('/dashboard/admin');
//           break;
//         case 'village_chief':
//           router.push('/dashboard/village');
//           break;
//         case 'community_chief':
//           router.push('/dashboard/community');
//           break;
//         case 'sector_president':
//           router.push('/dashboard/president');
//           break;
//         default:
//           // Membre normal - reste sur le dashboard membre
//           setLoading(false);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       router.push('/login');
//     }
//   };
  
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
//           <p className="text-gray-600">Redirection...</p>
//         </div>
//       </div>
//     );
//   }
  
//   // Dashboard pour les membres standards
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Dashboard Membre</h1>
//       <p>Bienvenue sur votre espace membre</p>
//     </div>
//   );
// }


















































































'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface User {
  _id: string;
  name: string;
  phone: string;
  email: string;
  photo: string;
  role: string;
  communityId?: { _id: string; name: string };
  sectorId?: { _id: string; name: string };
}

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  is_boosted: boolean;
  participants: string[];
}

interface Ad {
  _id: string;
  title: string;
  content: string;
  is_sponsored: boolean;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = async () => {
    try {
      const [userRes, eventsRes, adsRes] = await Promise.all([
        fetch('/api/auth/me'),
        fetch('/api/events'),
        fetch('/api/ads')
      ]);
      
      if (!userRes.ok) {
        router.push('/login');
        return;
      }
      
      const userData = await userRes.json();
      const eventsData = await eventsRes.json();
      const adsData = await adsRes.json();
      
      setUser(userData.user);
      setEvents(Array.isArray(eventsData) ? eventsData : []);
      setAds(Array.isArray(adsData) ? adsData : []);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleParticipate = async (eventId: string) => {
    const response = await fetch(`/api/events/${eventId}/participate`, {
      method: 'POST'
    });
    
    if (response.ok) {
      loadData();
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
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="flex items-center space-x-4">
          <img
            src={user?.photo || '/default-avatar.png'}
            alt={user?.name}
            className="w-20 h-20 rounded-full border-4 border-white object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">Bonjour, {user?.name} 👋</h1>
            <p className="text-blue-100">
              {user?.sectorId ? `Secteur: ${user.sectorId.name}` : 'Pas encore de secteur'}
              {user?.communityId && ` • ${user.communityId.name}`}
            </p>
            <button
              onClick={() => router.push('/dashboard/profile')}
              className="mt-2 text-sm underline text-blue-100"
            >
              Modifier mon profil
            </button>
          </div>
        </div>
      </Card>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        {!user?.sectorId && (
          <Button onClick={() => router.push('/sectors')} fullWidth>
            🔍 Rejoindre un secteur
          </Button>
        )}
        <Button variant="secondary" onClick={() => router.push('/community')} fullWidth>
          🌍 Explorer les communautés
        </Button>
      </div>
      
      {/* Événements à venir */}
      <div>
        <h2 className="text-xl font-bold mb-4">📅 Événements à venir</h2>
        {events.filter(e => new Date(e.date) > new Date()).length === 0 ? (
          <Card className="p-6 text-center text-gray-500">
            Aucun événement à venir
          </Card>
        ) : (
          <div className="space-y-3">
            {events
              .filter(e => new Date(e.date) > new Date())
              .slice(0, 5)
              .map(event => (
                <Card key={event._id} className={`p-4 ${event.is_boosted ? 'border-2 border-yellow-400' : ''}`}>
                  {event.is_boosted && (
                    <span className="inline-block mb-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                      ⭐ Boosté
                    </span>
                  )}
                  <h3 className="font-bold text-lg">{event.title}</h3>
                  <p className="text-gray-600 text-sm">{event.location}</p>
                  <p className="text-gray-500 text-xs">
                    {new Date(event.date).toLocaleDateString('fr-FR')} à {new Date(event.date).toLocaleTimeString('fr-FR')}
                  </p>
                  <Button
                    size="sm"
                    className="mt-3"
                    onClick={() => handleParticipate(event._id)}
                  >
                    👍 Je participe ({event.participants?.length || 0})
                  </Button>
                </Card>
              ))}
          </div>
        )}
      </div>
      
      {/* Annonces */}
      {ads.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">📢 Annonces</h2>
          <div className="space-y-3">
            {ads.slice(0, 3).map(ad => (
              <Card key={ad._id} className={`p-4 ${ad.is_sponsored ? 'border border-yellow-400 bg-yellow-50' : ''}`}>
                {ad.is_sponsored && (
                  <span className="inline-block mb-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                    ⭐ Sponsorisé
                  </span>
                )}
                <h3 className="font-bold">{ad.title}</h3>
                <p className="text-gray-600 text-sm">{ad.content}</p>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
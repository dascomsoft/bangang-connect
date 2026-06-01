// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Card from '@/components/ui/Card';
// import Button from '@/components/ui/Button';
// import Input from '@/components/ui/Input';
// import { toast } from 'react-hot-toast';

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   phone: string;
//   photo: string;
//   role: string;
//   sectorId?: { _id: string; name: string };
//   communityId?: { _id: string; name: string; type: string };
// }

// interface Event {
//   _id: string;
//   title: string;
//   description: string;
//   date: string;
//   location: string;
//   is_boosted: boolean;
//   sectorId?: { _id: string; name: string };
//   participants: string[];
// }

// interface Ad {
//   _id: string;
//   title: string;
//   content: string;
//   is_sponsored: boolean;
// }

// export default function MemberDashboard() {
//   const router = useRouter();
//   const [user, setUser] = useState<User | null>(null);
//   const [events, setEvents] = useState<Event[]>([]);
//   const [ads, setAds] = useState<Ad[]>([]);
//   const [stats, setStats] = useState({
//     participatedEvents: 0,
//     upcomingEvents: 0
//   });
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('overview');

//   // États pour la modification du profil
//   const [updatingProfile, setUpdatingProfile] = useState(false);
//   const [uploadingPhoto, setUploadingPhoto] = useState(false);
//   const [profileData, setProfileData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     photo: '',
//     newPassword: ''
//   });

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       setLoading(true);

//       const userRes = await fetch('/api/auth/me');
//       if (!userRes.ok) {
//         router.push('/login');
//         return;
//       }
//       const userData = await userRes.json();
//       setUser(userData.user);

//       // Initialiser les données du profil
//       setProfileData({
//         name: userData.user.name || '',
//         email: userData.user.email || '',
//         phone: userData.user.phone || '',
//         photo: userData.user.photo || '',
//         newPassword: ''
//       });

//       // Charger les événements
//       const eventsRes = await fetch('/api/events');
//       const eventsData = await eventsRes.json();
//       setEvents(Array.isArray(eventsData) ? eventsData : []);

//       // Charger les annonces
//       const adsRes = await fetch('/api/ads');
//       const adsData = await adsRes.json();
//       setAds(Array.isArray(adsData) ? adsData : []);

//       // Calculer les stats
//       const participated = eventsData.filter((e: Event) =>
//         e.participants?.includes(userData.user._id)
//       ).length;

//       const upcoming = eventsData.filter((e: Event) =>
//         new Date(e.date) > new Date()
//       ).length;

//       setStats({
//         participatedEvents: participated,
//         upcomingEvents: upcoming
//       });

//     } catch (error) {
//       console.error('Error loading dashboard:', error);
//       toast.error('Erreur de chargement');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleParticipate = async (eventId: string) => {
//     try {
//       const response = await fetch(`/api/events/${eventId}/participate`, {
//         method: 'POST'
//       });

//       if (response.ok) {
//         toast.success('Participation mise à jour');
//         loadData();
//       } else {
//         toast.error('Erreur');
//       }
//     } catch (error) {
//       console.error('Error participating:', error);
//       toast.error('Erreur serveur');
//     }
//   };

//   // Mettre à jour le profil
//   const handleUpdateProfile = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setUpdatingProfile(true);

//     try {
//       // 🔥 Correction : envoyer undefined si vide, pas une string vide
//       const passwordToSend = profileData.newPassword && profileData.newPassword.trim() !== ''
//         ? profileData.newPassword
//         : undefined;

//       const response = await fetch('/api/users/update-profile', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           name: profileData.name,
//           email: profileData.email,
//           password: passwordToSend
//         })
//       });

//       if (response.ok) {
//         toast.success('Profil mis à jour');
//         loadData();
//         setProfileData(prev => ({ ...prev, newPassword: '' }));
//       } else {
//         toast.error('Erreur lors de la mise à jour');
//       }
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       toast.error('Erreur serveur');
//     } finally {
//       setUpdatingProfile(false);
//     }
//   };

//   // Upload photo
//   const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (!file.type.startsWith('image/')) {
//       toast.error('Veuillez sélectionner une image');
//       return;
//     }

//     if (file.size > 2 * 1024 * 1024) {
//       toast.error('L\'image ne doit pas dépasser 2MB');
//       return;
//     }

//     setUploadingPhoto(true);
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await fetch('/api/users/upload-photo', {
//         method: 'POST',
//         body: formData
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setProfileData(prev => ({ ...prev, photo: data.photoUrl }));
//         toast.success('Photo mise à jour');
//         loadData();
//       } else {
//         toast.error('Erreur upload');
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       toast.error('Erreur serveur');
//     } finally {
//       setUploadingPhoto(false);
//     }
//   };

//   const isParticipating = (event: Event): boolean => {
//     try {
//       if (!user || !user._id) return false;
//       if (!event.participants || !Array.isArray(event.participants)) return false;
//       return event.participants.includes(user._id);
//     } catch (error) {
//       console.error('Error checking participation:', error);
//       return false;
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 space-y-10 py-24">
//       {/* Header */}
//       <div className="bg-slate-600 rounded-2xl p-6 text-white">
//         <div className="flex items-center space-x-4">
//           <img
//             src={user?.photo || '/default-avatar.png'}
//             alt={user?.name}
//             className="w-16 h-16 rounded-full border-4 border-white object-cover"
//           />
//           <div>
//             <h1 className="text-2xl font-bold">👋 Bonjour, {user?.name}</h1>
//             <p className="text-green-100">
//               {user?.sectorId ? `Secteur: ${user.sectorId.name}` : 'Pas encore de secteur'}
//               {user?.communityId && ` • ${user.communityId.name}`}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="flex flex-wrap gap-2 border-b">
//         <button
//           onClick={() => setActiveTab('overview')}
//           className={`px-4 py-2 rounded-t-lg transition ${activeTab === 'overview' ? 'bg-slate-600 text-white' : 'bg-gray-100'
//             }`}
//         >
//           📊 Aperçu
//         </button>
//         <button
//           onClick={() => setActiveTab('profile')}
//           className={`px-4 py-2 rounded-t-lg transition ${activeTab === 'profile' ? 'bg-slate-600 text-white' : 'bg-gray-100'
//             }`}
//         >
//           👤 Mon profil
//         </button>
//       </div>

//       {/* Overview Tab */}
//       {activeTab === 'overview' && (
//         <>
//           {/* Stats */}
//           <div className="grid md:grid-cols-3 gap-4">
//             <Card className="p-4 text-center">
//               <div className="text-3xl mb-2">📅</div>
//               <div className="text-2xl font-bold">{stats.upcomingEvents}</div>
//               <div className="text-gray-600">Événements à venir</div>
//             </Card>
//             <Card className="p-4 text-center">
//               <div className="text-3xl mb-2">✅</div>
//               <div className="text-2xl font-bold">{stats.participatedEvents}</div>
//               <div className="text-gray-600">Participations</div>
//             </Card>
//             <Card className="p-4 text-center">
//               <div className="text-3xl mb-2">⭐</div>
//               <div className="text-2xl font-bold">-</div>
//               <div className="text-gray-600">Points</div>
//             </Card>
//           </div>

//           {/* Actions rapides */}
//           <div className="grid md:grid-cols-2 gap-4">
//             {!user?.sectorId && (
//               <Button className='bg-green-400' onClick={() => router.push('/sectors')} fullWidth>
//                 🔍 Rejoindre un secteur
//               </Button>
//             )}
//             <Button className='bg-slate-900' onClick={() => router.push('/chat')} fullWidth>
//               💬 Accéder au chat
//             </Button>
//           </div>

//           {/* Événements à venir */}
//           <div>
//             <h2 className="text-xl font-bold mb-4">📅 Événements à venir</h2>
//             {events.filter(e => new Date(e.date) > new Date()).length === 0 ? (
//               <Card className="p-6 text-center text-gray-500">
//                 Aucun événement à venir
//               </Card>
//             ) : (
//               <div className="space-y-3">
//                 {events
//                   .filter(e => new Date(e.date) > new Date())
//                   .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
//                   .slice(0, 5)
//                   .map(event => (
//                     <Card key={event._id} className={`p-4 ${event.is_boosted ? 'border-2 border-yellow-400' : ''}`}>
//                       {event.is_boosted && (
//                         <span className="inline-block mb-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
//                           ⭐ Boosté
//                         </span>
//                       )}
//                       <h3 className="font-bold text-lg">{event.title}</h3>
//                       <p className="text-md text-blue-600 mt-1">
//                         🏘️ {event.sectorId?.name || 'Secteur inconnu'}
//                       </p>
//                       <p className="text-gray-600 text-sm">{event.location}</p>
//                       <p className="text-gray-500 text-xs">
//                         {new Date(event.date).toLocaleDateString('fr-FR')} à {new Date(event.date).toLocaleTimeString('fr-FR')}
//                       </p>
//                       <Button
//                         size="sm"
//                         className="mt-3 bg-slate-600"
//                         variant={isParticipating(event) ? "secondary" : "primary"}
//                         onClick={() => handleParticipate(event._id)}
//                       >
//                         {isParticipating(event) ? '✓ Je participe' : '👍 Je participe'}
//                       </Button>
//                     </Card>
//                   ))}
//               </div>
//             )}
//           </div>

//           {/* Annonces */}
//           {ads.length > 0 && (
//             <div>
//               <h2 className="text-xl font-bold mb-4">📢 Annonces</h2>
//               <div className="space-y-3">
//                 {ads.slice(0, 3).map(ad => (
//                   <Card key={ad._id} className={`p-4 ${ad.is_sponsored ? 'border border-yellow-400 bg-yellow-50' : ''}`}>
//                     {ad.is_sponsored && (
//                       <span className="inline-block mb-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
//                         ⭐ Sponsorisé
//                       </span>
//                     )}
//                     <h3 className="font-bold">{ad.title}</h3>
//                     <p className="text-gray-600 text-sm">{ad.content}</p>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           )}
//         </>
//       )}

//       {/* Profile Tab */}
//       {activeTab === 'profile' && (
//         <Card className="p-6">
//           <h3 className="text-lg font-bold mb-4">👤 Modifier mon profil</h3>

//           {updatingProfile ? (
//             <div className="text-center py-4">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
//             </div>
//           ) : (
//             <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-lg">
//               {/* Photo */}
//               <div>
//                 <label className="block text-sm font-medium mb-1">Photo de profil</label>
//                 <div className="flex items-center space-x-4">
//                   <img
//                     src={profileData.photo || '/default-avatar.png'}
//                     alt="Photo"
//                     className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
//                   />
//                   <label className="cursor-pointer bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
//                     {uploadingPhoto ? 'Upload...' : 'Changer la photo'}
//                     <input
//                       type="file"
//                       accept="image/*"
//                       className="hidden"
//                       onChange={handlePhotoUpload}
//                       disabled={uploadingPhoto}
//                     />
//                   </label>
//                 </div>
//               </div>

//               {/* Nom */}
//               <div>
//                 <label className="block text-sm font-medium mb-1">Nom complet</label>
//                 <input
//                   type="text"
//                   value={profileData.name}
//                   onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
//                   className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-medium mb-1">Email</label>
//                 <input
//                   type="email"
//                   value={profileData.email}
//                   onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
//                   className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               {/* Téléphone */}
//               <div>
//                 <label className="block text-sm font-medium mb-1">Téléphone</label>
//                 <input
//                   type="tel"
//                   value={profileData.phone}
//                   disabled
//                   className="w-full px-3 py-2 border rounded-lg bg-gray-100"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Le numéro de téléphone ne peut pas être modifié</p>
//               </div>

//               {/* Nouveau mot de passe */}
//               <div>
//                 <label className="block text-sm font-medium mb-1">Nouveau mot de passe</label>
//                 <input
//                   type="password"
//                   value={profileData.newPassword}
//                   onChange={(e) => setProfileData({ ...profileData, newPassword: e.target.value })}
//                   className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Laisser vide pour ne pas changer"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Minimum 6 caractères</p>
//               </div>

//               <div className="flex space-x-3 pt-4">
//                 <Button type="submit">💾 Enregistrer les modifications</Button>
//               </div>
//             </form>
//           )}
//         </Card>
//       )}
//     </div>
//   );
// }














'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { toast } from 'react-hot-toast';
import { 
  FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff,
  FiCalendar, FiMapPin, FiStar, FiUsers, FiTrendingUp,
  FiAward, FiHeart, FiCheckCircle, FiAlertCircle,
  FiArrowRight, FiCamera, FiEdit2, FiLogOut, FiHome,
  FiBriefcase, FiMessageCircle, FiBell, FiSettings
} from 'react-icons/fi';
import { GiCrown, GiKingdom } from 'react-icons/gi';
import { MdDashboard, MdEvent, MdAdsClick } from 'react-icons/md';

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  photo: string;
  role: string;
  sectorId?: { _id: string; name: string };
  communityId?: { _id: string; name: string; type: string };
}

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  is_boosted: boolean;
  sectorId?: { _id: string; name: string };
  participants: string[];
}

interface Ad {
  _id: string;
  title: string;
  content: string;
  is_sponsored: boolean;
}

export default function MemberDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);
  const [stats, setStats] = useState({
    participatedEvents: 0,
    upcomingEvents: 0
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showPassword, setShowPassword] = useState(false);

  // États pour la modification du profil
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    photo: '',
    newPassword: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const userRes = await fetch('/api/auth/me');
      if (!userRes.ok) {
        router.push('/login');
        return;
      }
      const userData = await userRes.json();
      setUser(userData.user);

      setProfileData({
        name: userData.user.name || '',
        email: userData.user.email || '',
        phone: userData.user.phone || '',
        photo: userData.user.photo || '',
        newPassword: ''
      });

      const eventsRes = await fetch('/api/events');
      const eventsData = await eventsRes.json();
      setEvents(Array.isArray(eventsData) ? eventsData : []);

      const adsRes = await fetch('/api/ads');
      const adsData = await adsRes.json();
      setAds(Array.isArray(adsData) ? adsData : []);

      const participated = eventsData.filter((e: Event) =>
        e.participants?.includes(userData.user._id)
      ).length;

      const upcoming = eventsData.filter((e: Event) =>
        new Date(e.date) > new Date()
      ).length;

      setStats({
        participatedEvents: participated,
        upcomingEvents: upcoming
      });

    } catch (error) {
      console.error('Error loading dashboard:', error);
      toast.error('Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleParticipate = async (eventId: string) => {
    try {
      const response = await fetch(`/api/events/${eventId}/participate`, {
        method: 'POST'
      });

      if (response.ok) {
        toast.success('Participation mise à jour');
        loadData();
      } else {
        toast.error('Erreur');
      }
    } catch (error) {
      console.error('Error participating:', error);
      toast.error('Erreur serveur');
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdatingProfile(true);

    try {
      const passwordToSend = profileData.newPassword && profileData.newPassword.trim() !== ''
        ? profileData.newPassword
        : undefined;

      const response = await fetch('/api/users/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profileData.name,
          email: profileData.email,
          password: passwordToSend
        })
      });

      if (response.ok) {
        toast.success('Profil mis à jour');
        loadData();
        setProfileData(prev => ({ ...prev, newPassword: '' }));
      } else {
        toast.error('Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Erreur serveur');
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Veuillez sélectionner une image');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('L\'image ne doit pas dépasser 2MB');
      return;
    }

    setUploadingPhoto(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/users/upload-photo', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setProfileData(prev => ({ ...prev, photo: data.photoUrl }));
        toast.success('Photo mise à jour');
        loadData();
      } else {
        toast.error('Erreur upload');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Erreur serveur');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const isParticipating = (event: Event): boolean => {
    try {
      if (!user || !user._id) return false;
      if (!event.participants || !Array.isArray(event.participants)) return false;
      return event.participants.includes(user._id);
    } catch (error) {
      console.error('Error checking participation:', error);
      return false;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F4F0E8]">
        <div className="w-12 h-12 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F0E8] font-sans py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="bg-gradient-to-r from-[#0D0B07] to-[#1A1712] rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-[#C9A96E]/20 blur-md" />
                <img
                  src={user?.photo || '/default-avatar.png'}
                  alt={user?.name}
                  className="relative w-16 h-16 rounded-full border-2 border-[#C9A96E] object-cover"
                />
              </div>
              <div>
                <h1 className="font-serif text-2xl font-bold">Bonjour, {user?.name}</h1>
                <div className="flex flex-wrap items-center gap-3 mt-1">
                  {user?.sectorId && (
                    <span className="inline-flex items-center gap-1 text-sm text-[#C9A96E]">
                      <FiStar size={12} /> Secteur: {user.sectorId.name}
                    </span>
                  )}
                  {user?.communityId && (
                    <span className="inline-flex items-center gap-1 text-sm text-white/60">
                      <FiHome size={12} /> {user.communityId.name}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { id: 'overview', label: 'Aperçu', icon: FiHome },
              { id: 'profile', label: 'Mon profil', icon: FiUser },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-sans text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-[#C9A96E] text-[#0D0B07] shadow-md'
                      : 'bg-white/50 text-[#1A1712]/60 hover:bg-white hover:text-[#1A1712]'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: FiCalendar, value: stats.upcomingEvents, label: 'Événements à venir', color: 'from-blue-500 to-blue-600' },
                  { icon: FiCheckCircle, value: stats.participatedEvents, label: 'Participations', color: 'from-green-500 to-green-600' },
                  { icon: FiAward, value: '-', label: 'Points', color: 'from-purple-500 to-purple-600' },
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="bg-white rounded-xl p-4 text-center shadow-sm border border-[#C9A96E]/10 hover:shadow-md transition-all duration-300">
                      <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-br from-[#C9A96E]/20 to-[#DFC08A]/20 flex items-center justify-center mb-3">
                        <Icon size={18} className="text-[#C9A96E]" />
                      </div>
                      <div className="font-serif text-2xl font-bold text-[#1A1712]">{stat.value}</div>
                      <div className="font-sans text-xs text-[#1A1712]/50">{stat.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Actions rapides */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {!user?.sectorId && (
                  <Button 
                    onClick={() => router.push('/sectors')} 
                    className="bg-[#C9A96E] text-[#0D0B07] hover:bg-[#DFC08A]"
                  >
                    <FiUsers size={16} className="mr-2" />
                    🔍 Rejoindre un secteur
                  </Button>
                )}
                <Button 
                  onClick={() => router.push('/chat')} 
                  className="bg-[#1A1712] text-white hover:bg-[#2A2620]"
                >
                  <FiMessageCircle size={16} className="mr-2" />
                  💬 Accéder au chat
                </Button>
              </div>

              {/* Événements à venir */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <FiCalendar className="text-[#C9A96E]" size={20} />
                  <h2 className="text-xl font-serif font-bold text-[#1A1712]">Événements à venir</h2>
                </div>
                {events.filter(e => new Date(e.date) > new Date()).length === 0 ? (
                  <Card className="p-6 text-center">
                    <p className="text-[#1A1712]/50 font-sans">Aucun événement à venir</p>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {events
                      .filter(e => new Date(e.date) > new Date())
                      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                      .slice(0, 5)
                      .map(event => (
                        <div key={event._id} className={`p-4 rounded-xl border ${event.is_boosted ? 'border-[#C9A96E] bg-[#C9A96E]/5' : 'border-[#C9A96E]/10 bg-white'}`}>
                          {event.is_boosted && (
                            <span className="inline-flex items-center gap-1 mb-2 px-2 py-1 bg-[#C9A96E]/20 text-[#C9A96E] text-xs rounded-full">
                              <FiStar size={10} /> Boosté
                            </span>
                          )}
                          <h3 className="font-serif font-bold text-lg text-[#1A1712]">{event.title}</h3>
                          <p className="text-sm text-[#C9A96E] mt-1">
                            🏘️ {event.sectorId?.name || 'Secteur inconnu'}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-[#1A1712]/50 mt-1">
                            <FiMapPin size={12} />
                            <span>{event.location}</span>
                          </div>
                          <p className="text-xs text-[#1A1712]/40 mt-1">
                            {new Date(event.date).toLocaleDateString('fr-FR')} à {new Date(event.date).toLocaleTimeString('fr-FR')}
                          </p>
                          <Button
                            size="sm"
                            className={`mt-3 ${isParticipating(event) ? 'bg-green-600' : 'bg-[#C9A96E] text-[#0D0B07]'}`}
                            variant={isParticipating(event) ? "secondary" : "primary"}
                            onClick={() => handleParticipate(event._id)}
                          >
                            {isParticipating(event) ? (
                              <>
                                <FiCheckCircle size={14} className="mr-1" /> Je participe
                              </>
                            ) : (
                              <>
                                <FiHeart size={14} className="mr-1" /> Je participe
                              </>
                            )}
                          </Button>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* Annonces */}
              {ads.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <FiBell className="text-[#C9A96E]" size={20} />
                    <h2 className="text-xl font-serif font-bold text-[#1A1712]">Annonces</h2>
                  </div>
                  <div className="space-y-3">
                    {ads.slice(0, 3).map(ad => (
                      <div key={ad._id} className={`p-4 rounded-xl border ${ad.is_sponsored ? 'border-[#C9A96E] bg-[#C9A96E]/5' : 'border-[#C9A96E]/10 bg-white'}`}>
                        {ad.is_sponsored && (
                          <span className="inline-flex items-center gap-1 mb-2 px-2 py-1 bg-[#C9A96E]/20 text-[#C9A96E] text-xs rounded-full">
                            <FiStar size={10} /> Sponsorisé
                          </span>
                        )}
                        <h3 className="font-semibold text-[#1A1712]">{ad.title}</h3>
                        <p className="text-sm text-[#1A1712]/60 mt-1">{ad.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <FiUser className="text-[#C9A96E]" size={20} />
                <h2 className="text-xl font-serif font-bold text-[#1A1712]">Mon profil</h2>
              </div>

              {updatingProfile ? (
                <div className="text-center py-8">
                  <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-sm text-[#1A1712]/50 mt-2">Mise à jour...</p>
                </div>
              ) : (
                <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-lg">
                  {/* Photo */}
                  <div>
                    <label className="block font-sans text-sm font-medium text-[#1A1712] mb-2">Photo de profil</label>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-[#C9A96E]/20 blur-sm" />
                        <img
                          src={profileData.photo || '/default-avatar.png'}
                          alt="Photo"
                          className="relative w-20 h-20 rounded-full object-cover border-2 border-[#C9A96E]"
                        />
                      </div>
                      <label className="cursor-pointer px-4 py-2 bg-white border border-[#C9A96E]/20 rounded-xl text-sm text-[#1A1712] hover:border-[#C9A96E] transition-all duration-300">
                        {uploadingPhoto ? 'Upload...' : 'Changer la photo'}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handlePhotoUpload}
                          disabled={uploadingPhoto}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Nom */}
                  <div>
                    <label className="block font-sans text-sm font-medium text-[#1A1712] mb-2">Nom complet</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1712]/40">
                        <FiUser size={16} />
                      </div>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 bg-[#EDE9DF]/50 border border-[#C9A96E]/20 rounded-xl focus:outline-none focus:border-[#C9A96E] font-sans text-[#1A1712] transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block font-sans text-sm font-medium text-[#1A1712] mb-2">Email</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1712]/40">
                        <FiMail size={16} />
                      </div>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 bg-[#EDE9DF]/50 border border-[#C9A96E]/20 rounded-xl focus:outline-none focus:border-[#C9A96E] font-sans text-[#1A1712] transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Téléphone */}
                  <div>
                    <label className="block font-sans text-sm font-medium text-[#1A1712] mb-2">Téléphone</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1712]/40">
                        <FiPhone size={16} />
                      </div>
                      <input
                        type="tel"
                        value={profileData.phone}
                        disabled
                        className="w-full pl-10 pr-4 py-2 bg-[#EDE9DF]/30 border border-[#C9A96E]/20 rounded-xl font-sans text-[#1A1712]/50 cursor-not-allowed"
                      />
                    </div>
                    <p className="text-xs text-[#1A1712]/40 mt-1">Le numéro de téléphone ne peut pas être modifié</p>
                  </div>

                  {/* Nouveau mot de passe */}
                  <div>
                    <label className="block font-sans text-sm font-medium text-[#1A1712] mb-2">Nouveau mot de passe</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1712]/40">
                        <FiLock size={16} />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={profileData.newPassword}
                        onChange={(e) => setProfileData({ ...profileData, newPassword: e.target.value })}
                        className="w-full pl-10 pr-12 py-2 bg-[#EDE9DF]/50 border border-[#C9A96E]/20 rounded-xl focus:outline-none focus:border-[#C9A96E] font-sans text-[#1A1712] transition-all duration-300"
                        placeholder="Laisser vide pour ne pas changer"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1A1712]/40 hover:text-[#C9A96E] transition-colors"
                      >
                        {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                      </button>
                    </div>
                    <p className="text-xs text-[#1A1712]/40 mt-1">Minimum 6 caractères</p>
                  </div>

                  <Button type="submit" className="w-full bg-[#C9A96E] text-[#0D0B07] hover:bg-[#DFC08A]">
                    <FiCheckCircle size={16} className="mr-2" />
                    Enregistrer les modifications
                  </Button>
                </form>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
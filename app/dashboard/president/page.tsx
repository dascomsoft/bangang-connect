

// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Card from '@/components/ui/Card';
// import Button from '@/components/ui/Button';
// import { toast } from 'react-hot-toast';
// import ParticipantsModal from '@/components/event/ParticipantsModal';

// interface Sector {
//   _id: string;
//   name: string;
//   description: string;
//   membersCount: number;
//   presidentName: string;
//   presidentPhone: string;
//   status: string;
//   communityId: { _id: string; name: string };
//   createdAt: string;
// }

// interface Member {
//   _id: string;
//   name: string;
//   email: string;
//   phone: string;
//   photo: string;
// }

// interface PendingRequest {
//   _id: string;
//   userId: { _id: string; name: string; email: string; phone: string };
//   message: string;
//   createdAt: string;
// }

// interface Participant {
//   _id: string;
//   name: string;
//   email: string;
//   phone: string;
//   photo: string;
// }

// interface Event {
//   _id: string;
//   title: string;
//   description: string;
//   date: string;
//   location: string;
//   is_boosted: boolean;
//   sectorId: { _id: string; name: string };
//   participants: Participant[];
// }

// export default function PresidentDashboard() {
//   const router = useRouter();
//   const [sector, setSector] = useState<Sector | null>(null);
//   const [user, setUser] = useState<any>(null);
//   const [members, setMembers] = useState<Member[]>([]);
//   const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([]);
//   const [events, setEvents] = useState<Event[]>([]);
//   const [stats, setStats] = useState({
//     totalMembers: 0,
//     totalEvents: 0,
//     pendingRequests: 0,
//     upcomingEvents: 0
//   });
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [updatingProfile, setUpdatingProfile] = useState(false);
//   const [uploadingPhoto, setUploadingPhoto] = useState(false);
//   const [selectedEventForParticipants, setSelectedEventForParticipants] = useState<{ id: string; title: string } | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const [profileData, setProfileData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     photo: '',
//     currentPassword: '', 
//     newPassword: ''
//   });

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       console.log('🔵 1/5 - Chargement utilisateur...');
//       const userRes = await fetch('/api/auth/me');
//       if (!userRes.ok) {
//         console.error('🔴 Erreur auth:', userRes.status);
//         router.push('/login');
//         return;
//       }
//       const userData = await userRes.json();
//       setUser(userData.user);
//       console.log('✅ Utilisateur chargé:', userData.user.name);
      
//       setProfileData({
//         name: userData.user.name || '',
//         email: userData.user.email || '',
//         phone: userData.user.phone || '',
//         photo: userData.user.photo || '',
//         currentPassword: '', 
//         newPassword: ''
//       });
      
//       // Récupérer le sectorId
//       let sectorId: string | null = null;
//       if (userData.user.sectorId) {
//         if (typeof userData.user.sectorId === 'object') {
//           sectorId = userData.user.sectorId._id;
//         } else {
//           sectorId = userData.user.sectorId;
//         }
//       }
      
//       if (!sectorId) {
//         console.error('🔴 Utilisateur sans secteur');
//         setError('Vous n\'êtes pas associé à un secteur. Contactez l\'administrateur.');
//         setLoading(false);
//         return;
//       }
      
//       console.log('🔵 2/5 - Chargement secteur:', sectorId);
//       const sectorRes = await fetch(`/api/sectors/${sectorId}`);
//       if (sectorRes.ok) {
//         const sectorData = await sectorRes.json();
//         setSector(sectorData);
//         console.log('✅ Secteur chargé:', sectorData.name);
//       } else {
//         console.error('🔴 Erreur secteur:', sectorRes.status);
//       }
      
//       console.log('🔵 3/5 - Chargement membres...');
//       const membersRes = await fetch(`/api/sectors/${sectorId}/members`);
//       let membersData = [];
//       if (membersRes.ok) {
//         membersData = await membersRes.json();
//         setMembers(Array.isArray(membersData) ? membersData : []);
//         console.log('✅ Membres chargés:', membersData.length);
//       }
      
//       console.log('🔵 4/5 - Chargement demandes...');
//       const requestsRes = await fetch(`/api/sectors/${sectorId}/requests`);
//       let requestsData = [];
//       if (requestsRes.ok) {
//         requestsData = await requestsRes.json();
//         setPendingRequests(Array.isArray(requestsData) ? requestsData : []);
//         console.log('✅ Demandes chargées:', requestsData.length);
//       }
      
//       console.log('🔵 5/5 - Chargement événements...');
//       const eventsRes = await fetch(`/api/events`);
//       let eventsData = [];
//       if (eventsRes.ok) {
//         eventsData = await eventsRes.json();
//         // Filtrer les événements du secteur
//         const sectorEvents = eventsData.filter((e: any) => e.sectorId?._id === sectorId);
//         setEvents(sectorEvents);
//         console.log('✅ Événements chargés:', sectorEvents.length);
//       }
      
//       const upcoming = eventsData.filter((e: any) => new Date(e.date) > new Date()).length;
//       setStats({
//         totalMembers: membersData.length || 0,
//         totalEvents: eventsData.filter((e: any) => e.sectorId?._id === sectorId).length,
//         pendingRequests: requestsData.length || 0,
//         upcomingEvents: upcoming
//       });
      
//       console.log('✅ Toutes les données chargées !');
      
//     } catch (error) {
//       console.error('🔴 Error loading data:', error);
//       setError('Erreur de connexion au serveur');
//       toast.error('Erreur de chargement');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApproveRequest = async (requestId: string) => {
//     try {
//       const response = await fetch('/api/sectors/requests', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ requestId, status: 'approved' })
//       });
      
//       if (response.ok) {
//         toast.success('Demande approuvée');
//         loadData();
//       } else {
//         toast.error('Erreur');
//       }
//     } catch (error) {
//       console.error('Error approving request:', error);
//       toast.error('Erreur serveur');
//     }
//   };

//   const handleRejectRequest = async (requestId: string) => {
//     try {
//       const response = await fetch('/api/sectors/requests', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ requestId, status: 'rejected' })
//       });
      
//       if (response.ok) {
//         toast.success('Demande refusée');
//         loadData();
//       } else {
//         toast.error('Erreur');
//       }
//     } catch (error) {
//       console.error('Error rejecting request:', error);
//       toast.error('Erreur serveur');
//     }
//   };

//  // ✅ handleUpdateProfile corrigé
// const handleUpdateProfile = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setUpdatingProfile(true);

//   try {
//     // Validation côté client
//     if (profileData.newPassword && !profileData.currentPassword) {
//       toast.error('Entrez votre mot de passe actuel pour le changer');
//       setUpdatingProfile(false);
//       return;
//     }

//     if (profileData.newPassword && profileData.newPassword.length < 6) {
//       toast.error('Nouveau mot de passe trop court (minimum 6 caractères)');
//       setUpdatingProfile(false);
//       return;
//     }

//     const body: any = {
//       name: profileData.name,
//       email: profileData.email,
//     };

//     // N'envoyer les mots de passe que si l'utilisateur veut changer
//     if (profileData.newPassword) {
//       body.currentPassword = profileData.currentPassword;
//       body.newPassword = profileData.newPassword;
//     }

//     const response = await fetch('/api/users/update-profile', {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(body)
//     });

//     const data = await response.json();

//     if (response.ok) {
//       toast.success('Profil mis à jour avec succès');
//       loadData();
//       // Reset mots de passe uniquement
//       setProfileData(prev => ({
//         ...prev,
//         currentPassword: '',
//         newPassword: ''
//       }));
//     } else {
//       toast.error(data.error || 'Erreur lors de la mise à jour');
//     }
//   } catch (error) {
//     console.error('Error updating profile:', error);
//     toast.error('Erreur serveur');
//   } finally {
//     setUpdatingProfile(false);
//   }
// };

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

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
//           <div className="text-4xl mb-4">⚠️</div>
//           <h2 className="text-xl font-semibold text-red-700 mb-2">Erreur</h2>
//           <p className="text-red-600 mb-4">{error}</p>
//           <Button onClick={() => window.location.reload()}>Réessayer</Button>
//         </div>
//       </div>
//     );
//   }

//   if (!sector) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
//           <p className="text-yellow-800">Secteur non trouvé</p>
//           <p className="text-sm text-gray-500 mt-2">Vous n'êtes pas associé à un secteur.</p>
//           <button
//             onClick={() => router.push('/dashboard')}
//             className="mt-4 text-blue-600 hover:underline"
//           >
//             Retour au dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className=" container max-w-20xl  px-4 py-16 space-y-6">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-6 text-white">
//         <h1 className="text-2xl font-bold">Dashboard Président</h1>
//         <p className="text-green-100">Gérez votre secteur : {sector.name}</p>
//       </div>

//       {/* Stats */}
//       <div className="grid md:grid-cols-4 gap-4">
//         <Card className="p-4 text-center">
//           <div className="text-3xl mb-2">👥</div>
//           <div className="text-2xl font-bold">{stats.totalMembers}</div>
//           <div className="text-gray-600">Membres</div>
//         </Card>
//         <Card className="p-4 text-center">
//           <div className="text-3xl mb-2">📅</div>
//           <div className="text-2xl font-bold">{stats.totalEvents}</div>
//           <div className="text-gray-600">Événements</div>
//         </Card>
//         <Card className="p-4 text-center">
//           <div className="text-3xl mb-2">⏳</div>
//           <div className="text-2xl font-bold text-orange-600">{stats.pendingRequests}</div>
//           <div className="text-gray-600">Demandes</div>
//         </Card>
//         <Card className="p-4 text-center">
//           <div className="text-3xl mb-2">📆</div>
//           <div className="text-2xl font-bold">{stats.upcomingEvents}</div>
//           <div className="text-gray-600">À venir</div>
//         </Card>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="flex flex-wrap gap-2 border-b">
//         <button
//           onClick={() => setActiveTab('overview')}
//           className={`px-4 py-2 rounded-t-lg transition ${
//             activeTab === 'overview' ? 'bg-green-600 text-white' : 'bg-gray-100'
//           }`}
//         >
//           📊 Aperçu
//         </button>
//         <button
//           onClick={() => setActiveTab('members')}
//           className={`px-4 py-2 rounded-t-lg transition ${
//             activeTab === 'members' ? 'bg-green-600 text-white' : 'bg-gray-100'
//           }`}
//         >
//           👥 Membres ({stats.totalMembers})
//         </button>
//         <button
//           onClick={() => setActiveTab('requests')}
//           className={`px-4 py-2 rounded-t-lg transition ${
//             activeTab === 'requests' ? 'bg-green-600 text-white' : 'bg-gray-100'
//           }`}
//         >
//           📝 Demandes ({stats.pendingRequests})
//         </button>
//         <button
//           onClick={() => setActiveTab('events')}
//           className={`px-4 py-2 rounded-t-lg transition ${
//             activeTab === 'events' ? 'bg-green-600 text-white' : 'bg-gray-100'
//           }`}
//         >
//           📅 Événements
//         </button>
//         <button
//           onClick={() => setActiveTab('profile')}
//           className={`px-4 py-2 rounded-t-lg transition ${
//             activeTab === 'profile' ? 'bg-green-600 text-white' : 'bg-gray-100'
//           }`}
//         >
//           👤 Mon profil
//         </button>
//       </div>

//       {/* Overview Tab */}
//       {activeTab === 'overview' && (
//         <div className="grid md:grid-cols-2 gap-6">
//           <Card className="p-6">
//             <h3 className="text-lg font-bold mb-4">📊 Informations du secteur</h3>
//             <p><strong>Nom:</strong> {sector.name}</p>
//             <p><strong>Description:</strong> {sector.description || 'Aucune'}</p>
//             <p><strong>Communauté:</strong> {sector.communityId?.name}</p>
//             <p><strong>Créé le:</strong> {new Date(sector.createdAt).toLocaleDateString()}</p>
//           </Card>
//           <Card className="p-6">
//             <h3 className="text-lg font-bold mb-4">⚡ Actions rapides</h3>
//             <Button onClick={() => router.push('/events')} fullWidth>
//               📅 Créer un événement
//             </Button>
//             <Button variant="secondary" onClick={() => router.push('/chat')} fullWidth className="mt-3">
//               💬 Accéder au chat
//             </Button>
//           </Card>
//         </div>
//       )}

//       {/* Members Tab */}
//       {activeTab === 'members' && (
//         <Card className="p-6">
//           <h3 className="text-lg font-bold mb-4">👥 Liste des membres</h3>
//           {members.length === 0 ? (
//             <p className="text-gray-500 text-center py-8">Aucun membre</p>
//           ) : (
//             <div className="space-y-3">
//               {members.map((member) => (
//                 <div key={member._id} className="flex items-center p-3 border rounded-lg">
//                   <img
//                     src={member.photo || '/default-avatar.png'}
//                     alt={member.name}
//                     className="w-10 h-10 rounded-full object-cover mr-3"
//                   />
//                   <div>
//                     <p className="font-semibold">{member.name}</p>
//                     <p className="text-sm text-gray-500">{member.phone}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </Card>
//       )}

//       {/* Requests Tab */}
//       {activeTab === 'requests' && (
//         <Card className="p-6">
//           <h3 className="text-lg font-bold mb-4">📝 Demandes d'adhésion</h3>
//           {pendingRequests.length === 0 ? (
//             <p className="text-gray-500 text-center py-8">Aucune demande en attente</p>
//           ) : (
//             <div className="space-y-3">
//               {pendingRequests.map((req) => (
//                 <div key={req._id} className="flex justify-between items-center p-3 border rounded-lg">
//                   <div>
//                     <p className="font-semibold">{req.userId.name}</p>
//                     <p className="text-sm text-gray-500">{req.userId.phone}</p>
//                     {req.message && (
//                       <p className="text-sm text-gray-400 mt-1">📝 {req.message}</p>
//                     )}
//                   </div>
//                   <div className="flex gap-2">
//                     <Button size="sm" variant="success" onClick={() => handleApproveRequest(req._id)}>
//                       Accepter
//                     </Button>
//                     <Button size="sm" variant="danger" onClick={() => handleRejectRequest(req._id)}>
//                       Refuser
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </Card>
//       )}

//       {/* Events Tab */}
//       {activeTab === 'events' && (
//         <Card className="p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-bold">📅 Événements du secteur</h3>
//             <Button size="sm" onClick={() => router.push('/events')}>+ Créer</Button>
//           </div>
          
//           {events.length === 0 ? (
//             <p className="text-gray-500 text-center py-8">Aucun événement</p>
//           ) : (
//             <div className="space-y-4">
//               {events.map((event) => (
//                 <div key={event._id} className="border rounded-lg p-4">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h4 className="font-bold">{event.title}</h4>
//                       <p className="text-sm text-gray-600">{event.location}</p>
//                       <p className="text-xs text-gray-500">
//                         {new Date(event.date).toLocaleDateString()}
//                       </p>
//                       <p className="text-sm mt-2">👥 {event.participants?.length || 0} participants</p>
//                     </div>
//                     <Button 
//                       variant="secondary"
//                       onClick={() => {
//                         setSelectedEventForParticipants({
//                           id: event._id,
//                           title: event.title
//                         });
//                       }}
//                     >
//                       Voir participants
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </Card>
//       )}

//       {/* Profile Tab */}
//    {/* ✅ Profile Tab — form complet avec currentPassword */}
// {activeTab === 'profile' && (
//   <Card className="p-6">
//     <h3 className="text-lg font-bold mb-4">👤 Modifier mon profil</h3>

//     <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-lg">
//       {/* Photo */}
//       <div>
//         <label className="block text-sm font-medium mb-1">Photo de profil</label>
//         <div className="flex items-center space-x-4">
//           <img
//             src={profileData.photo || '/default-avatar.png'}
//             alt="Photo"
//             className="w-20 h-20 rounded-full object-cover border-2 border-green-500"
//           />
//           <label className="cursor-pointer bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200">
//             {uploadingPhoto ? 'Upload...' : 'Changer la photo'}
//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={handlePhotoUpload}
//               disabled={uploadingPhoto}
//             />
//           </label>
//         </div>
//       </div>

//       {/* Nom */}
//       <div>
//         <label className="block text-sm font-medium mb-1">Nom complet</label>
//         <input
//           type="text"
//           value={profileData.name}
//           onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
//           className="w-full px-3 py-2 border rounded-lg"
//           required
//         />
//       </div>

//       {/* Email */}
//       <div>
//         <label className="block text-sm font-medium mb-1">Email</label>
//         <input
//           type="email"
//           value={profileData.email}
//           onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
//           className="w-full px-3 py-2 border rounded-lg"
//         />
//       </div>

//       {/* Téléphone — non modifiable */}
//       <div>
//         <label className="block text-sm font-medium mb-1">Téléphone</label>
//         <input
//           type="tel"
//           value={profileData.phone}
//           disabled
//           className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-500"
//         />
//         <p className="text-xs text-gray-500 mt-1">
//           Le numéro de téléphone ne peut pas être modifié
//         </p>
//       </div>

//       {/* Séparateur changement mot de passe */}
//       <div className="border-t pt-4">
//         <p className="text-sm font-semibold text-gray-700 mb-3">
//           🔑 Changer le mot de passe (optionnel)
//         </p>

//         {/* Mot de passe actuel */}
//         <div className="mb-3">
//           <label className="block text-sm font-medium mb-1">
//             Mot de passe actuel
//           </label>
//           <input
//             type="password"
//             value={profileData.currentPassword}
//             onChange={(e) => setProfileData({ ...profileData, currentPassword: e.target.value })}
//             className="w-full px-3 py-2 border rounded-lg"
//             placeholder="Votre mot de passe actuel"
//             autoComplete="current-password"
//           />
//         </div>

//         {/* Nouveau mot de passe */}
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Nouveau mot de passe
//           </label>
//           <input
//             type="password"
//             value={profileData.newPassword}
//             onChange={(e) => setProfileData({ ...profileData, newPassword: e.target.value })}
//             className="w-full px-3 py-2 border rounded-lg"
//             placeholder="Minimum 6 caractères"
//             autoComplete="new-password"
//           />
//           <p className="text-xs text-gray-500 mt-1">
//             Laisser vide pour ne pas changer le mot de passe
//           </p>
//         </div>
//       </div>

//       <div className="flex space-x-3 pt-2">
//         <Button type="submit" disabled={updatingProfile}>
//           {updatingProfile ? 'Enregistrement...' : '💾 Enregistrer'}
//         </Button>
//       </div>
//     </form>
//   </Card>
// )}

//       {/* Modal Participants */}
//       {selectedEventForParticipants && (
//         <ParticipantsModal
//           eventId={selectedEventForParticipants.id}
//           eventTitle={selectedEventForParticipants.title}
//           onClose={() => setSelectedEventForParticipants(null)}
//         />
//       )}
//     </div>
//   );
// }



























'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { toast } from 'react-hot-toast';
import ParticipantsModal from '@/components/event/ParticipantsModal';
import { 
  FiUsers, FiCalendar, FiClock, FiEye, FiEyeOff,
  FiUser, FiMail, FiPhone, FiLock, FiCheckCircle,
  FiXCircle, FiPlus, FiArrowRight, FiStar, FiShield,
  FiBriefcase, FiHome, FiMapPin, FiTrendingUp, FiAward
} from 'react-icons/fi';
import { GiCrown} from 'react-icons/gi';

interface Sector {
  _id: string;
  name: string;
  description: string;
  membersCount: number;
  presidentName: string;
  presidentPhone: string;
  status: string;
  communityId: { _id: string; name: string };
  createdAt: string;
}

interface Member {
  _id: string;
  name: string;
  email: string;
  phone: string;
  photo: string;
}

interface PendingRequest {
  _id: string;
  userId: { _id: string; name: string; email: string; phone: string };
  message: string;
  createdAt: string;
}

interface Participant {
  _id: string;
  name: string;
  email: string;
  phone: string;
  photo: string;
}

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  is_boosted: boolean;
  sectorId: { _id: string; name: string };
  participants: Participant[];
}

export default function PresidentDashboard() {
  const router = useRouter();
  const [sector, setSector] = useState<Sector | null>(null);
  const [user, setUser] = useState<any>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalEvents: 0,
    pendingRequests: 0,
    upcomingEvents: 0
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [selectedEventForParticipants, setSelectedEventForParticipants] = useState<{ id: string; title: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    photo: '',
    currentPassword: '',
    newPassword: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
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
        currentPassword: '',
        newPassword: ''
      });
      
      let sectorId: string | null = null;
      if (userData.user.sectorId) {
        if (typeof userData.user.sectorId === 'object') {
          sectorId = userData.user.sectorId._id;
        } else {
          sectorId = userData.user.sectorId;
        }
      }
      
      if (!sectorId) {
        setError('Vous n\'êtes pas associé à un secteur. Contactez l\'administrateur.');
        setLoading(false);
        return;
      }
      
      const [sectorRes, membersRes, requestsRes, eventsRes] = await Promise.all([
        fetch(`/api/sectors/${sectorId}`),
        fetch(`/api/sectors/${sectorId}/members`),
        fetch(`/api/sectors/${sectorId}/requests`),
        fetch(`/api/events`)
      ]);
      
      if (sectorRes.ok) {
        const sectorData = await sectorRes.json();
        setSector(sectorData);
      }
      
      let membersData = [];
      if (membersRes.ok) {
        membersData = await membersRes.json();
        setMembers(Array.isArray(membersData) ? membersData : []);
      }
      
      let requestsData = [];
      if (requestsRes.ok) {
        requestsData = await requestsRes.json();
        setPendingRequests(Array.isArray(requestsData) ? requestsData : []);
      }
      
      let eventsData = [];
      if (eventsRes.ok) {
        eventsData = await eventsRes.json();
        const sectorEvents = eventsData.filter((e: any) => e.sectorId?._id === sectorId);
        setEvents(sectorEvents);
      }
      
      const upcoming = eventsData.filter((e: any) => new Date(e.date) > new Date()).length;
      setStats({
        totalMembers: membersData.length || 0,
        totalEvents: eventsData.filter((e: any) => e.sectorId?._id === sectorId).length,
        pendingRequests: requestsData.length || 0,
        upcomingEvents: upcoming
      });
      
    } catch (error) {
      console.error('Error loading data:', error);
      setError('Erreur de connexion au serveur');
      toast.error('Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveRequest = async (requestId: string) => {
    try {
      const response = await fetch('/api/sectors/requests', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId, status: 'approved' })
      });
      
      if (response.ok) {
        toast.success('Demande approuvée');
        loadData();
      } else {
        toast.error('Erreur');
      }
    } catch (error) {
      console.error('Error approving request:', error);
      toast.error('Erreur serveur');
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      const response = await fetch('/api/sectors/requests', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId, status: 'rejected' })
      });
      
      if (response.ok) {
        toast.success('Demande refusée');
        loadData();
      } else {
        toast.error('Erreur');
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
      toast.error('Erreur serveur');
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdatingProfile(true);

    try {
      if (profileData.newPassword && !profileData.currentPassword) {
        toast.error('Entrez votre mot de passe actuel pour le changer');
        setUpdatingProfile(false);
        return;
      }

      if (profileData.newPassword && profileData.newPassword.length < 6) {
        toast.error('Nouveau mot de passe trop court (minimum 6 caractères)');
        setUpdatingProfile(false);
        return;
      }

      const body: any = {
        name: profileData.name,
        email: profileData.email,
      };

      if (profileData.newPassword) {
        body.currentPassword = profileData.currentPassword;
        body.newPassword = profileData.newPassword;
      }

      const response = await fetch('/api/users/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Profil mis à jour avec succès');
        loadData();
        setProfileData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: ''
        }));
      } else {
        toast.error(data.error || 'Erreur lors de la mise à jour');
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F4F0E8]">
        <div className="w-12 h-12 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F4F0E8] flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 max-w-md text-center shadow-xl border border-[#C9A96E]/10">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <FiXCircle size={32} className="text-red-500" />
          </div>
          <h2 className="font-serif text-xl font-bold text-[#1A1712] mb-2">Erreur</h2>
          <p className="text-[#1A1712]/60 mb-6">{error}</p>
          <Button onClick={() => window.location.reload()} className="bg-[#C9A96E] text-[#0D0B07]">
            <FiArrowRight size={16} className="mr-2" /> Réessayer
          </Button>
        </div>
      </div>
    );
  }

  if (!sector) {
    return (
      <div className="min-h-screen bg-[#F4F0E8] flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 max-w-md text-center shadow-xl border border-[#C9A96E]/10">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-100 flex items-center justify-center">
            <FiHome size={32} className="text-yellow-500" />
          </div>
          <h2 className="font-serif text-xl font-bold text-[#1A1712] mb-2">Secteur non trouvé</h2>
          <p className="text-[#1A1712]/60 mb-6">Vous n'êtes pas associé à un secteur.</p>
          <Button onClick={() => router.push('/dashboard')} className="bg-[#C9A96E] text-[#0D0B07]">
            Retour au dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F0E8] font-sans py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0D0B07] to-[#1A1712] rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center gap-3 mb-2">
              <GiCrown className="text-[#C9A96E] text-2xl" />
              <h1 className="font-serif text-2xl font-bold">Dashboard Président</h1>
            </div>
            <p className="text-white/60 font-sans">Gérez votre secteur : <span className="text-[#C9A96E]">{sector.name}</span></p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: FiUsers, value: stats.totalMembers, label: 'Membres', color: 'from-blue-500 to-blue-600' },
              { icon: FiCalendar, value: stats.totalEvents, label: 'Événements', color: 'from-purple-500 to-purple-600' },
              { icon: FiClock, value: stats.pendingRequests, label: 'Demandes', color: 'from-orange-500 to-orange-600', highlight: true },
              { icon: FiTrendingUp, value: stats.upcomingEvents, label: 'À venir', color: 'from-green-500 to-green-600' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="bg-white rounded-xl p-4 text-center shadow-sm border border-[#C9A96E]/10 hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-br from-[#C9A96E]/20 to-[#DFC08A]/20 flex items-center justify-center mb-3">
                    <Icon size={18} className="text-[#C9A96E]" />
                  </div>
                  <div className={`font-serif text-2xl font-bold ${stat.highlight ? 'text-[#C9A96E]' : 'text-[#1A1712]'}`}>
                    {stat.value}
                  </div>
                  <div className="font-sans text-xs text-[#1A1712]/50">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-[#C9A96E]/20 pb-2">
            {[
              { id: 'overview', label: 'Aperçu', icon: FiHome },
              { id: 'members', label: 'Membres', icon: FiUsers },
              { id: 'requests', label: 'Demandes', icon: FiClock },
              { id: 'events', label: 'Événements', icon: FiCalendar },
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
                      : 'text-[#1A1712]/60 hover:text-[#1A1712]'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                  {tab.id === 'requests' && stats.pendingRequests > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 text-xs bg-red-500 text-white rounded-full">
                      {stats.pendingRequests}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-[#C9A96E]/10 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <FiShield className="text-[#C9A96E]" size={20} />
                  <h3 className="font-serif text-lg font-bold text-[#1A1712]">Informations du secteur</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <p><span className="text-[#1A1712]/50">Nom:</span> <span className="text-[#1A1712] font-medium">{sector.name}</span></p>
                  <p><span className="text-[#1A1712]/50">Description:</span> <span className="text-[#1A1712]">{sector.description || 'Aucune'}</span></p>
                  <p><span className="text-[#1A1712]/50">Communauté:</span> <span className="text-[#1A1712]">{sector.communityId?.name}</span></p>
                  <p><span className="text-[#1A1712]/50">Créé le:</span> <span className="text-[#1A1712]">{new Date(sector.createdAt).toLocaleDateString()}</span></p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-[#C9A96E]/10 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <FiStar className="text-[#C9A96E]" size={20} />
                  <h3 className="font-serif text-lg font-bold text-[#1A1712]">Actions rapides</h3>
                </div>
                <div className="space-y-3">
                  <Button onClick={() => router.push('/events')} className="w-full bg-[#C9A96E] text-[#0D0B07] hover:bg-[#DFC08A]">
                    <FiCalendar size={16} className="mr-2" /> Créer un événement
                  </Button>
                  <Button variant="secondary" onClick={() => router.push('/chat')} className="w-full border-[#C9A96E]/30 text-[#1A1712] hover:border-[#C9A96E]">
                    <FiUsers size={16} className="mr-2" /> Accéder au chat
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Members Tab */}
          {activeTab === 'members' && (
            <div className="bg-white rounded-xl p-6 border border-[#C9A96E]/10 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <FiUsers className="text-[#C9A96E]" size={20} />
                <h3 className="font-serif text-lg font-bold text-[#1A1712]">Liste des membres ({stats.totalMembers})</h3>
              </div>
              {members.length === 0 ? (
                <p className="text-center py-8 text-[#1A1712]/50 font-sans">Aucun membre</p>
              ) : (
                <div className="space-y-3">
                  {members.map((member) => (
                    <div key={member._id} className="flex items-center gap-3 p-3 bg-[#EDE9DF]/30 rounded-xl border border-[#C9A96E]/10 hover:border-[#C9A96E]/30 transition-all duration-300">
                      <img
                        src={member.photo || '/default-avatar.png'}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover border border-[#C9A96E]"
                      />
                      <div>
                        <p className="font-semibold text-[#1A1712]">{member.name}</p>
                        <p className="text-sm text-[#1A1712]/50">{member.phone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Requests Tab */}
          {activeTab === 'requests' && (
            <div className="bg-white rounded-xl p-6 border border-[#C9A96E]/10 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <FiClock className="text-[#C9A96E]" size={20} />
                <h3 className="font-serif text-lg font-bold text-[#1A1712]">Demandes d'adhésion ({stats.pendingRequests})</h3>
              </div>
              {pendingRequests.length === 0 ? (
                <p className="text-center py-8 text-[#1A1712]/50 font-sans">Aucune demande en attente</p>
              ) : (
                <div className="space-y-3">
                  {pendingRequests.map((req) => (
                    <div key={req._id} className="flex justify-between items-center p-3 bg-[#EDE9DF]/30 rounded-xl border border-[#C9A96E]/10">
                      <div>
                        <p className="font-semibold text-[#1A1712]">{req.userId.name}</p>
                        <p className="text-sm text-[#1A1712]/50">{req.userId.phone}</p>
                        {req.message && (
                          <p className="text-sm text-[#1A1712]/40 mt-1">📝 {req.message}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="success" onClick={() => handleApproveRequest(req._id)} className="bg-green-600 text-white hover:bg-green-700">
                          <FiCheckCircle size={14} className="mr-1" /> Accepter
                        </Button>
                        <Button size="sm" variant="danger" onClick={() => handleRejectRequest(req._id)} className="bg-red-600 text-white hover:bg-red-700">
                          <FiXCircle size={14} className="mr-1" /> Refuser
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div className="bg-white rounded-xl p-6 border border-[#C9A96E]/10 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <FiCalendar className="text-[#C9A96E]" size={20} />
                  <h3 className="font-serif text-lg font-bold text-[#1A1712]">Événements du secteur</h3>
                </div>
                <Button onClick={() => router.push('/events')} size="sm" className="bg-[#C9A96E] text-[#0D0B07] hover:bg-[#DFC08A]">
                  <FiPlus size={14} className="mr-1" /> Créer
                </Button>
              </div>
              
              {events.length === 0 ? (
                <p className="text-center py-8 text-[#1A1712]/50 font-sans">Aucun événement</p>
              ) : (
                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event._id} className={`p-4 rounded-xl border ${event.is_boosted ? 'border-[#C9A96E] bg-[#C9A96E]/5' : 'border-[#C9A96E]/10 bg-white'}`}>
                      {event.is_boosted && (
                        <span className="inline-flex items-center gap-1 mb-2 px-2 py-1 bg-[#C9A96E]/20 text-[#C9A96E] text-xs rounded-full">
                          <FiStar size={10} /> Boosté
                        </span>
                      )}
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-serif font-bold text-lg text-[#1A1712]">{event.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-[#1A1712]/50 mt-1">
                            <FiMapPin size={12} />
                            <span>{event.location}</span>
                          </div>
                          <p className="text-xs text-[#1A1712]/40 mt-1">
                            {new Date(event.date).toLocaleDateString()}
                          </p>
                          <p className="text-sm mt-2 flex items-center gap-1 text-[#1A1712]/60">
                            <FiUsers size={14} /> {event.participants?.length || 0} participants
                          </p>
                        </div>
                        <Button 
                          variant="secondary"
                          onClick={() => {
                            setSelectedEventForParticipants({
                              id: event._id,
                              title: event.title
                            });
                          }}
                          className="border-[#C9A96E]/30 text-[#1A1712] hover:border-[#C9A96E]"
                        >
                          Voir participants
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl p-6 border border-[#C9A96E]/10 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <FiUser className="text-[#C9A96E]" size={20} />
                <h3 className="font-serif text-lg font-bold text-[#1A1712]">Modifier mon profil</h3>
              </div>

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

                {/* Téléphone non modifiable */}
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

                {/* Séparateur changement mot de passe */}
                <div className="border-t border-[#C9A96E]/10 pt-4">
                  <p className="font-sans text-sm font-semibold text-[#1A1712] mb-3 flex items-center gap-2">
                    <FiLock size={14} /> Changer le mot de passe (optionnel)
                  </p>

                  {/* Mot de passe actuel */}
                  <div className="mb-3">
                    <label className="block font-sans text-sm font-medium text-[#1A1712] mb-2">Mot de passe actuel</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1712]/40">
                        <FiLock size={16} />
                      </div>
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={profileData.currentPassword}
                        onChange={(e) => setProfileData({ ...profileData, currentPassword: e.target.value })}
                        className="w-full pl-10 pr-12 py-2 bg-[#EDE9DF]/50 border border-[#C9A96E]/20 rounded-xl focus:outline-none focus:border-[#C9A96E] font-sans text-[#1A1712] transition-all duration-300"
                        placeholder="Votre mot de passe actuel"
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1A1712]/40 hover:text-[#C9A96E] transition-colors"
                      >
                        {showCurrentPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Nouveau mot de passe */}
                  <div>
                    <label className="block font-sans text-sm font-medium text-[#1A1712] mb-2">Nouveau mot de passe</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1712]/40">
                        <FiLock size={16} />
                      </div>
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={profileData.newPassword}
                        onChange={(e) => setProfileData({ ...profileData, newPassword: e.target.value })}
                        className="w-full pl-10 pr-12 py-2 bg-[#EDE9DF]/50 border border-[#C9A96E]/20 rounded-xl focus:outline-none focus:border-[#C9A96E] font-sans text-[#1A1712] transition-all duration-300"
                        placeholder="Minimum 6 caractères"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1A1712]/40 hover:text-[#C9A96E] transition-colors"
                      >
                        {showNewPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                      </button>
                    </div>
                    <p className="text-xs text-[#1A1712]/40 mt-1">Laisser vide pour ne pas changer le mot de passe</p>
                  </div>
                </div>

                <Button type="submit" disabled={updatingProfile} className="w-full bg-[#C9A96E] text-[#0D0B07] hover:bg-[#DFC08A]">
                  {updatingProfile ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-[#0D0B07] border-t-transparent rounded-full animate-spin" />
                      Enregistrement...
                    </div>
                  ) : (
                    <>
                      <FiCheckCircle size={16} className="mr-2" /> Enregistrer les modifications
                    </>
                  )}
                </Button>
              </form>
            </div>
          )}

          {/* Modal Participants */}
          {selectedEventForParticipants && (
            <ParticipantsModal
              eventId={selectedEventForParticipants.id}
              eventTitle={selectedEventForParticipants.title}
              onClose={() => setSelectedEventForParticipants(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}


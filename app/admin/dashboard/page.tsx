

// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Card from '@/components/ui/Card';
// import Button from '@/components/ui/Button';
// import Input from '@/components/ui/Input';
// import { toast } from 'react-hot-toast';


// // ============================================
// // TYPES
// // ============================================

// interface Sector {
//   _id: string;
//   name: string;
//   description?: string;
//   communityId: { _id: string; name: string; type: string };
//   presidentName: string;
//   presidentPhone: string;
//   status: string;
//   membersCount: number;
//   createdAt: string;
// }

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   phone: string;
//   role: string;
//   isRestricted: boolean;
//   createdAt: string;
// }

// interface Community {
//   _id: string;
//   name: string;
//   type: string;
//   country: string;
//   city?: string;
//   createdAt: string;
// }

// interface Event {
//   _id: string;
//   title: string;
//   description: string;
//   date: string;
//   location: string;
//   sectorId: { _id: string; name: string };
//   is_boosted: boolean;
//   createdBy: { name: string };
//   participants: string[];
//   createdAt: string;
// }

// interface Ad {
//   _id: string;
//   title: string;
//   content: string;
//   is_sponsored: boolean;
//   sponsor_expires_at?: string;
//   createdBy: { _id: string; name: string; email: string };
//   sectorId?: { _id: string; name: string };
//   communityId?: { _id: string; name: string };
//   createdAt: string;
// }

// // ============================================
// // COMPOSANT PRINCIPAL
// // ============================================

// export default function AdminDashboard() {
//   const router = useRouter();

//   // État onglet actif
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState<string | null>(null);

//   // États pour les modales d'édition
//   const [editingItem, setEditingItem] = useState<any>(null);
//   const [showEditModal, setShowEditModal] = useState(false);

//   // ============================================
//   // STATS
//   // ============================================
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalCommunities: 0,
//     totalSectors: 0,
//     totalEvents: 0,
//     totalAds: 0,
//     totalRevenue: 0
//   });

//   // ============================================
//   // UTILISATEURS
//   // ============================================
//   const [users, setUsers] = useState<User[]>([]);

//   // ============================================
//   // COMMUNAUTÉS
//   // ============================================
//   const [communities, setCommunities] = useState<Community[]>([]);
//   const [showCreateCommunity, setShowCreateCommunity] = useState(false);
//   const [newCommunity, setNewCommunity] = useState({
//     name: '',
//     type: 'city',
//     country: 'Cameroun',
//     city: ''
//   });

//   // ============================================
//   // SECTEURS
//   // ============================================
//   const [sectors, setSectors] = useState<Sector[]>([]);
//   const [showCreateSector, setShowCreateSector] = useState(false);
//   const [newSector, setNewSector] = useState({
//     name: '',
//     description: '',
//     communityId: '',
//     presidentPhone: '',
//     presidentName: '',
//     sendInvitation: true
//   });

//   // ============================================
//   // ÉVÉNEMENTS
//   // ============================================
//   const [events, setEvents] = useState<Event[]>([]);
//   const [showCreateEvent, setShowCreateEvent] = useState(false);
//   const [newEvent, setNewEvent] = useState({
//     title: '',
//     description: '',
//     date: '',
//     location: '',
//     sectorId: '',
//     is_boosted: false
//   });

//   // ============================================
//   // ANNONCES
//   // ============================================
//   const [ads, setAds] = useState<Ad[]>([]);
//   const [showCreateAd, setShowCreateAd] = useState(false);
//   const [newAd, setNewAd] = useState({
//     title: '',
//     content: '',
//     sectorId: '',
//     communityId: ''
//   });

//   // ============================================
//   // CHARGEMENT DES DONNÉES
//   // ============================================
//   useEffect(() => {
//     loadInitialData();
//   }, []);

//   useEffect(() => {
//     if (activeTab === 'users') loadUsers();
//     if (activeTab === 'communities') loadCommunities();
//     if (activeTab === 'create-sector') loadCommunitiesForSelect();
//     if (activeTab === 'all-sectors') loadSectors();
//     if (activeTab === 'events') loadEvents();
//     if (activeTab === 'ads') loadAds();
//   }, [activeTab]);

//   const loadInitialData = async () => {
//     setLoading(true);
//     try {
//       const [userRes, statsRes] = await Promise.all([
//         fetch('/api/auth/me'),
//         fetch('/api/admin/stats')
//       ]);

//       if (!userRes.ok) {
//         router.push('/login');
//         return;
//       }

//       const userData = await userRes.json();
//       if (userData.user.role !== 'super_admin') {
//         router.push('/dashboard');
//         return;
//       }

//       const statsData = await statsRes.json();
//       setStats(statsData);

//     } catch (error) {
//       console.error('Error loading initial data:', error);
//       toast.error('Erreur de chargement des données');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadUsers = async () => {
//     try {
//       const response = await fetch('/api/admin/users');
//       const data = await response.json();
//       setUsers(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error('Error loading users:', error);
//       toast.error('Erreur chargement utilisateurs');
//     }
//   };

//   const loadCommunities = async () => {
//     try {
//       const response = await fetch('/api/communities');
//       const data = await response.json();
//       setCommunities(Array.isArray(data) ? data : []);
//       setStats(prev => ({ ...prev, totalCommunities: data.length }));
//     } catch (error) {
//       console.error('Error loading communities:', error);
//       toast.error('Erreur chargement communautés');
//     }
//   };

//   const loadCommunitiesForSelect = async () => {
//     try {
//       const response = await fetch('/api/communities');
//       const data = await response.json();
//       setCommunities(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error('Error loading communities:', error);
//     }
//   };

//   const loadSectors = async () => {
//     try {
//       const response = await fetch('/api/sectors');
//       const data = await response.json();
//       setSectors(Array.isArray(data) ? data : []);
//       setStats(prev => ({ ...prev, totalSectors: data.length }));
//     } catch (error) {
//       console.error('Error loading sectors:', error);
//       toast.error('Erreur chargement secteurs');
//     }
//   };

//   const loadEvents = async () => {
//     try {
//       const response = await fetch('/api/events');
//       const data = await response.json();
//       setEvents(Array.isArray(data) ? data : []);
//       setStats(prev => ({ ...prev, totalEvents: data.length }));
//     } catch (error) {
//       console.error('Error loading events:', error);
//       toast.error('Erreur chargement événements');
//     }
//   };

//   const loadAds = async () => {
//     try {
//       const response = await fetch('/api/ads');
//       const data = await response.json();
//       setAds(Array.isArray(data) ? data : []);
//       setStats(prev => ({ ...prev, totalAds: data.length }));
//     } catch (error) {
//       console.error('Error loading ads:', error);
//       toast.error('Erreur chargement annonces');
//     }
//   };

//   // ============================================
//   // CRUD - COMMUNAUTÉS
//   // ============================================
//   const createCommunity = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setActionLoading('community');
//     try {
//       const response = await fetch('/api/communities', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newCommunity)
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success('Communauté créée avec succès');
//         setShowCreateCommunity(false);
//         setNewCommunity({ name: '', type: 'city', country: 'Cameroun', city: '' });
//         loadCommunities();
//       } else {
//         toast.error(data.error || 'Erreur lors de la création');
//       }
//     } catch (error) {
//       console.error('Error creating community:', error);
//       toast.error('Erreur serveur');
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const updateCommunity = async () => {
//     if (!editingItem) return;
//     setActionLoading('update-community');
//     try {
//       const response = await fetch(`/api/communities/${editingItem._id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(editingItem)
//       });

//       if (response.ok) {
//         toast.success('Communauté mise à jour');
//         setShowEditModal(false);
//         setEditingItem(null);
//         loadCommunities();
//       } else {
//         toast.error('Erreur lors de la mise à jour');
//       }
//     } catch (error) {
//       console.error('Error updating community:', error);
//       toast.error('Erreur serveur');
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const deleteCommunity = async (id: string) => {
//     if (!confirm('Supprimer cette communauté ? Tous les secteurs liés seront également supprimés.')) return;
//     setActionLoading(id);
//     try {
//       const response = await fetch(`/api/communities/${id}`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         toast.success('Communauté supprimée');
//         loadCommunities();
//       } else {
//         toast.error('Erreur lors de la suppression');
//       }
//     } catch (error) {
//       console.error('Error deleting community:', error);
//       toast.error('Erreur serveur');
//     } finally {
//       setActionLoading(null);
//     }
//   };

// const createSector = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setActionLoading('create-sector');
//   try {
//     const response = await fetch('/api/admin/sectors/create', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newSector)
//     });

//     const data = await response.json();

//     if (response.ok) {
//       if (data.sector?.tempPassword) {
//         // ✅ Nouveau président créé — afficher mot de passe à l'admin
//         toast.success(
//           `✅ Secteur "${data.sector.name}" créé !\n🔑 Mot de passe de ${newSector.presidentName} : ${data.sector.tempPassword}`,
//           { duration: 60000 } // visible 20 secondes
//         );
//       } else {
//         // Président existant — pas de nouveau mot de passe
//         toast.success(`✅ Secteur "${data.sector.name}" créé — président existant conservé`);
//       }

//       setShowCreateSector(false);
//       setNewSector({
//         name: '',
//         description: '',
//         communityId: '',
//         presidentPhone: '',
//         presidentName: '',
//         sendInvitation: true
//       });
//       loadSectors();
//     } else {
//       toast.error(data.error || 'Erreur lors de la création');
//     }
//   } catch (error) {
//     console.error('Error creating sector:', error);
//     toast.error('Erreur serveur');
//   } finally {
//     setActionLoading(null);
//   }
// };

































//   // 🔥 AJOUTER CETTE FONCTION
//   const updateSector = async () => {
//     if (!editingItem) return;
//     setActionLoading('update-sector');
//     try {
//       const response = await fetch(`/api/admin/sectors/${editingItem._id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           name: editingItem.name,
//           description: editingItem.description,
//           presidentPhone: editingItem.presidentPhone,
//           presidentName: editingItem.presidentName
//         })
//       });

//       if (response.ok) {
//         toast.success('Secteur mis à jour');
//         setShowEditModal(false);
//         setEditingItem(null);
//         loadSectors();
//       } else {
//         const data = await response.json();
//         toast.error(data.error || 'Erreur lors de la mise à jour');
//       }
//     } catch (error) {
//       console.error('Error updating sector:', error);
//       toast.error('Erreur serveur');
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const deleteSector = async (id: string) => {
//     if (!confirm('Supprimer ce secteur ? Tous les événements liés seront également supprimés.')) return;
//     setActionLoading(id);
//     try {
//       const response = await fetch(`/api/admin/sectors/${id}`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         toast.success('Secteur supprimé');
//         loadSectors();
//       } else {
//         toast.error('Erreur lors de la suppression');
//       }
//     } catch (error) {
//       console.error('Error deleting sector:', error);
//       toast.error('Erreur serveur');
//     } finally {
//       setActionLoading(null);
//     }
//   };




//   // ============================================
//   // CRUD - UTILISATEURS
//   // ============================================
//   const updateUserRole = async (userId: string, newRole: string) => {
//     setActionLoading(userId);
//     try {
//       const response = await fetch('/api/admin/users', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ userId, role: newRole })
//       });

//       if (response.ok) {
//         toast.success('Rôle utilisateur mis à jour');
//         loadUsers();
//       } else {
//         toast.error('Erreur lors de la mise à jour');
//       }
//     } catch (error) {
//       console.error('Error updating user role:', error);
//       toast.error('Erreur serveur');
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const toggleUserRestriction = async (userId: string, isRestricted: boolean) => {
//     setActionLoading(userId);
//     try {
//       const response = await fetch('/api/admin/users/toggle-restrict', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ userId, isRestricted: !isRestricted })
//       });

//       if (response.ok) {
//         toast.success(`Utilisateur ${!isRestricted ? 'bloqué' : 'débloqué'}`);
//         loadUsers();
//       } else {
//         toast.error('Erreur lors de l\'action');
//       }
//     } catch (error) {
//       console.error('Error toggling restriction:', error);
//       toast.error('Erreur serveur');
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const deleteUser = async (userId: string) => {
//     if (!confirm('Supprimer cet utilisateur ? Cette action est irréversible.')) return;
//     setActionLoading(userId);
//     try {
//       const response = await fetch(`/api/admin/users/${userId}`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         toast.success('Utilisateur supprimé');
//         loadUsers();
//       } else {
//         toast.error('Erreur lors de la suppression');
//       }
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       toast.error('Erreur serveur');
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   // ============================================
//   // CRUD - ÉVÉNEMENTS
//   // ============================================
//   const createEvent = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setActionLoading('event');
//     try {
//       const response = await fetch('/api/events', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newEvent)
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success('Événement créé avec succès');
//         setShowCreateEvent(false);
//         setNewEvent({ title: '', description: '', date: '', location: '', sectorId: '', is_boosted: false });
//         loadEvents();
//       } else {
//         toast.error(data.error || 'Erreur lors de la création');
//       }
//     } catch (error) {
//       console.error('Error creating event:', error);
//       toast.error('Erreur serveur');
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const updateEvent = async () => {
//     if (!editingItem) return;
//     setActionLoading('update-event');
//     try {
//       const response = await fetch(`/api/events/${editingItem._id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(editingItem)
//       });

//       if (response.ok) {
//         toast.success('Événement mis à jour');
//         setShowEditModal(false);
//         setEditingItem(null);
//         loadEvents();
//       } else {
//         toast.error('Erreur lors de la mise à jour');
//       }
//     } catch (error) {
//       console.error('Error updating event:', error);
//       toast.error('Erreur serveur');
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const deleteEvent = async (eventId: string) => {
//     if (!confirm('Supprimer cet événement ?')) return;
//     setActionLoading(eventId);
//     try {
//       const response = await fetch(`/api/events/${eventId}`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         toast.success('Événement supprimé');
//         loadEvents();
//       } else {
//         toast.error('Erreur lors de la suppression');
//       }
//     } catch (error) {
//       console.error('Error deleting event:', error);
//       toast.error('Erreur serveur');
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   // ============================================
//   // CRUD - ANNONCES
//   // ============================================
//   const createAd = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setActionLoading('ad');
//     try {
//       const response = await fetch('/api/ads', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newAd)
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success('Annonce créée avec succès');
//         setShowCreateAd(false);
//         setNewAd({ title: '', content: '', sectorId: '', communityId: '' });
//         loadAds();
//       } else {
//         toast.error(data.error || 'Erreur lors de la création');
//       }
//     } catch (error) {
//       console.error('Error creating ad:', error);
//       toast.error('Erreur serveur');
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const updateAd = async () => {
//     if (!editingItem) return;
//     setActionLoading('update-ad');
//     try {
//       const response = await fetch(`/api/ads/${editingItem._id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(editingItem)
//       });

//       if (response.ok) {
//         toast.success('Annonce mise à jour');
//         setShowEditModal(false);
//         setEditingItem(null);
//         loadAds();
//       } else {
//         toast.error('Erreur lors de la mise à jour');
//       }
//     } catch (error) {
//       console.error('Error updating ad:', error);
//       toast.error('Erreur serveur');
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const deleteAd = async (adId: string) => {
//     if (!confirm('Supprimer cette annonce ?')) return;
//     setActionLoading(adId);
//     try {
//       const response = await fetch(`/api/ads/${adId}`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         toast.success('Annonce supprimée');
//         loadAds();
//       } else {
//         toast.error('Erreur lors de la suppression');
//       }
//     } catch (error) {
//       console.error('Error deleting ad:', error);
//       toast.error('Erreur serveur');
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const toggleSponsor = async (adId: string, isSponsored: boolean) => {
//     setActionLoading(adId);
//     try {
//       const response = await fetch('/api/ads/sponsor', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ adId })
//       });

//       if (response.ok) {
//         toast.success(isSponsored ? 'Sponsor retiré' : 'Annonce sponsorisée');
//         loadAds();
//       } else {
//         toast.error('Erreur lors de l\'action');
//       }
//     } catch (error) {
//       console.error('Error toggling sponsor:', error);
//       toast.error('Erreur serveur');
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   // ============================================
//   // OPEN EDIT MODAL
//   // ============================================
//   const openEditModal = (item: any, type: string) => {
//     setEditingItem({ ...item, _type: type });
//     setShowEditModal(true);
//   };

//   const renderEditForm = () => {
//     if (!editingItem) return null;

//     switch (editingItem._type) {
//       case 'community':
//         return (
//           <div className="space-y-4">
//             <Input label="Nom" value={editingItem.name} onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })} />
//             <Input label="Pays" value={editingItem.country} onChange={(e) => setEditingItem({ ...editingItem, country: e.target.value })} />
//             {editingItem.type === 'city' && <Input label="Ville" value={editingItem.city || ''} onChange={(e) => setEditingItem({ ...editingItem, city: e.target.value })} />}
//             <div className="flex space-x-3 pt-4">
//               <Button onClick={updateCommunity} disabled={actionLoading === 'update-community'}>Enregistrer</Button>
//               <Button variant="secondary" onClick={() => setShowEditModal(false)}>Annuler</Button>
//             </div>
//           </div>
//         );

//       case 'sector':
//         return (
//           <div className="space-y-4">
//             <Input label="Nom du secteur" value={editingItem.name} onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })} />
//             <Input label="Description" value={editingItem.description || ''} onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })} />
//             <Input label="Téléphone président" value={editingItem.presidentPhone} onChange={(e) => setEditingItem({ ...editingItem, presidentPhone: e.target.value })} />
//             <Input label="Nom président" value={editingItem.presidentName} onChange={(e) => setEditingItem({ ...editingItem, presidentName: e.target.value })} />
//             <div className="flex space-x-3 pt-4">
//               <Button onClick={updateSector} disabled={actionLoading === 'update-sector'}>Enregistrer</Button>
//               <Button variant="secondary" onClick={() => setShowEditModal(false)}>Annuler</Button>
//             </div>
//           </div>
//         );

//       case 'event':
//         return (
//           <div className="space-y-4">
//             <Input label="Titre" value={editingItem.title} onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })} />
//             <Input label="Description" value={editingItem.description} onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })} />
//             <Input label="Lieu" value={editingItem.location} onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })} />
//             <input type="datetime-local" value={editingItem.date?.slice(0, 16)} onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
//             <div className="flex items-center space-x-2">
//               <input type="checkbox" checked={editingItem.is_boosted} onChange={(e) => setEditingItem({ ...editingItem, is_boosted: e.target.checked })} className="w-4 h-4" />
//               <label>Événement boosté</label>
//             </div>
//             <div className="flex space-x-3 pt-4">
//               <Button onClick={updateEvent} disabled={actionLoading === 'update-event'}>Enregistrer</Button>
//               <Button variant="secondary" onClick={() => setShowEditModal(false)}>Annuler</Button>
//             </div>
//           </div>
//         );

//       case 'ad':
//         return (
//           <div className="space-y-4">
//             <Input label="Titre" value={editingItem.title} onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })} />
//             <Input label="Contenu" value={editingItem.content} onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })} />
//             <div className="flex space-x-3 pt-4">
//               <Button onClick={updateAd} disabled={actionLoading === 'update-ad'}>Enregistrer</Button>
//               <Button variant="secondary" onClick={() => setShowEditModal(false)}>Annuler</Button>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
//       </div>
//     );
//   }

//   const cities = communities.filter(c => c.type === 'city');
//   const diasporaCountries = communities.filter(c => c.type === 'country');

//   return (
//     <div className="space-y-6">
//       {/* Navigation Tabs */}
//       <div className="flex flex-wrap gap-2 border-b">
//         <button onClick={() => setActiveTab('dashboard')} className={`px-4 py-2 rounded-t-lg transition ${activeTab === 'dashboard' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}>📊 Dashboard</button>
//         <button onClick={() => setActiveTab('users')} className={`px-4 py-2 rounded-t-lg transition ${activeTab === 'users' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}>👥 Utilisateurs</button>
//         <button onClick={() => setActiveTab('communities')} className={`px-4 py-2 rounded-t-lg transition ${activeTab === 'communities' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}>🌍 Communautés</button>
//         <button onClick={() => setActiveTab('create-sector')} className={`px-4 py-2 rounded-t-lg transition ${activeTab === 'create-sector' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}>➕ Créer secteur</button>
//         <button onClick={() => setActiveTab('all-sectors')} className={`px-4 py-2 rounded-t-lg transition ${activeTab === 'all-sectors' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}>📋 Tous les secteurs</button>
//         <button onClick={() => setActiveTab('events')} className={`px-4 py-2 rounded-t-lg transition ${activeTab === 'events' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}>📅 Événements</button>
//         <button onClick={() => setActiveTab('ads')} className={`px-4 py-2 rounded-t-lg transition ${activeTab === 'ads' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}>📢 Annonces</button>
//       </div>

//       {/* ============================================ */}
//       {/* DASHBOARD TAB */}
//       {/* ============================================ */}
//       {activeTab === 'dashboard' && (
//         <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
//           <Card className="p-4 text-center"><div className="text-3xl mb-2">👥</div><div className="text-2xl font-bold">{stats.totalUsers}</div><div className="text-gray-600">Utilisateurs</div></Card>
//           <Card className="p-4 text-center"><div className="text-3xl mb-2">🌍</div><div className="text-2xl font-bold">{stats.totalCommunities}</div><div className="text-gray-600">Communautés</div></Card>
//           <Card className="p-4 text-center"><div className="text-3xl mb-2">🏘️</div><div className="text-2xl font-bold">{stats.totalSectors}</div><div className="text-gray-600">Secteurs</div></Card>
//           <Card className="p-4 text-center"><div className="text-3xl mb-2">📅</div><div className="text-2xl font-bold">{stats.totalEvents}</div><div className="text-gray-600">Événements</div></Card>
//           <Card className="p-4 text-center"><div className="text-3xl mb-2">📢</div><div className="text-2xl font-bold">{stats.totalAds}</div><div className="text-gray-600">Annonces</div></Card>
//         </div>
//       )}






//       {/* ============================================ */}
//       {/* USERS TAB */}
//       {/* ============================================ */}
//       {activeTab === 'users' && (
//         <Card className="p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold">👥 Gestion des utilisateurs</h2>
//             <Button onClick={() => router.push('/admin/users/create')}>
//               + Créer un utilisateur
//             </Button>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-4 py-2 text-left">Nom</th>
//                   <th className="px-4 py-2 text-left">Téléphone</th>
//                   <th className="px-4 py-2 text-left">Rôle</th>
//                   <th className="px-4 py-2 text-left">Statut</th>
//                   <th className="px-4 py-2 text-left">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((user) => (
//                   <tr key={user._id} className="border-t">
//                     <td className="px-4 py-3">{user.name}</td>
//                     <td className="px-4 py-3">{user.phone}</td>
//                     <td className="px-4 py-3">
//                       <select
//                         value={user.role}
//                         onChange={(e) => updateUserRole(user._id, e.target.value)}
//                         className="px-2 py-1 border rounded text-sm"
//                         disabled={actionLoading === user._id}
//                       >
//                         <option value="member">Membre</option>
//                         <option value="sector_president">Président</option>
//                         <option value="community_chief">Chef communauté</option>
//                         <option value="village_chief">Chef village</option>
//                         <option value="super_admin">Super Admin</option>
//                       </select>
//                     </td>
//                     <td className="px-4 py-3">
//                       <span className={`px-2 py-1 rounded-full text-xs ${user.isRestricted ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
//                         {user.isRestricted ? 'Bloqué' : 'Actif'}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="flex gap-2">
//                         <Button size="sm" variant="danger" onClick={() => deleteUser(user._id)} disabled={actionLoading === user._id}>
//                           🗑️ Supprimer
//                         </Button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </Card>
//       )}

//       {/* ============================================ */}
//       {/* COMMUNITIES TAB */}
//       {/* ============================================ */}
//       {activeTab === 'communities' && (
//         <Card className="p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold">🌍 Gestion des communautés</h2>
//             <Button onClick={() => setShowCreateCommunity(!showCreateCommunity)}>{showCreateCommunity ? 'Annuler' : '+ Créer'}</Button>
//           </div>

//           {showCreateCommunity && (
//             <form onSubmit={createCommunity} className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
//               <Input label="Nom" value={newCommunity.name} onChange={(e) => setNewCommunity({ ...newCommunity, name: e.target.value })} required />
//               <select value={newCommunity.type} onChange={(e) => setNewCommunity({ ...newCommunity, type: e.target.value })} className="w-full px-3 py-2 border rounded-lg">
//                 <option value="city">🏙️ Ville (Cameroun)</option>
//                 <option value="country">🌍 Pays (Diaspora)</option>
//               </select>
//               <Input label="Pays" value={newCommunity.country} onChange={(e) => setNewCommunity({ ...newCommunity, country: e.target.value })} required />
//               {newCommunity.type === 'city' && <Input label="Ville" value={newCommunity.city} onChange={(e) => setNewCommunity({ ...newCommunity, city: e.target.value })} />}
//               <Button type="submit" disabled={actionLoading === 'community'}>Créer</Button>
//             </form>
//           )}

//           <div className="space-y-6">
//             <div>
//               <h3 className="font-semibold text-green-700 mb-2">🇨🇲 Villes ({cities.length})</h3>
//               {cities.map(c => (
//                 <div key={c._id} className="flex justify-between items-center p-2 border-b">
//                   <span>📍 {c.name} ({c.country})</span>
//                   <div className="flex space-x-2">
//                     <Button size="sm" variant="secondary" onClick={() => openEditModal(c, 'community')}>✏️</Button>
//                     <Button size="sm" variant="danger" onClick={() => deleteCommunity(c._id)} disabled={actionLoading === c._id}>🗑️</Button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div>
//               <h3 className="font-semibold text-blue-700 mb-2">🌍 Diaspora ({diasporaCountries.length})</h3>
//               {diasporaCountries.map(c => (
//                 <div key={c._id} className="flex justify-between items-center p-2 border-b">
//                   <span>🌍 {c.name} ({c.country})</span>
//                   <div className="flex space-x-2">
//                     <Button size="sm" variant="secondary" onClick={() => openEditModal(c, 'community')}>✏️</Button>
//                     <Button size="sm" variant="danger" onClick={() => deleteCommunity(c._id)} disabled={actionLoading === c._id}>🗑️</Button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Card>
//       )}

//       {/* ============================================ */}
//       {/* CREATE SECTOR TAB */}
//       {/* ============================================ */}
//       {activeTab === 'create-sector' && (
//         <Card className="p-6">
//           <h2 className="text-xl font-bold mb-4">➕ Créer un secteur</h2>
//           {cities.length === 0 ? <div className="bg-yellow-50 p-4 text-center">⚠️ Créez d'abord une ville</div> : (
//             <form onSubmit={createSector} className="space-y-4 max-w-lg">
//               <Input label="Nom" value={newSector.name} onChange={(e) => setNewSector({ ...newSector, name: e.target.value })} required />
//               <textarea placeholder="Description" value={newSector.description} onChange={(e) => setNewSector({ ...newSector, description: e.target.value })} className="w-full px-3 py-2 border rounded-lg" rows={3} />
//               <select required value={newSector.communityId} onChange={(e) => setNewSector({ ...newSector, communityId: e.target.value })} className="w-full px-3 py-2 border rounded-lg">
//                 <option value="">Sélectionner une ville</option>
//                 {cities.map(c => <option key={c._id} value={c._id}>📍 {c.name}</option>)}
//               </select>

//               <Input label="Téléphone président" value={newSector.presidentPhone} onChange={(e) => setNewSector({ ...newSector, presidentPhone: e.target.value })} required />
//               <Input label="Nom président" value={newSector.presidentName} onChange={(e) => setNewSector({ ...newSector, presidentName: e.target.value })} required />

//               {/* 🔥 PLUS DE CHAMP MOT DE PASSE */}

//               <div className="flex items-center space-x-2">
//                 <input type="checkbox" checked={newSector.sendInvitation} onChange={(e) => setNewSector({ ...newSector, sendInvitation: e.target.checked })} className="w-4 h-4" />
//                 <label>Envoyer une invitation</label>
//               </div>

//               <Button type="submit" disabled={actionLoading === 'create-sector'}>
//                 Créer le secteur
//               </Button>
//             </form>
//           )}
//         </Card>
//       )}
//       {/* ============================================ */}
//       {/* ALL SECTORS TAB */}
//       {/* ============================================ */}
//       {activeTab === 'all-sectors' && (
//         <Card className="p-6">
//           <h2 className="text-xl font-bold mb-4">📋 Tous les secteurs</h2>
//           {sectors.length === 0 ? <p className="text-gray-500 text-center py-8">Aucun secteur</p> : (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-4 py-2 text-left">Nom</th>
//                     <th className="px-4 py-2 text-left">Ville</th>
//                     <th className="px-4 py-2 text-left">Président</th>
//                     <th className="px-4 py-2 text-left">Membres</th>
//                     <th className="px-4 py-2 text-left">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {sectors.map(s => (
//                     <tr key={s._id} className="border-t">
//                       <td className="px-4 py-3">{s.name}</td>
//                       <td className="px-4 py-3">{s.communityId?.name || '-'}</td>
//                       <td className="px-4 py-3">{s.presidentName}</td>
//                       <td className="px-4 py-3">{s.membersCount}</td>
//                       <td className="px-4 py-3">
//                         <div className="flex space-x-2">
//                           <Button size="sm" variant="secondary" onClick={() => openEditModal(s, 'sector')}>✏️ Modifier</Button>
//                           <Button size="sm" variant="danger" onClick={() => deleteSector(s._id)} disabled={actionLoading === s._id}>🗑️ Supprimer</Button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </Card>
//       )}

//       {/* ============================================ */}
//       {/* EVENTS TAB */}
//       {/* ============================================ */}
//       {activeTab === 'events' && (
//         <Card className="p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold">📅 Gestion des événements</h2>
//             <Button onClick={() => setShowCreateEvent(!showCreateEvent)}>{showCreateEvent ? 'Annuler' : '+ Créer'}</Button>
//           </div>

//           {showCreateEvent && (
//             <form onSubmit={createEvent} className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
//               <Input label="Titre" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} required />
//               <textarea placeholder="Description" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} className="w-full px-3 py-2 border rounded-lg" rows={3} />
//               <input type="datetime-local" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required />
//               <Input label="Lieu" value={newEvent.location} onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} required />
//               <select value={newEvent.sectorId} onChange={(e) => setNewEvent({ ...newEvent, sectorId: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required>
//                 <option value="">Sélectionner un secteur</option>
//                 {sectors.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
//               </select>
//               <div className="flex items-center space-x-2">
//                 <input type="checkbox" checked={newEvent.is_boosted} onChange={(e) => setNewEvent({ ...newEvent, is_boosted: e.target.checked })} className="w-4 h-4" />
//                 <label>⭐ Booster</label>
//               </div>
//               <Button type="submit" disabled={actionLoading === 'event'}>Créer</Button>
//             </form>
//           )}

//           <div className="space-y-2">
//             {events.map(e => (
//               <div key={e._id} className={`p-3 border rounded-lg flex justify-between items-center ${e.is_boosted ? 'border-yellow-400 bg-yellow-50' : ''}`}>
//                 <div>
//                   <div className="font-bold">{e.title}</div>
//                   <div className="text-sm text-gray-600">{new Date(e.date).toLocaleDateString()} • {e.location}</div>
//                   <div className="text-xs text-gray-500">Participants: {e.participants?.length || 0}</div>
//                 </div>
//                 <div className="flex space-x-2">
//                   <Button size="sm" variant="secondary" onClick={() => openEditModal(e, 'event')}>✏️</Button>
//                   <Button size="sm" variant="danger" onClick={() => deleteEvent(e._id)} disabled={actionLoading === e._id}>🗑️</Button>
//                 </div>
//               </div>
//             ))}
//             {events.length === 0 && <p className="text-gray-500 text-center py-8">Aucun événement</p>}
//           </div>
//         </Card>
//       )}

//       {/* ============================================ */}
//       {/* ADS TAB */}
//       {/* ============================================ */}
//       {activeTab === 'ads' && (
//         <Card className="p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold">📢 Gestion des annonces</h2>
//             <Button onClick={() => setShowCreateAd(!showCreateAd)}>{showCreateAd ? 'Annuler' : '+ Créer'}</Button>
//           </div>

//           {showCreateAd && (
//             <form onSubmit={createAd} className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
//               <Input label="Titre" value={newAd.title} onChange={(e) => setNewAd({ ...newAd, title: e.target.value })} required />
//               <textarea placeholder="Contenu" value={newAd.content} onChange={(e) => setNewAd({ ...newAd, content: e.target.value })} className="w-full px-3 py-2 border rounded-lg" rows={3} required />
//               <Button type="submit" disabled={actionLoading === 'ad'}>Créer</Button>
//             </form>
//           )}

//           <div className="space-y-2">
//             {ads.map(a => (
//               <div key={a._id} className={`p-3 border rounded-lg flex justify-between items-center ${a.is_sponsored ? 'border-yellow-400 bg-yellow-50' : ''}`}>
//                 <div>
//                   <div className="font-bold">{a.title}</div>
//                   <div className="text-sm text-gray-600">{a.content.substring(0, 100)}...</div>
//                   <div className="text-xs text-gray-500">{a.is_sponsored ? '⭐ Sponsorée' : 'Normale'}</div>
//                 </div>
//                 <div className="flex space-x-2">
//                   <Button size="sm" variant="secondary" onClick={() => openEditModal(a, 'ad')}>✏️</Button>
//                   <Button size="sm" variant="success" onClick={() => toggleSponsor(a._id, a.is_sponsored)} disabled={actionLoading === a._id}>{a.is_sponsored ? 'Retirer sponsor' : 'Sponsoriser'}</Button>
//                   <Button size="sm" variant="danger" onClick={() => deleteAd(a._id)} disabled={actionLoading === a._id}>🗑️</Button>
//                 </div>
//               </div>
//             ))}
//             {ads.length === 0 && <p className="text-gray-500 text-center py-8">Aucune annonce</p>}
//           </div>
//         </Card>
//       )}

//       {/* ============================================ */}
//       {/* MODAL ÉDITION */}
//       {/* ============================================ */}
//       {showEditModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <Card className="max-w-lg w-full mx-4 p-6">
//             <h2 className="text-xl font-bold mb-4">✏️ Modifier</h2>
//             {renderEditForm()}
//           </Card>
//         </div>
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
  FiUsers, FiGlobe, FiGrid, FiCalendar, FiVolume2, 
  FiPlus, FiEdit2, FiTrash2, FiX, FiChevronRight,
  FiShield, FiCrown, FiStar, FiMapPin, FiMail, FiPhone,
  FiCheckCircle, FiAlertCircle, FiTrendingUp, FiAward,
  FiBriefcase, FiHome, FiUserPlus, FiUserMinus, FiRefreshCw
} from 'react-icons/fi';
import { MdDashboard, MdAdminPanelSettings, MdPeople, MdEvent, MdAdsClick } from 'react-icons/md';
import { GiCrown, GiKingdom } from 'react-icons/gi';

// ============================================
// TYPES
// ============================================

interface Sector {
  _id: string;
  name: string;
  description?: string;
  communityId: { _id: string; name: string; type: string };
  presidentName: string;
  presidentPhone: string;
  status: string;
  membersCount: number;
  createdAt: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  isRestricted: boolean;
  createdAt: string;
}

interface Community {
  _id: string;
  name: string;
  type: string;
  country: string;
  city?: string;
  createdAt: string;
}

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  sectorId: { _id: string; name: string };
  is_boosted: boolean;
  createdBy: { name: string };
  participants: string[];
  createdAt: string;
}

interface Ad {
  _id: string;
  title: string;
  content: string;
  is_sponsored: boolean;
  sponsor_expires_at?: string;
  createdBy: { _id: string; name: string; email: string };
  sectorId?: { _id: string; name: string };
  communityId?: { _id: string; name: string };
  createdAt: string;
}

// ============================================
// COMPOSANT PRINCIPAL
// ============================================

export default function AdminDashboard() {
  const router = useRouter();

  // État onglet actif
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // États pour les modales d'édition
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // ============================================
  // STATS
  // ============================================
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCommunities: 0,
    totalSectors: 0,
    totalEvents: 0,
    totalAds: 0,
    totalRevenue: 0
  });

  // ============================================
  // UTILISATEURS
  // ============================================
  const [users, setUsers] = useState<User[]>([]);

  // ============================================
  // COMMUNAUTÉS
  // ============================================
  const [communities, setCommunities] = useState<Community[]>([]);
  const [showCreateCommunity, setShowCreateCommunity] = useState(false);
  const [newCommunity, setNewCommunity] = useState({
    name: '',
    type: 'city',
    country: 'Cameroun',
    city: ''
  });

  // ============================================
  // SECTEURS
  // ============================================
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [showCreateSector, setShowCreateSector] = useState(false);
  const [newSector, setNewSector] = useState({
    name: '',
    description: '',
    communityId: '',
    presidentPhone: '',
    presidentName: '',
    sendInvitation: true
  });

  // ============================================
  // ÉVÉNEMENTS
  // ============================================
  const [events, setEvents] = useState<Event[]>([]);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    sectorId: '',
    is_boosted: false
  });

  // ============================================
  // ANNONCES
  // ============================================
  const [ads, setAds] = useState<Ad[]>([]);
  const [showCreateAd, setShowCreateAd] = useState(false);
  const [newAd, setNewAd] = useState({
    title: '',
    content: '',
    sectorId: '',
    communityId: ''
  });

  // ============================================
  // CHARGEMENT DES DONNÉES
  // ============================================
  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (activeTab === 'users') loadUsers();
    if (activeTab === 'communities') loadCommunities();
    if (activeTab === 'create-sector') loadCommunitiesForSelect();
    if (activeTab === 'all-sectors') loadSectors();
    if (activeTab === 'events') loadEvents();
    if (activeTab === 'ads') loadAds();
  }, [activeTab]);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [userRes, statsRes] = await Promise.all([
        fetch('/api/auth/me'),
        fetch('/api/admin/stats')
      ]);

      if (!userRes.ok) {
        router.push('/login');
        return;
      }

      const userData = await userRes.json();
      if (userData.user.role !== 'super_admin') {
        router.push('/dashboard');
        return;
      }

      const statsData = await statsRes.json();
      setStats(statsData);

    } catch (error) {
      console.error('Error loading initial data:', error);
      toast.error('Erreur de chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      const data = await response.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading users:', error);
      toast.error('Erreur chargement utilisateurs');
    }
  };

  const loadCommunities = async () => {
    try {
      const response = await fetch('/api/communities');
      const data = await response.json();
      setCommunities(Array.isArray(data) ? data : []);
      setStats(prev => ({ ...prev, totalCommunities: data.length }));
    } catch (error) {
      console.error('Error loading communities:', error);
      toast.error('Erreur chargement communautés');
    }
  };

  const loadCommunitiesForSelect = async () => {
    try {
      const response = await fetch('/api/communities');
      const data = await response.json();
      setCommunities(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading communities:', error);
    }
  };

  const loadSectors = async () => {
    try {
      const response = await fetch('/api/sectors');
      const data = await response.json();
      setSectors(Array.isArray(data) ? data : []);
      setStats(prev => ({ ...prev, totalSectors: data.length }));
    } catch (error) {
      console.error('Error loading sectors:', error);
      toast.error('Erreur chargement secteurs');
    }
  };

  const loadEvents = async () => {
    try {
      const response = await fetch('/api/events');
      const data = await response.json();
      setEvents(Array.isArray(data) ? data : []);
      setStats(prev => ({ ...prev, totalEvents: data.length }));
    } catch (error) {
      console.error('Error loading events:', error);
      toast.error('Erreur chargement événements');
    }
  };

  const loadAds = async () => {
    try {
      const response = await fetch('/api/ads');
      const data = await response.json();
      setAds(Array.isArray(data) ? data : []);
      setStats(prev => ({ ...prev, totalAds: data.length }));
    } catch (error) {
      console.error('Error loading ads:', error);
      toast.error('Erreur chargement annonces');
    }
  };

  // ============================================
  // CRUD - COMMUNAUTÉS
  // ============================================
  const createCommunity = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading('community');
    try {
      const response = await fetch('/api/communities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCommunity)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Communauté créée avec succès');
        setShowCreateCommunity(false);
        setNewCommunity({ name: '', type: 'city', country: 'Cameroun', city: '' });
        loadCommunities();
      } else {
        toast.error(data.error || 'Erreur lors de la création');
      }
    } catch (error) {
      console.error('Error creating community:', error);
      toast.error('Erreur serveur');
    } finally {
      setActionLoading(null);
    }
  };

  const updateCommunity = async () => {
    if (!editingItem) return;
    setActionLoading('update-community');
    try {
      const response = await fetch(`/api/communities/${editingItem._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem)
      });

      if (response.ok) {
        toast.success('Communauté mise à jour');
        setShowEditModal(false);
        setEditingItem(null);
        loadCommunities();
      } else {
        toast.error('Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Error updating community:', error);
      toast.error('Erreur serveur');
    } finally {
      setActionLoading(null);
    }
  };

  const deleteCommunity = async (id: string) => {
    if (!confirm('Supprimer cette communauté ? Tous les secteurs liés seront également supprimés.')) return;
    setActionLoading(id);
    try {
      const response = await fetch(`/api/communities/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Communauté supprimée');
        loadCommunities();
      } else {
        toast.error('Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Error deleting community:', error);
      toast.error('Erreur serveur');
    } finally {
      setActionLoading(null);
    }
  };

  const createSector = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading('create-sector');
    try {
      const response = await fetch('/api/admin/sectors/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSector)
      });

      const data = await response.json();

      if (response.ok) {
        if (data.sector?.tempPassword) {
          toast.success(
            `✅ Secteur "${data.sector.name}" créé !\n🔑 Mot de passe de ${newSector.presidentName} : ${data.sector.tempPassword}`,
            { duration: 60000 }
          );
        } else {
          toast.success(`✅ Secteur "${data.sector.name}" créé — président existant conservé`);
        }

        setShowCreateSector(false);
        setNewSector({
          name: '',
          description: '',
          communityId: '',
          presidentPhone: '',
          presidentName: '',
          sendInvitation: true
        });
        loadSectors();
      } else {
        toast.error(data.error || 'Erreur lors de la création');
      }
    } catch (error) {
      console.error('Error creating sector:', error);
      toast.error('Erreur serveur');
    } finally {
      setActionLoading(null);
    }
  };

  const updateSector = async () => {
    if (!editingItem) return;
    setActionLoading('update-sector');
    try {
      const response = await fetch(`/api/admin/sectors/${editingItem._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editingItem.name,
          description: editingItem.description,
          presidentPhone: editingItem.presidentPhone,
          presidentName: editingItem.presidentName
        })
      });

      if (response.ok) {
        toast.success('Secteur mis à jour');
        setShowEditModal(false);
        setEditingItem(null);
        loadSectors();
      } else {
        const data = await response.json();
        toast.error(data.error || 'Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Error updating sector:', error);
      toast.error('Erreur serveur');
    } finally {
      setActionLoading(null);
    }
  };

  const deleteSector = async (id: string) => {
    if (!confirm('Supprimer ce secteur ? Tous les événements liés seront également supprimés.')) return;
    setActionLoading(id);
    try {
      const response = await fetch(`/api/admin/sectors/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Secteur supprimé');
        loadSectors();
      } else {
        toast.error('Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Error deleting sector:', error);
      toast.error('Erreur serveur');
    } finally {
      setActionLoading(null);
    }
  };

  // ============================================
  // CRUD - UTILISATEURS
  // ============================================
  const updateUserRole = async (userId: string, newRole: string) => {
    setActionLoading(userId);
    try {
      const response = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role: newRole })
      });

      if (response.ok) {
        toast.success('Rôle utilisateur mis à jour');
        loadUsers();
      } else {
        toast.error('Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Erreur serveur');
    } finally {
      setActionLoading(null);
    }
  };

  const toggleUserRestriction = async (userId: string, isRestricted: boolean) => {
    setActionLoading(userId);
    try {
      const response = await fetch('/api/admin/users/toggle-restrict', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, isRestricted: !isRestricted })
      });

      if (response.ok) {
        toast.success(`Utilisateur ${!isRestricted ? 'bloqué' : 'débloqué'}`);
        loadUsers();
      } else {
        toast.error('Erreur lors de l\'action');
      }
    } catch (error) {
      console.error('Error toggling restriction:', error);
      toast.error('Erreur serveur');
    } finally {
      setActionLoading(null);
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('Supprimer cet utilisateur ? Cette action est irréversible.')) return;
    setActionLoading(userId);
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Utilisateur supprimé');
        loadUsers();
      } else {
        toast.error('Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Erreur serveur');
    } finally {
      setActionLoading(null);
    }
  };

  // ============================================
  // CRUD - ÉVÉNEMENTS
  // ============================================
  const createEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading('event');
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Événement créé avec succès');
        setShowCreateEvent(false);
        setNewEvent({ title: '', description: '', date: '', location: '', sectorId: '', is_boosted: false });
        loadEvents();
      } else {
        toast.error(data.error || 'Erreur lors de la création');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Erreur serveur');
    } finally {
      setActionLoading(null);
    }
  };

  const updateEvent = async () => {
    if (!editingItem) return;
    setActionLoading('update-event');
    try {
      const response = await fetch(`/api/events/${editingItem._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem)
      });

      if (response.ok) {
        toast.success('Événement mis à jour');
        setShowEditModal(false);
        setEditingItem(null);
        loadEvents();
      } else {
        toast.error('Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Error updating event:', error);
      toast.error('Erreur serveur');
    } finally {
      setActionLoading(null);
    }
  };

  const deleteEvent = async (eventId: string) => {
    if (!confirm('Supprimer cet événement ?')) return;
    setActionLoading(eventId);
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Événement supprimé');
        loadEvents();
      } else {
        toast.error('Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Erreur serveur');
    } finally {
      setActionLoading(null);
    }
  };

  // ============================================
  // CRUD - ANNONCES
  // ============================================
  const createAd = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading('ad');
    try {
      const response = await fetch('/api/ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAd)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Annonce créée avec succès');
        setShowCreateAd(false);
        setNewAd({ title: '', content: '', sectorId: '', communityId: '' });
        loadAds();
      } else {
        toast.error(data.error || 'Erreur lors de la création');
      }
    } catch (error) {
      console.error('Error creating ad:', error);
      toast.error('Erreur serveur');
    } finally {
      setActionLoading(null);
    }
  };

  const updateAd = async () => {
    if (!editingItem) return;
    setActionLoading('update-ad');
    try {
      const response = await fetch(`/api/ads/${editingItem._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem)
      });

      if (response.ok) {
        toast.success('Annonce mise à jour');
        setShowEditModal(false);
        setEditingItem(null);
        loadAds();
      } else {
        toast.error('Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Error updating ad:', error);
      toast.error('Erreur serveur');
    } finally {
      setActionLoading(null);
    }
  };

  const deleteAd = async (adId: string) => {
    if (!confirm('Supprimer cette annonce ?')) return;
    setActionLoading(adId);
    try {
      const response = await fetch(`/api/ads/${adId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Annonce supprimée');
        loadAds();
      } else {
        toast.error('Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Error deleting ad:', error);
      toast.error('Erreur serveur');
    } finally {
      setActionLoading(null);
    }
  };

  const toggleSponsor = async (adId: string, isSponsored: boolean) => {
    setActionLoading(adId);
    try {
      const response = await fetch('/api/ads/sponsor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adId })
      });

      if (response.ok) {
        toast.success(isSponsored ? 'Sponsor retiré' : 'Annonce sponsorisée');
        loadAds();
      } else {
        toast.error('Erreur lors de l\'action');
      }
    } catch (error) {
      console.error('Error toggling sponsor:', error);
      toast.error('Erreur serveur');
    } finally {
      setActionLoading(null);
    }
  };

  // ============================================
  // OPEN EDIT MODAL
  // ============================================
  const openEditModal = (item: any, type: string) => {
    setEditingItem({ ...item, _type: type });
    setShowEditModal(true);
  };

  const renderEditForm = () => {
    if (!editingItem) return null;

    switch (editingItem._type) {
      case 'community':
        return (
          <div className="space-y-4">
            <Input label="Nom" value={editingItem.name} onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })} />
            <Input label="Pays" value={editingItem.country} onChange={(e) => setEditingItem({ ...editingItem, country: e.target.value })} />
            {editingItem.type === 'city' && <Input label="Ville" value={editingItem.city || ''} onChange={(e) => setEditingItem({ ...editingItem, city: e.target.value })} />}
            <div className="flex space-x-3 pt-4">
              <Button onClick={updateCommunity} disabled={actionLoading === 'update-community'}>Enregistrer</Button>
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>Annuler</Button>
            </div>
          </div>
        );

      case 'sector':
        return (
          <div className="space-y-4">
            <Input label="Nom du secteur" value={editingItem.name} onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })} />
            <Input label="Description" value={editingItem.description || ''} onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })} />
            <Input label="Téléphone président" value={editingItem.presidentPhone} onChange={(e) => setEditingItem({ ...editingItem, presidentPhone: e.target.value })} />
            <Input label="Nom président" value={editingItem.presidentName} onChange={(e) => setEditingItem({ ...editingItem, presidentName: e.target.value })} />
            <div className="flex space-x-3 pt-4">
              <Button onClick={updateSector} disabled={actionLoading === 'update-sector'}>Enregistrer</Button>
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>Annuler</Button>
            </div>
          </div>
        );

      case 'event':
        return (
          <div className="space-y-4">
            <Input label="Titre" value={editingItem.title} onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })} />
            <Input label="Description" value={editingItem.description} onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })} />
            <Input label="Lieu" value={editingItem.location} onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })} />
            <input type="datetime-local" value={editingItem.date?.slice(0, 16)} onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
            <div className="flex items-center space-x-2">
              <input type="checkbox" checked={editingItem.is_boosted} onChange={(e) => setEditingItem({ ...editingItem, is_boosted: e.target.checked })} className="w-4 h-4" />
              <label>Événement boosté</label>
            </div>
            <div className="flex space-x-3 pt-4">
              <Button onClick={updateEvent} disabled={actionLoading === 'update-event'}>Enregistrer</Button>
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>Annuler</Button>
            </div>
          </div>
        );

      case 'ad':
        return (
          <div className="space-y-4">
            <Input label="Titre" value={editingItem.title} onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })} />
            <Input label="Contenu" value={editingItem.content} onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })} />
            <div className="flex space-x-3 pt-4">
              <Button onClick={updateAd} disabled={actionLoading === 'update-ad'}>Enregistrer</Button>
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>Annuler</Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F4F0E8]">
        <div className="w-12 h-12 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const cities = communities.filter(c => c.type === 'city');
  const diasporaCountries = communities.filter(c => c.type === 'country');

  return (
    <div className="min-h-screen bg-[#F4F0E8] font-sans p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-[#0D0B07] to-[#1A1712] rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-[#C9A96E]/20 flex items-center justify-center">
              <GiCrown className="text-[#C9A96E] text-xl" />
            </div>
            <h1 className="font-serif text-2xl font-bold">Administration</h1>
          </div>
          <p className="text-white/60 font-sans text-sm">Gestion complète de la plateforme Bangang Connect</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-1 mb-6">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: MdDashboard, color: '#C9A96E' },
            { id: 'users', label: 'Utilisateurs', icon: FiUsers },
            { id: 'communities', label: 'Communautés', icon: FiGlobe },
            { id: 'create-sector', label: 'Créer secteur', icon: FiPlus },
            { id: 'all-sectors', label: 'Secteurs', icon: FiGrid },
            { id: 'events', label: 'Événements', icon: FiCalendar },
            { id: 'ads', label: 'Annonces', icon: FiVolume2 },
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
                <Icon size={16} className={isActive ? 'text-[#0D0B07]' : ''} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ============================================ */}
        {/* DASHBOARD TAB */}
        {/* ============================================ */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: FiUsers, value: stats.totalUsers, label: 'Utilisateurs', color: 'from-blue-500 to-blue-600' },
              { icon: FiGlobe, value: stats.totalCommunities, label: 'Communautés', color: 'from-green-500 to-green-600' },
              { icon: FiGrid, value: stats.totalSectors, label: 'Secteurs', color: 'from-yellow-500 to-yellow-600' },
              { icon: FiCalendar, value: stats.totalEvents, label: 'Événements', color: 'from-purple-500 to-purple-600' },
              { icon: FiVolume2, value: stats.totalAds, label: 'Annonces', color: 'from-pink-500 to-pink-600' },
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
        )}

        {/* ============================================ */}
        {/* USERS TAB */}
        {/* ============================================ */}
        {activeTab === 'users' && (
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <FiUsers className="text-[#C9A96E]" size={20} />
                <h2 className="text-xl font-serif font-bold text-[#1A1712]">Gestion des utilisateurs</h2>
              </div>
              <Button onClick={() => router.push('/admin/users/create')} className="bg-[#C9A96E] text-[#0D0B07] hover:bg-[#DFC08A]">
                <FiUserPlus size={16} className="mr-2" />
                Créer un utilisateur
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#EDE9DF]/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#1A1712]/60">Nom</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#1A1712]/60">Téléphone</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#1A1712]/60">Rôle</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#1A1712]/60">Statut</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#1A1712]/60">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-t border-[#C9A96E]/10">
                      <td className="px-4 py-3 text-sm text-[#1A1712]">{user.name}</td>
                      <td className="px-4 py-3 text-sm text-[#1A1712]/70">{user.phone}</td>
                      <td className="px-4 py-3">
                        <select
                          value={user.role}
                          onChange={(e) => updateUserRole(user._id, e.target.value)}
                          className="px-2 py-1 border border-[#C9A96E]/20 rounded-lg text-sm focus:outline-none focus:border-[#C9A96E] bg-white"
                          disabled={actionLoading === user._id}
                        >
                          <option value="member">Membre</option>
                          <option value="sector_president">Président</option>
                          <option value="community_chief">Chef communauté</option>
                          <option value="village_chief">Chef village</option>
                          <option value="super_admin">Super Admin</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          user.isRestricted ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {user.isRestricted ? <FiUserMinus size={10} /> : <FiUserPlus size={10} />}
                          {user.isRestricted ? 'Bloqué' : 'Actif'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Button size="sm" variant="danger" onClick={() => deleteUser(user._id)} disabled={actionLoading === user._id}>
                          <FiTrash2 size={14} className="mr-1" /> Supprimer
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* ============================================ */}
        {/* COMMUNITIES TAB */}
        {/* ============================================ */}
        {activeTab === 'communities' && (
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <FiGlobe className="text-[#C9A96E]" size={20} />
                <h2 className="text-xl font-serif font-bold text-[#1A1712]">Gestion des communautés</h2>
              </div>
              <Button onClick={() => setShowCreateCommunity(!showCreateCommunity)} className="bg-[#C9A96E] text-[#0D0B07] hover:bg-[#DFC08A]">
                <FiPlus size={16} className="mr-2" />
                {showCreateCommunity ? 'Annuler' : 'Créer'}
              </Button>
            </div>

            {showCreateCommunity && (
              <form onSubmit={createCommunity} className="mb-6 p-5 bg-[#EDE9DF]/50 rounded-xl space-y-4 border border-[#C9A96E]/10">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input label="Nom" value={newCommunity.name} onChange={(e) => setNewCommunity({ ...newCommunity, name: e.target.value })} required className="border-[#C9A96E]/20 focus:border-[#C9A96E]" />
                  <select value={newCommunity.type} onChange={(e) => setNewCommunity({ ...newCommunity, type: e.target.value })} className="px-3 py-2 border border-[#C9A96E]/20 rounded-lg focus:outline-none focus:border-[#C9A96E]">
                    <option value="city">🏙️ Ville (Cameroun)</option>
                    <option value="country">🌍 Pays (Diaspora)</option>
                  </select>
                </div>
                <Input label="Pays" value={newCommunity.country} onChange={(e) => setNewCommunity({ ...newCommunity, country: e.target.value })} required />
                {newCommunity.type === 'city' && <Input label="Ville" value={newCommunity.city} onChange={(e) => setNewCommunity({ ...newCommunity, city: e.target.value })} />}
                <Button type="submit" disabled={actionLoading === 'community'}>Créer</Button>
              </form>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-[#C9A96E] mb-3 flex items-center gap-2">
                  <FiMapPin size={14} /> Villes ({cities.length})
                </h3>
                <div className="space-y-2">
                  {cities.map(c => (
                    <div key={c._id} className="flex justify-between items-center p-3 bg-white rounded-xl border border-[#C9A96E]/10">
                      <span className="font-sans text-sm text-[#1A1712]">📍 {c.name} ({c.country})</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary" onClick={() => openEditModal(c, 'community')}>
                          <FiEdit2 size={14} className="mr-1" /> Modifier
                        </Button>
                        <Button size="sm" variant="danger" onClick={() => deleteCommunity(c._id)} disabled={actionLoading === c._id}>
                          <FiTrash2 size={14} className="mr-1" /> Supprimer
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-[#C9A96E] mb-3 flex items-center gap-2">
                  <FiGlobe size={14} /> Diaspora ({diasporaCountries.length})
                </h3>
                <div className="space-y-2">
                  {diasporaCountries.map(c => (
                    <div key={c._id} className="flex justify-between items-center p-3 bg-white rounded-xl border border-[#C9A96E]/10">
                      <span className="font-sans text-sm text-[#1A1712]">🌍 {c.name} ({c.country})</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary" onClick={() => openEditModal(c, 'community')}>
                          <FiEdit2 size={14} className="mr-1" /> Modifier
                        </Button>
                        <Button size="sm" variant="danger" onClick={() => deleteCommunity(c._id)} disabled={actionLoading === c._id}>
                          <FiTrash2 size={14} className="mr-1" /> Supprimer
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* ============================================ */}
        {/* CREATE SECTOR TAB */}
        {/* ============================================ */}
        {activeTab === 'create-sector' && (
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <FiPlus className="text-[#C9A96E]" size={20} />
              <h2 className="text-xl font-serif font-bold text-[#1A1712]">Créer un secteur</h2>
            </div>
            {cities.length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center text-yellow-800">
                ⚠️ Créez d'abord une ville dans l'onglet "Communautés"
              </div>
            ) : (
              <form onSubmit={createSector} className="space-y-4 max-w-lg">
                <Input label="Nom" value={newSector.name} onChange={(e) => setNewSector({ ...newSector, name: e.target.value })} required className="border-[#C9A96E]/20 focus:border-[#C9A96E]" />
                <textarea placeholder="Description" value={newSector.description} onChange={(e) => setNewSector({ ...newSector, description: e.target.value })} className="w-full px-3 py-2 border border-[#C9A96E]/20 rounded-lg focus:outline-none focus:border-[#C9A96E] font-sans" rows={3} />
                <select required value={newSector.communityId} onChange={(e) => setNewSector({ ...newSector, communityId: e.target.value })} className="w-full px-3 py-2 border border-[#C9A96E]/20 rounded-lg focus:outline-none focus:border-[#C9A96E]">
                  <option value="">Sélectionner une ville</option>
                  {cities.map(c => <option key={c._id} value={c._id}>📍 {c.name}</option>)}
                </select>
                <Input label="Téléphone président" value={newSector.presidentPhone} onChange={(e) => setNewSector({ ...newSector, presidentPhone: e.target.value })} required />
                <Input label="Nom président" value={newSector.presidentName} onChange={(e) => setNewSector({ ...newSector, presidentName: e.target.value })} required />
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={newSector.sendInvitation} onChange={(e) => setNewSector({ ...newSector, sendInvitation: e.target.checked })} className="w-4 h-4 rounded border-[#C9A96E]/20" />
                  <label className="font-sans text-sm text-[#1A1712]/70">Envoyer une invitation</label>
                </div>
                <Button type="submit" disabled={actionLoading === 'create-sector'} className="bg-[#C9A96E] text-[#0D0B07] hover:bg-[#DFC08A]">
                  <FiPlus size={16} className="mr-2" /> Créer le secteur
                </Button>
              </form>
            )}
          </Card>
        )}

        {/* ============================================ */}
        {/* ALL SECTORS TAB */}
        {/* ============================================ */}
        {activeTab === 'all-sectors' && (
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <FiGrid className="text-[#C9A96E]" size={20} />
              <h2 className="text-xl font-serif font-bold text-[#1A1712]">Tous les secteurs</h2>
            </div>
            {sectors.length === 0 ? (
              <p className="text-center py-8 text-[#1A1712]/50 font-sans">Aucun secteur</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#EDE9DF]/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-[#1A1712]/60">Nom</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-[#1A1712]/60">Ville</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-[#1A1712]/60">Président</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-[#1A1712]/60">Membres</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-[#1A1712]/60">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sectors.map(s => (
                      <tr key={s._id} className="border-t border-[#C9A96E]/10">
                        <td className="px-4 py-3 text-sm text-[#1A1712]">{s.name}</td>
                        <td className="px-4 py-3 text-sm text-[#1A1712]/70">{s.communityId?.name || '-'}</td>
                        <td className="px-4 py-3 text-sm text-[#1A1712]/70">{s.presidentName}</td>
                        <td className="px-4 py-3 text-sm text-[#1A1712]/70">{s.membersCount}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <Button size="sm" variant="secondary" onClick={() => openEditModal(s, 'sector')}>
                              <FiEdit2 size={14} className="mr-1" /> Modifier
                            </Button>
                            <Button size="sm" variant="danger" onClick={() => deleteSector(s._id)} disabled={actionLoading === s._id}>
                              <FiTrash2 size={14} className="mr-1" /> Supprimer
                            </Button>
                          </div>
                         </td>
                       </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        )}

        {/* ============================================ */}
        {/* EVENTS TAB */}
        {/* ============================================ */}
        {activeTab === 'events' && (
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <FiCalendar className="text-[#C9A96E]" size={20} />
                <h2 className="text-xl font-serif font-bold text-[#1A1712]">Gestion des événements</h2>
              </div>
              <Button onClick={() => setShowCreateEvent(!showCreateEvent)} className="bg-[#C9A96E] text-[#0D0B07] hover:bg-[#DFC08A]">
                <FiPlus size={16} className="mr-2" />
                {showCreateEvent ? 'Annuler' : 'Créer'}
              </Button>
            </div>

            {showCreateEvent && (
              <form onSubmit={createEvent} className="mb-6 p-5 bg-[#EDE9DF]/50 rounded-xl space-y-4 border border-[#C9A96E]/10">
                <Input label="Titre" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} required />
                <textarea placeholder="Description" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} className="w-full px-3 py-2 border border-[#C9A96E]/20 rounded-lg focus:outline-none focus:border-[#C9A96E]" rows={3} />
                <input type="datetime-local" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} className="w-full px-3 py-2 border border-[#C9A96E]/20 rounded-lg focus:outline-none focus:border-[#C9A96E]" />
                <Input label="Lieu" value={newEvent.location} onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} required />
                <select value={newEvent.sectorId} onChange={(e) => setNewEvent({ ...newEvent, sectorId: e.target.value })} className="w-full px-3 py-2 border border-[#C9A96E]/20 rounded-lg focus:outline-none focus:border-[#C9A96E]" required>
                  <option value="">Sélectionner un secteur</option>
                  {sectors.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                </select>
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={newEvent.is_boosted} onChange={(e) => setNewEvent({ ...newEvent, is_boosted: e.target.checked })} className="w-4 h-4 rounded border-[#C9A96E]/20" />
                  <label className="font-sans text-sm text-[#1A1712]/70">⭐ Booster l'événement</label>
                </div>
                <Button type="submit" disabled={actionLoading === 'event'}>Créer</Button>
              </form>
            )}

            <div className="space-y-2">
              {events.map(e => (
                <div key={e._id} className={`p-4 rounded-xl border flex justify-between items-center ${e.is_boosted ? 'border-[#C9A96E] bg-[#C9A96E]/5' : 'border-[#C9A96E]/10 bg-white'}`}>
                  <div>
                    <div className="font-semibold text-[#1A1712]">{e.title}</div>
                    <div className="text-sm text-[#1A1712]/50 flex items-center gap-3 mt-1">
                      <span>{new Date(e.date).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{e.location}</span>
                    </div>
                    <div className="text-xs text-[#1A1712]/40 mt-1">Participants: {e.participants?.length || 0}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" onClick={() => openEditModal(e, 'event')}>
                      <FiEdit2 size={14} className="mr-1" /> Modifier
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => deleteEvent(e._id)} disabled={actionLoading === e._id}>
                      <FiTrash2 size={14} className="mr-1" /> Supprimer
                    </Button>
                  </div>
                </div>
              ))}
              {events.length === 0 && <p className="text-center py-8 text-[#1A1712]/50 font-sans">Aucun événement</p>}
            </div>
          </Card>
        )}

        {/* ============================================ */}
        {/* ADS TAB */}
        {/* ============================================ */}
        {activeTab === 'ads' && (
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <FiVolume2 className="text-[#C9A96E]" size={20} />
                <h2 className="text-xl font-serif font-bold text-[#1A1712]">Gestion des annonces</h2>
              </div>
              <Button onClick={() => setShowCreateAd(!showCreateAd)} className="bg-[#C9A96E] text-[#0D0B07] hover:bg-[#DFC08A]">
                <FiPlus size={16} className="mr-2" />
                {showCreateAd ? 'Annuler' : 'Créer'}
              </Button>
            </div>

            {showCreateAd && (
              <form onSubmit={createAd} className="mb-6 p-5 bg-[#EDE9DF]/50 rounded-xl space-y-4 border border-[#C9A96E]/10">
                <Input label="Titre" value={newAd.title} onChange={(e) => setNewAd({ ...newAd, title: e.target.value })} required />
                <textarea placeholder="Contenu" value={newAd.content} onChange={(e) => setNewAd({ ...newAd, content: e.target.value })} className="w-full px-3 py-2 border border-[#C9A96E]/20 rounded-lg focus:outline-none focus:border-[#C9A96E]" rows={3} required />
                <Button type="submit" disabled={actionLoading === 'ad'}>Créer</Button>
              </form>
            )}

            <div className="space-y-2">
              {ads.map(a => (
                <div key={a._id} className={`p-4 rounded-xl border flex justify-between items-center ${a.is_sponsored ? 'border-[#C9A96E] bg-[#C9A96E]/5' : 'border-[#C9A96E]/10 bg-white'}`}>
                  <div>
                    <div className="font-semibold text-[#1A1712]">{a.title}</div>
                    <div className="text-sm text-[#1A1712]/50">{a.content.substring(0, 100)}...</div>
                    <div className="text-xs text-[#1A1712]/40 mt-1 flex items-center gap-2">
                      {a.is_sponsored ? <span className="text-[#C9A96E]">⭐ Sponsorée</span> : <span>Normale</span>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" onClick={() => openEditModal(a, 'ad')}>
                      <FiEdit2 size={14} className="mr-1" /> Modifier
                    </Button>
                    <Button size="sm" variant="success" onClick={() => toggleSponsor(a._id, a.is_sponsored)} disabled={actionLoading === a._id}>
                      {a.is_sponsored ? 'Retirer sponsor' : 'Sponsoriser'}
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => deleteAd(a._id)} disabled={actionLoading === a._id}>
                      <FiTrash2 size={14} className="mr-1" /> Supprimer
                    </Button>
                  </div>
                </div>
              ))}
              {ads.length === 0 && <p className="text-center py-8 text-[#1A1712]/50 font-sans">Aucune annonce</p>}
            </div>
          </Card>
        )}

        {/* ============================================ */}
        {/* MODAL ÉDITION */}
        {/* ============================================ */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <Card className="max-w-lg w-full mx-4 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-serif font-bold text-[#1A1712]">✏️ Modifier</h2>
                <button onClick={() => setShowEditModal(false)} className="text-[#1A1712]/50 hover:text-[#1A1712] transition-colors">
                  <FiX size={20} />
                </button>
              </div>
              {renderEditForm()}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
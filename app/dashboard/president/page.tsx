

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { toast } from 'react-hot-toast';
import ParticipantsModal from '@/components/event/ParticipantsModal';

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

  // Pour le modal des participants
  const [selectedEventForParticipants, setSelectedEventForParticipants] = useState<{ id: string; title: string } | null>(null);

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
      
      let sectorId: string | null = null;
      
      if (userData.user.sectorId) {
        if (typeof userData.user.sectorId === 'object') {
          sectorId = userData.user.sectorId._id;
        } else {
          sectorId = userData.user.sectorId;
        }
      }
      
      if (!sectorId) {
        setLoading(false);
        return;
      }
      
      const [sectorRes, membersRes, requestsRes, eventsRes] = await Promise.all([
        fetch(`/api/sectors/${sectorId}`),
        fetch(`/api/sectors/${sectorId}/members`),
        fetch(`/api/sectors/${sectorId}/requests`),
        fetch(`/api/events`)
      ]);
      
      let sectorData = null;
      let membersData = [];
      let requestsData = [];
      let eventsData = [];
      
      if (sectorRes.ok) sectorData = await sectorRes.json();
      if (membersRes.ok) membersData = await membersRes.json();
      if (requestsRes.ok) requestsData = await requestsRes.json();
      if (eventsRes.ok) eventsData = await eventsRes.json();
      
      if (sectorData) setSector(sectorData);
      setMembers(Array.isArray(membersData) ? membersData : []);
      setPendingRequests(Array.isArray(requestsData) ? requestsData : []);
      
      // Les participants sont déjà peuplés par l'API
      if (Array.isArray(eventsData)) {
        setEvents(eventsData);
        console.log('✅ Événements chargés:', eventsData.map((e: any) => ({
          title: e.title,
          participantsCount: e.participants?.length || 0
        })));
      } else {
        setEvents([]);
      }
      
      const upcoming = eventsData.filter((e: any) => new Date(e.date) > new Date()).length;
      setStats({
        totalMembers: membersData.length || 0,
        totalEvents: eventsData.length || 0,
        pendingRequests: requestsData.length || 0,
        upcomingEvents: upcoming
      });
      
    } catch (error) {
      console.error('Error loading data:', error);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!sector) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Secteur non trouvé</p>
        <button
          onClick={() => router.push('/dashboard')}
          className="mt-4 text-blue-600 hover:underline"
        >
          Retour au dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold">Dashboard Président</h1>
        <p className="text-green-100">Gérez votre secteur : {sector.name}</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-3xl mb-2">👥</div>
          <div className="text-2xl font-bold">{stats.totalMembers}</div>
          <div className="text-gray-600">Membres</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl mb-2"></div>
          <div className="text-2xl font-bold">{stats.totalEvents}</div>
          <div className="text-gray-600">Événements</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl mb-2">⏳</div>
          <div className="text-2xl font-bold text-orange-600">{stats.pendingRequests}</div>
          <div className="text-gray-600">Demandes</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl mb-2"></div>
          <div className="text-2xl font-bold">{stats.upcomingEvents}</div>
          <div className="text-gray-600">À venir</div>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-t-lg transition ${
            activeTab === 'overview' ? 'bg-green-600 text-white' : 'bg-gray-100'
          }`}
        >
          📊 Aperçu
        </button>
        <button
          onClick={() => setActiveTab('members')}
          className={`px-4 py-2 rounded-t-lg transition ${
            activeTab === 'members' ? 'bg-green-600 text-white' : 'bg-gray-100'
          }`}
        >
          👥 Membres ({stats.totalMembers})
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          className={`px-4 py-2 rounded-t-lg transition ${
            activeTab === 'requests' ? 'bg-green-600 text-white' : 'bg-gray-100'
          }`}
        >
          📝 Demandes ({stats.pendingRequests})
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2 rounded-t-lg transition ${
            activeTab === 'events' ? 'bg-green-600 text-white' : 'bg-gray-100'
          }`}
        >
          Événements
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-t-lg transition ${
            activeTab === 'profile' ? 'bg-green-600 text-white' : 'bg-gray-100'
          }`}
        >
          👤 Mon profil
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">📊 Informations</h3>
            <p><strong>Nom:</strong> {sector.name}</p>
            <p><strong>Description:</strong> {sector.description || 'Aucune'}</p>
            <p><strong>Communauté:</strong> {sector.communityId?.name}</p>
            <p><strong>Créé le:</strong> {new Date(sector.createdAt).toLocaleDateString()}</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">⚡ Actions rapides</h3>
            <Button onClick={() => router.push('/events')} fullWidth>
              📅 Créer un événement
            </Button>
            <Button variant="secondary" onClick={() => router.push('/chat')} fullWidth className="mt-3">
              💬 Accéder au chat
            </Button>
          </Card>
        </div>
      )}

      {/* Members Tab */}
      {activeTab === 'members' && (
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">👥 Liste des membres</h3>
          {members.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Aucun membre</p>
          ) : (
            <div className="space-y-3">
              {members.map((member) => (
                <div key={member._id} className="flex items-center p-3 border rounded-lg">
                  <img
                    src={member.photo || '/default-avatar.png'}
                    alt={member.name}
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {/* Requests Tab */}
      {activeTab === 'requests' && (
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">📝 Demandes d'adhésion</h3>
          {pendingRequests.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Aucune demande en attente</p>
          ) : (
            <div className="space-y-3">
              {pendingRequests.map((req) => (
                <div key={req._id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-semibold">{req.userId.name}</p>
                    <p className="text-sm text-gray-500">{req.userId.phone}</p>
                    {req.message && (
                      <p className="text-sm text-gray-400 mt-1">📝 {req.message}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="success" onClick={() => handleApproveRequest(req._id)}>
                      Accepter
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => handleRejectRequest(req._id)}>
                      Refuser
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {/* Events Tab */}
      {activeTab === 'events' && (
  <Card className="p-6">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-bold">📅 Événements du secteur</h3>
      <Button size="sm" onClick={() => router.push('/events')}>+ Créer</Button>
    </div>
    
    {events.length === 0 ? (
      <p className="text-gray-500 text-center py-8">Aucun événement</p>
    ) : (
      <div className="space-y-4">
        {events.map((event: any) => (
          <div key={event._id} className="border rounded-lg p-4 flex justify-between items-center">
            <div>
              <h4 className="font-bold">{event.title}</h4>
                 <p className="text-xs text-blue-600 mt-1">
                 🏘️ {event.sectorId?.name || 'Secteur inconnu'}
                </p>
              <p className="text-sm text-gray-600">{event.location}</p>
              <p className="text-xs text-gray-500">
                {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-sm mt-2">👥 {event.participants?.length || 0} participants</p>
            </div>
            <Button 
              variant="secondary"
              onClick={() => {
                setSelectedEventForParticipants({
                  id: event._id,
                  title: event.title
                });
              }}
            >
              Voir tout
            </Button>
          </div>
        ))}
      </div>
    )}
  </Card>
)}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">👤 Modifier mon profil</h3>
          
          {updatingProfile ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : (
            <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-lg">
              <div>
                <label className="block text-sm font-medium mb-1">Photo de profil</label>
                <div className="flex items-center space-x-4">
                  <img
                    src={profileData.photo || '/default-avatar.png'}
                    alt="Photo"
                    className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
                  />
                  <label className="cursor-pointer bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200">
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
              
              <div>
                <label className="block text-sm font-medium mb-1">Nom complet</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Téléphone</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  disabled
                  className="w-full px-3 py-2 border rounded-lg bg-gray-100"
                />
                <p className="text-xs text-gray-500 mt-1">Le numéro de téléphone ne peut pas être modifié</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Nouveau mot de passe</label>
                <input
                  type="password"
                  value={profileData.newPassword}
                  onChange={(e) => setProfileData({ ...profileData, newPassword: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Laisser vide pour ne pas changer"
                />
                <p className="text-xs text-gray-500 mt-1">Minimum 6 caractères</p>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Button type="submit">💾 Enregistrer</Button>
              </div>
            </form>
          )}
        </Card>
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
  );
}
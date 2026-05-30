'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { toast } from 'react-hot-toast';

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

      // Initialiser les données du profil
      setProfileData({
        name: userData.user.name || '',
        email: userData.user.email || '',
        phone: userData.user.phone || '',
        photo: userData.user.photo || '',
        newPassword: ''
      });

      // Charger les événements
      const eventsRes = await fetch('/api/events');
      const eventsData = await eventsRes.json();
      setEvents(Array.isArray(eventsData) ? eventsData : []);

      // Charger les annonces
      const adsRes = await fetch('/api/ads');
      const adsData = await adsRes.json();
      setAds(Array.isArray(adsData) ? adsData : []);

      // Calculer les stats
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

  // Mettre à jour le profil
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdatingProfile(true);

    try {
      // 🔥 Correction : envoyer undefined si vide, pas une string vide
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

  // Upload photo
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

  return (
    <div className="container mx-auto px-4 space-y-10 py-24">
      {/* Header */}
      <div className="bg-slate-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <img
            src={user?.photo || '/default-avatar.png'}
            alt={user?.name}
            className="w-16 h-16 rounded-full border-4 border-white object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">👋 Bonjour, {user?.name}</h1>
            <p className="text-green-100">
              {user?.sectorId ? `Secteur: ${user.sectorId.name}` : 'Pas encore de secteur'}
              {user?.communityId && ` • ${user.communityId.name}`}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-t-lg transition ${activeTab === 'overview' ? 'bg-slate-600 text-white' : 'bg-gray-100'
            }`}
        >
          📊 Aperçu
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-t-lg transition ${activeTab === 'profile' ? 'bg-slate-600 text-white' : 'bg-gray-100'
            }`}
        >
          👤 Mon profil
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-4 text-center">
              <div className="text-3xl mb-2">📅</div>
              <div className="text-2xl font-bold">{stats.upcomingEvents}</div>
              <div className="text-gray-600">Événements à venir</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-3xl mb-2">✅</div>
              <div className="text-2xl font-bold">{stats.participatedEvents}</div>
              <div className="text-gray-600">Participations</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-3xl mb-2">⭐</div>
              <div className="text-2xl font-bold">-</div>
              <div className="text-gray-600">Points</div>
            </Card>
          </div>

          {/* Actions rapides */}
          <div className="grid md:grid-cols-2 gap-4">
            {!user?.sectorId && (
              <Button className='bg-green-400' onClick={() => router.push('/sectors')} fullWidth>
                🔍 Rejoindre un secteur
              </Button>
            )}
            <Button className='bg-slate-900' onClick={() => router.push('/chat')} fullWidth>
              💬 Accéder au chat
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
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .slice(0, 5)
                  .map(event => (
                    <Card key={event._id} className={`p-4 ${event.is_boosted ? 'border-2 border-yellow-400' : ''}`}>
                      {event.is_boosted && (
                        <span className="inline-block mb-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                          ⭐ Boosté
                        </span>
                      )}
                      <h3 className="font-bold text-lg">{event.title}</h3>
                      <p className="text-md text-blue-600 mt-1">
                        🏘️ {event.sectorId?.name || 'Secteur inconnu'}
                      </p>
                      <p className="text-gray-600 text-sm">{event.location}</p>
                      <p className="text-gray-500 text-xs">
                        {new Date(event.date).toLocaleDateString('fr-FR')} à {new Date(event.date).toLocaleTimeString('fr-FR')}
                      </p>
                      <Button
                        size="sm"
                        className="mt-3 bg-slate-600"
                        variant={isParticipating(event) ? "secondary" : "primary"}
                        onClick={() => handleParticipate(event._id)}
                      >
                        {isParticipating(event) ? '✓ Je participe' : '👍 Je participe'}
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
        </>
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
              {/* Photo */}
              <div>
                <label className="block text-sm font-medium mb-1">Photo de profil</label>
                <div className="flex items-center space-x-4">
                  <img
                    src={profileData.photo || '/default-avatar.png'}
                    alt="Photo"
                    className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
                  />
                  <label className="cursor-pointer bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
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
                <label className="block text-sm font-medium mb-1">Nom complet</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Téléphone */}
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

              {/* Nouveau mot de passe */}
              <div>
                <label className="block text-sm font-medium mb-1">Nouveau mot de passe</label>
                <input
                  type="password"
                  value={profileData.newPassword}
                  onChange={(e) => setProfileData({ ...profileData, newPassword: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Laisser vide pour ne pas changer"
                />
                <p className="text-xs text-gray-500 mt-1">Minimum 6 caractères</p>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button type="submit">💾 Enregistrer les modifications</Button>
              </div>
            </form>
          )}
        </Card>
      )}
    </div>
  );
}
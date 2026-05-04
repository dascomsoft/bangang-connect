'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { toast } from 'react-hot-toast';

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
}

export default function EventsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [sectors, setSectors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    sectorId: ''
  });
  
  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = async () => {
    try {
      const [userRes, eventsRes, sectorsRes] = await Promise.all([
        fetch('/api/auth/me'),
        fetch('/api/events'),
        fetch('/api/sectors')
      ]);
      
      if (!userRes.ok) {
        router.push('/login');
        return;
      }
      
      const userData = await userRes.json();
      setUser(userData.user);
      
      const eventsData = await eventsRes.json();
      setEvents(Array.isArray(eventsData) ? eventsData : []);
      
      const sectorsData = await sectorsRes.json();
      setSectors(Array.isArray(sectorsData) ? sectorsData : []);
      
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };
  
  const canCreateEvent = () => {
    if (!user) return false;
    return ['super_admin', 'village_chief', 'community_chief', 'sector_president'].includes(user.role);
  };
  
  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success('Événement créé avec succès');
        setShowCreateForm(false);
        setNewEvent({ title: '', description: '', date: '', location: '', sectorId: '' });
        loadData();
      } else {
        toast.error(data.error || 'Erreur lors de la création');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Erreur serveur');
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleParticipate = async (eventId: string) => {
    try {
      const response = await fetch(`/api/events/${eventId}/participate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success(data.message);
        loadData(); // Recharger les événements pour mettre à jour l'affichage
      } else {
        toast.error(data.error || 'Erreur lors de la participation');
      }
    } catch (error) {
      console.error('Error participating:', error);
      toast.error('Erreur serveur');
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
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">📅 Événements</h1>
            <p className="text-blue-100">
              Découvrez et participez aux événements de votre communauté
            </p>
          </div>
          {canCreateEvent() && (
            <Button
              variant="secondary"
              onClick={() => setShowCreateForm(!showCreateForm)}
            >
              {showCreateForm ? 'Annuler' : '+ Créer un événement'}
            </Button>
          )}
        </div>
      </div>
      
      {/* Formulaire de création */}
      {showCreateForm && (
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Nouvel événement</h2>
          <form onSubmit={handleCreateEvent} className="space-y-4">
            <Input
              label="Titre"
              type="text"
              required
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              placeholder="Titre de l'événement"
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                required
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Description détaillée..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date et heure
              </label>
              <input
                type="datetime-local"
                required
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <Input
              label="Lieu"
              type="text"
              required
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              placeholder="Adresse ou lieu de l'événement"
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Secteur
              </label>
              <select
                required
                value={newEvent.sectorId}
                onChange={(e) => setNewEvent({ ...newEvent, sectorId: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionner un secteur</option>
                {sectors.map((sector) => (
                  <option key={sector._id} value={sector._id}>
                    {sector.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex space-x-3">
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Création...' : 'Publier l\'événement'}
              </Button>
            </div>
          </form>
        </Card>
      )}
      
      {/* Liste des événements */}
      {events.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl">
          <div className="text-6xl mb-4">📅</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Aucun événement pour le moment
          </h2>
          <p className="text-gray-600">
            Les événements de votre secteur apparaîtront ici
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Événements boostés en premier */}
          {events.filter(e => e.is_boosted).map((event) => {
            const isParticipating = event.participants?.includes(user?._id);
            
            return (
              <Card key={event._id} className={`p-6 ${event.is_boosted ? 'border-2 border-yellow-400' : ''}`}>
                {event.is_boosted && (
                  <div className="mb-2">
                    <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                      ⭐ Événement Boosté
                    </span>
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-3">{event.description}</p>
                <div className="space-y-1 text-sm text-gray-500 mb-4">
                  <p>📅 {new Date(event.date).toLocaleString('fr-FR')}</p>
                  <p>📍 {event.location}</p>
                  <p>👥 {event.participants?.length || 0} participants</p>
                </div>
                <Button 
                  onClick={() => handleParticipate(event._id)}
                  variant={isParticipating ? "secondary" : "primary"}
                >
                  {isParticipating ? '✓ Je participe' : '👍 Je participe'}
                </Button>
              </Card>
            );
          })}
          
          {/* Événements normaux */}
          {events.filter(e => !e.is_boosted).map((event) => {
            const isParticipating = event.participants?.includes(user?._id);
            
            return (
              <Card key={event._id} className="p-6">
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-3">{event.description}</p>
                <div className="space-y-1 text-sm text-gray-500 mb-4">
                  <p>📅 {new Date(event.date).toLocaleString('fr-FR')}</p>
                  <p>📍 {event.location}</p>
                  <p>👥 {event.participants?.length || 0} participants</p>
                </div>
                <Button 
                  onClick={() => handleParticipate(event._id)}
                  variant={isParticipating ? "secondary" : "primary"}
                >
                  {isParticipating ? '✓ Je participe' : '👍 Je participe'}
                </Button>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
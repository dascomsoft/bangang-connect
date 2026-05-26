'use client';

import { useState, useEffect, useCallback } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { toast } from 'react-hot-toast';

interface Community {
  _id: string;
  name: string;
  type: string;
  country: string;
  city?: string;
  createdAt: string;
}

export default function AdminCommunitiesPage() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  
  const [newCommunity, setNewCommunity] = useState({
    name: '',
    type: 'city',
    country: 'Cameroun',
    city: ''
  });
  
  const fetchCommunities = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/communities');
      const data = await res.json();
      setCommunities(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching communities:', error);
      toast.error('Erreur de chargement');
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchCommunities();
  }, [fetchCommunities]);
  
  const createCommunity = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading('create');
    try {
      const res = await fetch('/api/communities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCommunity),
      });
      
      if (res.ok) {
        toast.success('Communauté créée avec succès');
        setShowCreateForm(false);
        setNewCommunity({ name: '', type: 'city', country: 'Cameroun', city: '' });
        fetchCommunities();
      } else {
        toast.error('Erreur lors de la création');
      }
    } catch (error) {
      toast.error('Erreur serveur');
    } finally {
      setActionLoading(null);
    }
  };
  
  const deleteCommunity = async (id: string, name: string) => {
    if (!confirm(`Supprimer la communauté "${name}" ?`)) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/communities/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Communauté supprimée');
        fetchCommunities();
      } else {
        toast.error('Erreur');
      }
    } catch (error) {
      toast.error('Erreur serveur');
    } finally {
      setActionLoading(null);
    }
  };
  
  const cities = communities.filter(c => c.type === 'city');
  const diaspora = communities.filter(c => c.type === 'country');
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }
  
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">🌍 Gestion des communautés</h2>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? 'Annuler' : '+ Nouvelle communauté'}
        </Button>
      </div>
      
      {showCreateForm && (
        <form onSubmit={createCommunity} className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
          <Input
            label="Nom"
            required
            value={newCommunity.name}
            onChange={(e) => setNewCommunity({...newCommunity, name: e.target.value})}
          />
          <select
            value={newCommunity.type}
            onChange={(e) => setNewCommunity({...newCommunity, type: e.target.value})}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="city">🏙️ Ville</option>
            <option value="country">🌍 Pays (Diaspora)</option>
          </select>
          <Input
            label="Pays"
            required
            value={newCommunity.country}
            onChange={(e) => setNewCommunity({...newCommunity, country: e.target.value})}
          />
          {newCommunity.type === 'city' && (
            <Input
              label="Ville"
              value={newCommunity.city}
              onChange={(e) => setNewCommunity({...newCommunity, city: e.target.value})}
            />
          )}
          <Button type="submit" disabled={actionLoading === 'create'}>
            Créer
          </Button>
        </form>
      )}
      
      <div className="space-y-6">
        {/* Villes */}
        <div>
          <h3 className="font-semibold text-green-700 mb-3">🇨🇲 Villes et provinces ({cities.length})</h3>
          <div className="grid gap-2">
            {cities.map(c => (
              <div key={c._id} className="flex justify-between items-center p-3 border rounded-lg">
                <span>📍 {c.name} ({c.country})</span>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => deleteCommunity(c._id, c.name)}
                  disabled={actionLoading === c._id}
                >
                  🗑️
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Diaspora */}
        <div>
          <h3 className="font-semibold text-blue-700 mb-3">🌍 Diaspora ({diaspora.length})</h3>
          <div className="grid gap-2">
            {diaspora.map(c => (
              <div key={c._id} className="flex justify-between items-center p-3 border rounded-lg">
                <span>🌍 {c.name}</span>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => deleteCommunity(c._id, c.name)}
                  disabled={actionLoading === c._id}
                >
                  🗑️
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
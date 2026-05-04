'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdCard from '@/components/cards/AdCard';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { toast } from 'react-hot-toast';

interface Ad {
  _id: string;
  title: string;
  content: string;
  is_sponsored: boolean;
  sponsor_expires_at?: Date | string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
    photo?: string;
  };
  sectorId?: {
    _id: string;
    name: string;
  };
  communityId?: {
    _id: string;
    name: string;
  };
  createdAt: string | Date;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  sectorId?: {
    _id: string;
    name: string;
  };
  communityId?: {
    _id: string;
    name: string;
  };
}

export default function AdsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    sectorId: '',
    communityId: ''
  });
  const [submitting, setSubmitting] = useState(false);
  
  useEffect(() => {
    fetchUserAndAds();
  }, []);
  
  const fetchUserAndAds = async () => {
    try {
      setLoading(true);
      
      const userRes = await fetch('/api/auth/me');
      if (!userRes.ok) {
        router.push('/login');
        return;
      }
      const userData = await userRes.json();
      setUser(userData.user);
      
      const adsRes = await fetch('/api/ads');
      const adsData = await adsRes.json();
      
      const transformedAds = (Array.isArray(adsData) ? adsData : []).map((ad: any) => ({
        ...ad,
        sponsor_expires_at: ad.sponsor_expires_at ? new Date(ad.sponsor_expires_at) : undefined,
        createdAt: new Date(ad.createdAt)
      }));
      
      setAds(transformedAds);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Erreur de chargement des annonces');
    } finally {
      setLoading(false);
    }
  };
  
  const canCreateAd = (): boolean => {
    if (!user) return false;
    return ['super_admin', 'village_chief', 'community_chief', 'sector_president'].includes(user.role);
  };
  
  const canSponsor = (): boolean => {
    if (!user) return false;
    return ['super_admin', 'village_chief', 'community_chief'].includes(user.role);
  };
  
  const handleCreateAd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await fetch('/api/ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setShowCreateForm(false);
        setFormData({ title: '', content: '', sectorId: '', communityId: '' });
        await fetchUserAndAds();
        toast.success('Annonce créée avec succès');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Erreur lors de la création');
      }
    } catch (error) {
      console.error('Error creating ad:', error);
      toast.error('Erreur lors de la création');
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleSponsorAd = async (adId: string) => {
    try {
      const response = await fetch('/api/ads/sponsor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adId })
      });
      
      if (response.ok) {
        await fetchUserAndAds();
        toast.success('Annonce sponsorisée avec succès');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Erreur lors du sponsoring');
      }
    } catch (error) {
      console.error('Error sponsoring ad:', error);
      toast.error('Erreur lors du sponsoring');
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Annonces</h1>
            <p className="text-purple-100">
              Restez informé des dernières nouvelles de votre communauté
            </p>
          </div>
          {canCreateAd() && (
            <Button
              variant="secondary"
              onClick={() => setShowCreateForm(!showCreateForm)}
            >
              {showCreateForm ? 'Annuler' : '+ Publier une annonce'}
            </Button>
          )}
        </div>
      </div>
      
      {showCreateForm && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Nouvelle annonce</h2>
          <form onSubmit={handleCreateAd} className="space-y-4">
            <Input
              label="Titre"
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Titre de l'annonce"
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contenu
              </label>
              <textarea
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Détails de l'annonce..."
              />
            </div>
            
            <div className="flex space-x-4">
              <Button type="submit" variant="primary" disabled={submitting}>
                {submitting ? 'Publication...' : 'Publier'}
              </Button>
              <Button type="button" variant="secondary" onClick={() => setShowCreateForm(false)}>
                Annuler
              </Button>
            </div>
          </form>
        </div>
      )}
      
      {ads.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl">
          <div className="text-6xl mb-4">📢</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Aucune annonce pour le moment
          </h2>
          <p className="text-gray-600">
            Les annonces de votre communauté apparaîtront ici
          </p>
          {canCreateAd() && (
            <Button
              variant="primary"
              onClick={() => setShowCreateForm(true)}
              className="mt-4"
            >
              + Publier la première annonce
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {ads.filter(ad => ad.is_sponsored).map((ad) => (
            <AdCard
              key={ad._id}
              ad={{
                ...ad,
                sponsor_expires_at: ad.sponsor_expires_at instanceof Date ? ad.sponsor_expires_at : new Date(ad.sponsor_expires_at || Date.now()),
                createdAt: ad.createdAt instanceof Date ? ad.createdAt : new Date(ad.createdAt)
              }}
              onSponsor={handleSponsorAd}
              canSponsor={canSponsor()}
              currentUserId={user?._id}
            />
          ))}
          
          {ads.filter(ad => !ad.is_sponsored).map((ad) => (
            <AdCard
              key={ad._id}
              ad={{
                ...ad,
                sponsor_expires_at: ad.sponsor_expires_at instanceof Date ? ad.sponsor_expires_at : new Date(ad.sponsor_expires_at || Date.now()),
                createdAt: ad.createdAt instanceof Date ? ad.createdAt : new Date(ad.createdAt)
              }}
              onSponsor={handleSponsorAd}
              canSponsor={canSponsor()}
              currentUserId={user?._id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
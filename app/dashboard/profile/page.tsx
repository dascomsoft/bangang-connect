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
  phone: string;
  email: string;
  photo: string;
  role: string;
  communityId?: { _id: string; name: string };
  sectorId?: { _id: string; name: string };
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  
  useEffect(() => {
    loadUser();
  }, []);
  
  const loadUser = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (!response.ok) {
        router.push('/login');
        return;
      }
      const data = await response.json();
      setUser(data.user);
      setFormData({
        name: data.user.name || '',
        email: data.user.email || '',
        phone: data.user.phone || ''
      });
    } catch (error) {
      console.error('Error loading user:', error);
      toast.error('Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };
  
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Vérifier le type
    if (!file.type.startsWith('image/')) {
      toast.error('Veuillez sélectionner une image');
      return;
    }
    
    // Vérifier la taille (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('L\'image ne doit pas dépasser 2MB');
      return;
    }
    
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await fetch('/api/users/upload-photo', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setUser(prev => prev ? { ...prev, photo: data.photoUrl } : null);
        toast.success('Photo mise à jour');
      } else {
        toast.error(data.error || 'Erreur upload');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Erreur serveur');
    } finally {
      setUploading(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    
    try {
      const response = await fetch('/api/users/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setUser(prev => prev ? { ...prev, name: formData.name, email: formData.email } : null);
        toast.success('Profil mis à jour');
      } else {
        toast.error(data.error || 'Erreur mise à jour');
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Erreur serveur');
    } finally {
      setUpdating(false);
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
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 mb-8 text-white">
        <h1 className="text-2xl font-bold">👤 Mon Profil</h1>
        <p className="text-blue-100">Gérez vos informations personnelles</p>
      </div>
      
      <Card className="p-6">
        {/* Photo de profil */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img
              src={user?.photo || '/default-avatar.png'}
              alt="Photo de profil"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
            />
            {uploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            )}
          </div>
          <label className="mt-3 cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
              disabled={uploading}
            />
            <Button size="sm" variant="secondary" onClick={() => document.querySelector('input[type="file"]')?.click()}>
              Changer la photo
            </Button>
          </label>
          <p className="text-xs text-gray-500 mt-2">JPG, PNG - max 2MB</p>
        </div>
        
        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nom complet"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          
          <Input
            label="Téléphone"
            value={formData.phone}
            disabled
            className="bg-gray-100"
          />
          
          {user?.communityId && (
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">Communauté</p>
              <p className="font-semibold">{user.communityId.name}</p>
            </div>
          )}
          
          {user?.sectorId && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Secteur</p>
              <p className="font-semibold">{user.sectorId.name}</p>
            </div>
          )}
          
          <div className="pt-4">
            <Button type="submit" disabled={updating} fullWidth>
              {updating ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
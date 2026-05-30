'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { toast } from 'react-hot-toast';

interface Sector {
  _id: string;
  name: string;
  description?: string;
}

export default function CreateUserPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [loadingSectors, setLoadingSectors] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'member',
    sectorId: ''
  });

  useEffect(() => {
    fetchSectors();
  }, []);

  const fetchSectors = async () => {
    try {
      const res = await fetch('/api/sectors');
      const data = await res.json();
      setSectors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching sectors:', error);
      toast.error('Erreur chargement des secteurs');
    } finally {
      setLoadingSectors(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      toast.error('Le nom est requis');
      return;
    }
    if (!formData.phone.trim()) {
      toast.error('Le téléphone est requis');
      return;
    }
    if (!formData.password) {
      toast.error('Le mot de passe est requis');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }
    if (formData.password.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }
    if (formData.role === 'sector_president' && !formData.sectorId) {
      toast.error('Veuillez sélectionner un secteur pour le président');
      return;
    }
    
    setLoading(true);

    try {
      const response = await fetch('/api/admin/users/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          password: formData.password,
          role: formData.role,
          sectorId: formData.sectorId || null
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`✅ Utilisateur "${formData.name}" créé avec succès !`);
        router.push('/admin/users');
      } else {
        toast.error(data.error || 'Erreur lors de la création');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Erreur serveur');
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { value: 'member', label: '👤 Membre', description: 'Accès standard' },
    { value: 'sector_president', label: '👑 Président de secteur', description: 'Gère son secteur et ses membres' },
    { value: 'village_chief', label: '🏘️ Chef de village', description: 'Gère son village' },
    { value: 'community_chief', label: '🌍 Chef de communauté', description: 'Gère sa communauté' },
    { value: 'super_admin', label: '⚡ Super Administrateur', description: 'Accès total' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => router.back()} 
            className="text-blue-600 hover:underline flex items-center gap-1"
          >
            ← Retour
          </button>
          <h1 className="text-2xl font-bold">➕ Créer un utilisateur</h1>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nom */}
            <Input
              label="Nom complet *"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Jean Mbarga"
            />

            {/* Téléphone */}
            <Input
              label="Téléphone *"
              required
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Ex: 699999999"
            />

            {/* Mot de passe */}
            <Input
              label="Mot de passe *"
              required
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Minimum 6 caractères"
            />

            {/* Confirmation mot de passe */}
            <Input
              label="Confirmer le mot de passe *"
              required
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="Retapez le mot de passe"
            />

            {/* Rôle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rôle *
              </label>
              <select
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value, sectorId: '' })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {roles.map(role => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                {roles.find(r => r.value === formData.role)?.description}
              </p>
            </div>

            {/* Secteur (pour président) */}
            {formData.role === 'sector_president' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Secteur assigné *
                </label>
                <select
                  required
                  value={formData.sectorId}
                  onChange={(e) => setFormData({ ...formData, sectorId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loadingSectors}
                >
                  <option value="">Sélectionner un secteur</option>
                  {sectors.map((sector) => (
                    <option key={sector._id} value={sector._id}>
                      {sector.name}
                    </option>
                  ))}
                </select>
                {sectors.length === 0 && !loadingSectors && (
                  <p className="text-xs text-red-500 mt-1">
                    Aucun secteur disponible. Créez d'abord un secteur.
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Le président pourra gérer ce secteur, approuver les membres et accéder au chat privé.
                </p>
              </div>
            )}

            {/* Boutons */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? 'Création en cours...' : '✅ Créer le compte'}
              </Button>
              <Button type="button" variant="secondary" onClick={() => router.back()}>
                Annuler
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
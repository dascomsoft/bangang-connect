'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    confirmPassword: '',
    secretCode: ''  // Ajout du code secret
  });
  const [showSecretCode, setShowSecretCode] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Formater le numéro de téléphone
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    
    if (numbers.startsWith('237') && numbers.length > 3) {
      const match = numbers.match(/^(\d{3})(\d{2})(\d{2})(\d{2})$/);
      if (match) {
        return `+${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
      }
    }
    
    if (numbers.length === 9) {
      const match = numbers.match(/^(\d{2})(\d{3})(\d{4})$/);
      if (match) {
        return `${match[1]} ${match[2]} ${match[3]}`;
      }
    }
    
    return value;
  };
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData({ ...formData, phone: formatted });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Validation
    if (!formData.name || !formData.phone || !formData.password) {
      setError('Tous les champs sont requis');
      setLoading(false);
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      setLoading(false);
      return;
    }
    
    // Nettoyer le numéro pour l'envoi
    const cleanPhone = formData.phone.replace(/\s/g, '');
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: cleanPhone,
          password: formData.password,
          secretCode: formData.secretCode || undefined  // Envoyer le code secret
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        router.push('/dashboard');
      } else {
        setError(data.error || 'Erreur lors de l\'inscription');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4">
              <span className="text-3xl">📱</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Inscription
            </h2>
            <p className="text-gray-600">
              Rejoignez la communauté Bangang avec votre téléphone
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            <Input
              label="Nom complet"
              type="text"
              placeholder="Votre nom et prénom"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            
            <Input
              label="Numéro de téléphone"
              type="tel"
              placeholder="6X XXX XXX ou +237 6XX XXX XXX"
              required
              value={formData.phone}
              onChange={handlePhoneChange}
            />
            <p className="text-xs text-gray-500 mt-1">
              Ex: 6X XXX XXX (Cameroun) ou +237 6XX XXX XXX (international)
            </p>
            
            <Input
              label="Mot de passe"
              type="password"
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            
            <Input
              label="Confirmer le mot de passe"
              type="password"
              placeholder="••••••••"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
            
            {/* Section Code Secret */}
            <div>
              <button
                type="button"
                onClick={() => setShowSecretCode(!showSecretCode)}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {showSecretCode ? 'Masquer' : '🔑 Code administration ?'}
              </button>
              
              {showSecretCode && (
                <div className="mt-2">
                  <Input
                    label="Code secret administrateur"
                    type="password"
                    placeholder="Entrez le code super admin"
                    value={formData.secretCode}
                    onChange={(e) => setFormData({ ...formData, secretCode: e.target.value })}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Uniquement pour les administrateurs - Contactez l'équipe technique
                  </p>
                </div>
              )}
            </div>
            
            {showSecretCode && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-xs text-yellow-800">
                  ⚠️ Code par défaut pour Super Admin: <strong className="font-mono">SuperSecret123!</strong>
                </p>
              </div>
            )}
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Inscription...' : "S'inscrire"}
            </Button>
            
            <p className="text-center text-gray-600">
              Déjà un compte ?{' '}
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                Se connecter
              </Link>
            </p>
          </form>
          
          <div className="mt-6 pt-6 border-t text-center">
            <p className="text-xs text-gray-500">
              📱 Après inscription, vous pourrez choisir votre ville/pays et rejoindre un secteur
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
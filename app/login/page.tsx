'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Redirection complète après connexion
        window.location.href = '/dashboard';
      } else {
        setError(data.error || 'Téléphone ou mot de passe incorrect');
      }
    } catch (err) {
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
              <span className="text-3xl">🔐</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Connexion
            </h2>
            <p className="text-gray-600">
              Connectez-vous avec votre numéro de téléphone
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            <Input
              label="Numéro de téléphone"
              type="tel"
              placeholder="6XXXXXXXX ou 237XXXXXXXX"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            
            <Input
              label="Mot de passe"
              type="password"
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Connexion...' : 'Se connecter'}
            </Button>
            
            <p className="text-center text-gray-600">
              Pas encore de compte ?{' '}
              <Link href="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
                S'inscrire
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
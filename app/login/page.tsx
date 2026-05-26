'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { toast } from 'react-hot-toast';
import Image from 'next/image';




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
    
    if (!formData.phone || !formData.password) {
      setError('Téléphone et mot de passe requis');
      setLoading(false);
      return;
    }
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: formData.phone,
          password: formData.password
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success('Connexion réussie');
        // Redirection selon le rôle
        if (data.user.role === 'super_admin') {
          router.push('/dashboard/admin');
        } else if (data.user.role === 'sector_president') {
          router.push('/dashboard/president');
        } else {
          router.push('/dashboard');
        }
      } else {
        setError(data.error || 'Téléphone ou mot de passe incorrect');
        toast.error(data.error || 'Erreur de connexion');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Une erreur est survenue');
      toast.error('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-300 to-grey-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-stone-100 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-4">
            <Image
              src="/banganglogo.png"
              alt="BangangConnect Logo"
              width={400}
              height={400}
              className="w-20 h-20 rounded-full object-contain"
            />
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
              placeholder="6XXXXXXXX"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <p className="text-xs text-gray-500 -mt-3">Exemple: 600000000</p>
            
            <Input
              label="Mot de passe"
              type="password"
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            
            <Button type="submit" className="w-full bg-slate-400" disabled={loading}>
              {loading ? 'Connexion...' : 'Se connecter'}
            </Button>
            
            <p className="text-center text-gray-600">
              Pas encore de compte ?{' '}
              <Link href="/register" className="text-slate-900 hover:text-blue-700 font-semibold">
                S'inscrire
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
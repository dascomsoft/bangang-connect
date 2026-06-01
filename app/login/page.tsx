'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { toast } from 'react-hot-toast';
import { FiLogIn, FiSmartphone, FiLock, FiEye, FiEyeOff, FiArrowRight, FiShield, FiHeart } from 'react-icons/fi';
import { GiCrown } from 'react-icons/gi';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
        if (data.user.role === 'super_admin') {
          router.push('/admin/dashboard/');
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
    <div className="min-h-screen bg-[#F4F0E8] font-sans flex items-center justify-center p-4">
      {/* Décoration de fond */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#C9A96E]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#C9A96E]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A96E]/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Carte principale */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Bande décorative dorée */}
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent" />
          
          {/* Header */}
          <div className="text-center pt-8 pb-6 px-6">
            <div className="relative inline-flex items-center justify-center mb-6">
              <div className="absolute inset-0 rounded-full bg-[#C9A96E]/20 blur-xl" />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#C9A96E]/10 to-[#DFC08A]/10 flex items-center justify-center">
                <Image
                  src="/banganglogo.png"
                  alt="BangangConnect Logo"
                  width={56}
                  height={56}
                  className="rounded-full object-cover"
                />
              </div>
            </div>
            
            <h1 className="font-serif text-3xl font-bold text-[#1A1712] mb-2">
              Connexion
            </h1>
            <p className="font-sans text-sm text-[#1A1712]/50">
              Connectez-vous avec votre numéro de téléphone
            </p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="px-6 pb-8 space-y-5">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            {/* Champ téléphone */}
            <div>
              <label className="block font-sans text-sm font-medium text-[#1A1712] mb-2">
                Numéro de téléphone
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1712]/40">
                  <FiSmartphone size={18} />
                </div>
                <input
                  type="tel"
                  placeholder="6XXXXXXXX"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-[#EDE9DF]/50 border border-[#C9A96E]/20 rounded-xl focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] font-sans text-[#1A1712] placeholder:text-[#1A1712]/30 transition-all duration-300"
                />
              </div>
              <p className="text-xs text-[#1A1712]/40 mt-1.5">Exemple: 600000000</p>
            </div>
            
            {/* Champ mot de passe */}
            <div>
              <label className="block font-sans text-sm font-medium text-[#1A1712] mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1712]/40">
                  <FiLock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 bg-[#EDE9DF]/50 border border-[#C9A96E]/20 rounded-xl focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] font-sans text-[#1A1712] placeholder:text-[#1A1712]/30 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1A1712]/40 hover:text-[#C9A96E] transition-colors"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>
            
            {/* Bouton de connexion */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C9A96E] hover:bg-[#DFC08A] text-[#0D0B07] font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#0D0B07] border-t-transparent rounded-full animate-spin" />
                  <span>Connexion en cours...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <FiLogIn size={18} />
                  <span>Se connecter</span>
                </div>
              )}
            </Button>
            
            {/* Lien inscription */}
            <div className="text-center pt-2">
              <p className="font-sans text-sm text-[#1A1712]/50">
                Pas encore de compte ?{' '}
                <Link
                  href="/register"
                  className="text-[#C9A96E] hover:text-[#DFC08A] font-semibold transition-colors inline-flex items-center gap-1 group"
                >
                  S'inscrire
                  <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </p>
            </div>
          </form>

          {/* Footer de la carte */}
          <div className="border-t border-[#C9A96E]/10 px-6 py-4 bg-[#EDE9DF]/30">
            <div className="flex items-center justify-center gap-4 text-xs text-[#1A1712]/40">
              <div className="flex items-center gap-1">
                <GiCrown size={12} />
                <span>Royaume Bangang</span>
              </div>
              <div className="w-px h-3 bg-[#C9A96E]/20" />
              <div className="flex items-center gap-1">
                <FiShield size={12} />
                <span>Connexion sécurisée</span>
              </div>
            </div>
          </div>
        </div>

        {/* Note de bas de page */}
        <p className="text-center text-xs text-[#1A1712]/30 mt-6 flex items-center justify-center gap-1">
          Fait avec <FiHeart size={10} className="text-red-500" /> pour la communauté Bangang
        </p>
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { 
  FiUser, FiSmartphone, FiLock, FiEye, FiEyeOff, 
  FiArrowRight, FiShield, FiHeart, FiCheckCircle,
  FiAlertCircle, FiKey, FiChevronDown
} from 'react-icons/fi';
import { GiCrown } from 'react-icons/gi';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    confirmPassword: '',
    secretCode: ''
  });
  const [showSecretCode, setShowSecretCode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Vérifier la force du mot de passe
  useEffect(() => {
    const password = formData.password;
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(Math.min(strength, 4));
  }, [formData.password]);

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
    
    const cleanPhone = formData.phone.replace(/\s/g, '');
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: cleanPhone,
          password: formData.password,
          secretCode: formData.secretCode || undefined
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success('Inscription réussie ! Bienvenue sur BangangConnect');
        router.push('/dashboard');
      } else {
        setError(data.error || 'Erreur lors de l\'inscription');
        toast.error(data.error || 'Erreur lors de l\'inscription');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Une erreur est survenue');
      toast.error('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthText = () => {
    const texts = ['Très faible', 'Faible', 'Moyen', 'Fort', 'Très fort'];
    return texts[passwordStrength];
  };

  const getPasswordStrengthColor = () => {
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
    return colors[passwordStrength];
  };

  return (
    <div className="min-h-screen bg-[#F4F0E8] font-sans flex items-center justify-center p-4">
      {/* Décoration de fond */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#C9A96E]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#C9A96E]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C9A96E]/3 rounded-full blur-3xl" />
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
              Inscription
            </h1>
            <p className="font-sans text-sm text-[#1A1712]/50">
              Rejoignez la communauté Bangang avec votre numéro
            </p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="px-6 pb-8 space-y-5">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                <FiAlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            {/* Nom complet */}
            <div>
              <label className="block font-sans text-sm font-medium text-[#1A1712] mb-2">
                Nom complet
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1712]/40">
                  <FiUser size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Votre nom et prénom"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-[#EDE9DF]/50 border border-[#C9A96E]/20 rounded-xl focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] font-sans text-[#1A1712] placeholder:text-[#1A1712]/30 transition-all duration-300"
                />
              </div>
            </div>
            
            {/* Téléphone */}
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
                  placeholder="6X XXX XXX"
                  required
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className="w-full pl-10 pr-4 py-3 bg-[#EDE9DF]/50 border border-[#C9A96E]/20 rounded-xl focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] font-sans text-[#1A1712] placeholder:text-[#1A1712]/30 transition-all duration-300"
                />
              </div>
              <p className="text-xs text-[#1A1712]/40 mt-1.5">Exemple: 6X XXX XXX</p>
            </div>
            
            {/* Mot de passe */}
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
              
              {/* Indicateur de force du mot de passe */}
              {formData.password && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          i < passwordStrength ? getPasswordStrengthColor() : 'bg-[#C9A96E]/10'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-[#1A1712]/50">
                    Force du mot de passe : <span className="font-medium">{getPasswordStrengthText()}</span>
                  </p>
                </div>
              )}
            </div>
            
            {/* Confirmer mot de passe */}
            <div>
              <label className="block font-sans text-sm font-medium text-[#1A1712] mb-2">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1712]/40">
                  <FiLock size={18} />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 bg-[#EDE9DF]/50 border border-[#C9A96E]/20 rounded-xl focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] font-sans text-[#1A1712] placeholder:text-[#1A1712]/30 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1A1712]/40 hover:text-[#C9A96E] transition-colors"
                >
                  {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                  <FiAlertCircle size={12} />
                  Les mots de passe ne correspondent pas
                </p>
              )}
              {formData.password && formData.confirmPassword && formData.password === formData.confirmPassword && (
                <p className="text-xs text-green-600 mt-1.5 flex items-center gap-1">
                  <FiCheckCircle size={12} />
                  Les mots de passe correspondent
                </p>
              )}
            </div>
            
            {/* Section Code Secret */}
            <div>
              <button
                type="button"
                onClick={() => setShowSecretCode(!showSecretCode)}
                className="text-sm text-[#C9A96E] hover:text-[#DFC08A] font-medium inline-flex items-center gap-1 transition-colors"
              >
                <FiKey size={14} />
                {showSecretCode ? 'Masquer' : 'Code administration ?'}
                <FiChevronDown size={14} className={`transition-transform duration-300 ${showSecretCode ? 'rotate-180' : ''}`} />
              </button>
              
              {showSecretCode && (
                <div className="mt-3">
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1712]/40">
                      <FiKey size={18} />
                    </div>
                    <input
                      type="password"
                      placeholder="Code secret administrateur"
                      value={formData.secretCode}
                      onChange={(e) => setFormData({ ...formData, secretCode: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-[#EDE9DF]/50 border border-[#C9A96E]/20 rounded-xl focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] font-sans text-[#1A1712] placeholder:text-[#1A1712]/30 transition-all duration-300"
                    />
                  </div>
                  <p className="text-xs text-[#1A1712]/40 mt-1.5">
                    Uniquement sur invitation
                  </p>
                </div>
              )}
            </div>
            
            {/* Bouton inscription */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C9A96E] hover:bg-[#DFC08A] text-[#0D0B07] font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#0D0B07] border-t-transparent rounded-full animate-spin" />
                  <span>Inscription en cours...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>S'inscrire</span>
                  <FiArrowRight size={18} />
                </div>
              )}
            </Button>
            
            {/* Lien connexion */}
            <div className="text-center pt-2">
              <p className="font-sans text-sm text-[#1A1712]/50">
                Déjà un compte ?{' '}
                <Link
                  href="/login"
                  className="text-[#C9A96E] hover:text-[#DFC08A] font-semibold transition-colors inline-flex items-center gap-1 group"
                >
                  Se connecter
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
                <span>Données sécurisées</span>
              </div>
            </div>
          </div>
        </div>

        {/* Note de bas de page */}
        <div className="text-center mt-6">
          <p className="text-xs text-[#1A1712]/30 flex items-center justify-center gap-1">
            📱 Après inscription, vous pourrez choisir votre ville/pays et rejoindre un secteur
          </p>
          <p className="text-center text-xs text-[#1A1712]/30 mt-2 flex items-center justify-center gap-1">
            Fait avec <FiHeart size={10} className="text-red-500" /> pour la communauté Bangang
          </p>
        </div>
      </div>
    </div>
  );
}
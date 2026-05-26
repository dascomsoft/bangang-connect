'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import MobileNavbar from './MobileNavbar';
import { 
  FiHome, 
  FiBookOpen, 
  FiMusic, 
  FiCalendar, 
  FiBriefcase, 
  FiLogOut, 
  FiLogIn, 
  FiUserPlus, 
  FiGlobe 
} from 'react-icons/fi';
import { MdDashboard, MdChat } from 'react-icons/md';
import { FaCrown, FaUserTie } from 'react-icons/fa';
import { IoMdPeople } from 'react-icons/io';
import { GiVillage } from 'react-icons/gi';

interface NavbarProps {
  user: any;
}

export default function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [language, setLanguage] = useState('fr');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  // Détection mobile uniquement
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // ==================== DÉCONNEXION INSTANTANÉE ====================
  const handleLogout = () => {
    setIsLoggingOut(true);
    
    // Fire & forget - ne pas attendre la réponse
    fetch('/api/auth/logout', { method: 'POST' }).catch(console.error);
    
    // Navigation immédiate avec replace (coupe l'historique)
    window.location.replace('/');
  };
  
  // Obtenir le bon lien dashboard selon le rôle
  const getDashboardLink = () => {
    if (!user) return '/dashboard';
    switch (user.role) {
    case 'super_admin': return '/admin/dashboard'; // ← MODIFIÉ
      case 'sector_president': return '/dashboard/president';
      case 'community_chief': return '/dashboard/community';
      case 'village_chief': return '/dashboard/village';
      default: return '/dashboard/member';
    }
  };
  
  // Obtenir l'icône du dashboard selon le rôle
  const getDashboardIcon = () => {
    if (!user) return <MdDashboard size={18} />;
    switch (user.role) {
      case 'super_admin': return <FaCrown size={16} />;
      case 'sector_president': return <FaUserTie size={16} />;
      case 'community_chief': return <IoMdPeople size={18} />;
      case 'village_chief': return <GiVillage size={16} />;
      default: return <MdDashboard size={18} />;
    }
  };
  
  // Obtenir le label du dashboard selon le rôle
  const getDashboardLabel = () => {
    if (!user) return 'Dashboard';
    switch (user.role) {
      case 'super_admin': return 'Admin';
      case 'sector_president': return 'Présidence';
      case 'community_chief': return 'Communauté';
      case 'village_chief': return 'Village';
      default: return 'Dashboard';
    }
  };
  
  // Ne pas afficher sur login/register
  if (pathname === '/login' || pathname === '/register') {
    return null;
  }
  
  // Version mobile
  if (isMobile) {
    return <MobileNavbar user={user} />;
  }
  
  const dashboardLink = getDashboardLink();
  const dashboardIcon = getDashboardIcon();
  const dashboardLabel = getDashboardLabel();
  const isAuthenticated = !!user;
  
  // Version desktop/tablette - Navbar fixe en haut
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition">
            <Image
              src="/banganglogo.png"
              alt="BangangConnect Logo"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-xl font-bold">
              Bangang<span className="text-blue-600">Connect</span>
            </span>
          </Link>
          
          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Liens publics */}
            <Link href="/history" className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition">
              <FiBookOpen size={16} />
              <span>Histoire</span>
            </Link>
            <Link href="/culture" className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition">
              <FiMusic size={16} />
              <span>Culture</span>
            </Link>
            <Link href="/news" className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition">
              <span>Actualités</span>
            </Link>
            <Link href="/events" className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition">
              <FiCalendar size={16} />
              <span>Événements</span>
            </Link>
            <Link href="/business" className="flex items-center gap-1 text-gray-700 hover:text-green-600 transition">
              <FiBriefcase size={16} />
              <span>Business</span>
            </Link>
            
            {isAuthenticated ? (
              <>
                <span className="w-px h-6 bg-gray-300"></span>
                
                {/* Dashboard dynamique selon le rôle */}
                <Link href={dashboardLink} className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition">
                  {dashboardIcon}
                  <span>{dashboardLabel}</span>
                </Link>
                
                <Link href="/chat" className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition">
                  <MdChat size={18} />
                  <span>Chat</span>
                </Link>
                
                {/* Bouton déconnexion */}
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className={`flex items-center gap-1 transition ${
                    isLoggingOut 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-red-600 hover:text-red-700'
                  }`}
                >
                  {isLoggingOut ? (
                    <>
                      <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                      <span>Déconnexion...</span>
                    </>
                  ) : (
                    <>
                      <FiLogOut size={16} />
                      <span>Déconnexion</span>
                    </>
                  )}
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition">
                  <FiLogIn size={16} />
                  <span>Connexion</span>
                </Link>
                <Link href="/register" className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition">
                  <FiUserPlus size={16} />
                  <span>Inscription</span>
                </Link>
              </>
            )}
            
            {/* Sélecteur de langue */}
            <button
              onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
              className="flex items-center gap-1 px-3 py-1 border rounded-lg hover:bg-gray-50 transition"
            >
              <FiGlobe size={14} />
              <span className="text-sm font-medium">{language === 'fr' ? 'FR' : 'EN'}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
// 'use client';

// import Link from 'next/link';
// import { useRouter, usePathname } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import MobileNavbar from './MobileNavbar';
// import { 
//   FiHome, 
//   FiBookOpen, 
//   FiMusic, 
//   FiCalendar, 
//   FiBriefcase, 
//   FiLogOut, 
//   FiLogIn, 
//   FiUserPlus, 
//   FiGlobe 
// } from 'react-icons/fi';
// import { MdDashboard, MdChat } from 'react-icons/md';
// import { FaCrown, FaUserTie } from 'react-icons/fa';
// import { IoMdPeople } from 'react-icons/io';
// import { GiVillage } from 'react-icons/gi';

// interface NavbarProps {
//   user: any;
// }

// export default function Navbar({ user }: NavbarProps) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [isMobile, setIsMobile] = useState(false);
//   const [language, setLanguage] = useState('fr');
//   const [isLoggingOut, setIsLoggingOut] = useState(false);
  
//   // Détection mobile uniquement
//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);
  
//   // ==================== DÉCONNEXION INSTANTANÉE ====================
//   const handleLogout = () => {
//     // setIsLoggingOut(true);
    
//     // Fire & forget - ne pas attendre la réponse
//     fetch('/api/auth/logout', { method: 'POST' }).catch(console.error);
    
//     // Navigation immédiate avec replace (coupe l'historique)
//     window.location.replace('/');
//   };
  
//   // Obtenir le bon lien dashboard selon le rôle
//   const getDashboardLink = () => {
//     if (!user) return '/dashboard';
//     switch (user.role) {
//     case 'super_admin': return '/admin/dashboard'; // ← MODIFIÉ
//       case 'sector_president': return '/dashboard/president';
//       case 'community_chief': return '/dashboard/community';
//       case 'village_chief': return '/dashboard/village';
//       default: return '/dashboard/member';
//     }
//   };
  
//   // Obtenir l'icône du dashboard selon le rôle
//   const getDashboardIcon = () => {
//     if (!user) return <MdDashboard size={18} />;
//     switch (user.role) {
//       case 'super_admin': return <FaCrown size={16} />;
//       case 'sector_president': return <FaUserTie size={16} />;
//       case 'community_chief': return <IoMdPeople size={18} />;
//       case 'village_chief': return <GiVillage size={16} />;
//       default: return <MdDashboard size={18} />;
//     }
//   };
  
//   // Obtenir le label du dashboard selon le rôle
//   const getDashboardLabel = () => {
//     if (!user) return 'Dashboard';
//     switch (user.role) {
//       case 'super_admin': return 'Admin';
//       case 'sector_president': return 'Présidence';
//       case 'community_chief': return 'Communauté';
//       case 'village_chief': return 'Village';
//       default: return 'Dashboard';
//     }
//   };
  
//   // Ne pas afficher sur login/register
//   if (pathname === '/login' || pathname === '/register') {
//     return null;
//   }
  
//   // Version mobile
//   if (isMobile) {
//     return <MobileNavbar user={user} />;
//   }
  
//   const dashboardLink = getDashboardLink();
//   const dashboardIcon = getDashboardIcon();
//   const dashboardLabel = getDashboardLabel();
//   const isAuthenticated = !!user;
  
//   // Version desktop/tablette - Navbar fixe en haut
//   return (
//     <nav className="fixed top-0 left-0 right-0 bg-slate-800 text-white shadow-md z-50">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition">
//             <Image
//               src="/banganglogo.png"
//               alt="BangangConnect Logo"
//               width={40}
//               height={40}
//               className="w-10 h-10 rounded-full object-cover"
//             />
//             <span className="text-xl font-bold">
//               Bangang<span className="text-blue-600">Connect</span>
//             </span>
//           </Link>
          
//           {/* Menu Desktop */}
//           <div className="hidden md:flex items-center space-x-6">
//             {/* Liens publics */}
//             <Link href="/history" className="flex items-center gap-1  hover:text-blue-600 transition">
//               <FiBookOpen size={16} />
//               <span>Histoire</span>
//             </Link>
//             <Link href="/culture" className="flex items-center gap-1  hover:text-blue-600 transition">
//               <FiMusic size={16} />
//               <span>Culture</span>
//             </Link>
//             <Link href="/news" className="flex items-center gap-1  hover:text-blue-600 transition">
//               <span>Actualités</span>
//             </Link>
//             <Link href="/events" className="flex items-center gap-1  hover:text-blue-600 transition">
//               <FiCalendar size={16} />
//               <span>Événements</span>
//             </Link>
//             <Link href="/business" className="flex items-center gap-1  hover:text-green-600 transition">
//               <FiBriefcase size={16} />
//               <span>Business</span>
//             </Link>
            
//             {isAuthenticated ? (
//               <>
//                 <span className="w-px h-6 bg-gray-300"></span>
                
//                 {/* Dashboard dynamique selon le rôle */}
//                 <Link href={dashboardLink} className="flex items-center gap-1  hover:text-blue-600 transition">
//                   {dashboardIcon}
//                   <span>{dashboardLabel}</span>
//                 </Link>
                
//                 <Link href="/chat" className="flex items-center gap-1  hover:text-blue-600 transition">
//                   <MdChat size={18} />
//                   <span>Chat</span>
//                 </Link>
                
//                 {/* Bouton déconnexion */}
//                 <button
//                   onClick={handleLogout}
//                   disabled={isLoggingOut}
//                   className={`flex items-center gap-1 transition ${
//                     isLoggingOut 
//                       ? 'text-gray-400 cursor-not-allowed' 
//                       : 'text-red-600 bg-white p-2 font-extrabold rounded-md hover:text-red-700'
//                   }`}
//                 >
//                   {isLoggingOut ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
//                       <span>Déconnexion...</span>
//                     </>
//                   ) : (
//                     <>
//                       <FiLogOut size={16} />
//                       <span>Déconnexion</span>
//                     </>
//                   )}
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link href="/login" className="flex items-center gap-1  hover:text-blue-600 transition">
//                   <FiLogIn size={16} />
//                   <span>Connexion</span>
//                 </Link>
//                 <Link href="/register" className="flex items-center gap-1  hover:text-blue-600 transition">
//                   <FiUserPlus size={16} />
//                   <span>Inscription</span>
//                 </Link>
//               </>
//             )}
          
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }


























































































































// 'use client';

// import Link from 'next/link';
// import { useRouter, usePathname } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import MobileNavbar from './MobileNavbar';
// import { 
//   FiHome, 
//   FiBookOpen, 
//   FiMusic, 
//   FiCalendar, 
//   FiBriefcase, 
//   FiLogOut, 
//   FiLogIn, 
//   FiUserPlus, 
//   FiGlobe,
//   FiInfo  // ← AJOUTER L'ICÔNE INFO
// } from 'react-icons/fi';
// import { MdDashboard, MdChat } from 'react-icons/md';
// import { FaCrown, FaUserTie } from 'react-icons/fa';
// import { IoMdPeople } from 'react-icons/io';
// import { GiVillage } from 'react-icons/gi';

// interface NavbarProps {
//   user: any;
// }

// export default function Navbar({ user }: NavbarProps) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [isMobile, setIsMobile] = useState(false);
//   const [language, setLanguage] = useState('fr');
//   const [isLoggingOut, setIsLoggingOut] = useState(false);
  
//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);
  
//   const handleLogout = () => {
//     fetch('/api/auth/logout', { method: 'POST' }).catch(console.error);
//     window.location.replace('/');
//   };
  
//   const getDashboardLink = () => {
//     if (!user) return '/dashboard';
//     switch (user.role) {
//       case 'super_admin': return '/admin/dashboard';
//       case 'sector_president': return '/dashboard/president';
//       case 'community_chief': return '/dashboard/community';
//       case 'village_chief': return '/dashboard/village';
//       default: return '/dashboard/member';
//     }
//   };
  
//   const getDashboardIcon = () => {
//     if (!user) return <MdDashboard size={18} />;
//     switch (user.role) {
//       case 'super_admin': return <FaCrown size={16} />;
//       case 'sector_president': return <FaUserTie size={16} />;
//       case 'community_chief': return <IoMdPeople size={18} />;
//       case 'village_chief': return <GiVillage size={16} />;
//       default: return <MdDashboard size={18} />;
//     }
//   };
  
//   const getDashboardLabel = () => {
//     if (!user) return 'Dashboard';
//     switch (user.role) {
//       case 'super_admin': return 'Admin';
//       case 'sector_president': return 'Présidence';
//       case 'community_chief': return 'Communauté';
//       case 'village_chief': return 'Village';
//       default: return 'Dashboard';
//     }
//   };
  
//   if (pathname === '/login' || pathname === '/register') {
//     return null;
//   }
  
//   if (isMobile) {
//     return <MobileNavbar user={user} />;
//   }
  
//   const dashboardLink = getDashboardLink();
//   const dashboardIcon = getDashboardIcon();
//   const dashboardLabel = getDashboardLabel();
//   const isAuthenticated = !!user;
  
//   return (
//     <nav className="fixed top-0 left-0 right-0 bg-slate-800 text-white shadow-md z-50">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition">
//             <Image
//               src="/banganglogo.png"
//               alt="BangangConnect Logo"
//               width={40}
//               height={40}
//               className="w-10 h-10 rounded-full object-cover"
//             />
//             <span className="text-xl font-bold">
//               Bangang<span className="text-blue-600">Connect</span>
//             </span>
//           </Link>
          
//           <div className="hidden md:flex items-center space-x-6">
//             {/* Liens publics */}
//             <Link href="/history" className="flex items-center gap-1 hover:text-blue-600 transition">
//               <FiBookOpen size={16} />
//               <span>Histoire</span>
//             </Link>
//             <Link href="/culture" className="flex items-center gap-1 hover:text-blue-600 transition">
//               <FiMusic size={16} />
//               <span>Culture</span>
//             </Link>
//             <Link href="/news" className="flex items-center gap-1 hover:text-blue-600 transition">
//               <span>Actualités</span>
//             </Link>
//             <Link href="/events" className="flex items-center gap-1 hover:text-blue-600 transition">
//               <FiCalendar size={16} />
//               <span>Événements</span>
//             </Link>
//             <Link href="/business" className="flex items-center gap-1 hover:text-green-600 transition">
//               <FiBriefcase size={16} />
//               <span>Business</span>
//             </Link>
            
//             {/* 🔥 NOUVEAU LIEN À PROPOS */}
//             <Link href="/about" className="flex items-center gap-1 hover:text-blue-600 transition">
//               <FiInfo size={16} />
//               <span>À propos</span>
//             </Link>
            
//             {isAuthenticated ? (
//               <>
//                 <span className="w-px h-6 bg-gray-300"></span>
                
//                 <Link href={dashboardLink} className="flex items-center gap-1 hover:text-blue-600 transition">
//                   {dashboardIcon}
//                   <span>{dashboardLabel}</span>
//                 </Link>
                
//                 <Link href="/chat" className="flex items-center gap-1 hover:text-blue-600 transition">
//                   <MdChat size={18} />
//                   <span>Chat</span>
//                 </Link>
                
//                 <button
//                   onClick={handleLogout}
//                   disabled={isLoggingOut}
//                   className={`flex items-center gap-1 transition ${
//                     isLoggingOut 
//                       ? 'text-gray-400 cursor-not-allowed' 
//                       : 'text-red-600 bg-white p-2 font-extrabold rounded-md hover:text-red-700'
//                   }`}
//                 >
//                   {isLoggingOut ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
//                       <span>Déconnexion...</span>
//                     </>
//                   ) : (
//                     <>
//                       <FiLogOut size={16} />
//                       <span>Déconnexion</span>
//                     </>
//                   )}
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link href="/login" className="flex items-center gap-1 hover:text-blue-600 transition">
//                   <FiLogIn size={16} />
//                   <span>Connexion</span>
//                 </Link>
//                 <Link href="/register" className="flex items-center gap-1 hover:text-blue-600 transition">
//                   <FiUserPlus size={16} />
//                   <span>Inscription</span>
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }


















































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
  FiGlobe,
  FiInfo
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
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const handleLogout = () => {
    setIsLoggingOut(true);
    fetch('/api/auth/logout', { method: 'POST' }).catch(console.error);
    window.location.replace('/');
  };
  
  const getDashboardLink = () => {
    if (!user) return '/dashboard';
    switch (user.role) {
      case 'super_admin': return '/admin/dashboard';
      case 'sector_president': return '/dashboard/president';
      case 'community_chief': return '/dashboard/community';
      case 'village_chief': return '/dashboard/village';
      default: return '/dashboard/member';
    }
  };
  
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
  
  if (pathname === '/login' || pathname === '/register') {
    return null;
  }
  
  if (isMobile) {
    return <MobileNavbar user={user} />;
  }
  
  const dashboardLink = getDashboardLink();
  const dashboardIcon = getDashboardIcon();
  const dashboardLabel = getDashboardLabel();
  const isAuthenticated = !!user;
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-[#0D0B07]/95 backdrop-blur-xl shadow-2xl' 
        : 'bg-[#0D0B07]'
    }`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo et marque */}
          <Link href="/" className="group flex items-center space-x-3 hover:opacity-90 transition-all duration-300">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#C9A96E]/20 blur-md group-hover:bg-[#C9A96E]/40 transition-all duration-300" />
              <Image
                src="/banganglogo.png"
                alt="BangangConnect Logo"
                width={40}
                height={40}
                className="relative w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight">
                <span className="text-white">Bangang</span>
                <span className="text-[#C9A96E]">Connect</span>
              </span>
              <span className="text-[9px] tracking-[0.2em] uppercase text-white/40 font-sans">
                Royaume & Communauté
              </span>
            </div>
          </Link>
          
          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {/* Liens principaux */}
            <NavLink href="/history" icon={<FiBookOpen size={16} />} label="Histoire" />
            <NavLink href="/culture" icon={<FiMusic size={16} />} label="Culture" />
            <NavLink href="/news" label="Actualités" />
            <NavLink href="/events" icon={<FiCalendar size={16} />} label="Événements" />
            <NavLink href="/business" icon={<FiBriefcase size={16} />} label="Business" />
            <NavLink href="/about" icon={<FiInfo size={16} />} label="À propos" />
            
            {isAuthenticated ? (
              <>
                <div className="w-px h-6 bg-white/20 mx-2" />
                
                <NavLink href={dashboardLink} icon={dashboardIcon} label={dashboardLabel} />
                <NavLink href="/chat" icon={<MdChat size={18} />} label="Chat" />
                
                {/* Bouton déconnexion */}
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl font-sans text-sm font-medium transition-all duration-300 overflow-hidden group ${
                    isLoggingOut 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:scale-105'
                  }`}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center gap-2 text-white">
                    {isLoggingOut ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Déconnexion...</span>
                      </>
                    ) : (
                      <>
                        <FiLogOut size={16} />
                        <span>Déconnexion</span>
                      </>
                    )}
                  </span>
                </button>
              </>
            ) : (
              <>
                <NavLink href="/login" icon={<FiLogIn size={16} />} label="Connexion" />
                <NavLink href="/register" icon={<FiUserPlus size={16} />} label="Inscription" />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

// Composant réutilisable pour les liens de navigation
function NavLink({ href, icon, label }: { href: string; icon?: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="relative flex items-center gap-2 px-3 py-2 rounded-xl font-sans text-sm font-medium text-white/80 hover:text-white transition-all duration-300 group"
    >
      {icon && <span className="transition-transform duration-300 group-hover:scale-110">{icon}</span>}
      <span>{label}</span>
      <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#C9A96E] transition-all duration-300 group-hover:w-6 group-hover:left-1/2 group-hover:-translate-x-1/2" />
    </Link>
  );
}
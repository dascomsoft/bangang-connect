// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';
// import Image from 'next/image';
// import { 
//   FiHome, FiBookOpen, FiMusic, FiCalendar, 
//   FiBriefcase, FiLogOut, FiLogIn, FiUserPlus, FiGlobe, FiUser
// } from 'react-icons/fi';
// import { MdDashboard, MdChat } from 'react-icons/md';
// import { FaCrown, FaUserTie } from 'react-icons/fa';

// interface MobileNavbarProps {
//   user: any;
// }

// export default function MobileNavbar({ user }: MobileNavbarProps) {
//   const pathname = usePathname();
//   const router = useRouter();
//   const [isOpen, setIsOpen] = useState(false);
//   const [language, setLanguage] = useState('fr');
//   const [isLoggingOut, setIsLoggingOut] = useState(false);

//   // ==================== DÉCONNEXION INSTANTANÉE ====================
//   const handleLogout = () => {
//     setIsLoggingOut(true);
//     setIsOpen(false); // Fermer le menu
    
//     // Fire & forget - ne pas attendre la réponse
//     fetch('/api/auth/logout', { method: 'POST' }).catch(console.error);
    
//     // Navigation immédiate avec replace
//     window.location.replace('/');
//   };

//   // Menu selon le rôle
//   const getMenuItems = () => {
//     if (!user) {
//       return [
//         { href: '/', label: 'Accueil', icon: FiHome },
//         { href: '/history', label: 'Histoire', icon: FiBookOpen },
//         { href: '/culture', label: 'Culture', icon: FiMusic },
//         { href: '/news', label: 'Actualités' },
//         { href: '/events', label: 'Événements', icon: FiCalendar },
//         { href: '/business', label: 'Business', icon: FiBriefcase },
//         { href: '/login', label: 'Connexion', icon: FiLogIn },
//         { href: '/register', label: 'Inscription', icon: FiUserPlus },
//       ];
//     }
    
//     const commonItems = [
//       { href: '/', label: 'Accueil', icon: FiHome },
//       { href: '/history', label: 'Histoire', icon: FiBookOpen },
//       { href: '/culture', label: 'Culture', icon: FiMusic },
//       { href: '/news', label: 'Actualités' },
//       { href: '/events', label: 'Événements', icon: FiCalendar },
//       { href: '/business', label: 'Business', icon: FiBriefcase },
//       { href: '/chat', label: 'Chat', icon: MdChat },
//     ];
    
//     let dashboardItem = { href: '/dashboard/member', label: 'Dashboard', icon: MdDashboard };
    
// switch (user?.role) {
//   case 'super_admin':
//     dashboardItem = { href: '/admin/dashboard', label: 'Administration', icon: FaCrown }; // ← MODIFIÉ
//     break;
//   case 'sector_president':
//     dashboardItem = { href: '/dashboard/president', label: 'Dashboard Président', icon: FaUserTie };
//     break;
//   default:
//     dashboardItem = { href: '/dashboard', label: 'Dashboard', icon: MdDashboard };
// }
    
//     const profileItem = { href: '/dashboard/profile', label: 'Mon profil', icon: FiUser };
    
//     return [dashboardItem, ...commonItems, profileItem];
//   };

//   const menuItems = getMenuItems();

//   const getRoleLabel = () => {
//     if (!user) return 'Visiteur';
//     switch (user?.role) {
//       case 'super_admin': return 'Administrateur';
//       case 'sector_president': return 'Président de secteur';
//       default: return 'Membre';
//     }
//   };

//   return (
//     <>
//       {/* Header mobile */}
//       <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
//         <div className="flex items-center justify-between px-4 h-14">
//           <Link href="/" className="flex items-center space-x-2">
//             <Image
//               src="/banganglogo.png"
//               alt="BangangConnect Logo"
//               width={32}
//               height={32}
//               className="w-8 h-8 rounded-full object-cover"
//             />
//             <span className="font-bold text-gray-800">BangangConnect</span>
//           </Link>

//           <div className="flex items-center gap-3">
//             {/* Sélecteur de langue */}
//             <button
//               onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
//               className="flex items-center gap-1 px-2 py-1 text-sm border rounded-lg"
//             >
//               <FiGlobe size={14} />
//               <span>{language === 'fr' ? 'FR' : 'EN'}</span>
//             </button>
            
//             {/* Bouton menu hamburger */}
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="p-2 rounded-lg active:bg-gray-100"
//             >
//               <div className="w-6 h-5 flex flex-col justify-between">
//                 <span className={`w-6 h-0.5 bg-gray-600 rounded transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
//                 <span className={`w-6 h-0.5 bg-gray-600 rounded transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
//                 <span className={`w-6 h-0.5 bg-gray-600 rounded transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
//               </div>
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* Sidebar Menu mobile */}
//       <div className={`fixed top-0 right-0 bottom-0 w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
//         {/* Header profil */}
//         <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
//           <div className="flex items-center space-x-3">
//             <img
//               src={user?.photo || '/default-avatar.png'}
//               className="w-14 h-14 rounded-full border-2 border-blue-500 object-cover"
//               onError={(e) => {
//                 (e.target as HTMLImageElement).src = '/default-avatar.png';
//               }}
//             />
//             <div>
//               <p className="font-semibold text-gray-800">{user?.name || 'Invité'}</p>
//               <p className="text-xs text-gray-500 mt-0.5">{getRoleLabel()}</p>
//             </div>
//           </div>
//         </div>

//         {/* Menu items */}
//         <nav className="p-4 space-y-1" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
//           {menuItems.map((item) => {
//             const Icon = item.icon;
//             const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 onClick={() => setIsOpen(false)}
//                 className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
//                   isActive
//                     ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
//                     : 'text-gray-700 hover:bg-gray-100'
//                 }`}
//               >
//                 {Icon && <Icon size={20} />}
//                 <span className="font-medium">{item.label}</span>
//                 {isActive && <span className="ml-auto text-white">✓</span>}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Footer */}
//         <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
//           {user ? (
//             <button
//               onClick={handleLogout}
//               disabled={isLoggingOut}
//               className={`flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl transition ${
//                 isLoggingOut
//                   ? 'bg-gray-400 text-white cursor-not-allowed'
//                   : 'bg-red-600 text-white hover:bg-red-700'
//               }`}
//             >
//               {isLoggingOut ? (
//                 <>
//                   <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                   <span>Déconnexion...</span>
//                 </>
//               ) : (
//                 <>
//                   <FiLogOut size={18} />
//                   <span>Déconnexion</span>
//                 </>
//               )}
//             </button>
//           ) : (
//             <div className="flex gap-2">
//               <Link
//                 href="/login"
//                 onClick={() => setIsOpen(false)}
//                 className="flex items-center justify-center gap-2 flex-1 px-4 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
//               >
//                 <FiLogIn size={16} />
//                 <span>Connexion</span>
//               </Link>
//               <Link
//                 href="/register"
//                 onClick={() => setIsOpen(false)}
//                 className="flex items-center justify-center gap-2 flex-1 px-4 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
//               >
//                 <FiUserPlus size={16} />
//                 <span>Inscription</span>
//               </Link>
//             </div>
//           )}
//           <p className="text-center text-xs text-gray-400 mt-3">
//             Bangang Connect v1.0
//           </p>
//         </div>
//       </div>

//       {/* Espace pour le contenu (évite superposition) */}
//       <div className="h-14" />
//     </>
//   );
// }








































































































'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  FiHome, FiBookOpen, FiMusic, FiCalendar, 
  FiBriefcase, FiLogOut, FiLogIn, FiUserPlus, FiGlobe, FiUser,
  FiInfo, FiMenu, FiX
} from 'react-icons/fi';
import { MdDashboard, MdChat } from 'react-icons/md';
import { FaCrown, FaUserTie } from 'react-icons/fa';

interface MobileNavbarProps {
  user: any;
}

export default function MobileNavbar({ user }: MobileNavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('fr');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setIsOpen(false);
    fetch('/api/auth/logout', { method: 'POST' }).catch(console.error);
    window.location.replace('/');
  };

  const getMenuItems = () => {
    if (!user) {
      return [
        { href: '/', label: 'Accueil', icon: FiHome },
        { href: '/history', label: 'Histoire', icon: FiBookOpen },
        { href: '/culture', label: 'Culture', icon: FiMusic },
        { href: '/news', label: 'Actualités' },
        { href: '/events', label: 'Événements', icon: FiCalendar },
        { href: '/business', label: 'Business', icon: FiBriefcase },
        { href: '/about', label: 'À propos', icon: FiInfo },
        { href: '/login', label: 'Connexion', icon: FiLogIn },
        { href: '/register', label: 'Inscription', icon: FiUserPlus },
      ];
    }
    
    const commonItems = [
      { href: '/', label: 'Accueil', icon: FiHome },
      { href: '/history', label: 'Histoire', icon: FiBookOpen },
      { href: '/culture', label: 'Culture', icon: FiMusic },
      { href: '/news', label: 'Actualités' },
      { href: '/events', label: 'Événements', icon: FiCalendar },
      { href: '/business', label: 'Business', icon: FiBriefcase },
      { href: '/about', label: 'À propos', icon: FiInfo },
      { href: '/chat', label: 'Chat', icon: MdChat },
    ];
    
    let dashboardItem = { href: '/dashboard/member', label: 'Dashboard', icon: MdDashboard };
    
    switch (user?.role) {
      case 'super_admin':
        dashboardItem = { href: '/admin/dashboard', label: 'Administration', icon: FaCrown };
        break;
      case 'sector_president':
        dashboardItem = { href: '/dashboard/president', label: 'Dashboard Président', icon: FaUserTie };
        break;
      default:
        dashboardItem = { href: '/dashboard', label: 'Dashboard', icon: MdDashboard };
    }
    
    const profileItem = { href: '/dashboard/profile', label: 'Mon profil', icon: FiUser };
    
    return [dashboardItem, ...commonItems, profileItem];
  };

  const menuItems = getMenuItems();

  const getRoleLabel = () => {
    if (!user) return 'Visiteur';
    switch (user?.role) {
      case 'super_admin': return 'Administrateur';
      case 'sector_president': return 'Président de secteur';
      default: return 'Membre';
    }
  };

  return (
    <>
      {/* Header mobile premium */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#0D0B07]/95 backdrop-blur-xl shadow-2xl' 
          : 'bg-[#0D0B07]'
      }`}>
        <div className="flex items-center justify-between px-4 h-14">
          <Link href="/" className="group flex items-center space-x-2">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#C9A96E]/20 blur-md group-hover:bg-[#C9A96E]/40 transition-all duration-300" />
              <Image
                src="/banganglogo.png"
                alt="BangangConnect Logo"
                width={32}
                height={32}
                className="relative w-8 h-8 rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight">
                <span className="text-white">Bangang</span>
                <span className="text-[#C9A96E]">Connect</span>
              </span>
              <span className="text-[8px] tracking-[0.2em] uppercase text-white/40 font-sans">
                Royaume
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {/* Sélecteur de langue */}
            <button
              onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
              className="flex items-center gap-1 px-2 py-1 text-xs border border-white/20 rounded-lg text-white/70 hover:text-white hover:border-white/40 transition-all duration-300"
            >
              <FiGlobe size={12} />
              <span>{language === 'fr' ? 'FR' : 'EN'}</span>
            </button>
            
            {/* Bouton menu hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              <div className="w-5 h-5 flex flex-col justify-between items-center">
                <span className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Menu mobile premium */}
      <div className={`fixed top-0 right-0 bottom-0 w-80 bg-[#0D0B07] shadow-2xl z-50 transform transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header profil */}
        <div className="p-6 border-b border-white/10 bg-gradient-to-br from-[#1A1712] to-[#0D0B07]">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#C9A96E]/30 blur-md" />
              <img
                src={user?.photo || '/default-avatar.png'}
                className="relative w-14 h-14 rounded-full border-2 border-[#C9A96E] object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/default-avatar.png';
                }}
              />
            </div>
            <div>
              <p className="font-semibold text-white">{user?.name || 'Invité'}</p>
              <p className="text-xs text-[#C9A96E]/70 mt-0.5">{getRoleLabel()}</p>
            </div>
          </div>
        </div>

        {/* Menu items */}
        <nav className="p-4 space-y-1" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#C9A96E] to-[#DFC08A] text-[#0D0B07] shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {Icon && <Icon size={20} className={isActive ? 'text-[#0D0B07]' : 'text-white/50'} />}
                <span className="font-medium">{item.label}</span>
                {isActive && <span className="ml-auto text-[#0D0B07]">✓</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-[#0D0B07]">
          {user ? (
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl transition-all duration-300 ${
                isLoggingOut
                  ? 'bg-gray-600 text-white/50 cursor-not-allowed'
                  : 'bg-red-600/20 border border-red-500/50 text-red-400 hover:bg-red-600 hover:text-white'
              }`}
            >
              {isLoggingOut ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Déconnexion...</span>
                </>
              ) : (
                <>
                  <FiLogOut size={18} />
                  <span>Déconnexion</span>
                </>
              )}
            </button>
          ) : (
            <div className="flex gap-3">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 flex-1 px-4 py-3 rounded-xl bg-[#C9A96E] text-[#0D0B07] font-semibold hover:bg-[#DFC08A] transition-all duration-300"
              >
                <FiLogIn size={16} />
                <span>Connexion</span>
              </Link>
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 flex-1 px-4 py-3 rounded-xl border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition-all duration-300"
              >
                <FiUserPlus size={16} />
                <span>Inscription</span>
              </Link>
            </div>
          )}
          <p className="text-center text-xs text-white/30 mt-4 font-sans">
            Bangang Connect v1.0
          </p>
        </div>
      </div>

      {/* Espace pour le contenu (évite superposition) */}
      <div className="h-14" />
    </>
  );
}
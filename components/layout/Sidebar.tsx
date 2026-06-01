'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  FiUsers, FiCalendar, FiMapPin, FiHome, 
  FiBriefcase, FiLogOut, FiUser, FiStar, 
  FiShield, FiChevronRight, FiGrid,
  FiSettings, FiMessageCircle, FiBell
} from 'react-icons/fi';
import { GiCrown } from 'react-icons/gi';
import { MdDashboard } from 'react-icons/md';

interface SidebarProps {
  user: any;
}

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const [isDesktop, setIsDesktop] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Menu commun à tous
  const commonItems = [
    { href: '/community', label: 'Communauté', icon: FiUsers },
    { href: '/events', label: 'Événements', icon: FiCalendar },
    { href: '/sectors', label: 'Secteurs', icon: FiMapPin },
  ];

  // Menu selon le rôle
  const getRoleMenu = () => {
    if (!user) return [];

    switch (user.role) {
      case 'super_admin':
        return [
          { href: '/admin/dashboard', label: 'Tableau de bord', icon: MdDashboard },
        ];
      case 'sector_president':
        return [
          { href: '/dashboard/president', label: 'Gestion secteur', icon: FiBriefcase },
          { href: '/dashboard', label: 'Tableau de bord', icon: MdDashboard },
        ];
      case 'community_chief':
        return [
          { href: '/dashboard/community', label: 'Gestion communauté', icon: FiUsers },
          { href: '/dashboard', label: 'Tableau de bord', icon: MdDashboard },
        ];
      case 'village_chief':
        return [
          { href: '/dashboard/village', label: 'Gestion village', icon: FiHome },
          { href: '/dashboard', label: 'Tableau de bord', icon: MdDashboard },
        ];
      default:
        return [
          { href: '/dashboard/member', label: 'Tableau de bord', icon: MdDashboard },
        ];
    }
  };

  const getRoleLabel = () => {
    if (!user) return 'Visiteur';
    switch (user.role) {
      case 'super_admin': return 'Super Administrateur';
      case 'sector_president': return 'Président de secteur';
      case 'community_chief': return 'Chef de communauté';
      case 'village_chief': return 'Chef de village';
      default: return 'Membre';
    }
  };

  const getRoleIcon = () => {
    if (!user) return FiUser;
    switch (user.role) {
      case 'super_admin': return GiCrown;
      case 'sector_president': return FiStar;
      case 'community_chief': return FiUsers;
      case 'village_chief': return FiHome;
      default: return FiUser;
    }
  };

  const roleMenu = getRoleMenu();
  const RoleIcon = getRoleIcon();
  const allMenuItems = [...roleMenu, ...commonItems];

  // Masquer sur mobile
  if (!isDesktop) {
    return null;
  }

  return (
    <aside 
      className={`fixed left-0 top-16 h-full bg-[#1d1c1c] border-r border-[#C9A96E]/10 z-40 overflow-y-auto transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >

      <nav className="p-4">
        {/* Info utilisateur avec photo */}
        {user && (
          <div className={`mb-6 pb-4 border-b border-[#C9A96E]/10 transition-all duration-300 ${collapsed ? 'text-center' : ''}`}>
            <div className={`flex ${collapsed ? 'flex-col' : 'items-center'} gap-3`}>
              <div className="relative mx-auto">
                <div className="absolute inset-0 rounded-full bg-[#C9A96E]/20 blur-md" />
                <img
                  src={user.photo || '/default-avatar.png'}
                  alt={user.name}
                  className="relative w-12 h-12 rounded-full object-cover border-2 border-[#C9A96E]"
                />
                {user.isVerified && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-[#0D0B07] flex items-center justify-center">
                    <FiShield size={8} className="text-white" />
                  </div>
                )}
              </div>
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#F5EDD8] text-sm truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-[#C9A96E]/70 flex items-center gap-1 mt-0.5">
                    <RoleIcon size={10} />
                    <span>{getRoleLabel()}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Menu items */}
        <div className="space-y-1">
          {allMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#C9A96E] to-[#DFC08A] text-[#0D0B07] shadow-lg'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                } ${collapsed ? 'justify-center' : ''}`}
                title={collapsed ? item.label : ''}
              >
                <Icon size={20} className={`shrink-0 ${isActive ? 'text-[#0D0B07]' : 'text-white/40 group-hover:text-white/80 transition-colors'}`} />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-sm font-medium">{item.label}</span>
                    {isActive && <FiChevronRight size={14} />}
                  </>
                )}
              </Link>
            );
          })}
        </div>

        {/* Séparateur */}
        <div className={`my-4 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/20 to-transparent ${collapsed ? 'mx-2' : ''}`} />

        {/* Section supplémentaire */}
        {!collapsed && (
          <div className="mb-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/30 mb-2 px-3">
              Communauté
            </p>
            <div className="space-y-1">
              <Link
                href="/chat"
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <FiMessageCircle size={18} />
                <span className="text-sm font-medium">Messagerie</span>
              </Link>
            </div>
          </div>
        )}

        {/* Bouton déconnexion */}
        <div className={`mt-6 pt-4 border-t border-[#C9A96E]/10 ${collapsed ? 'text-center' : ''}`}>
          <button
            onClick={async () => {
              await fetch('/api/auth/logout', { method: 'POST' });
              window.location.href = '/';
            }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
              collapsed ? 'justify-center w-full' : 'w-full'
            } bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 group`}
            title={collapsed ? 'Déconnexion' : ''}
          >
            <FiLogOut size={18} />
            {!collapsed && <span className="text-sm font-medium">Déconnexion</span>}
          </button>
        </div>

        {/* Footer */}
        {!collapsed && (
          <div className="mt-6 pt-4 text-center">
            <p className="text-[10px] text-white/20 font-sans">
              Bangang Connect v1.0
            </p>
            <p className="text-[9px] text-white/15 mt-1">
              © 2024 Royaume Bangang
            </p>
          </div>
        )}
      </nav>
    </aside>
  );
}
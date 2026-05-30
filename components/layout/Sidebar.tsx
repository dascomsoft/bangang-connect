'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface SidebarProps {
  user: any;
}

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleResize = () => {
    setIsDesktop(window.innerWidth >= 1024);
  };

  // Menu commun à tous (uniquement communauté)
  const commonItems = [
    { href: '/community', label: 'Communauté' },
    { href: '/events', label: 'Événements' },
    { href: '/sectors', label: 'Secteurs' },

  ];

  // Menu selon le rôle
  const getRoleMenu = () => {
    if (!user) return [];

    switch (user.role) {
      case 'super_admin':
        return [
          // { href: '/admin/dashboard', label: 'Administration' }, // ← MODIFIÉ
          { href: '/admin/dashboard', label: 'Tableau de bord' },
        ];
      case 'sector_president':
        return [
          { href: '/dashboard/president', label: 'Gestion secteur' },
          { href: '/admin/dashboard', label: 'Tableau de bord' },
        ];
      case 'community_chief':
        return [
          { href: '/dashboard/community', label: 'Gestion communauté' },
          { href: '/admin/dashboard', label: 'Tableau de bord' },
        ];
      case 'village_chief':
        return [
          { href: '/dashboard/village', label: 'Gestion village' },
          { href: '/admin/dashboard', label: 'Tableau de bord' },
        ];
      default:
        return [
          { href: '/dashboard/member', label: 'Tableau de bord' },
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

  const roleMenu = getRoleMenu();
  const allMenuItems = [...roleMenu, ...commonItems];

  // Masquer sur mobile
  if (!isDesktop) {
    return null;
  }

  return (
    <aside className="fixed left-0 top-16 h-full w-64 bg-slate-700 border-r border-gray-200 z-40 overflow-y-auto">
      <nav className="p-4">
        {/* Info utilisateur avec photo */}
        {user && (
          <div className="mb-6 pb-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <img
                src={user.photo || '/default-avatar.png'}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white text-sm truncate">
                  {user.name}
                </p>
                <p className="text-xs text-white">
                  {getRoleLabel()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Menu items */}
        <div className="space-y-1">
          {allMenuItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className={`block px-3 py-2.5 rounded-lg text-xl font-medium transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-white text-3xl font-extrabold'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="float-right w-1.5 h-5 bg-white rounded-full opacity-50"></span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Bouton déconnexion */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={async () => {
              await fetch('/api/auth/logout', { method: 'POST' });
              window.location.href = '/';
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-xl bg-white font-extrabold text-red-600 hover:bg-red-50 transition"
          >
            Déconnexion
          </button>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4">
          <p className="text-xs text-gray-400 text-center">
            Bangang Connect v1.0
          </p>
        </div>
      </nav>
    </aside>
  );
}
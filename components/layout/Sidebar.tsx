'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  sectorId?: {
    _id: string;
    name: string;
  };
}

export default function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    fetchUser();
  }, []);
  
  const fetchUser = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsAdmin(data.user.role === 'super_admin');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };
  
  // Menu pour tous les utilisateurs
  const menuItems = [
    { href: '/dashboard', label: 'Tableau de bord', icon: '📊' },
    { href: '/dashboard/profile', label: 'Mon profil', icon: '👤' }, 
    { href: '/events', label: 'Événements', icon: '📅' },
    { href: '/chat', label: 'Chat', icon: '💬' },
    { href: '/sectors', label: 'Secteurs', icon: '🏘️' },
  ];
  
  // Menu pour les membres avec secteur
  const memberItems = user?.sectorId ? [
    { href: '/sector', label: 'Mon secteur', icon: '📍' },
  ] : [];
  
  // Menu pour tous
  const commonItems = [
    { href: '/community', label: 'Communauté', icon: '🌍' },
    { href: '/ads', label: 'Annonces', icon: '📢' },
  ];
  
  // Menu pour admin uniquement
  const adminItems = isAdmin ? [
    { href: '/dashboard/admin', label: 'Admin', icon: '👑' },
  ] : [];
  
  const allMenuItems = [...menuItems, ...memberItems, ...commonItems, ...adminItems];
  
  return (
    <aside className="fixed left-0 top-16 h-full w-64 bg-white shadow-lg z-40 overflow-y-auto">
      <nav className="p-4">
        {/* En-tête avec info utilisateur */}
        {user && (
          <div className="mb-6 pb-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {user.name?.charAt(0).toUpperCase() || '?'}
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm truncate max-w-[160px]">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500">
                  {user.role === 'super_admin' ? '👑 Super Admin' : 
                   user.role === 'sector_president' ? '👤 Président' : '👤 Membre'}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Menu items */}
        <div className="space-y-1">
          {allMenuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                pathname === item.href
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
              {pathname === item.href && (
                <span className="ml-auto text-sm">✓</span>
              )}
            </Link>
          ))}
        </div>
        
        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <div className="px-4 py-2">
            <p className="text-xs text-gray-400 text-center">
              Bangang Connect v1.0
            </p>
          </div>
        </div>
      </nav>
    </aside>
  );
}
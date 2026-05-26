'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/admin/dashboard', label: '📊 Dashboard', icon: '📊' },
  { href: '/admin/users', label: '👥 Utilisateurs', icon: '👥' },
  { href: '/admin/businesses', label: '🏪 Entreprises', icon: '🏪' },
  { href: '/admin/events', label: '📅 Événements', icon: '📅' },
  { href: '/admin/communities', label: '🌍 Communautés', icon: '🌍' },
  { href: '/admin/sectors', label: '🏘️ Secteurs', icon: '🏘️' },
  { href: '/admin/ads', label: '📢 Annonces', icon: '📢' },
];

export default function AdminTabs() {
  const pathname = usePathname();
  
  return (
    <div className="flex flex-wrap gap-2 border-b mb-6">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`px-4 py-2 rounded-t-lg transition-all duration-200 ${
            pathname === tab.href
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span className="mr-1">{tab.icon}</span>
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
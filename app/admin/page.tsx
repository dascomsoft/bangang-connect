import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import { verifyToken } from '@/lib/auth';

// ✅ Server Component - Pas de JS envoyé au client

async function getStats() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  
  if (!token) return null;
  
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  
  // ✅ Cache de 60 secondes
  const res = await fetch(`${baseUrl}/api/admin/stats`, {
    cache: 'force-cache',
    next: { revalidate: 60 },
    headers: { Cookie: cookieStore.toString() },
  });
  
  if (!res.ok) return null;
  return res.json();
}

export default async function AdminPage() {
  // ✅ Auth côté serveur - instantané
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  
  if (!token) {
    redirect('/login');
  }
  
  const user = verifyToken(token);
  if (!user || user.role !== 'super_admin') {
    redirect('/dashboard');
  }
  
  const stats = await getStats();
  
  const quickActions = [
    { href: '/admin/users', label: '👥 Utilisateurs', desc: 'Gérer les membres', color: 'bg-blue-500' },
    { href: '/admin/businesses', label: '🏪 Entreprises', desc: `${stats?.pendingBusinesses || 0} en attente`, color: 'bg-yellow-500' },
    { href: '/admin/communities', label: '🌍 Communautés', desc: 'Villes et diaspora', color: 'bg-green-500' },
    { href: '/admin/sectors', label: '🏘️ Secteurs', desc: 'Gérer les secteurs', color: 'bg-purple-500' },
    { href: '/admin/events', label: '📅 Événements', desc: 'Gérer les événements', color: 'bg-pink-500' },
  ];
  
  return (
    <Suspense fallback={<div className="text-center py-12">Chargement...</div>}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
          <h1 className="text-2xl font-bold">👋 Administration</h1>
          <p className="text-purple-100">Gestion complète de Bangang Connect</p>
        </div>
        
        {/* Stats rapides - Server Component donc instantané */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl">👥</div>
            <div className="text-xl font-bold">{stats?.totalUsers || 0}</div>
            <div className="text-xs text-gray-500">Utilisateurs</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl">🏪</div>
            <div className="text-xl font-bold">{stats?.totalBusinesses || 0}</div>
            <div className="text-xs text-gray-500">Entreprises</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl">🌍</div>
            <div className="text-xl font-bold">{stats?.totalCommunities || 0}</div>
            <div className="text-xs text-gray-500">Communautés</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl">⏳</div>
            <div className="text-xl font-bold text-yellow-600">{stats?.pendingBusinesses || 0}</div>
            <div className="text-xs text-gray-500">En attente</div>
          </Card>
        </div>
        
        {/* Actions rapides */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href}>
              <Card className="p-4 hover:shadow-lg transition cursor-pointer">
                <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center text-white mb-3`}>
                  {action.label.charAt(0)}
                </div>
                <h3 className="font-semibold">{action.label}</h3>
                <p className="text-sm text-gray-500">{action.desc}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Suspense>
  );
}
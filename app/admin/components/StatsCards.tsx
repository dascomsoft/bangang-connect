'use client';

import Card from '@/components/ui/Card';

interface StatsCardsProps {
  stats: {
    totalUsers: number;
    totalCommunities: number;
    totalSectors: number;
    totalEvents: number;
    totalAds: number;
    totalBusinesses: number;
    pendingBusinesses: number;
  };
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    { title: 'Utilisateurs', value: stats.totalUsers, icon: '👥', color: 'bg-blue-500' },
    { title: 'Communautés', value: stats.totalCommunities, icon: '🌍', color: 'bg-green-500' },
    { title: 'Secteurs', value: stats.totalSectors, icon: '🏘️', color: 'bg-yellow-500' },
    { title: 'Entreprises', value: stats.totalBusinesses, icon: '🏪', color: 'bg-purple-500' },
    { title: 'Événements', value: stats.totalEvents, icon: '📅', color: 'bg-pink-500' },
    { title: 'Annonces', value: stats.totalAds, icon: '📢', color: 'bg-indigo-500' },
  ];
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {cards.map((card, index) => (
          <Card key={index} className="p-4 text-center hover:shadow-lg transition-shadow">
            <div className={`w-12 h-12 ${card.color} rounded-full flex items-center justify-center text-2xl mx-auto mb-3`}>
              {card.icon}
            </div>
            <div className="text-2xl font-bold">{card.value.toLocaleString()}</div>
            <div className="text-gray-600 text-sm">{card.title}</div>
          </Card>
        ))}
      </div>
      
      {stats.pendingBusinesses > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⏳</span>
            <div>
              <p className="font-semibold text-yellow-800">
                {stats.pendingBusinesses} entreprise(s) en attente de validation
              </p>
              <a 
                href="/admin/businesses"
                className="text-sm text-yellow-700 underline hover:text-yellow-900"
              >
                Voir et valider maintenant →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function PresidentDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    members: 0,
    events: 0,
    pendingRequests: 0,
    revenue: 0
  });
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const [requestsRes, statsRes] = await Promise.all([
        fetch('/api/sectors/requests'),
        fetch('/api/sectors/stats')
      ]);
      
      const requestsData = await requestsRes.json();
      const statsData = await statsRes.json();
      
      setRequests(requestsData);
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleRequest = async (requestId: string, status: string) => {
    const response = await fetch('/api/sectors/requests', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requestId, status })
    });
    
    if (response.ok) {
      fetchData();
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Dashboard Président
        </h1>
        <p className="text-blue-100">
          Gérez votre secteur et ses membres
        </p>
      </div>
      
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="text-center">
            <div className="text-4xl mb-2">👥</div>
            <div className="text-2xl font-bold">{stats.members}</div>
            <div className="text-gray-600">Membres</div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="text-center">
            <div className="text-4xl mb-2">📅</div>
            <div className="text-2xl font-bold">{stats.events}</div>
            <div className="text-gray-600">Événements</div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="text-center">
            <div className="text-4xl mb-2">⏳</div>
            <div className="text-2xl font-bold">{stats.pendingRequests}</div>
            <div className="text-gray-600">Demandes en attente</div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="text-center">
            <div className="text-4xl mb-2">💰</div>
            <div className="text-2xl font-bold">{stats.revenue} FCFA</div>
            <div className="text-gray-600">Revenus</div>
          </div>
        </Card>
      </div>
      
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">📝 Demandes d'adhésion</h2>
        {requests.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Aucune demande en attente</p>
        ) : (
          <div className="space-y-4">
            {requests.map((request: any) => (
              <div key={request._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {request.userId.name?.charAt(0) || '?'}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{request.userId.name}</p>
                    <p className="text-sm text-gray-600">{request.userId.email}</p>
                    {request.message && (
                      <p className="text-sm text-gray-500 mt-1">📝 {request.message}</p>
                    )}
                  </div>
                </div>
                <div className="space-x-2">
                  <Button
                    size="sm"
                    variant="success"
                    onClick={() => handleRequest(request._id, 'approved')}
                  >
                    ✅ Accepter
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleRequest(request._id, 'rejected')}
                  >
                    ❌ Refuser
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Button
          variant="primary"
          onClick={() => router.push('/events')}
          fullWidth
        >
          📅 Créer un événement
        </Button>
        <Button
          variant="secondary"
          onClick={() => router.push('/chat')}
          fullWidth
        >
          💬 Accéder au chat
        </Button>
      </div>
    </div>
  );
}
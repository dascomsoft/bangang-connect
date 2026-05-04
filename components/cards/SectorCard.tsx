'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

interface SectorCardProps {
  sector: {
    _id: string;
    name: string;
    description?: string;
    members: string[];
    presidentId: {
      _id: string;
      name: string;
      email: string;
      photo?: string;
    };
    communityId: {
      _id: string;
      name: string;
      type: string;
    };
    createdAt: Date;
  };
  onJoin?: (sectorId: string) => void;
  onRequestJoin?: (sectorId: string, message?: string) => void;
  isMember?: boolean;
  hasPendingRequest?: boolean;
  currentUserId?: string;
  userRole?: string;
}

export default function SectorCard({ 
  sector, 
  onJoin, 
  onRequestJoin, 
  isMember = false,
  hasPendingRequest = false,
  currentUserId,
  userRole
}: SectorCardProps) {
  const router = useRouter();
  const [showMessage, setShowMessage] = React.useState(false);
  const [joinMessage, setJoinMessage] = React.useState('');

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleJoin = () => {
    if (userRole === 'sector_president' || userRole === 'super_admin') {
      // Les présidents et admins peuvent rejoindre directement
      onJoin?.(sector._id);
    } else {
      // Les membres doivent faire une demande
      setShowMessage(true);
    }
  };

  const handleSendRequest = () => {
    onRequestJoin?.(sector._id, joinMessage);
    setShowMessage(false);
    setJoinMessage('');
  };

  const handleViewSector = () => {
    router.push(`/sector/${sector._id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="p-6">
        {/* En-tête */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl">🏘️</span>
              <h3 className="text-xl font-bold text-gray-900">{sector.name}</h3>
            </div>
            <p className="text-sm text-gray-500">
              {sector.communityId.name} • {sector.communityId.type === 'city' ? 'Ville' : 'Pays'}
            </p>
          </div>
          
          {/* Badge membre */}
          {isMember && (
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
              ✓ Membre
            </span>
          )}
          {hasPendingRequest && (
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
              ⏳ Demande en attente
            </span>
          )}
        </div>
        
        {/* Description */}
        {sector.description && (
          <div className="mb-4">
            <p className="text-gray-700 leading-relaxed">{sector.description}</p>
          </div>
        )}
        
        {/* Informations */}
        <div className="space-y-2 mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2 text-gray-600">
            <span>👥</span>
            <span className="text-sm">{sector.members.length} membres</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <span>👑</span>
            <span className="text-sm">Président: {sector.presidentId.name}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <span>📅</span>
            <span className="text-sm">Créé le {formatDate(sector.createdAt)}</span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex space-x-3">
          <Button
            size="sm"
            variant="primary"
            onClick={handleViewSector}
          >
            Voir le secteur
          </Button>
          
          {!isMember && !hasPendingRequest && currentUserId && (
            <Button
              size="sm"
              variant="secondary"
              onClick={handleJoin}
            >
              Rejoindre
            </Button>
          )}
        </div>
        
        {/* Modal de demande d'adhésion */}
        {showMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4">Demande d'adhésion</h3>
              <p className="text-gray-600 mb-4">
                Envoyez un message au président du secteur pour rejoindre {sector.name}
              </p>
              <textarea
                value={joinMessage}
                onChange={(e) => setJoinMessage(e.target.value)}
                placeholder="Votre message (optionnel)..."
                rows={4}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              />
              <div className="flex space-x-3">
                <Button variant="primary" onClick={handleSendRequest}>
                  Envoyer la demande
                </Button>
                <Button variant="secondary" onClick={() => setShowMessage(false)}>
                  Annuler
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
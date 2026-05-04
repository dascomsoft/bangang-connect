'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';

interface EventCardProps {
  event: {
    _id: string;
    title: string;
    description: string;
    date: Date;
    location: string;
    is_boosted: boolean;
    boost_expires_at?: Date;
    createdBy: {
      name: string;
      email: string;
      photo?: string;
    };
    sectorId: {
      name: string;
    };
    participants?: string[];
  };
  onBoost?: (eventId: string) => void;
  canBoost?: boolean;
  onParticipate?: (eventId: string) => void;
  currentUserId?: string;
}

export default function EventCard({ event, onBoost, canBoost, onParticipate, currentUserId }: EventCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [participants, setParticipants] = useState(event.participants || []);
  const [isParticipating, setIsParticipating] = useState(
    currentUserId ? participants.includes(currentUserId) : false
  );

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isEventPassed = () => {
    return new Date(event.date) < new Date();
  };

  const handleParticipate = async () => {
    if (!currentUserId) return;
    
    const response = await fetch(`/api/events/${event._id}/participate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.ok) {
      const data = await response.json();
      setParticipants(data.participants);
      setIsParticipating(!isParticipating);
    }
  };

  const handleAddComment = async () => {
    if (!comment.trim()) return;
    
    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId: event._id, content: comment })
    });
    
    if (response.ok) {
      setComment('');
      const commentsRes = await fetch(`/api/comments?eventId=${event._id}`);
      const data = await commentsRes.json();
      setComments(data);
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${event.is_boosted ? 'border-2 border-yellow-400 shadow-lg' : ''}`}>
      {/* Badge Boosté */}
      {event.is_boosted && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 text-sm font-semibold flex justify-between items-center">
          <span>⚡ Événement Boosté</span>
          {event.boost_expires_at && (
            <span className="text-xs">
              Jusqu'au {formatDate(event.boost_expires_at)}
            </span>
          )}
        </div>
      )}
      
      <div className="p-6">
        {/* En-tête */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl">📅</span>
              <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
            </div>
            <p className="text-sm text-gray-500">
              Organisé par {event.createdBy.name} • Secteur {event.sectorId.name}
            </p>
          </div>
          
          {canBoost && !event.is_boosted && !isEventPassed() && (
            <Button
              size="sm"
              variant="success"
              onClick={() => onBoost?.(event._id)}
            >
              🚀 Booster (1000 FCFA)
            </Button>
          )}
        </div>
        
        {/* Description */}
        <div className="mb-4">
          <p className="text-gray-700 leading-relaxed">{event.description}</p>
        </div>
        
        {/* Informations */}
        <div className="space-y-2 mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2 text-gray-600">
            <span>📅</span>
            <span className="text-sm">{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <span>📍</span>
            <span className="text-sm">{event.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <span>👥</span>
            <span className="text-sm">{participants.length} participants</span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex space-x-4 border-t pt-4">
          {!isEventPassed() && (
            <Button
              size="sm"
              variant={isParticipating ? "secondary" : "primary"}
              onClick={handleParticipate}
            >
              {isParticipating ? "✓ Je participe" : "👍 Je participe"}
            </Button>
          )}
          
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition"
          >
            <span>💬</span>
            <span className="text-sm">{comments.length} commentaires</span>
          </button>
        </div>
        
        {/* Commentaires */}
        {showComments && (
          <div className="mt-4 pt-4 border-t">
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {comments.map((comment: any) => (
                <div key={comment._id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {comment.userId.name?.charAt(0) || '?'}
                    </div>
                    <span className="font-semibold text-sm">{comment.userId.name}</span>
                    <span className="text-xs text-gray-500">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm">{comment.content}</p>
                </div>
              ))}
            </div>
            
            {!isEventPassed() && (
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Écrire un commentaire..."
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button size="sm" onClick={handleAddComment}>
                  Envoyer
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { toast } from 'react-hot-toast';

interface Comment {
  _id: string;
  content: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    photo?: string;
  };
  createdAt: string;
}

interface AdCardProps {
  ad: {
    _id: string;
    title: string;
    content: string;
    is_sponsored: boolean;
    sponsor_expires_at?: Date;
    createdBy: {
      name: string;
      email: string;
      photo?: string;
    };
    createdAt: Date;
    sectorId?: { name: string };
    communityId?: { name: string };
  };
  onSponsor?: (adId: string) => void;
  canSponsor?: boolean;
  currentUserId?: string;
}

export default function AdCard({ ad, onSponsor, canSponsor, currentUserId }: AdCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [sending, setSending] = useState(false);

  // Recharger les commentaires quand on ouvre la section
  useEffect(() => {
    if (showComments) {
      loadComments();
    }
  }, [showComments, ad._id]);

  const loadComments = async () => {
    setLoadingComments(true);
    try {
      const response = await fetch(`/api/comments?adId=${ad._id}`);
      const data = await response.json();
      setComments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading comments:', error);
      toast.error('Erreur chargement commentaires');
    } finally {
      setLoadingComments(false);
    }
  };

  const handleAddComment = async () => {
    if (!comment.trim()) {
      toast.error('Veuillez écrire un commentaire');
      return;
    }

    setSending(true);
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          adId: ad._id, 
          content: comment.trim() 
        })
      });

      if (response.ok) {
        const newComment = await response.json();
        setComments(prev => [newComment, ...prev]);
        setComment('');
        toast.success('Commentaire ajouté');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Erreur lors de l\'ajout');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Erreur serveur');
    } finally {
      setSending(false);
    }
  };

  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${ad.is_sponsored ? 'border-2 border-yellow-400' : ''}`}>
      {ad.is_sponsored && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 text-sm font-semibold">
          Annonce Sponsorisée
        </div>
      )}
      
      <div className="p-6">
        {/* En-tête */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
              {ad.createdBy.name?.charAt(0) || '?'}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{ad.title}</h3>
              <p className="text-xs text-gray-500">
                Publié par {ad.createdBy.name} • {formatDate(ad.createdAt)}
              </p>
              {ad.sectorId && (
                <p className="text-xs text-blue-600">Secteur: {ad.sectorId.name}</p>
              )}
            </div>
          </div>
          
          {canSponsor && !ad.is_sponsored && (
            <Button
              size="sm"
              variant="success"
              onClick={() => onSponsor?.(ad._id)}
            >
              Sponsoriser
            </Button>
          )}
        </div>
        
        {/* Contenu */}
        <div className="mb-4">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {ad.content}
          </p>
        </div>
        
        {/* Actions */}
        <div className="flex space-x-4 border-t pt-4">
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition"
          >
            <span>💬</span>
            <span className="text-sm">{comments.length} commentaire(s)</span>
          </button>
        </div>
        
        {/* Commentaires */}
        {showComments && (
          <div className="mt-4 pt-4 border-t">
            {/* Liste des commentaires */}
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {loadingComments ? (
                <div className="text-center py-4">
                  <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                </div>
              ) : comments.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  Aucun commentaire. Soyez le premier à commenter !
                </p>
              ) : (
                comments.map((comment) => (
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
                ))
              )}
            </div>
            
            {/* Formulaire d'ajout */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                placeholder="Écrire un commentaire..."
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={sending}
              />
              <Button size="sm" onClick={handleAddComment} disabled={sending}>
                {sending ? '...' : 'Envoyer'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
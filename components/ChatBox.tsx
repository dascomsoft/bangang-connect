'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { toast } from 'react-hot-toast';

interface Message {
  _id: string;
  content: string;
  senderId: {
    _id: string;
    name: string;
    email: string;
    photo?: string;
  };
  createdAt: string;
}

interface ChatBoxProps {
  sectorId: string;
  userId: string;
}

export default function ChatBox({ sectorId, userId }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Charger les messages
  const loadMessages = useCallback(async () => {
    if (!sectorId) return;
    
    try {
      setLoading(true);
      // 🔥 Correction : utiliser chatType=sector et roomId
      const response = await fetch(`/api/chat?chatType=sector&roomId=${sectorId}`);
      
      if (!response.ok) {
        throw new Error('Erreur chargement');
      }
      
      const data = await response.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erreur chargement messages:', error);
      toast.error('Erreur chargement des messages');
    } finally {
      setLoading(false);
    }
  }, [sectorId]);
  
  // Recharger quand le secteur change
  useEffect(() => {
    if (sectorId) {
      loadMessages();
    }
  }, [loadMessages, sectorId]);
  
  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Envoyer un message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    
    setSending(true);
    try {
      // 🔥 Correction : utiliser chatType=sector et roomId
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newMessage.trim(),
          chatType: 'sector',
          roomId: sectorId
        })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur envoi');
      }
      
      const message = await response.json();
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      
      // Faire défiler vers le bas
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      
    } catch (error) {
      console.error('Erreur envoi:', error);
      toast.error('Erreur lors de l\'envoi du message');
    } finally {
      setSending(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  const formatMessageDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    }
  };
  
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
        <p className="text-gray-500">Chargement des messages...</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md flex flex-col h-[500px]">
      {/* Zone des messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-2">💬</div>
            <p>Aucun message</p>
            <p className="text-sm">Soyez le premier à envoyer un message !</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isOwnMessage = msg.senderId._id === userId;
            const senderName = msg.senderId?.name || 'Utilisateur';
            const senderPhoto = msg.senderId?.photo || '/default-avatar.png';
            
            return (
              <div
                key={msg._id}
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-2 max-w-[75%] ${isOwnMessage ? 'flex-row-reverse' : ''}`}>
                  {/* Avatar */}
                  <img
                    src={senderPhoto}
                    alt={senderName}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/default-avatar.png';
                    }}
                  />
                  
                  <div>
                    {/* Nom */}
                    <p className={`text-xs font-semibold mb-1 ${isOwnMessage ? 'text-right' : ''}`}>
                      {isOwnMessage ? 'Moi' : senderName}
                    </p>
                    
                    {/* Bulle de message */}
                    <div className={`rounded-lg px-3 py-2 ${isOwnMessage ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
                      <p className="break-words whitespace-pre-wrap text-sm">{msg.content}</p>
                      <p className={`text-xs mt-1 text-right ${isOwnMessage ? 'text-blue-100' : 'text-gray-400'}`}>
                        {formatMessageDate(msg.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Zone de saisie */}
      <div className="border-t p-4 bg-gray-50 rounded-b-lg">
        <div className="flex space-x-2">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Écrivez votre message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={2}
            disabled={sending}
          />
          <button
            onClick={sendMessage}
            disabled={sending || !newMessage.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold"
          >
            {sending ? '...' : 'Envoyer'}
          </button>
        </div>
      </div>
    </div>
  );
}
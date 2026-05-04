'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface Message {
  _id: string;
  content: string;
  senderId: {
    _id: string;
    name: string;
    photo?: string;
  };
  createdAt: string;
}

interface CommunityChatBoxProps {
  communityId: string;
  communityName: string;
  userId: string;
}

export default function CommunityChatBox({ communityId, communityName, userId }: CommunityChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const loadMessages = useCallback(async () => {
    if (!communityId) return;
    
    try {
      setLoading(true);
      const response = await fetch(`/api/chat?chatType=community&roomId=${communityId}`);
      
      if (!response.ok) {
        throw new Error('Erreur chargement');
      }
      
      const data = await response.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  }, [communityId]);
  
  useEffect(() => {
    loadMessages();
  }, [loadMessages]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    
    setSending(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newMessage.trim(),
          chatType: 'community',
          roomId: communityId
        })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur envoi');
      }
      
      const message = await response.json();
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Erreur lors de l\'envoi du message');
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
      {/* Header */}
      <div className="border-b p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🌍</span>
          <div>
            <h3 className="font-bold text-gray-800">Chat - {communityName}</h3>
            <p className="text-xs text-gray-500">Discutez avec les membres de la communauté</p>
          </div>
        </div>
      </div>
      
      {/* Messages */}
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
            
            return (
              <div
                key={msg._id}
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
              >
                <div className="flex items-start space-x-2 max-w-[70%]">
                  {!isOwnMessage && (
                    <img
                      src={msg.senderId.photo || '/default-avatar.png'}
                      alt={msg.senderId.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      isOwnMessage
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {!isOwnMessage && (
                      <p className="text-xs font-semibold mb-1 text-blue-600">
                        {msg.senderId.name}
                      </p>
                    )}
                    <p className="break-words whitespace-pre-wrap">{msg.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        isOwnMessage ? 'text-blue-100' : 'text-gray-400'
                      }`}
                    >
                      {new Date(msg.createdAt).toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <div className="border-t p-4 bg-gray-50 rounded-b-lg">
        <div className="flex space-x-2">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Message pour ${communityName}...`}
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
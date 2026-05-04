'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useSocket } from '@/components/providers/SocketProvider';

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
  isDeleted?: boolean;
}

interface Community {
  _id: string;
  name: string;
  type: string;
  country: string;
  city?: string;
}

interface TypingUser {
  userId: string;
  name: string;
}

export default function CommunityChatPage() {
  const router = useRouter();
  const params = useParams();
  const communityId = params.id as string;
  
  const { socket, isConnected, joinRoom, leaveRoom, sendMessage: sendSocketMessage, startTyping, stopTyping } = useSocket();

  const [user, setUser] = useState<any>(null);
  const [community, setCommunity] = useState<Community | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // État pour le menu contextuel
  const [contextMenu, setContextMenu] = useState<{ 
    visible: boolean; 
    x: number; 
    y: number; 
    messageId: string | null;
    messageUserId: string | null;
    isOwnMessage: boolean;
  }>({
    visible: false,
    x: 0,
    y: 0,
    messageId: null,
    messageUserId: null,
    isOwnMessage: false
  });

  // Rejoindre la room du chat via Socket
  useEffect(() => {
    if (communityId && isConnected && socket) {
      const room = `community-${communityId}`;
      joinRoom(room);
      console.log(`✅ Rejoint la room: ${room}`);
      
      return () => {
        leaveRoom(room);
        console.log(`👋 Quitté la room: ${room}`);
      };
    }
  }, [communityId, isConnected, socket, joinRoom, leaveRoom]);

  // Écouter les nouveaux messages Socket
  useEffect(() => {
    if (!socket) return;
    
    const handleNewMessage = (newMsg: Message) => {
      console.log('📨 Nouveau message reçu:', newMsg);
      if ((newMsg as any).roomId === communityId) {
        setMessages(prev => [...prev, newMsg]);
        setTimeout(scrollToBottom, 100);
      }
    };
    
    socket.on('message-received', handleNewMessage);
    
    return () => {
      socket.off('message-received', handleNewMessage);
    };
  }, [socket, communityId]);

  // 🔥 Écouter les événements de typing
  useEffect(() => {
    if (!socket) return;
    
    const handleUserTyping = (data: { userId: string; isTyping: boolean }) => {
      if (data.userId === socket.id) return;
      
      if (data.isTyping) {
        setTypingUsers(prev => {
          if (prev.some(u => u.userId === data.userId)) return prev;
          return [...prev, { userId: data.userId, name: 'Quelqu\'un' }];
        });
      } else {
        setTypingUsers(prev => prev.filter(u => u.userId !== data.userId));
      }
      
      // Effacer après 3 secondes (sécurité)
      setTimeout(() => {
        setTypingUsers(prev => prev.filter(u => u.userId !== data.userId));
      }, 3000);
    };
    
    socket.on('user-typing', handleUserTyping);
    
    return () => {
      socket.off('user-typing', handleUserTyping);
    };
  }, [socket]);

  // Fermer le menu contextuel
  useEffect(() => {
    const handleClick = () => setContextMenu(prev => ({ ...prev, visible: false }));
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    loadData();
  }, [communityId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadData = async () => {
    try {
      setLoading(true);

      const userRes = await fetch('/api/auth/me');
      if (!userRes.ok) {
        router.push('/login');
        return;
      }
      const userData = await userRes.json();
      setUser(userData.user);

      const communityRes = await fetch(`/api/communities/${communityId}`);
      if (communityRes.ok) {
        const communityData = await communityRes.json();
        setCommunity(communityData);
      } else {
        toast.error('Communauté non trouvée');
        router.push('/community');
        return;
      }

      await loadMessages();

    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async () => {
    try {
      const response = await fetch(`/api/chat?chatType=community&roomId=${communityId}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(Array.isArray(data) ? data : []);
      } else {
        console.error('Error loading messages');
        setMessages([]);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
      setMessages([]);
    }
  };

  // 🔥 Gestion du typing
  const handleTyping = () => {
    if (!newMessage.trim()) {
      stopTyping(`community-${communityId}`);
      return;
    }
    
    startTyping(`community-${communityId}`);
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      stopTyping(`community-${communityId}`);
    }, 1000);
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    // Arrêter l'indicateur de typing
    stopTyping(`community-${communityId}`);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

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
        toast.error(error.error || 'Erreur envoi');
        return;
      }

      const message = await response.json();
      setMessages(prev => [...prev, message]);
      setNewMessage('');

      if (sendSocketMessage && socket && isConnected) {
        sendSocketMessage({
          ...message,
          chatType: 'community',
          roomId: communityId
        });
      }

    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Erreur lors de l\'envoi');
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

  // ============================================
  // FONCTIONS DE MODÉRATION
  // ============================================

  const reportMessage = async (messageId: string, reason?: string) => {
    try {
      const response = await fetch('/api/chat/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageId, reason: reason || 'Comportement inapproprié' })
      });
      
      if (response.ok) {
        toast.success('Message signalé. Merci pour votre vigilance !');
        loadMessages();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Erreur lors du signalement');
      }
    } catch (error) {
      console.error('Report error:', error);
      toast.error('Erreur serveur');
    }
  };

  const deleteMessage = async (messageId: string) => {
    if (!confirm('Supprimer ce message ?')) return;
    
    try {
      const response = await fetch('/api/chat/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageId })
      });
      
      if (response.ok) {
        toast.success('Message supprimé');
        setMessages(prev => prev.filter(msg => msg._id !== messageId));
      } else {
        const error = await response.json();
        toast.error(error.error || 'Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Erreur serveur');
    }
  };

  const handleContextMenu = (e: React.MouseEvent, messageId: string, senderId: string) => {
    e.preventDefault();
    const isOwn = senderId === user?._id;
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      messageId,
      messageUserId: senderId,
      isOwnMessage: isOwn
    });
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
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!community) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-500">Communauté non trouvée</p>
        <button
          onClick={() => router.push('/community')}
          className="mt-4 text-blue-600 hover:underline"
        >
          Retour aux communautés
        </button>
      </div>
    );
  }

  const isAdmin = user?.role === 'super_admin';

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => router.push('/community')}
          className="text-blue-600 hover:underline flex items-center space-x-1"
        >
          <span>←</span>
          <span>Retour aux communautés</span>
        </button>
        
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
          <span className="text-xs text-gray-500">
            {isConnected ? 'Connecté en temps réel' : 'Hors ligne'}
          </span>
        </div>
      </div>

      {/* Chat Box */}
      <div className="bg-white rounded-lg shadow-md flex flex-col h-[600px]">
        {/* Header */}
        <div className="border-b p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl">
              {community.type === 'city' ? '🏙️' : '🌍'}
            </div>
            <div>
              <h2 className="font-bold text-lg">{community.name}</h2>
              <p className="text-xs text-gray-500">
                {community.type === 'city' ? 'Ville' : 'Pays'} • {community.country}
                {community.city && ` • ${community.city}`}
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <div className="text-5xl mb-3">💬</div>
              <p>Aucun message</p>
              <p className="text-sm">Soyez le premier à envoyer un message !</p>
            </div>
          ) : (
            messages.map((msg) => {
              const isOwnMessage = msg.senderId?._id === user?._id;
              const senderName = msg.senderId?.name || 'Utilisateur inconnu';
              const senderPhoto = msg.senderId?.photo || '/default-avatar.png';
              
              return (
                <div
                  key={msg._id}
                  className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} group`}
                  onContextMenu={(e) => handleContextMenu(e, msg._id, msg.senderId?._id)}
                >
                  <div className={`flex gap-2 max-w-[75%] ${isOwnMessage ? 'flex-row-reverse' : ''}`}>
                    <img
                      src={senderPhoto}
                      alt={senderName}
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/default-avatar.png';
                      }}
                    />
                    
                    <div>
                      <p className={`text-xs font-semibold mb-1 ${isOwnMessage ? 'text-right' : ''}`}>
                        {isOwnMessage ? 'Moi' : senderName}
                      </p>
                      
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
          
          {/* 🔥 TYPING INDICATOR */}
          {typingUsers.length > 0 && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <span>✍️</span>
                  <span>{typingUsers.map(u => u.name).join(', ')}</span>
                  <span>écrit{typingUsers.length > 1 ? 'ent' : ''}...</span>
                  <span className="flex space-x-1">
                    <span className="animate-bounce delay-0">.</span>
                    <span className="animate-bounce delay-150">.</span>
                    <span className="animate-bounce delay-300">.</span>
                  </span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Menu contextuel */}
        {contextMenu.visible && contextMenu.messageId && (
          <div 
            className="fixed z-50 bg-white rounded-lg shadow-xl border py-1 min-w-[160px]"
            style={{ top: contextMenu.y, left: contextMenu.x }}
          >
            <button
              onClick={() => {
                reportMessage(contextMenu.messageId!);
                setContextMenu(prev => ({ ...prev, visible: false }));
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
            >
              <span>🚩</span> Signaler
            </button>
            {(contextMenu.isOwnMessage || isAdmin) && (
              <button
                onClick={() => {
                  deleteMessage(contextMenu.messageId!);
                  setContextMenu(prev => ({ ...prev, visible: false }));
                }}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
              >
                <span>🗑️</span> Supprimer
              </button>
            )}
          </div>
        )}

        {/* Input avec Typing Indicator */}
        <div className="border-t p-4 bg-gray-50 rounded-b-lg">
          <div className="flex gap-2">
            <textarea
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                handleTyping();
              }}
              onKeyPress={handleKeyPress}
              placeholder={`Message instantané pour ${community.name}...`}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
              rows={2}
              disabled={sending}
            />
            <button
              onClick={sendMessage}
              disabled={sending || !newMessage.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition font-semibold"
            >
              {sending ? '...' : 'Envoyer'}
            </button>
          </div>
          {isConnected && (
            <p className="text-xs text-gray-400 mt-2 text-right">
              {isConnected ? '🔵 Connecté' : '⚪ Hors ligne'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
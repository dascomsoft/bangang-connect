'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function ChatRoomPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const chatType = params.type as string;
  const roomId = params.id as string;
  const roomName = searchParams.get('name') || 'Chat';
  
  const [user, setUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkAccess();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const checkAccess = async () => {
    try {
      // Vérifier l'utilisateur
      const userRes = await fetch('/api/auth/me');
      if (!userRes.ok) {
        router.push('/login');
        return;
      }
      const userData = await userRes.json();
      setUser(userData.user);
      
      // 🔥 Vérification d'accès pour les chats de secteur
      if (chatType === 'sector') {
        const sectorRes = await fetch(`/api/users/check-sector-access?sectorId=${roomId}`);
        const accessData = await sectorRes.json();
        
        if (!accessData.hasAccess) {
          setAccessDenied(true);
          toast.error('Vous n\'avez pas accès à ce chat de secteur');
          return;
        }
      }
      
      // Charger les messages
      await loadMessages();
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async () => {
    try {
      const res = await fetch(`/api/chat/${chatType}/${roomId}`);
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    
    setSending(true);
    try {
      const res = await fetch(`/api/chat/${chatType}/${roomId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newMessage.trim() })
      });
      
      if (res.status === 403) {
        toast.error('Vous n\'avez pas accès à ce chat');
        router.push('/chat');
        return;
      }
      
      if (res.ok) {
        const message = await res.json();
        setMessages(prev => [...prev, message]);
        setNewMessage('');
      } else {
        toast.error('Erreur lors de l\'envoi');
      }
    } catch (error) {
      toast.error('Erreur serveur');
    } finally {
      setSending(false);
    }
  };

  if (accessDenied) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-2">⛔ Accès interdit</h2>
          <p className="text-gray-600">
            Vous n'avez pas accès à ce chat de secteur.
            <br />
            Vous ne pouvez chatter que dans votre propre secteur.
          </p>
          <button
            onClick={() => router.push('/chat')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retour aux chats
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md p-4 fixed top-16 left-0 right-0 z-10">
        <div className="container mx-auto px-4 flex items-center gap-3">
          <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-900">
            ← Retour
          </button>
          <div>
            <h1 className="font-bold">{roomName}</h1>
            <p className="text-xs text-gray-500">
              {chatType === 'sector' ? 'Chat de secteur' : 'Chat communauté'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto pt-32 pb-24 px-4">
        <div className="max-w-3xl mx-auto space-y-3">
          {messages.map((msg) => {
            const isOwn = msg.senderId?._id === user?._id;
            return (
              <div key={msg._id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] ${isOwn ? 'bg-blue-500 text-white' : 'bg-white'} rounded-lg p-3 shadow`}>
                  {!isOwn && (
                    <p className="text-xs font-semibold text-blue-600 mb-1">
                      {msg.senderId?.name}
                    </p>
                  )}
                  <p className="text-sm break-words">{msg.content}</p>
                  <p className="text-xs opacity-70 mt-1 text-right">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="container mx-auto max-w-3xl flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Écrivez votre message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={sending}
          />
          <button
            onClick={sendMessage}
            disabled={sending || !newMessage.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {sending ? '...' : 'Envoyer'}
          </button>
        </div>
      </div>
    </div>
  );
}
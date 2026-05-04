'use client';

import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  onlineUsers: string[];
  joinRoom: (room: string) => void;
  leaveRoom: (room: string) => void;
  sendMessage: (data: any) => void;
  startTyping: (room: string) => void;
  stopTyping: (room: string) => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  onlineUsers: [],
  joinRoom: () => {},
  leaveRoom: () => {},
  sendMessage: () => {},
  startTyping: () => {},
  stopTyping: () => {},
});

export const useSocket = () => useContext(SocketContext);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const socketRef = useRef<Socket | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const socketInstance = io(window.location.origin);
    socketRef.current = socketInstance;
    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      console.log('✅ Socket connecté');
      setIsConnected(true);
      
      // Authentifier l'utilisateur
      const getToken = async () => {
        try {
          const response = await fetch('/api/auth/me');
          if (response.ok) {
            const token = document.cookie
              .split('; ')
              .find(row => row.startsWith('token='))
              ?.split('=')[1];
            if (token) {
              socketInstance.emit('authenticate', token);
            }
          }
        } catch (error) {
          console.error('Error getting token:', error);
        }
      };
      getToken();
    });

    socketInstance.on('disconnect', () => {
      console.log('❌ Socket déconnecté');
      setIsConnected(false);
    });

    socketInstance.on('online-users', (users: string[]) => {
      setOnlineUsers(users);
    });

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      socketInstance.disconnect();
    };
  }, []);

  const joinRoom = (room: string) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('join-room', room);
    }
  };

  const leaveRoom = (room: string) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('leave-room', room);
    }
  };

  const sendMessage = (data: any) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('send-message', data);
    }
  };

  const startTyping = (room: string) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('start-typing', room);
    }
  };

  const stopTyping = (room: string) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('stop-typing', room);
    }
  };

  return (
    <SocketContext.Provider value={{
      socket,
      isConnected,
      onlineUsers,
      joinRoom,
      leaveRoom,
      sendMessage,
      startTyping,
      stopTyping,
    }}>
      {children}
    </SocketContext.Provider>
  );
}
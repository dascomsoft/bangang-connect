import { Server as SocketServer } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { NextApiResponse } from 'next';
import { verifyToken } from '@/lib/auth';

let io: SocketServer | null = null;

export function initSocket(server: HTTPServer) {
  if (!io) {
    io = new SocketServer(server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST']
      },
      path: '/api/socket/io',
    });
    
    io.on('connection', (socket) => {
      console.log('🔌 Nouvelle connexion:', socket.id);
      
      socket.on('authenticate', (token: string) => {
        try {
          const decoded = verifyToken(token);
          if (decoded && typeof decoded !== 'string') {
            const userId = decoded.userId;
            socket.data.userId = userId;
            socket.join(`user-${userId}`);
            console.log(`✅ Utilisateur ${userId} authentifié`);
            
            // Notifier tous les utilisateurs
            const onlineUsers = Array.from(io?.sockets?.sockets?.values() || [])
              .map(s => s.data.userId)
              .filter(Boolean);
            io?.emit('online-users', onlineUsers);
          }
        } catch (error) {
          console.error('Auth error:', error);
        }
      });
      
      socket.on('join-room', (room: string) => {
        socket.join(room);
        console.log(`📢 ${socket.id} a rejoint ${room}`);
      });
      
      socket.on('leave-room', (room: string) => {
        socket.leave(room);
        console.log(`👋 ${socket.id} a quitté ${room}`);
      });
      
      socket.on('new-message', (message) => {
        const room = `${message.chatType}-${message.roomId}`;
        io?.to(room).emit('message-received', message);
        console.log(`💬 Message dans ${room}`);
      });
      
      socket.on('disconnect', () => {
        console.log('🔌 Déconnexion:', socket.id);
        const onlineUsers = Array.from(io?.sockets?.sockets?.values() || [])
          .map(s => s.data.userId)
          .filter(Boolean);
        io?.emit('online-users', onlineUsers);
      });
    });
  }
  return io;
}

export function getIO() {
  return io;
}
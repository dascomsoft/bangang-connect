import next from 'next';
import http from 'http';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = http.createServer((req, res) => {
    handle(req, res);
  });

  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  // Stocker les utilisateurs en ligne
  const onlineUsers = new Map();

  io.on('connection', (socket) => {
    console.log('🟢 User connected:', socket.id);

    // Authentification
    socket.on('authenticate', (token) => {
      // Stocker l'utilisateur
      socket.data.authenticated = true;
    });

    // Rejoindre une room
    socket.on('join-room', (room) => {
      socket.join(room);
      console.log(`📌 ${socket.id} joined ${room}`);
    });

    // Quitter une room
    socket.on('leave-room', (room) => {
      socket.leave(room);
      console.log(`❌ ${socket.id} left ${room}`);
    });

    // Envoyer un message
    socket.on('send-message', (data) => {
      console.log('📨 Message reçu:', data);
      io.to(data.roomId).emit('message-received', data);
    });

    // 🔥 TYPING INDICATOR - Commence à écrire
    socket.on('start-typing', (room) => {
      socket.to(room).emit('user-typing', { 
        userId: socket.id, 
        isTyping: true,
        timestamp: Date.now()
      });
    });

    // 🔥 TYPING INDICATOR - Arrête d'écrire
    socket.on('stop-typing', (room) => {
      socket.to(room).emit('user-typing', { 
        userId: socket.id, 
        isTyping: false,
        timestamp: Date.now()
      });
    });

    socket.on('disconnect', () => {
      console.log('🔴 User disconnected:', socket.id);
    });
  });

  server.listen(PORT, () => {
    console.log(`🚀 Server ready on http://localhost:${PORT}`);
  });
});
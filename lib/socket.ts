import { Server as SocketServer } from 'socket.io';

let io: SocketServer | null = null;

export function initIO(server: any) {
  if (!io) {
    io = new SocketServer(server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST']
      }
    });
  }
  return io;
}

export function getIO() {
  return io;
}
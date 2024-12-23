    // app/api/socket/route.ts
import { Server } from 'socket.io';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  // Disable body parsing for WebSocket to work
  api: {
    bodyParser: false,
  },
};

export async function GET(req: NextRequest) {
  const res:any = NextResponse.next();
  
  // Create a Socket.IO server instance
  const io = new Server(res.socket.server);

  io.on('connection', (socket) => {
    console.log('User connected');
    
    // Send a message to the client on connection
    socket.emit('message', 'Welcome to the Socket.IO server!');
    
    // Listen for events from the client
    socket.on('sendMessage', (message) => {
      console.log('Message from client:', message);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  // Make sure the socket server is accessible globally
  res.socket.server.io = io;

  return res;
}

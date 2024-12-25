'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SocketClient = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    // Replace this with your actual backend server URL if needed
    const socketIo = io('http://localhost:4000'); // specify your backend URL here

    socketIo.on('connect', () => {
      console.log('Connected to Socket.IO server');
      setConnected(true);
    });

    // Listen for a message from the server
    socketIo.on('message', (message: string) => {
      console.log('Message from server:', message);
    });

    // Emit a message to the server after connection
    socketIo.emit('sendMessage', 'Hello from client!');

    // Clean up the socket connection when the component unmounts
    return () => {
      socketIo.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Socket.IO Connection Status: {connected ? 'Connected' : 'Disconnected'}</h1>
    </div>
  );
};

export default SocketClient;

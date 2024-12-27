import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

// Custom hook for managing WebSocket (Socket.io) connection
const useSocket = (serverUrl: string) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [error, setError] = useState<string>('');  // State to track error messages
  
    useEffect(() => {
      const newSocket = io(serverUrl, {
        transports: ['websocket'],  // Use WebSocket transport
        reconnectionAttempts: 5,
      });
  
      setSocket(newSocket);
  
      // Track the connection status
      newSocket.on('connect', () => {
        console.log('Socket connected');
        setIsConnected(true);
      });
  
      newSocket.on('connect_error', (err) => {
        console.error('Connection Error:', err);
        setError('Connection failed: ' + err.message);  // Set detailed error message
        setIsConnected(false);
      });
  
      newSocket.on('connect_failed', () => {
        console.error('Connection Failed');
        setError('Connection failed: Transport error');
        setIsConnected(false);
      });
  
      newSocket.on('disconnect', () => {
        console.log('Socket disconnected');
        setIsConnected(false);
      });
  
      // Cleanup on component unmount
      return () => {
        if (newSocket) {
          newSocket.close();
        }
      };
    }, [serverUrl]);
  
    return { socket, isConnected, error };  // Return socket, connection status, and error
  };
  

export default useSocket;

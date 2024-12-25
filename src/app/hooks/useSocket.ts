// app/hooks/useSocket.ts
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

// Define the return type of the hook
interface UseSocketReturn {
  socket: Socket | null;
  connected: boolean;
}

const useSocket = (): UseSocketReturn => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Ensure the URL matches where your Socket.IO server is running
    const socketInstance = io("https://srv626615.hstgr.cloud");

    socketInstance.on("connect", () => {
      setConnected(true);
      console.log("Socket connected:", socketInstance.id);  // Log socket ID
      // Automatically send a message once connected
      socketInstance.emit("chatMessage", "Hello from the Dashboard!");
    });

    socketInstance.on("disconnect", () => {
      setConnected(false);
      console.log("Socket disconnected");
    });

    // Cleanup when component unmounts
    return () => {
      socketInstance.disconnect();
    };
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return { socket, connected };
};

export default useSocket;

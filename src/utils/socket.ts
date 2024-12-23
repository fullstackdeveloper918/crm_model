// pages/api/socket.ts
import { Server } from 'socket.io';
import { NextApiRequest, NextApiResponse } from 'next';

// Create a handler for the socket server
export const config = {
  api: {
    bodyParser: false, // Required for socket.io to work
    externalResolver: true, // To prevent Next.js from interfering with the WebSocket connection
  },
};

const socketHandler = (req: any, res: any) => {
  if (res.socket.server.io) {
    console.log("Socket.io already running");
    return res.end();
  }

  const io = new Server(res.socket.server);
  
  io.on("connection", (socket) => {
    console.log("A user connected");
    
    // Example: Send a message to the client
    socket.emit("message", "Hello from server!");

    // Listen for messages from the client
    socket.on("sendMessage", (message) => {
      console.log("Received message:", message);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  res.socket.server.io = io;
  res.end();
};

export default socketHandler;

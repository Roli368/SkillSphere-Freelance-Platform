import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Join a room based on the user's ID to receive private events
    socket.on("join", (userId) => {
      socket.join(userId.toString());
      console.log(`User ${userId} joined their personal room`);
    });
    
    // Join a specific conversation room
    socket.on("joinConversation", (conversationId) => {
      socket.join(conversationId.toString());
      console.log(`Socket ${socket.id} joined conversation ${conversationId}`);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

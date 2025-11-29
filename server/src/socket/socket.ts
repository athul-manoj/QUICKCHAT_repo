// server/src/socket/socket.ts
import { Server as SocketServer } from "socket.io";
import { Server } from "http";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const initSocket = (httpServer: Server) => {
  const io = new SocketServer(httpServer, {
    cors: { origin: "http://localhost:5173", credentials: true },
  });

  io.use(async (socket, next) => {
    try {
      const token =
        socket.handshake.auth?.token ||
        socket.handshake.headers.cookie
          ?.split("; ")
          .find((c) => c.startsWith("jwt="))
          ?.split("=")[1];

      if (!token) return next(new Error("No token"));
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      const user = await User.findById(decoded.userId).select("-password");
      if (!user) return next(new Error("User not found"));
      socket.data.user = user;
      next();
    } catch {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", async (socket) => {          // ← async added
    const userId = socket.data.user._id.toString();
    socket.join(userId);
    console.log("Socket connected:", userId);

    // mark online
    await User.findByIdAndUpdate(userId, { isOnline: true, lastSeen: new Date() });
    socket.broadcast.emit("userStatusChanged", { userId, isOnline: true });

    socket.on("sendMessage", async ({ receiverId, message }) => {
      io.to(receiverId).to(userId).emit("newMessage", {
        _id: new Date().toISOString(),
        senderId: userId,
        receiverId,
        message,
        createdAt: new Date().toISOString(),
      });
    });

    socket.on("disconnect", async () => {
      await User.findByIdAndUpdate(userId, { isOnline: false, lastSeen: new Date() });
      socket.broadcast.emit("userStatusChanged", { userId, isOnline: false });
    });
  });
};
// client/src/context/SocketContext.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { io, Socket } from "socket.io-client";
import useAuthStore from "../zustand/useAuthStore";

type SocketCtx = { socket: Socket | null };

const SocketContext = createContext<SocketCtx>({ socket: null });

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (!authUser) return;
    const s = io("http://localhost:5000", { withCredentials: true });
    setSocket(s);
    return () => {
      s.disconnect();
      setSocket(null);
    };
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);
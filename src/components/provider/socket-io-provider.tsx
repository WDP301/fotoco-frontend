'use client';

import SocketIOClient from "@/lib/socket-io";
import React, { createContext, useEffect, useRef, useState } from "react";
import { useAuth } from "./auth-provider";

interface SocketContextValue {
  socket: SocketIOClient | null;
  connected: boolean;
}
export const SocketContext = createContext<SocketContextValue>({
  socket: null,
  connected: false,
});

interface Props {
  children: React.ReactNode;
}

export function SocketIoProvider({ children }: Props) {
  const { user } = useAuth();
  const socket = useSocketClient();

  useEffect(() => {
    if (user) {
      socket?.client?.connect();
    }
  }, [user, socket]);

  return (
    <SocketContext.Provider
      value={{
        socket: socket?.client || null, // instance of socket but has not been connected
        connected: socket?.connected || false,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

// singleton hook
function useSocketClient() {
  const ref = useRef<SocketIOClient | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  if (typeof window === "undefined") return;

  const config = {
    url: process.env.SOCKET_URL || "http://localhost:4000",
    path: "/socket",
    onConnected: () => {
      setConnected(true);
    },
    onDisconnect: () => {
      setConnected(false);
    }
  };

  if (!ref.current) {
    ref.current = new SocketIOClient(config);
  }

  return {
    client: ref.current,
    connected,
  };
}
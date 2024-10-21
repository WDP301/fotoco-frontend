'use client';

import { getUser } from '@/lib/data';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { io, Socket } from 'socket.io-client';

interface ISocketContext {
  socket: Socket | null;
}

const SocketContext = createContext<ISocketContext>({ socket: null });

interface SocketProviderProps {
  children: ReactNode;
}

export function SocketIoProvider({ children }: SocketProviderProps) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketIo = io(process.env.NEXT_PUBLIC_SOCKET_IO_URL!);
    setSocket(socketIo);

    getUser().then((user) => {
      if (!user) {
        return;
      }
      socketIo.emit('join', { userId: user._id });
    });

    return () => {
      socketIo.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
}

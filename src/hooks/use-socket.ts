import { SocketContext } from '@/components/provider/socket-io-provider';
import { useContext } from 'react';

export function useSocket() {
  const context = useContext(SocketContext);
  if (context.socket === null && typeof window !== 'undefined') {
    throw new Error('useSocket must be used within a SocketIoProvider');
  }
  return context.socket;
}

export function useIsSocketConnected() {
  const context = useContext(SocketContext);
  if (context.socket === null && typeof window !== 'undefined') {
    throw new Error(
      'useIsSocketConnected must be used within a SocketIoProvider'
    );
  }
  return context.connected;
}

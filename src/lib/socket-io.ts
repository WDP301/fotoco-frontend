// ref: https://github.com/mahmodghnaj/wrapping-socket-with-nextJs
'use client';

import io, { Socket } from 'socket.io-client';
import { EventEmitter } from 'events';
import { getCookie } from 'cookies-next';

interface SocketConfig {
  url: string;
  path: string;
  onConnected: () => void;
  onDisconnect: () => void;
}

export default class SocketIOClient extends EventEmitter {
  private socket: Socket | null;
  private config: SocketConfig;

  constructor(config: SocketConfig) {
    super();
    this.config = config;
    this.socket = null;
    this.setup();
  }

  private setup() {
    const options = {
      path: this.config.path,
      autoConnect: false,
      transports: ['polling'], // https://socket.io/how-to/use-with-jwt, must use http-polling for add token to headers
      reconnectionAttempts: Infinity, // Infinity
      reconnectionDelay: 1000,
      withCredentials: true
    };
    this.socket = io(this.config.url, options);

    this.socket.on('connect', () => {
      console.log('>>> socket.io connected:', this.socket?.id);
      this.config.onConnected();
    });

    this.socket.on('disconnect', (reason: string) => {
      console.log('>>> socket.io disconnected:', reason);
      this.config.onDisconnect();
    });

    this.socket.on('connect_error', (error: Error) => {
      console.log('>>> socket.io error:', error.message);
    });
  }

  connect(): void {
    if (!this.socket) return;
    const accessToken = getCookie('access-token');
    const signature = getCookie('signature');
    if (!accessToken || !signature) {
      console.log('Missing access token when connecting socket.');
      return;
    }
    this.socket.io.opts.extraHeaders = {
      Authorization: `Bearer ${accessToken}`,
      Signature: signature,
    };
    this.socket?.connect();
  }

  reconnect(): void {
    if (!this.socket?.connected) return;
    this.socket?.disconnect();
    setTimeout(() => this.connect())
  }

  disconnect(): void {
    this.socket?.disconnect();
  }

  subscribe(event: string, callback: (arg: any) => void) {
    const isSubscribed = (this.socket?.listeners(event)?.length ?? 0) > 0;
    if (!isSubscribed) {
      this.socket?.on(event, (arg) => callback(arg));
    }
  }

  get connected(): boolean {
    return !!this.socket && this.socket.connected;
  }
}

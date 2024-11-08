'use client';

import { useSocket } from '@/hooks/use-socket';
import { logout } from '@/lib/action';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function LogoutPage() {
  const router = useRouter();
  const socket = useSocket();

  // TODO: Add logout all function later, use logout() for now
  useEffect(() => {
    logout().then(() => {
      localStorage.clear();
      socket?.disconnect();
      router.push('/login');
    });
  }, [router, socket]);

  return (
    <div>
      <h2>Logging out all devices...</h2>
    </div>
  );
}

'use client';

import { useSocket } from '@/hooks/use-socket';
import { logout } from '@/lib/action';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function LogoutPage() {
  const router = useRouter();
  const socket = useSocket();

  useEffect(() => {
    logout().then(() => {
      localStorage.clear();
      socket?.disconnect();
      router.push('/login');
    });
  }, [router, socket]);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
}

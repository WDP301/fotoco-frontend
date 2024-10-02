'use client';

import { logout } from '@/lib/action';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        logout().then(() => {
            router.push('/login'); // redirect to login after logout
        });
    }, [router]);

    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    );
}

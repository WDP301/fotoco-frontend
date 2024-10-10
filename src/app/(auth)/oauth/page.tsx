'use client';

import FullPageLoadingOverlay from '@/components/shared/full-page-loading-overlay';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

// Just for fvcking loading animation while success oauth
const OAuth = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const provider = searchParams.get('provider');

  if (!provider) {
    router.push(`/not-found`);
  }

  return (
    <FullPageLoadingOverlay />
  );
}

export default OAuth



'use client';

import { useRouter } from 'next/navigation';

export default function RedirectToAlbum({ albumId }: { albumId: string }) {
  const router = useRouter();
  router.push(`/albums/${albumId}`);

  return null;
}

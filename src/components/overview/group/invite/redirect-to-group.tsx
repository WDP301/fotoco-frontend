'use client';

import { useRouter } from 'next/navigation';

export default function Redirect({ groupId }: { groupId: string }) {
  const router = useRouter();
  router.push(`/groups/${groupId}`);

  return null;
}

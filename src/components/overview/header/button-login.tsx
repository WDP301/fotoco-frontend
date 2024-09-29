'use client';

import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useLanguage } from '@/components/provider/language-provider';

export default function ButtonLogin() {
  const pathname = usePathname();
  const { dict } = useLanguage();
  return (
    <Button asChild>
      <Link href={`/login?callbackUrl=${pathname}`}>{dict.button.login}</Link>
    </Button>
  );
}

'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useLanguage } from '@/components/provider/language-provider';

type PageProps = {
  label: string;
  path: string;
};

export function MainNav({
  className,
  ...props
}: Readonly<React.HTMLAttributes<HTMLElement>>) {
  const pathName = usePathname();
  const { dict } = useLanguage();

  const pages: PageProps[] = [
    {
      label: dict.header.mainNav.aboutUs,
      path: '/about-us',
    },
    {
      label: dict.header.mainNav.pricing,
      path: '/pricing',
    },
  ];

  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      {pages.map((page) => (
        <Link
          key={page.path}
          href={page.path}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            pathName.includes(page.path) ? '' : 'text-muted-foreground'
          )}
        >
          {page.label}
        </Link>
      ))}
    </nav>
  );
}

import { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import SwitchPage from '@/components/auth/switch-page';
import { getDictionary } from '@/lib/dictionaries';
import { AuthBackground } from '../../components/auth/auth-background';

export const generateMetadata = async (): Promise<Metadata> => {
  const dict = await getDictionary();

  return {
    title: {
      default: `${dict.auth.title} | ${siteConfig.name}`,
      template: `%s | ${siteConfig.name}`,
    },
    description: dict.auth.description,
  };
};

export default async function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const dict = await getDictionary();

  return (
    <div className="authcontainer relative min-h-[100vh] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute lg:hidden left-4 top-4 md:left-8 md:top-8'
        )}
      >
        {dict.home}
      </Link>
      <SwitchPage />
      <div className="relative hidden h-full flex-col bg-muted text-white lg:flex dark:border-r">
        <AuthBackground />
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          {children}
        </div>
      </div>
    </div>
  );
}

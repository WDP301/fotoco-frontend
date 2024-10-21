import OtherOauth from '@/components/auth/other-oauth';
import { UserAuthRegisterForm } from '@/components/auth/register/user-auth-register-form';
import { Separator } from '@/components/ui/separator';
import { getDictionary } from '@/lib/dictionaries';
import { Metadata } from 'next';
import { Suspense } from 'react';

import React from 'react';

export const generateMetadata = async (): Promise<Metadata> => {
  const dict = await getDictionary();

  return {
    title: `${dict.register.title}`,

    description: dict.register.description,
  };
};

export default async function RegisterPage() {
  const dict = await getDictionary();

  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h3 className="text-primary">{dict.register.heading}</h3>
      </div>
      <div className="grid gap-6">
        <Suspense
          fallback={<div className="text-center">{dict.register.loading}</div>}
        >
          <OtherOauth />
          <div className="flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-muted-foreground">{dict.common.orContinueWith}</span>
            <Separator className="flex-1" />
          </div>
          <UserAuthRegisterForm />
        </Suspense>
      </div>
    </>
  );
}

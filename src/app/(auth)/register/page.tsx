import { UserAuthRegisterForm } from '@/components/auth/register/user-auth-register-form';
import { siteConfig } from '@/config/site';
import { Locale } from '@/lib/define';
import { getDictionary } from '@/lib/dictionaries';
import { Metadata } from 'next';
import { Suspense } from 'react';

import React from 'react';

export const generateMetadata = async (): Promise<Metadata> => {
  const dict = await getDictionary();

  return {
    title: {
      default: `${dict.register.title}`,
      template: `%s | ${siteConfig.name}`,
    },
    description: dict.auth.description,
  };
};

export default async function RegisterPage() {
  const dict = await getDictionary();

  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-primary">
          {dict.register.heading}
        </h1>
      </div>
      <div className="grid gap-6">
        <Suspense
          fallback={<div className="text-center">{dict.register.loading}</div>}
        >
          <UserAuthRegisterForm />
        </Suspense>
        {/* <OtherLoginMethod /> */}
      </div>
    </>
  );
}

import UserAuthLoginForm from '@/components/auth/login/user-auth-login-form';
import OtherOauth from '@/components/auth/other-oauth';
import { Separator } from '@/components/ui/separator';
import { getDictionary } from '@/lib/dictionaries';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const generateMetadata = async (): Promise<Metadata> => {
  const dict = await getDictionary();

  return {
    title: `${dict.login.title}`,
    description: dict.login.description,
  };
};

export default async function LoginPage() {
  const dict = await getDictionary();
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h3 className="text-primary">{dict.login.heading}</h3>
      </div>
      <div className="grid gap-6">
        <Suspense
          fallback={<div className="text-center">{dict.login.loading}</div>}
        >
          <OtherOauth />
          <div className="flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-muted-foreground">{dict.common.orContinueWith}</span>
            <Separator className="flex-1" />
          </div>
          <UserAuthLoginForm />
        </Suspense>
      </div>
    </>
  );
}

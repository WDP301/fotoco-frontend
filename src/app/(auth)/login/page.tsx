import UserAuthLoginForm from '@/components/auth/login/user-auth-login-form';
import { getDictionary } from '@/lib/dictionaries';
// import OtherLoginMethod from '@/components/auth/login/other-login-method';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const generateMetadata = async (): Promise<Metadata> => {
  const dict = await getDictionary();

  return {
    title: `${dict.login.title}`,
    description: dict.login.description,
  };
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { message?: string };
}) {
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
          <UserAuthLoginForm message={searchParams.message} />
        </Suspense>
      </div>
    </>
  );
}

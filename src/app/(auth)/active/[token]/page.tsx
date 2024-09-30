import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { active } from '@/lib/action';
import { getDictionary } from '@/lib/dictionaries';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { ShieldCheck } from 'lucide-react';
import { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
  const dict = await getDictionary();

  return {
    title: `${dict.active.title}`,
    description: dict.active.description,
  };
};

export default async function Page({
  params,
  searchParams,
}: {
  params: { token: string };
  searchParams: { active: string };
}) {
  const result = await active(params.token, searchParams.active);
  const dict = await getDictionary();

  result.message =
    dict.errorCode[result.code as keyof typeof dict.errorCode] ||
    result.message;
  return (
    <>
      {result.isSuccess ? (
        <Alert>
          <ShieldCheck className="h-4 w-4 text-primary" />
          <AlertTitle className="text-primary">
            {dict.active.message.success}
          </AlertTitle>
          <AlertDescription className="text-primary">
            {dict.active.message.success || 'Unknown message'}
          </AlertDescription>
        </Alert>
      ) : (
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>{dict.active.message.error}</AlertTitle>
          <AlertDescription>
            {result?.message || 'Unknown error'}
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}

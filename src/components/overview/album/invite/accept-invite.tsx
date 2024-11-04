'use client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useLanguage } from '@/components/provider/language-provider';
import { acceptInviteToAlbum } from '@/lib/action';
import { useEffect, useState } from 'react';
import RedirectToAlbum from './redirect-to-album';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

export default function AcceptInviteToAlbum({
  albumId,
  inviteToken,
}: {
  albumId: string;
  inviteToken: string;
}) {
  const { dict } = useLanguage();
  const [result, setResult] = useState<
    { error?: string; errorType?: string; isSuccess?: boolean } | undefined
  >(undefined);

  useEffect(() => {
    acceptInviteToAlbum(albumId, inviteToken)
      .then((res) => {
        setResult(res);
      })
      .catch((err) => {
        setResult({ error: err.message, isSuccess: false });
      });
  }, [albumId, inviteToken]);

  return (
    <>
      {!result?.isSuccess ? (
        <Alert variant="destructive" className="my-5 sm:max-w-80 mx-auto">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>{dict.error.title}</AlertTitle>
          <AlertDescription>
            {result?.error || 'Unknown error'}
          </AlertDescription>
        </Alert>
      ) : (
        <RedirectToAlbum albumId={albumId} />
      )}
    </>
  );
}

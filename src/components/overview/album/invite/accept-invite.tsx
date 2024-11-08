'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { acceptInviteToAlbum, acceptInviteToGroup } from '@/lib/action';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useLanguage } from '@/components/provider/language-provider';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons/icons';
import { useSocket } from '@/hooks/use-socket';
import { PublicAlbumInfo } from '@/lib/define';

export default function AcceptInviteToAlbum({
  album,
  inviteToken,
}: {
  album: PublicAlbumInfo;
  inviteToken: string;
}) {
  const { dict } = useLanguage();
  const [result, setResult] = useState<
    { error?: string; errorType?: string; isSuccess?: boolean } | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const socket = useSocket();
  const router = useRouter();

  const handleAcceptInvite = () => {
    setIsLoading(true);
    acceptInviteToAlbum(album._id, album.group._id, inviteToken)
      .then((res) => {
        if (res.isSuccess) {
          socket?.reconnect();
          router.push(`/albums/${album._id}`);
        } else {
          setResult(res);
        }
      })
      .catch((err) => {
        setResult({ error: err.message, isSuccess: false });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      {result?.error ? (
        <Alert variant="destructive" className="my-5 sm:max-w-80 mx-auto">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>{dict.error.title}</AlertTitle>
          <AlertDescription>
            {result?.error || 'Unknown error'}
          </AlertDescription>
        </Alert>
      ) : (
        <Button disabled={isLoading} onClick={handleAcceptInvite}>
          {isLoading && (
            <Icons.spinner className=" mr-2 h-4 w-4 animate-spin" />
          )}
          {dict.button.joinAlbum}
        </Button>
      )}
    </>
  );
}

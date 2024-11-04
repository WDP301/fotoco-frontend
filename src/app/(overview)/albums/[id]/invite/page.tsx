'use client';
import AcceptInviteToAlbum from '@/components/overview/album/invite/accept-invite';
import { useLanguage } from '@/components/provider/language-provider';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { getAlbumInfo } from '@/lib/data';
import { AlbumInfo } from '@/lib/define';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function AcceptInviteToAlbumPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { inviteToken: string };
}) {
  const { dict } = useLanguage();
  const [showAcceptInvite, setShowAcceptInvite] = useState(false);
  const [albumInfo, setAlbumInfo] = useState({} as AlbumInfo);

  useEffect(() => {
    const fetchAlbumInfo = async () => {
      const response = await getAlbumInfo(params.id);
      setAlbumInfo(response);
    };

    fetchAlbumInfo();
  }, [params.id, searchParams.inviteToken]);

  const handleAcceptInviteClick = () => {
    setShowAcceptInvite(true);
  };

  return (
    <div>
      <h2 className="text-center">
        {dict.album.invite.title} {albumInfo?.title}
      </h2>
      <div className="mx-auto sm:max-w-60">
        <AspectRatio ratio={3 / 4} className="round-lg bg-muted ">
          <Image
            alt={albumInfo?.title}
            src={'/background/default-vertical.jpg'}
            fill
            className="h-full w-full rounded-lg object-cover"
          />
        </AspectRatio>
      </div>
      {showAcceptInvite ? (
        <AcceptInviteToAlbum
          albumId={params.id}
          inviteToken={searchParams.inviteToken}
        />
      ) : (
        <div className="flex justify-center">
          <Button onClick={handleAcceptInviteClick} className="my-2">
            {dict.button.joinAlbum}
          </Button>
        </div>
      )}
    </div>
  );
}

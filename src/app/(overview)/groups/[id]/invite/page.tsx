'use client';

import AcceptInviteToGroup from '@/components/overview/group/invite/accept-invite';
import { useLanguage } from '@/components/provider/language-provider';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { getGroupInfo } from '@/lib/data';
import { GroupInfo } from '@/lib/define';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function AcceptInviteToGroupPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { inviteToken: string };
}) {
  const { dict } = useLanguage();
  const [showAcceptInvite, setShowAcceptInvite] = useState(false);
  const [groupInfo, setGroupInfo] = useState({} as GroupInfo);

  useEffect(() => {
    const fetchGroupInfo = async () => {
      const response = await getGroupInfo(params.id);
      setGroupInfo(response);
    };

    fetchGroupInfo();
  }, [params.id, searchParams.inviteToken]);

  const handleAcceptInviteClick = () => {
    setShowAcceptInvite(true);
  };

  return (
    <div>
      <h2 className="text-center">
        {dict.group.invite.title} {groupInfo.title}
      </h2>
      <div className="mx-auto sm:max-w-60">
        <AspectRatio ratio={3 / 4} className="round-lg bg-muted ">
          <Image
            alt={groupInfo.title}
            src={groupInfo.groupImg || '/background/default-vertical.jpg'}
            fill
            className="h-full w-full rounded-lg object-cover"
          />
        </AspectRatio>
      </div>
      {showAcceptInvite ? (
        <AcceptInviteToGroup
          groupId={params.id}
          inviteToken={searchParams.inviteToken}
        />
      ) : (
        <div className="flex justify-center">
          <Button onClick={handleAcceptInviteClick} className="my-2">
            {dict.button.joinGroup}
          </Button>
        </div>
      )}
    </div>
  );
}

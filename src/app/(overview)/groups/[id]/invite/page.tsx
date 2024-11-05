import AcceptInviteToGroup from '@/components/overview/group/invite/accept-invite';
import GroupTypeIcon from '@/components/shared/group-type-icon';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card } from '@/components/ui/card';
import { getPublicGroupInfo } from '@/lib/data';
import { getDictionary } from '@/lib/dictionaries';
import Image from 'next/image';

export default async function AcceptInviteToGroupPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { inviteToken: string };
}) {
  const group = await getPublicGroupInfo(params.id);
  const dict = await getDictionary();

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="shadow-lg overflow-hidden max-w-4xl w-full">
        <div className="flex flex-col sm:flex-row items-center sm:items-start">
          <div className="sm:w-1/3">
            <AspectRatio ratio={3 / 4} className="rounded-lg bg-muted">
              <Image
                alt={group?.title}
                src={group?.groupImg || '/background/default-vertical.jpg'}
                fill
                className="h-full w-full rounded-lg object-cover"
              />
            </AspectRatio>
          </div>
          <div className="sm:w-2/3 sm:pl-8 mt-4 sm:mt-0 p-4">
            <h2 className="text-center sm:text-left text-2xl font-bold">
              {dict.group.invite.title}: {group?.title}
            </h2>
            <div className="flex gap-2 items-center mt-2">
              <GroupTypeIcon type={group.type} className="inline h-4 w-4" />
              <p>
                {
                  dict.group.type[
                    group.type.toLowerCase() as keyof typeof dict.group.type
                  ]
                }
              </p>
            </div>
            <div className="mt-4">
              <AcceptInviteToGroup
                groupId={params.id}
                inviteToken={searchParams.inviteToken}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

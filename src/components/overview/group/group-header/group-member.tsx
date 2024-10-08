import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import AvatarCircles from '@/components/ui/avatar-circles';
import { getGroupMembers } from '@/lib/data';

export default async function GroupMember({ groupId }: { groupId: string }) {
  const { users, pageMeta } = await getGroupMembers(groupId, {
    page: 1,
    pageSize: 10,
  });
  const avatarUrls = users.map((user) => user.img || '/avatar/noavatar.png');
  if (!users) return null;
  return (
    <div className="flex flex-row items-center my-2 w-full">
      <AvatarCircles
        numPeople={pageMeta.totalElements}
        avatarUrls={avatarUrls}
      />
    </div>
  );
}

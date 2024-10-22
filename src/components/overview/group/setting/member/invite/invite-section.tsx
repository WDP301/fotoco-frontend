import { getDictionary } from '@/lib/dictionaries';
import { SearchUsers } from './search-users';
import { InviteMember } from './invite-member';

export default async function InviteSection({ groupId }: { groupId: string }) {
  const dict = await getDictionary();
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 mb-2">
        <h3>{dict.group.setting.member.invite.title}</h3>
      </div>
      <div className="flex justify-center items-center gap-5">
        <InviteMember groupId={groupId} />
        {/* <SearchUsers groupId={groupId} /> */}
      </div>
    </div>
  );
}

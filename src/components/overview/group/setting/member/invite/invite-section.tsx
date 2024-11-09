import { getDictionary } from '@/lib/dictionaries';
import { InviteMember } from './invite-member';
import { getGroupInfo, getGroupSetting } from '@/lib/data';

export default async function InviteSection({ groupId }: { groupId: string }) {
  const dict = await getDictionary();
  const groupSetting = await getGroupSetting(groupId);
  const groupInfo = await getGroupInfo(groupId);

  console.log('groupSetting', groupSetting);
  console.log('groupInfo', groupInfo);

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 mb-2">
        <h3>{dict.group.setting.member.invite.title}</h3>
      </div>
      {groupInfo.type !== 'HIDDEN' &&
      (groupSetting.setting.role === 'OWNER' ||
        groupSetting.setting.allow_invite) ? (
        <div className="flex justify-center items-center gap-5">
          <InviteMember groupId={groupId} groupSetting={groupSetting} />
          {/* <SearchUsers groupId={groupId} /> */}
        </div>
      ) : (
        <div className="mt-5">
          <p>{dict.group.setting.member.invite.disabled}</p>
        </div>
      )}
    </div>
  );
}

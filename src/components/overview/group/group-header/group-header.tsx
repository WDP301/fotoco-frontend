import GroupMember from './group-member';
import GroupInformation from './group-info';
import { Suspense } from 'react';
import AvatarCirclesLoading from '../../../shared/loading/avatar-circles-loading';
import GroupInfoLoading from './loading/group-info-loading';
import { GroupInfo } from '@/lib/define';

export default function GroupHeader({
  groupId,
  groupInfo,
}: {
  groupId: string;
  groupInfo: GroupInfo;
}) {
  return (
    <div>
      <Suspense fallback={<GroupInfoLoading />} key={`${groupId}-info`}>
        <GroupInformation groupId={groupId} groupInfo={groupInfo} />
      </Suspense>

      <Suspense
        fallback={
          <div className="flex flex-row items-center my-2 w-full">
            <AvatarCirclesLoading numSkeletons={10} />
          </div>
        }
        key={`${groupId}-members`}
      >
        <GroupMember groupId={groupId} />
      </Suspense>
    </div>
  );
}

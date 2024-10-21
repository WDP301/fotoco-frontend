import GroupMember from './group-member';
import GroupInfo from './group-info';
import { Suspense } from 'react';
import AvatarCirclesLoading from '../../../shared/loading/avatar-circles-loading';
import GroupInfoLoading from './loading/group-info-loading';

export default function GroupHeader({ groupId }: { groupId: string }) {
  return (
    <div>
      <Suspense fallback={<GroupInfoLoading />} key={`${groupId}-info`}>
        <GroupInfo groupId={groupId} />
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

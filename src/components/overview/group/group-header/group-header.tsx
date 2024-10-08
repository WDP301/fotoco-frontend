import GroupMember from './group-member';
import GroupInfo from './group-info';

export default function GroupHeader({ groupId }: { groupId: string }) {
  return (
    <div>
      <GroupInfo groupId={groupId} />
      <GroupMember groupId={groupId} />
    </div>
  );
}

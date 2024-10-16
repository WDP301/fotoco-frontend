import GroupMemberCardLoading from './group-member-card-loading';

export default function GroupMembersListLoading() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <GroupMemberCardLoading key={index} />
      ))}
    </>
  );
}

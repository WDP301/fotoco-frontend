import AlbumMemberCardLoading from './album-member-card-loading';

export default function AlbumMembersListLoading() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <AlbumMemberCardLoading key={index} />
      ))}
    </>
  );
}

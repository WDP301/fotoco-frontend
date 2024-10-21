import AvatarCircles from '@/components/ui/avatar-circles';
import { getAlbumMembers } from '@/lib/data';

export default async function AlbumMember({ albumId }: { albumId: string }) {
  const { users, pageMeta } = await getAlbumMembers(albumId, {
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

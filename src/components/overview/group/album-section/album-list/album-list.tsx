import { getAlbumsByGroupId } from '@/lib/data';
import { SearchAlbumParams } from '@/lib/define';
import { getDictionary } from '@/lib/utils';
import { AlbumCard } from '../album-card';
import ListPagination from '@/components/shared/list-pagination';

export default async function AlbumList({
  groupId,
  searchParams,
}: {
  groupId: string;
  searchParams: SearchAlbumParams;
}) {
  const { pageMeta, albums } = await getAlbumsByGroupId(groupId, searchParams);
  const dict = await getDictionary();

  if (!albums || albums.length === 0) {
    return (
      <div className="flex justify-center items-center h-24 ">
        {dict.errorMessage.noAlbumFound}
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {albums.map((album) => (
          <AlbumCard key={album._id} album={album} />
        ))}
      </div>
      <div className="my-3">
        <ListPagination meta={pageMeta} bookmark="albums" />
      </div>
    </div>
  );
}

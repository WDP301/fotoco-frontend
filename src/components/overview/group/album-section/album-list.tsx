import { getAlbumsByGroupId } from '@/lib/data';
import { SearchAlbumParams } from '@/lib/define';
import { AlbumCard } from './album-card';
import ListPagination from '@/components/shared/list-pagination';
import { getDictionary } from '@/lib/dictionaries';

export default async function AlbumList({
  groupId,
  searchParams,
}: {
  groupId: string;
  searchParams: SearchAlbumParams;
}) {
  const { albums, pageMeta } = await getAlbumsByGroupId(groupId, searchParams);

  const dict = await getDictionary();

  if (!albums || albums.length === 0) {
    return (
      <div className="flex justify-center items-center h-24 ">
        {dict.errorMessage.noAlbumFound}
      </div>
    );
  }
  return (
    <div className="container mx-auto">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 max-sm:p-4 max-sm:flex max-sm:flex-col max-sm:items-center">
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

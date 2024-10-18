// PhotoList.tsx (Server Component)
import { getPhotosByAlbumId } from '@/lib/data';
import { getDictionary } from '@/lib/dictionaries';
import { SearchPhotoParams } from '@/lib/define';
import ListPagination from '@/components/shared/list-pagination';
import PhotoListView from './photo-list-view';

export default async function PhotoList({
  albumId,
  searchParams,
}: {
  albumId: string;
  searchParams: SearchPhotoParams;
}) {
  const dict = await getDictionary();
  const { photos, pageMeta } = await getPhotosByAlbumId(albumId, searchParams);

  if (photos.length === 0) {
    return (
      <div className="flex justify-center items-center h-96">
        {dict.photoNotFound.title}
      </div>
    );
  }

  return (
    <>
      <PhotoListView photos={photos} />
      <div className="my-3">
        <ListPagination meta={pageMeta} bookmark="album-name" />
      </div>
    </>
  );
}

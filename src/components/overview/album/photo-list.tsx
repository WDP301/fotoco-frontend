import PhotoItem from './photo-item';
import { Photo, SearchPhotoParams } from '@/lib/define';
import ListPagination from '@/components/shared/list-pagination';
import { getPhotosByAlbumId } from '@/lib/data';
import { getDictionary } from '@/lib/dictionaries';

const buildPhotoItems = (photos: Photo[]) => {
  let items = [];
  for (let index = 1; index < 5; index++) {
    items.push(
      <div key={index} className="flex flex-col justify-start gap-4">
        {photos
          .filter((photo, photoIndex) => {
            return photoIndex % 4 === index - 1;
          })
          .map((filteredPhoto) => (
            <PhotoItem key={filteredPhoto._id} photo={filteredPhoto} />
          ))}
      </div>
    );
  }
  return items;
};
const PhotoList = async ({
  albumId,
  searchParams,
}: {
  albumId: string;
  searchParams: SearchPhotoParams;
}) => {
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
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mt-5">
        {buildPhotoItems(photos)}
      </div>
      <div className="my-3">
        <ListPagination meta={pageMeta} bookmark="album-name" />
      </div>
    </>
  );
};

export default PhotoList;

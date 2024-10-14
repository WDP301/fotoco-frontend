import AlbumHeader from '@/components/overview/album/album-header/album-header';
import AlbumNotFound from '@/components/overview/album/album-not-found';
import { getAlbumInfo } from '@/lib/data';
import { SearchPhotoParams } from '@/lib/define';
import { getDictionary } from '@/lib/dictionaries';
import { Metadata } from 'next';

type Props = {
  params: { id: string };
  searchParams: SearchPhotoParams;
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const album = await getAlbumInfo(params.id);

  if (!album) {
    return {
      title: 'Album not found',
      description: 'Album not found',
    };
  }

  return {
    title: `${album.title}`,
    description: `${album.title} - ${album.description}`,
  };
}

export default async function AlbumPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: SearchPhotoParams;
}) {
  return (
    <div>
      <AlbumHeader albumId={params.id} />
    </div>
  );
}

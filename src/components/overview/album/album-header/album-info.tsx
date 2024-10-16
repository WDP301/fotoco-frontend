import { getAlbumInfo } from '@/lib/data';
import { BreadItem } from '@/lib/define';
import { getDictionary } from '@/lib/dictionaries';
import BreadcrumbComponent from '@/components/shared/breadcrumb-component';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import AlbumNotFound from '../album-not-found';
import { BasicTooltip } from '@/components/shared/basic-tooltip';

export default async function AlbumInfo({ albumId }: { albumId: string }) {
  const album = await getAlbumInfo(albumId);
  if (!album?.title) {
    return <AlbumNotFound />;
  }

  const dict = await getDictionary();

  const breadItems = [
    {
      title: dict.breadcrumb.group,
      url: '/groups',
    },
    {
      title: album?.group?.title,
      url: `/groups/${album?.group?._id}`,
    },
    {
      title: album?.title,
      url: `/albums/${album?._id}`,
    },
  ] as BreadItem[];
  return (
    <div>
      <div className="my-2">
        <BreadcrumbComponent breadcrumbs={breadItems} />
      </div>
      <div className="flex justify-between items-center">
        <BasicTooltip title={album.title}>
          <h1>{album.title}</h1>
        </BasicTooltip>

        <Link href={`/albums/${albumId}/setting`}>
          <Button variant="ghost">
            <Settings />
          </Button>
        </Link>
      </div>
    </div>
  );
}

import { SearchAlbumParams } from '@/lib/define';
import AlbumList from './album-list';
import { Suspense } from 'react';
import AlbumListLoading from './loading/album-list-loading';

export default function AlbumSection({
  groupId,
  searchParams,
}: {
  groupId: string;
  searchParams: SearchAlbumParams;
}) {
  return (
    <div className="mt-10 mb-5">
      <h3 className="mb-5">Album</h3>
      <Suspense
        fallback={<AlbumListLoading />}
        key={
          searchParams.page ||
          '1' + searchParams.sort ||
          'desc' +
            searchParams.pageSize +
            searchParams.filter +
            'all' +
            searchParams.search
        }
      >
        <AlbumList groupId={groupId} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

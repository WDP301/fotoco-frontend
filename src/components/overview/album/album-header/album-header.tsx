import { Suspense } from 'react';
import AlbumInfo from './album-info';
import AlbumMember from './album-member';
import AvatarCirclesLoading from '@/components/shared/loading/avatar-circles-loading';

export default function AlbumHeader({ albumId }: { albumId: string }) {
  return (
    <div>
      <AlbumInfo albumId={albumId} />
      <Suspense
        fallback={
          <div className="flex flex-row items-center my-2 w-full">
            <AvatarCirclesLoading numSkeletons={10} />
          </div>
        }
        key={`${albumId}-members`}
      >
        <AlbumMember albumId={albumId} />
      </Suspense>
    </div>
  );
}

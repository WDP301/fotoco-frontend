import AlbumInfo from './album-info';
import AlbumMember from './album-member';

export default function AlbumHeader({ albumId }: { albumId: string }) {
  return (
    <div>
      <AlbumInfo albumId={albumId} />
      <AlbumMember albumId={albumId} />
    </div>
  );
}

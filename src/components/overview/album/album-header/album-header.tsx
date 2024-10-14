import AlbumInfo from './album-info';

export default function AlbumHeader({ albumId }: { albumId: string }) {
  return (
    <div>
      <AlbumInfo albumId={albumId} />
      {/* <AlbumMember albumId={albumId} /> */}
    </div>
  );
}

import AlbumCardLoading from './album-card-loading';

export default function AlbumListLoading() {
  return (
    <div className="container mx-auto">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 max-sm:flex max-sm:flex-col max-sm:items-center">
        <AlbumCardLoading />
        <AlbumCardLoading />
        <AlbumCardLoading className="max-lg:hidden" />
        <AlbumCardLoading className="max-xl:hidden" />
        <AlbumCardLoading className="max-2xl:hidden" />
      </div>
    </div>
  );
}

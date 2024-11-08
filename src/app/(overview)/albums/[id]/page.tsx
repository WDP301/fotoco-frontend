import AlbumHeader from '@/components/overview/album/album-header/album-header';
import { PhotoListLoading } from '@/components/overview/album/loading/photo-list-loading';
import PhotoGalleryView from '@/components/overview/album/photo-gallery-view';
import PhotoList from '@/components/overview/album/photo-list';
import PhotoUploadDialog from '@/components/overview/album/photo-upload-dialog';
import ToggleView from '@/components/overview/album/toggle-view';
import FilterSelect from '@/components/shared/filter-selection';
import SearchBadge from '@/components/shared/search-badge';
import SearchBar from '@/components/shared/search-bar';
import SortSelect from '@/components/shared/sort-select';
import { getAlbumInfo, getAlbumSetting } from '@/lib/data';
import { FilterOption, SearchPhotoParams, SortOption } from '@/lib/define';
import { getDictionary } from '@/lib/dictionaries';
import { Metadata } from 'next';
import { Suspense } from 'react';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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
  const dict = await getDictionary();
  const albumSetting = await getAlbumSetting(params.id);

  const selectOptions = [
    {
      label: dict.sortOptions.newest,
      value: 'desc',
      field: 'sort',
    },
    {
      label: dict.sortOptions.oldest,
      value: 'asc',
      field: 'sort',
    },
  ] as SortOption[];

  const filterOptions = [
    {
      label: dict.filterOptions.photo.mine,
      value: 'mine',
      field: 'mine',
    },
  ] as FilterOption[];

  return (
    <div>
      <AlbumHeader albumId={params.id} />
      <div className="my-5">
        <SearchBar placeholder={dict.searchBar.photo.placeholders} />
      </div>
      <div className="mt-10 mb-5">
        {/* <h3 className="mb-5">Album</h3> */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
          <h3>{dict.photo.title}</h3>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-x-2 md:space-y-0">
            <div className="flex gap-2">
              {(albumSetting?.setting?.role === 'OWNER' ||
                albumSetting?.setting?.role === 'CONTRIBUTOR') && (
                <PhotoUploadDialog albumId={params.id} />
              )}
              <SortSelect
                variant="ghost"
                sort={searchParams.sort}
                options={selectOptions}
                url={`/albums/${params.id}`}
              />
              <FilterSelect
                variant="ghost"
                filter={searchParams.filter}
                options={filterOptions}
                url={`/albums/${params.id}`}
                field="filter"
              />
            </div>
            <ToggleView />
          </div>
        </div>
        <div className="flex justify-center md:justify-start max-sm:my-2">
          {searchParams.search && <SearchBadge query={searchParams.search} />}
        </div>
      </div>
      <div className="mt-5">
        {searchParams.mode === 'gallery' ? (
          <PhotoGalleryView albumId={params.id} searchParams={searchParams} />
        ) : (
          <Suspense
            fallback={<PhotoListLoading />}
            key={`${searchParams.page || '1'}-${searchParams.sort || 'desc'}-${searchParams.pageSize}-${searchParams.filter || 'all'}-${searchParams.search || ''}-${searchParams.mode}`}
          >
            <PhotoList albumId={params.id} searchParams={searchParams} />
          </Suspense>
        )}
      </div>
    </div>
  );
}

import AlbumHeader from '@/components/overview/album/album-header/album-header';
import AlbumNotFound from '@/components/overview/album/album-not-found';
import PhotoList from '@/components/overview/album/photo-list';
import FilterSelect from '@/components/shared/filter-selection';
import SortSelect from '@/components/shared/sort-select';
import { getAlbumInfo } from '@/lib/data';
import { FilterOption, SearchPhotoParams, SortOption } from '@/lib/define';
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
  const dict = await getDictionary();

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
      <div className="flex items-center justify-between space-y-2">
        <span className={`text-2xl font-bold`}>{dict.photo.title}</span>
        <div className="flex items-center space-x-2">
          {/* <CreateGroupDiaLog>
            <Button variant="ghost">
                <SquarePlus className="mr-2 h-4 w-4" />
                {dict.button.createGroup}
            </Button>
          </CreateGroupDiaLog> */}
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
      </div>
      <div className="mt-5">
        <PhotoList albumId={params.id} searchParams={searchParams} />
      </div>
    </div>
  );
}

import { FilterOption, SearchAlbumParams, SortOption } from '@/lib/define';
import AlbumList from './album-list';
import { Suspense } from 'react';
import AlbumListLoading from './loading/album-list-loading';
import SortSelect from '@/components/shared/sort-select';
import FilterSelect from '@/components/shared/filter-selection';
import { getDictionary } from '@/lib/dictionaries';
import CreateAlbumDiaLog from './create-album-dialog';
import SearchBadge from '@/components/shared/search-badge';

export default async function AlbumSection({
  groupId,
  searchParams,
}: {
  groupId: string;
  searchParams: SearchAlbumParams;
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
      label: dict.filterOptions.album.mine,
      value: 'mine',
      field: 'mine',
    },
    {
      label: dict.filterOptions.album.sharedWithMe,
      value: 'shared-with-me',
      field: 'shared-with-me',
    },
  ] as FilterOption[];

  return (
    <div className="mt-10 mb-5">
      {/* <h3 className="mb-5">Album</h3> */}
      <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
        <h3 className="mb-5">Album</h3>
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-x-2 md:space-y-0">
          <div className="flex gap-2">
            <CreateAlbumDiaLog groupId={groupId} />
            <SortSelect
              variant="ghost"
              sort={searchParams.sort}
              options={selectOptions}
              url={`/groups/${groupId}`}
            />
            <FilterSelect
              variant="ghost"
              filter={searchParams.filter}
              options={filterOptions}
              url={`/groups/${groupId}`}
              field="filter"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center md:justify-start mb-3">
        {searchParams.search && <SearchBadge query={searchParams.search} />}
      </div>

      <Suspense
        fallback={<AlbumListLoading />}
        key={`${searchParams.page || '1'}-${searchParams.sort || 'desc'}-${searchParams.pageSize}-${searchParams.filter || 'all'}-${searchParams.search || ''}`}
      >
        <AlbumList groupId={groupId} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

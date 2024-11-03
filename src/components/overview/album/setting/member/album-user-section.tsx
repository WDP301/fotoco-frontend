import FilterSelect from '@/components/shared/filter-selection';
import SearchBadge from '@/components/shared/search-badge';
import SearchBar from '@/components/shared/search-bar';
import { FilterOption, SearchAlbumMembersParams } from '@/lib/define';
import { getDictionary } from '@/lib/dictionaries';
import { Suspense } from 'react';
import AlbumMembersListLoading from './loading/album-members-list-loading';
import AlbumMembersList from './album-members-list';

export default async function AlbumUserSection({
  albumId,
  searchParams,
}: {
  albumId: string;
  searchParams: SearchAlbumMembersParams;
}) {
  const dict = await getDictionary();

  const filterOptions = [
    {
      label: dict.filterOptions.user.owner,
      value: 'owners',
      field: 'owners',
    },
    {
      label: dict.filterOptions.user.member,
      value: 'members',
      field: 'members',
    },
    {
      label: dict.filterOptions.user.contributor,
      value: 'contributors',
      field: 'contributors',
    },
  ] as FilterOption[];
  return (
    <div className="mt-10 mb-5">
      <div className="mb-5 mt-3">
        <SearchBar placeholder={dict.searchBar.user.placeholders} />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 mb-2">
        <h3>{dict.album.setting.member.title}</h3>
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-x-2 md:space-y-0">
          <div className="flex gap-2">
            <FilterSelect
              variant="ghost"
              filter={searchParams.filter}
              options={filterOptions}
              url={`/albums/${albumId}/settings/members`}
              field="filter"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center md:justify-start">
        {searchParams.search && (
          <SearchBadge query={searchParams.search} className="mb-3" />
        )}
      </div>

      <Suspense
        fallback={<AlbumMembersListLoading />}
        key={`${searchParams.page || '1'}-${searchParams.sort || 'desc'}-${searchParams.pageSize}-${searchParams.filter || 'all'}-${searchParams.search || ''}`}
      >
        <AlbumMembersList albumId={albumId} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

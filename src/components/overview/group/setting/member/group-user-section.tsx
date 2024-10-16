import FilterSelect from '@/components/shared/filter-selection';
import SearchBadge from '@/components/shared/search-badge';
import { FilterOption, SearchGroupMembersParams } from '@/lib/define';
import { getDictionary } from '@/lib/dictionaries';
import { Suspense } from 'react';
import GroupMembersList from './group-members-list';
import SearchBar from '@/components/shared/search-bar';
import GroupMembersListLoading from './loading/group-members-list-loading';

export default async function GroupUserSection({
  groupId,
  searchParams,
}: {
  groupId: string;
  searchParams: SearchGroupMembersParams;
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
  ] as FilterOption[];
  return (
    <div className="mt-10 mb-5">
      <div className="mb-5 mt-3">
        <SearchBar placeholder={dict.searchBar.user.placeholders} />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 mb-2">
        <h3>{dict.group.setting.member.title}</h3>
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-x-2 md:space-y-0">
          <div className="flex gap-2">
            {/* <CreateAlbumDiaLog groupId={groupId} /> */}
            <FilterSelect
              variant="ghost"
              filter={searchParams.filter}
              options={filterOptions}
              url={`/groups/${groupId}/settings/members`}
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
        fallback={<GroupMembersListLoading />}
        key={`${searchParams.page || '1'}-${searchParams.sort || 'desc'}-${searchParams.pageSize}-${searchParams.filter || 'all'}-${searchParams.search || ''}`}
      >
        <GroupMembersList groupId={groupId} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

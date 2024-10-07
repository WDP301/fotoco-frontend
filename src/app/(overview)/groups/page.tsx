import GroupList from '@/components/overview/group/group-list/group-list';
import GroupListLoading from '@/components/overview/group/loading/group-list-loading';
import BreadcrumbComponent from '@/components/shared/breadcrumb-component';
import FilterSelect from '@/components/shared/filter-selection';
import SortSelect from '@/components/shared/sort-select';
import SpinLoading from '@/components/shared/spin-loading';
import {
  BreadItem,
  FilterOption,
  SearchGroupParams,
  SortOption,
} from '@/lib/define';
import { getDictionary } from '@/lib/dictionaries';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const generateMetadata = async (): Promise<Metadata> => {
  const dict = await getDictionary();

  return {
    title: `${dict.group.title}`,
    description: dict.group.description,
  };
};
export default async function GroupPage({
  searchParams,
}: {
  searchParams: SearchGroupParams;
}) {
  const dict = await getDictionary();

  const breadItems = [
    {
      title: dict.breadcrumb.group,
      url: '/groups',
    },
  ] as BreadItem[];

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
      label: dict.filterOptions.mine,
      value: 'mine',
      field: 'mine',
    },
    {
      label: dict.filterOptions.sharedWithMe,
      value: 'shared-with-me',
      field: 'shared-with-me',
    },
  ] as FilterOption[];

  return (
    <>
      <div className="mt-2">
        <BreadcrumbComponent breadcrumbs={breadItems} />
      </div>
      <div className="flex items-center justify-between space-y-2">
        <span className={`text-2xl font-bold`}>{dict.group.title}</span>
        <div className="flex items-center space-x-2">
          <SortSelect
            variant="ghost"
            sort={searchParams.sort}
            options={selectOptions}
            url={'/groups'}
          />
          <FilterSelect
            variant="ghost"
            filter={searchParams.filter}
            options={filterOptions}
            url="/groups"
            field="filter"
          />
        </div>
      </div>
      <div className="mt-5">
        <Suspense
          fallback={<GroupListLoading />}
          key={
            searchParams.page ||
            '1' + searchParams.sort ||
            'desc' +
              searchParams.pageSize +
              searchParams.filter +
              searchParams.status +
              searchParams.type ||
            'all' + searchParams.search
          }
        >
          <GroupList searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}

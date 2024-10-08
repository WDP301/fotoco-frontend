import AlbumList from '@/components/overview/group/album-section/album-list/album-list';
import BreadcrumbComponent from '@/components/shared/breadcrumb-component';
import FilterSelect from '@/components/shared/filter-selection';
import SortSelect from '@/components/shared/sort-select';
import {
  BreadItem,
  FilterOption,
  SearchAlbumParams,
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
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: SearchAlbumParams;
}) {
  const dict = await getDictionary();
  const { id } = params;
  const breadItems = [
    {
      title: dict.breadcrumb.group,
      url: '/groups',
    },
    {
      title: dict.breadcrumb.album,
      url: '/albums',
    },
  ] as BreadItem[];

  const sortOptions = [
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
        <span className="text-2xl font-bold">{dict.album.title}</span>
        <div className="flex items-center space-x-2">
          <SortSelect
            variant="ghost"
            sort={searchParams.sort}
            options={sortOptions}
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
          key={
            searchParams.page ||
            '1' + searchParams.sort ||
            'desc' +
              searchParams.pageSize +
              searchParams.filter +
              searchParams.status +
              searchParams.search
          }
        >
          <AlbumList groupId={id} searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}

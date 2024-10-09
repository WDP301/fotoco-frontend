import { GroupCardLoading } from './group-card-loading';

export default function GroupListLoading() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      <GroupCardLoading />
      <GroupCardLoading />
      <GroupCardLoading className="max-lg:hidden" />
      <GroupCardLoading className="max-xxl:hidden" />
      <GroupCardLoading className="max-2xl:hidden" />
    </div>
  );
}

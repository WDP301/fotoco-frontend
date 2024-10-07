import { GroupCardLoading } from './group-card-loading';

export default function GroupListLoading() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {[...Array(4)].map((_, index) => (
        <GroupCardLoading key={index} />
      ))}
    </div>
  );
}

import { GroupCard } from '@/components/overview/group/group-card';
import { Button } from '@/components/ui/button';
import { getAllGroup } from '@/lib/data';
import { getDictionary } from '@/lib/dictionaries';
import Link from 'next/link';

export default async function SharedWithMeGroupList() {
  const { groups } = await getAllGroup({
    page: 1,
    pageSize: 8,
    filter: 'shared-with-me',
  });
  const dict = await getDictionary();
  if (!groups || groups.length === 0) {
    return (
      <div className="flex justify-center items-center h-24">
        {dict.errorMessage.noGroupFound}
      </div>
    );
  }
  return (
    <div className="container mx-auto">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 max-sm:p-4 max-sm:flex max-sm:flex-col max-sm:items-center">
        {groups.map((group) => (
          <GroupCard key={group._id} group={group} />
        ))}
      </div>
      <div className="w-full flex justify-center my-5">
        <Button asChild>
          <Link href="/groups?filter=shared-with-me">
            {dict.userHome.home.viewAllGroups}
          </Link>
        </Button>
      </div>
    </div>
  );
}

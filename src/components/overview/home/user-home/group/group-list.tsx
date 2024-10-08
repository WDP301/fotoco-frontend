import { GroupCard } from '@/components/overview/group/group-card';
import { Button } from '@/components/ui/button';
import { getAllGroup } from '@/lib/data';
import { getDictionary } from '@/lib/dictionaries';
import Link from 'next/link';

export default async function GroupList() {
  const { groups } = await getAllGroup({ page: 1, pageSize: 8 });
  const dict = await getDictionary();
  if (!groups || groups.length === 0) {
    return (
      <div className="flex justify-center items-center h-24">
        {dict.errorMessage.noGroupFound}
      </div>
    );
  }
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {groups.map((group) => (
          <GroupCard key={group._id} group={group} />
        ))}
      </div>
      <div className="w-full flex justify-center my-5">
        <Button asChild>
          <Link href="/groups">{dict.userHome.home.viewAllGroups}</Link>
        </Button>
      </div>
    </div>
  );
}

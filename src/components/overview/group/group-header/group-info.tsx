import { getGroupInfo } from '@/lib/data';
import GroupNotFound from '../group-not-found';
import { BreadItem } from '@/lib/define';
import { getDictionary } from '@/lib/dictionaries';
import BreadcrumbComponent from '@/components/shared/breadcrumb-component';
import GroupTypeIcon from '@/components/shared/group-type-icon';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { BasicTooltip } from '@/components/shared/basic-tooltip';

export default async function GroupInfo({ groupId }: { groupId: string }) {
  const group = await getGroupInfo(groupId);
  if (!group?.title) {
    return <GroupNotFound />;
  }

  const dict = await getDictionary();

  const breadItems = [
    {
      title: dict.breadcrumb.group,
      url: '/groups',
    },
    {
      title: group.title,
      url: `/groups/${groupId}`,
    },
  ] as BreadItem[];
  return (
    <div>
      <div className="my-2">
        <BreadcrumbComponent breadcrumbs={breadItems} />
      </div>
      <div className="flex justify-between items-center gap-2">
        <BasicTooltip title={group.title}>
          <h1>{group.title}</h1>
        </BasicTooltip>

        <Link href={`/groups/${groupId}/setting`}>
          <Button variant="ghost">
            <Settings />
          </Button>
        </Link>
      </div>

      <div className="flex gap-2 mt-2 items-center">
        <GroupTypeIcon type={group.type} className="inline h-4 w-4" />
        <p>
          {
            dict.group.type[
              group.type.toLowerCase() as keyof typeof dict.group.type
            ]
          }
        </p>
      </div>
    </div>
  );
}

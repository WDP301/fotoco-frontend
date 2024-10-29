import GroupUserSection from '@/components/overview/group/setting/member/group-user-section';
import InviteSection from '@/components/overview/group/setting/member/invite/invite-section';
import { Separator } from '@/components/ui/separator';
import { getGroupInfo } from '@/lib/data';
import { SearchGroupMembersParams } from '@/lib/define';
import { getDictionary } from '@/lib/dictionaries';
import { Metadata } from 'next';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const group = await getGroupInfo(params.id);
  const dict = await getDictionary();

  if (!group) {
    return {
      title: dict.groupNotFound.title,
      description: dict.groupNotFound.description,
    };
  }

  return {
    title: `${group.title} - ${dict.group.setting.member.title}`,
    description: `${group.title} - ${dict.group.setting.member.description}`,
  };
}

export default async function SettingsMembersPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: SearchGroupMembersParams;
}) {
  const dict = await getDictionary();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-primary">{dict.group.setting.member.title}</h3>
        <p className="text-sm text-muted-foreground">
          {dict.group.setting.member.description}
        </p>
      </div>
      <Separator />
      <InviteSection groupId={params.id} />
      <Separator />
      <GroupUserSection groupId={params.id} searchParams={searchParams} />
    </div>
  );
}

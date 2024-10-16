import { Metadata } from 'next';

import { Separator } from '@/components/ui/separator';
import { getGroupInfo } from '@/lib/data';
import { getDictionary } from '@/lib/dictionaries';
import { SidebarNav } from '@/components/overview/group/setting/side-bar-nav';
import BreadcrumbComponent from '@/components/shared/breadcrumb-component';
import { BreadItem } from '@/lib/define';
import GroupNotFound from '@/components/overview/group/group-not-found';

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
    title: `${group.title} - ${dict.group.setting.title}`,
    description: `${group.title} - ${group.description}`,
  };
}

interface SettingsLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

export default async function SettingsLayout({
  children,
  params,
}: SettingsLayoutProps) {
  const dict = await getDictionary();
  const group = await getGroupInfo(params.id);

  if (!group?.title) {
    return <GroupNotFound />;
  }

  const breadItems = [
    {
      title: dict.breadcrumb.group,
      url: '/groups',
    },
    {
      title: group.title,
      url: `/groups/${params.id}`,
    },
    {
      title: dict.group.setting.title,
      url: `/groups/${params.id}/settings`,
    },
  ] as BreadItem[];

  const sidebarNavItems = [
    {
      title: dict.group.setting.general.title,
      href: `/groups/${params.id}/settings`,
    },
    {
      title: dict.group.setting.member.title,
      href: `/groups/${params.id}/settings/members`,
    },
  ];

  return (
    <>
      <div className="mt-2 mb-5">
        <BreadcrumbComponent breadcrumbs={breadItems} />
      </div>
      <div className="space-y-6 pb-16">
        <div className="space-y-0.5">
          <h2 className="text-primary">{dict.group.setting.title}</h2>
          <p className="text-muted-foreground">
            {dict.group.setting.description}
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}

import AlbumNotFound from '@/components/overview/album/album-not-found';
import { SidebarNav } from '@/components/overview/group/setting/side-bar-nav';
import BreadcrumbComponent from '@/components/shared/breadcrumb-component';
import { Separator } from '@/components/ui/separator';
import { siteConfig } from '@/config/site';
import { getAlbumInfo } from '@/lib/data';
import { BreadItem } from '@/lib/define';
import { getDictionary } from '@/lib/dictionaries';
import { Metadata } from 'next';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const album = await getAlbumInfo(params.id);
  const dict = await getDictionary();

  if (!album) {
    return {
      title: dict.albumNotFound.title,
      description: dict.albumNotFound.description,
    };
  }

  return {
    title: {
      default: `${album.title} - ${dict.album.setting.general.title} | ${siteConfig.name}`,
      template: `%s | ${siteConfig.name}`,
    },
    description: `${album.title} - ${album.description}`,
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
  const album = await getAlbumInfo(params.id);

  if (!album?.title) {
    return <AlbumNotFound />;
  }

  const breadItems = [
    {
      title: dict.breadcrumb.group,
      url: '/groups',
    },
    {
      title: album?.group?.title,
      url: `/groups/${album?.group?._id}`,
    },
    {
      title: album?.title,
      url: `/albums/${album?._id}`,
    },
    {
      title: dict.album.setting.title,
      url: `/albums/${params.id}/settings`,
    },
  ] as BreadItem[];

  const sidebarNavItems = [
    {
      title: dict.album.setting.general.title,
      href: `/albums/${params.id}/settings`,
    },
    {
      title: dict.album.setting.member.title,
      href: `/albums/${params.id}/settings/members`,
    },
  ];

  return (
    <>
      <div className="mt-2 mb-5">
        <BreadcrumbComponent breadcrumbs={breadItems} />
      </div>
      <div className="space-y-6 pb-16">
        <div className="space-y-0.5">
          <h2 className="text-primary">{dict.album.setting.title}</h2>
          <p className="text-muted-foreground">
            {dict.album.setting.description}
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

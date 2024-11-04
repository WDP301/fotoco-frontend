import AlbumUserSection from '@/components/overview/album/setting/member/album-user-section';
import InviteSection from '@/components/overview/album/setting/member/invite/invite-section';
import { Separator } from '@/components/ui/separator';
import { getAlbumInfo } from '@/lib/data';
import { SearchAlbumMembersParams } from '@/lib/define';
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
    title: `${album.title} - ${dict.album.setting.member.title}`,
    description: `${album.title} - ${dict.album.setting.member.description}`,
  };
}

export default async function SettingsMembersPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: SearchAlbumMembersParams;
}) {
  const dict = await getDictionary();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-primary">{dict.album.setting.member.title}</h3>
        <p className="text-sm text-muted-foreground">
          {dict.album.setting.member.description}
        </p>
      </div>
      <Separator />
      <InviteSection albumId={params.id} />
      <Separator />
      <AlbumUserSection albumId={params.id} searchParams={searchParams} />
    </div>
  );
}

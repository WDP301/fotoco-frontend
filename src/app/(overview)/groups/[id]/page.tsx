import AlbumSection from '@/components/overview/group/album-section/album-section';
import GroupHeader from '@/components/overview/group/group-header/group-header';
import { getGroupInfo } from '@/lib/data';
import { SearchAlbumParams } from '@/lib/define';
import { Metadata } from 'next';

type Props = {
  params: { id: string };
  // searchParams: SearchAlbumParams;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const group = await getGroupInfo(params.id);

  if (!group) {
    return {
      title: 'Group not found',
      description: 'Group not found',
    };
  }

  return {
    title: `${group.title}`,
    description: `${group.title} - ${group.description}`,
  };
}

export default async function GroupDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: SearchAlbumParams;
}) {
  return (
    <div>
      <GroupHeader groupId={params.id} />
      <AlbumSection groupId={params.id} searchParams={searchParams} />
    </div>
  );
}

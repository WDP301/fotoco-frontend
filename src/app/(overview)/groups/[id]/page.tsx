import AlbumSection from '@/components/overview/group/album-section/album-section';
import GroupHeader from '@/components/overview/group/group-header/group-header';
import GroupNotFound from '@/components/overview/group/group-not-found';
import SearchBar from '@/components/shared/search-bar';
import { getGroupInfo } from '@/lib/data';
import { SearchAlbumParams } from '@/lib/define';
import { getDictionary } from '@/lib/dictionaries';
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
  const dict = await getDictionary();
  const group = await getGroupInfo(params.id);

  if (!group) {
    return <GroupNotFound />;
  }
  return (
    <div>
      <GroupHeader groupId={params.id} groupInfo={group} />
      <div className="my-5">
        <SearchBar placeholder={dict.searchBar.album.placeholders} />
      </div>
      <AlbumSection groupId={params.id} searchParams={searchParams} />
    </div>
  );
}

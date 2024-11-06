import { getAlbumInfo, getPublicAlbumInfo } from '@/lib/data';
import { getDictionary } from '@/lib/dictionaries';
import { Metadata } from 'next';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const album = await getPublicAlbumInfo(params.id);
  const dict = await getDictionary();

  if (!album) {
    return {
      title: dict.albumNotFound.title,
      description: dict.albumNotFound.description,
    };
  }

  return {
    title: `${dict.album.invite.title} ${album.title}`,
    description: `${album.title} - ${dict.album.invite.description}`,
  };
}

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

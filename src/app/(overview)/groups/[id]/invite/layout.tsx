import { getGroupInfo } from '@/lib/data';
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
    title: `${dict.group.invite.title} ${group.title}`,
    description: `${group.title} - ${dict.group.invite.description}`,
  };
}

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

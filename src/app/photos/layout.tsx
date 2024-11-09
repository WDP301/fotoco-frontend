import type { Metadata } from 'next';

import HeaderSite from '@/components/overview/header/header-site';
import { siteConfig } from '@/config/site';
import { getDictionary } from '@/lib/dictionaries';

export const generateMetadata = async (): Promise<Metadata> => {
  const dict = await getDictionary();

  return {
    title: {
      default: `${dict.homePage.title} | ${siteConfig.name}`,
      template: `%s | ${siteConfig.name}`,
    },
    description: dict.homePage.description,
  };
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="hidden">
        <HeaderSite />
      </div>
      {children}
    </>
  );
}

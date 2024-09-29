import type { Metadata } from 'next';

// import HeaderSite from '@/components/overview/header/header-site';
// import FooterSite from '@/components/overview/footer/footer-site';
import { siteConfig } from '@/config/site';
import { Locale } from '@/lib/define';
import { getDictionary } from '@/lib/utils';

export const generateMetadata = async ({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> => {
  const dict = getDictionary(params.lang);

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
      {/* <HeaderSite /> */}
      <main className="bg-background md:px-20 md:py-8 lg:px-32 lg:pb-16 lg:pt-10 px-5 py-3">
        {children}
      </main>
      {/* <FooterSite /> */}
    </>
  );
}

'use client';

import { siteConfig } from '@/config/site';
import LogoSite from '@/components/overview/logo-site';
import { useLanguage } from '@/components/provider/language-provider';

export default function FooterSite() {
  const url = siteConfig.url;
  const { dict } = useLanguage();

  return (
    <footer className="border-t py-10">
      <div className="mx-auto w-full max-w-none px-5 text-sm sm:max-w-[90%] sm:px-0 2xl:max-w-7xl">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] items-stretch justify-between gap-x-2 gap-y-10 sm:gap-x-6 md:flex md:flex-wrap">
          <div className="col-span-full">
            <LogoSite />
          </div>
          {/* Team Section */}
          <div className="md:flex-col gap-2.5 hidden md:flex">
            <h3 className="mb-1 text-sm font-medium lg:text-sm">
              {dict.footer.sections.team}
            </h3>
            {dict.footer.teamMembers.map((member: string) => (
              <a
                key={member}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="text-sm "
              >
                {member}
              </a>
            ))}
          </div>
          {/* Resources Section */}
          <div className="md:flex-col gap-2.5 hidden md:flex">
            <h3 className="mb-1 text-sm font-medium lg:text-sm">
              {dict.footer.sections.resources}
            </h3>
            {dict.footer.resourcesLinks.map((link: string) => (
              <a
                key={link}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="text-sm "
              >
                {link}
              </a>
            ))}
          </div>
          {/* Legal and Support Sections */}
          <div className="flex flex-col gap-2.5">
            <h3 className="mb-1 text-sm font-medium lg:text-sm">
              {dict.footer.sections.legal}
            </h3>
            {dict.footer.legalLinks.map((link: string) => (
              <a
                key={link}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="text-sm "
              >
                {link}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-2.5">
            <h3 className="mb-1 text-sm font-medium lg:text-sm">
              {dict.footer.sections.support}
            </h3>
            {dict.footer.supportLinks.map((link: string) => (
              <a
                key={link}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="text-sm "
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

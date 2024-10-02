'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { ModeToggle } from '../mode-toggle';
import { User } from '@/lib/define';
import AvatarPicture from '@/components/shared/avatar-picture';
import { useLanguage } from '@/components/provider/language-provider';

type PageProps = {
  label: string;
  path: string;
};

export function SideBarMobile({ user }: { user: User }) {
  const { dict } = useLanguage();

  const pages: PageProps[] = [
    {
      label: dict.header.mainNav.aboutUs,
      path: '/about-us',
    },
    {
      label: dict.header.mainNav.pricing,
      path: '/pricing',
    },
  ];
  if (!user) {
    return (
      <Button asChild>
        <Link href={'/login'}>{dict.button.login}</Link>
      </Button>
    );
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="hidden">
          <HamburgerMenuIcon className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col ">
        <div>
          {user && (
            <SheetHeader>
              <SheetTitle className="flex justify-center">
                <AvatarPicture
                  src={user?.img}
                  className="h-[80px] w-[80px] border-[3px]"
                />
              </SheetTitle>
              <SheetDescription>{user.fullName}</SheetDescription>
            </SheetHeader>
          )}
          <div className="flex justify-center my-2">
            <ModeToggle />
          </div>

          <div className="flex flex-col justify-center">
            {pages.map((page) => (
              <Link
                key={page.path}
                href={page.path}
                className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
              >
                <>
                  <div className="text-center">
                    <Separator className="my-2" />
                    {page.label}
                    <Separator className="my-2" />
                  </div>
                </>
              </Link>
            ))}
          </div>
        </div>
        <div className="text-center">
          <Button asChild>
            <Link href={'/logout'}>{dict.button.logout}</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

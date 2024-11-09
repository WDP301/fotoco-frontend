'use client';

import LogoSite from '@/components/overview/logo-site';
import { ModeToggle } from './mode-toggle';
import { MainNav } from './main-nav';
import ButtonLogin from './button-login';
import { UserNav } from './user-nav';
import { SideBarMobile } from './side-bar-mobile/side-bar-mobile';
import HeaderActionPopover from './action/header-action-popover';
import Notification from './notification';
import { useAuth } from '@/components/provider/auth-provider';

export default function HeaderSite() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <header className="md:px-12 sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 relative">
        <div className="md:mr-4 md:flex">
          <LogoSite />
        </div>

        <div className="ml-auto hidden sm:block">
          <div className="flex items-center space-x-4 ">
            {user ? (
              <>
                <HeaderActionPopover />
                <Notification user={user} />
              </>
            ) : (
              <MainNav className="mx-6 hidden lg:flex" />
            )}
            <ModeToggle />

            {user ? <UserNav user={user} /> : <ButtonLogin />}
          </div>
        </div>
        <div className="ml-auto block sm:hidden">
          {user && <SideBarMobile user={user} />}
        </div>
      </div>
    </header>
  );
}

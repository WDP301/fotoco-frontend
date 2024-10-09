'use client';

import { useLanguage } from '@/components/provider/language-provider';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createUrl } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function TabListGroupSection() {
  const { dict } = useLanguage();
  const { replace } = useRouter();
  const handleTabChange = (filter: string, event: React.MouseEvent) => {
    // TODO: Tab change allays scroll to top
    event.preventDefault();
    const searchParams = new URLSearchParams(location.search);
    const pathName = location.pathname;
    searchParams.set('filter', filter);
    replace(createUrl(pathName, searchParams));
  };
  return (
    <TabsList className="grid grid-cols-2 w-[400px]">
      <TabsTrigger
        value="mine"
        onClick={(event) => handleTabChange('mine', event)}
      >
        {dict.filterOptions.mine}
      </TabsTrigger>
      <TabsTrigger
        value="shared-with-me"
        onClick={(event) => handleTabChange('shared-with-me', event)}
      >
        {dict.filterOptions.sharedWithMe}
      </TabsTrigger>
    </TabsList>
  );
}

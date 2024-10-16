'use client';

import { useLanguage } from '@/components/provider/language-provider';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useParams } from '@/hooks/use-params';

export default function TabListGroupSection() {
  const { dict } = useLanguage();
  const { setParams } = useParams();
  const handleTabChange = (filter: string) => {
    setParams('filter', filter);
  };
  return (
    <TabsList className="grid grid-cols-2 w-[400px]">
      <TabsTrigger value="mine" onClick={() => handleTabChange('mine')}>
        {dict.filterOptions.mine}
      </TabsTrigger>
      <TabsTrigger
        value="shared-with-me"
        onClick={() => handleTabChange('shared-with-me')}
      >
        {dict.filterOptions.sharedWithMe}
      </TabsTrigger>
    </TabsList>
  );
}

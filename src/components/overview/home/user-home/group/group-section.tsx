import GroupListLoading from '@/components/overview/group/loading/group-list-loading';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Suspense } from 'react';
import SharedWithMeGroupList from './shared-with-me-group-list';
import TabListGroupSection from './tab-list-group-section';
import MyGroupList from './my-group-list';

export default function GroupSection({ filter }: { filter?: string }) {
  return (
    <Tabs defaultValue="mine" className="my-5">
      <TabListGroupSection />
      <TabsContent className="w-full" value="mine">
        <Suspense
          fallback={<GroupListLoading />}
          key={filter ? filter : 'mine'}
        >
          <MyGroupList />
        </Suspense>
      </TabsContent>
      <TabsContent className="w-full" value="shared-with-me">
        <Suspense fallback={<GroupListLoading />} key={filter}>
          <SharedWithMeGroupList />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
}

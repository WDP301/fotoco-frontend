import { Tabs } from "@/components/ui/tabs"
import GroupTabs from "./group-tabs";
import AllGroupList from "./all-group";
import MyGroupList from "./my-group";
import SharedWithMeGroupList from "./shared-with-me";
export default function GroupList() {
  return (
        <Tabs defaultValue="all-groups" className="w-full">
            <GroupTabs />
            <AllGroupList/>
            <MyGroupList />
            <SharedWithMeGroupList />
        </Tabs>
  );
}

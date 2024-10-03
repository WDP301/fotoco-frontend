import GroupList from "@/components/overview/group/group-list"
import CreateGroupDiaLog from "@/components/overview/group/create-group-dialog"
import { SortGroupCombobox } from "@/components/overview/group/sort-group-combobox"

export default function page() {

  return (
    <div>
      <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Groups</h2>
          <div className="flex items-center space-x-2">
            <CreateGroupDiaLog /> {/* Create Group button */}
            <SortGroupCombobox /> {/* Sort Group button */}
        </div>  
      </div>
      <GroupList />
    </div>
  )
}
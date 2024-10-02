import GroupList from "@/components/overview/group/group-list"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import CreateGroupDiaLog from "@/components/overview/group/create-group-dialog"
import { SortGroupCombobox } from "@/components/overview/group/sort-group-combobox"
import Link from "next/link"

export default function page() {

  return (
    <div>
      <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Groups</h2>
            <div className="flex items-center space-x-2">
            <Link href="/settings">
              <Button variant="ghost"> {/* Settings button */}
                  <Settings className="mr-2 h-4 w-4"/>
                  Settings
              </Button>
            </Link>
            <CreateGroupDiaLog /> {/* Create Group button */}
            <SortGroupCombobox /> {/* Sort Group button */}
        </div>  
      </div>
      <GroupList />
    </div>
  )
}
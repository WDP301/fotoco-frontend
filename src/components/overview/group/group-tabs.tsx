'use client'
import {
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"

export default function GroupTabs() {
  return (
    <div>
        <TabsList className="mt-3">
            <TabsTrigger value="all-groups">
                All Groups
            </TabsTrigger>
            <TabsTrigger value="my-groups">
                My Groups
            </TabsTrigger>
            <TabsTrigger value="shared-groups">
                Shared with me
            </TabsTrigger>
        </TabsList>
    </div>
    )
}

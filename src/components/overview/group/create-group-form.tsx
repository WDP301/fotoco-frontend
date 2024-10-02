'use client'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function AddGroupForm() {
  return (
    <div>
        <div className="grid gap-4 py-4">
            <div className="grid w-full gap-1.5">
                <Label htmlFor="groupName">Group Name</Label>
                <Input
                id="groupName"
                placeholder="Type your group name here."
                className="col-span-3"
                />
            </div>
            <div className="grid w-full gap-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea placeholder="Type your description here." id="description" />
            </div>
        </div>
    </div>
  )
}

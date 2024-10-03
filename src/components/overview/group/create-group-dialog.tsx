'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SquarePlus } from "lucide-react"
import CreateGroupForm from "./create-group-form"

export default function CreateGroupDiaLog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
            <SquarePlus className="mr-2 h-4 w-4" />
            Create Group
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a Group</DialogTitle>
          <DialogDescription>
            Let&apos;s create a Group and invite your friends.
          </DialogDescription>
        </DialogHeader>
        <CreateGroupForm setOpen={() => {}} />
      </DialogContent>
    </Dialog>
  )
}

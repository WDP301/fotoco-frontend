'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CreateAlbumForm from "./create-album-form"
import { useLanguage } from "@/components/provider/language-provider"
import { Button } from "@/components/ui/button";
import { Images } from "lucide-react";

export default function CreateAlbumDiaLog({ groupId }: { groupId: string }) {

    const { dict } = useLanguage();
    

    return (
        <Dialog>
        <DialogTrigger asChild>
            <Button variant="ghost">
                <Images className="mr-2 h-4 w-4" />
                {dict.button.createAlbum}
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>{dict.createAlbum.dialogTitle}</DialogTitle>
            <DialogDescription>
                {dict.createAlbum.dialogDescription}
            </DialogDescription>
            </DialogHeader>
            <CreateAlbumForm setOpen={() => {}} groupId={groupId} />
        </DialogContent>
        </Dialog>
  )
}
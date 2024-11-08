import { Icons } from "@/components/icons/icons"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { siteConfig } from "@/config/site"
import { Share2 } from "lucide-react"
import { ShareAlbumForm } from "./share-album-form"
import { getDictionary } from "@/lib/dictionaries"
export default async function ShareAlbumDialog({ albumId }: { albumId: string }) {

    const dict = await getDictionary();

    return (
        <Dialog>
                <DialogTrigger asChild>
                    <Share2 className="hover:text-primary cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            <div className="flex items-center space-x-2">
                                <div>{dict.shareAlbumDialog.title}</div>
                                <div className="flex items-center space-x-1 text-primary">
                                    <Icons.cloud className="h-6 w-6" />
                                    <span className="font-bold">{siteConfig.name}</span>
                                </div>
                            </div>                                    
                        </DialogTitle>
                    <DialogDescription>{dict.shareAlbumDialog.description}</DialogDescription>
                    </DialogHeader>
                    <ShareAlbumForm albumId={albumId}/>
                </DialogContent>
            </Dialog>
    )
}
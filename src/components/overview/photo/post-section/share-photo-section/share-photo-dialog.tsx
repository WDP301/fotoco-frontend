import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Icons } from "@/components/icons/icons"
import { siteConfig } from '@/config/site';
import { Separator } from "@/components/ui/separator"

import {
    Download,
    Share2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/provider/language-provider";
import { SharePhotoForm } from "./share-photo-form";


export default function SharePhotoDialog() {

    const { dict } = useLanguage();

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Share2 className="h-5 w-5 hover:text-primary" />
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            <div className="flex items-center space-x-2">
                                <div>{dict.sharePhotoDialog.title}</div>
                                <div className="flex items-center space-x-1 text-primary">
                                    <Icons.cloud className="h-6 w-6" />
                                    <span className="font-bold">{siteConfig.name}</span>
                                </div>
                            </div>                                    
                        </DialogTitle>
                    <DialogDescription>{dict.sharePhotoDialog.description}</DialogDescription>
                    </DialogHeader>
                    <SharePhotoForm />
                    {/* <Separator />
                    <DialogFooter className="sm:justify-start">
                        <Button className="ml-auto">
                            <Download className="h-4 w-4 mr-2" />
                            <span className="">Download</span>
                        </Button>
                    </DialogFooter> */}
                </DialogContent>
            </Dialog>
        </>
    );
}
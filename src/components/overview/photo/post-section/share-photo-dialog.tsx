import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons/icons"
import { siteConfig } from '@/config/site';
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

import {
    Copy,
    Download,
    Share2,
} from "lucide-react"

import { Button } from "@/components/ui/button"

export default function SharePhotoDialog() {
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
                                <div>Share in</div>
                                <div className="flex items-center space-x-1 text-primary">
                                    <Icons.cloud className="h-2 w-2" />
                                    <span className="font-bold">{siteConfig.name}</span>
                                </div>
                            </div>                                    
                        </DialogTitle>
                    <DialogDescription>
                        You can share photos with any of your friends, even if they dont have a Fotoco account.
                    </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="link" className="sr-only">
                            Link
                            </Label>
                            <Input
                            id="link"
                            defaultValue="https://ui.shadcn.com/docs/installation"
                            readOnly
                            />
                        </div>
                        <Button type="submit" size="sm" className="px-3" title="Copy link">
                            <span className="sr-only">Copy</span>
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                    <Separator />
                    <DialogFooter className="sm:justify-start">
                        <Button className="ml-auto">
                            <Download className="h-4 w-4 mr-2" />
                            <span className="">Download</span>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
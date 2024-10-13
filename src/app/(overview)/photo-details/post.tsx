import {
    Copy,
  Download,
  Ellipsis,
  Flag,
  Heart,
  MessageCircleIcon,
  ShareIcon,
} from "lucide-react"

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

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
export default function Post() {
    return (
        <>
            <div className="flex items-start">
            <div className="flex items-start gap-4 text-sm">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">Name</div>
                <div className="line-clamp-1 text-xs">10/10/2024</div>
              </div>
            </div>
              <div className="ml-auto text-xs text-muted-foreground">
                <Button variant="ghost" size="icon" className="hover:bg-muted">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>   
                            <Ellipsis className="h-4 w-4"/>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    Report
                                    <DropdownMenuShortcut>
                                        <Flag className="ml-2 h-4 w-4" />
                                    </DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </Button>
              </div>
          </div>
          <div className="flex-1 whitespace-pre-wrap pt-4 py-4 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel scelerisque ligula. Aenean lacinia pulvinar dui vitae sollicitudin. Suspendisse potenti.
          </div>
          <div className="flex flex-wrap gap-1">
            {[ "Nature", "Sunny", "Beautiful", "Landscape", "Mountain" ].map((tag) => (
              <Badge key={tag} className="text-xs">{tag}</Badge>
            ))}
          </div>
          <div className="flex flex-col justify-between pt-4 py-4 w-1/2">
            <div className="flex items-center w-full">
                <div className="flex items-center mr-4">
                    <Button variant="ghost" size="icon" className="hover:bg-muted">
                        <Heart className="h-5 w-5" />
                    </Button>
                    <div className="font-semibold">1.2k</div>
                </div>
                <div className="flex items-center mr-4">
                    <Button variant="ghost" size="icon" className="hover:bg-muted">
                        <MessageCircleIcon className="h-5 w-5" />
                    </Button>
                    <div className="font-semibold">1.2k</div>
                </div>
                <div className="mr-4">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="hover:bg-muted">
                                <ShareIcon className="h-5 w-5" />
                            </Button>
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
                                You can share photos with any of your friends, even if they don't have a Fotoco account.
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
                </div>
            </div>
          </div>
        </>
    )
}
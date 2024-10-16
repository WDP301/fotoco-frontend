import {
  Ellipsis,
  Flag,
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

import { Badge } from "@/components/ui/badge"
import SharePhotoDialog from "./share-photo-dialog"
import ReactSection from "./react-section/react-section"


interface Post{
    id: number;
    userId: number;
    body: string;
}
export default async function Post(
    {onCommentIconClick} : {onCommentIconClick: () => void}
) {

    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const post = await response.json();


    return (

        <>
            <div className="flex items-start">
            <div className="flex items-start gap-4">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">User {post.userId}</div>
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
          <div className="whitespace-pre-wrap py-3 text-sm">
            {post.body}
          </div>
          <div className="flex flex-wrap gap-1">
            {[ "Nature", "Sunny", "Beautiful", "Landscape", "Mountain" ].map((tag) => (
              <Badge key={tag} className="text-xs">{tag}</Badge>
            ))}
          </div>
          <div className="flex flex-col justify-between py-3 w-1/2">
            <div className="flex items-center w-full">
                <ReactSection onCommentIconClick={onCommentIconClick} />
                <div className="mr-4">
                    <SharePhotoDialog />
                </div>
            </div>
          </div>
        </>
    )
}
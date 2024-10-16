import { Comment } from "@/lib/define";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    } from "@/components/ui/avatar";

import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuGroup,
    } from "@/components/ui/dropdown-menu";
import { Ellipsis, Flag } from "lucide-react";
export function CommentCard({ comment }: {comment: Comment}) {
    return (
        <>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col items-start text-left text-sm">
                    <div className="flex items-start justify-between w-full">
                        <div className="flex items-start gap-4">
                            <Avatar>
                                <AvatarImage src="./avatar/noavatar.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <div className="font-semibold">{comment.email}</div>
                                <div className="line-clamp-1 text-xs">10/10/2024</div>
                            </div>
                        </div>
                        <div className="ml-auto mr-3 text-xs text-muted-foreground">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                <Ellipsis className="h-4 w-4 hover:text-primary" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                    Report this comment
                                    <DropdownMenuShortcut>
                                        <Flag className="ml-2 h-4 w-4" />
                                    </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <div className="whitespace-pre-wrap pt-2 text-sm">
                        {comment.body}
                    </div>
                </div>
            </div>
        </>
    )
}
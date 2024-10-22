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
import { CornerDownRight, Ellipsis, Flag } from "lucide-react";
import AvatarPicture from "@/components/shared/avatar-picture";

interface CommentCardProps {
    comment: Comment
    showIcon?: boolean;
}
export function CommentCard({ comment, showIcon }: CommentCardProps) {
    return (
        <>
            <div className="flex flex-col gap-2 w-full">
    <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
            {showIcon && (
                <CornerDownRight className="h-5 w-5 text-muted-foreground" />
            )}
            <AvatarPicture src='' />
            <div className="grid gap-1">
                <div className="font-semibold">{comment.email}</div>
                <div className="line-clamp-1 text-xs">10/10/2024</div>
            </div>
        </div>
        <div className="ml-auto text-xs text-muted-foreground">
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
    {showIcon ? (
        <div className="whitespace-pre-wrap text-sm pl-10">
            {comment.body}
        </div>
    ):(
        <div className="whitespace-pre-wrap text-sm">
            {comment.body}
        </div>
    )}
</div>

        </>
    )
}
import { Comment, Reply } from "@/lib/define";
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
import { getDateFormatted } from "@/lib/utils";
import { useLanguage } from "@/components/provider/language-provider";

interface CommentCardProps {
    comment: Comment | Reply
    showIcon?: boolean;
}
export function CommentCard({ comment, showIcon }: CommentCardProps) {

    const { dict } = useLanguage();

    return (
        <>
            <div className="flex flex-col gap-2 w-full">
    <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
            {showIcon && (
                <CornerDownRight className="h-5 w-5 text-muted-foreground" />
            )}
            <AvatarPicture src={comment.userInfo.img}/>
            <div className="grid gap-1">
                <div className="font-semibold">{comment.userInfo.fullName}</div>
                <div className="line-clamp-1 text-xs">{getDateFormatted(comment.createdAt, dict.lang)}</div>
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
            {comment.content}
        </div>
    ):(
        <div className="whitespace-pre-wrap text-sm">
            {comment.content}
        </div>
    )}
</div>

        </>
    )
}
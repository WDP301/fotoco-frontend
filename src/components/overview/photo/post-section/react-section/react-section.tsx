import { formatNumber } from "@/lib/utils";
import { Heart, MessageCircleIcon } from "lucide-react";

export default function ReactSection({
    onCommentIconClick,
    reactCount,
    commentCount
} : {
    onCommentIconClick: () => void,
    reactCount: number,
    commentCount: number
}) {
    return (
        <>
            <div className="flex items-center mr-5">
                <Heart className="h-5 w-5 mr-2 hover:text-primary cursor-pointer transition-colors duration-200" />
                <div className="font-semibold">{formatNumber(reactCount)}</div>
            </div>
            <div className="flex items-center mr-5">
                <MessageCircleIcon 
                className="h-5 w-5 mr-2 hover:text-primary cursor-pointer transition-colors duration-200" 
                onClick={onCommentIconClick}/>
                <div className="font-semibold">{formatNumber(commentCount)}</div>
            </div>
        </>
    )
}
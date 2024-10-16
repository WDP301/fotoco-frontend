import { Heart, MessageCircleIcon } from "lucide-react";

export default function ReactSection(
    {onCommentIconClick} : {onCommentIconClick: () => void}
) {
    return (
        <>
            <div className="flex items-center mr-5">
                <Heart className="h-5 w-5 mr-2 hover:text-primary cursor-pointer transition-colors duration-200" />
                <div className="font-semibold">1.2k</div>
            </div>
            <div className="flex items-center mr-5">
                <MessageCircleIcon 
                className="h-5 w-5 mr-2 hover:text-primary cursor-pointer transition-colors duration-200" 
                onClick={onCommentIconClick}/>
                <div className="font-semibold">1.2k</div>
            </div>
        </>
    )
}
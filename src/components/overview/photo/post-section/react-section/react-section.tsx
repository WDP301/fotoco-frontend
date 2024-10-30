import { reactPhoto } from "@/lib/action";
import { PhotoResponse } from "@/lib/define";
import { formatNumber } from "@/lib/utils";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { Heart, MessageCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReactList from "./react-list";
import { getReactListByPhotoId } from "@/lib/data";

export default function ReactSection({
    photo,
    isLiked,
    onCommentIconClick,
} : {
    photo: PhotoResponse
    isLiked: boolean
    onCommentIconClick: () => void,
}) {
    const router = useRouter();
    const [isLike, setIsLiked] = useState(photo?.isReacted);
    const [reactsCount, setReactsCount] = useState(photo?.photo.reactsCount);
    const handleReact = async () => {
        const prevLiked = isLike;
        setIsLiked(!isLike);
        if (prevLiked) {
            setReactsCount((prevCount) => prevCount - 1);
        } else {
            setReactsCount((prevCount) => prevCount + 1);
        }
        try {
            const react = await reactPhoto(photo?.photo._id);
            if (!react?.isSuccess) {
                setIsLiked(prevLiked);
                setReactsCount((prevCount) =>
                    prevLiked ? prevCount + 1 : prevCount - 1
                );
            }
            router.refresh();
        } catch (error) {
            setIsLiked(prevLiked);
            setReactsCount((prevCount) =>
                prevLiked ? prevCount + 1 : prevCount - 1
        );
    }
    }

    const handleReactUpdate = async () => {
        const reacts = await getReactListByPhotoId(photo?.photo._id);
        setReactsCount(reacts.length);
    };

    return (
        <>
            <div className="flex items-center mr-5">
                {!isLike ? (
                    <Heart onClick={handleReact} className="h-5 w-5 mr-2 hover:text-primary cursor-pointer transition-colors duration-200" />
                ): (
                    <HeartFilledIcon onClick={handleReact} className="h-5 w-5 mr-2 hover:text-primary cursor-pointer transition-colors duration-200" />
                )}
                <ReactList 
                    reactsCount={reactsCount}
                    photoId={photo?.photo._id}
                    onReactUpdate={handleReactUpdate}
                />
            </div>
            <div className="flex items-center mr-5">
                <MessageCircleIcon 
                className="h-5 w-5 mr-2 hover:text-primary cursor-pointer transition-colors duration-200" 
                onClick={onCommentIconClick}/>
                <div className="font-semibold">{formatNumber(photo?.photo.commentsCount)}</div>
            </div>
        </>
    )
}
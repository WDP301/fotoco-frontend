'use client'
import { reactPhoto } from "@/lib/action";
import { PhotoResponse } from "@/lib/define";
import { formatNumber } from "@/lib/utils";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { Heart, MessageCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import ReactList from "./react-list";

export default function ReactSection({
  photo,
  onCommentIconClick,
}: {
  photo: PhotoResponse;
  onCommentIconClick: () => void;
}) {
  const [isReacted, setIsReacted] = useState(photo?.isReacted);
  const [reactsCount, setReactsCount] = useState(photo?.photo.reactsCount);

  useEffect(() => {
    setIsReacted(photo?.isReacted);
    setReactsCount(photo?.photo.reactsCount);
  }, [photo]);
  const handleReact = async () => {
    const prevReact = isReacted;
    setIsReacted(!isReacted);
    setReactsCount((prevCount) => (prevReact ? prevCount - 1 : prevCount + 1));

    try {
      const react = await reactPhoto(photo?.photo._id);
      if (!react?.isSuccess) {
        setIsReacted(prevReact);
        setReactsCount((prevCount) => (prevReact ? prevCount + 1 : prevCount - 1));
      }
    } catch (error) {
      setIsReacted(prevReact);
      setReactsCount((prevCount) => (prevReact ? prevCount + 1 : prevCount - 1));
    }
  };

  return (
    <>
      <div className="flex items-center mr-5">
        {!isReacted ? (
          <Heart
            onClick={handleReact}
            className="h-5 w-5 mr-2 hover:text-primary cursor-pointer transition-colors duration-200"
          />
        ) : (
          <HeartFilledIcon
            onClick={handleReact}
            className="h-5 w-5 mr-2 hover:text-primary cursor-pointer transition-colors duration-200"
          />
        )}
        <ReactList reactsCount={reactsCount} photoId={photo?.photo._id} />
      </div>
      <div className="flex items-center mr-5">
        <MessageCircleIcon
          className="h-5 w-5 mr-2 hover:text-primary cursor-pointer transition-colors duration-200"
          onClick={onCommentIconClick}
        />
        <div className="font-semibold">{formatNumber(photo?.photo.commentsCount)}</div>
      </div>
    </>
  );
}

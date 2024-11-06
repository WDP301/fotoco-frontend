'use client';
import CommentList from "../comment-section/comment-list";
import CommentForm from "../comment-section/comment-form";
import Post from "./post";
import React, { useEffect, useRef, useState } from "react";
import { Comment, PhotoResponse, SearchPhotoParams } from "@/lib/define";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getCommentsByPhotoId, getPhotoDetails } from "@/lib/data";
import SpinLoading from "@/components/shared/spin-loading";

export default function PostSection({
  photo: initialPhoto,
  searchParams
}: {
  photo: PhotoResponse;
  searchParams: SearchPhotoParams;
}) {
  interface CommentFormRef {
    focusTextArea: () => void;
  }

  const commentFormRef = useRef<CommentFormRef>(null);
  const [photo, setPhoto] = useState<PhotoResponse | null>(initialPhoto);
  const [comments, setComments] = useState<Comment[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleCommentIconClick = () => {
    commentFormRef.current?.focusTextArea();
  };

  useEffect(() => {
    if (photo?.photo._id) {
      getPhotoDetails(photo.photo._id, searchParams).then(setPhoto);
      const fetchComments = async () => {
        setLoading(true);
        const { comments } = await getCommentsByPhotoId(photo.photo._id);
        setComments(comments as Comment[]);
        setLoading(false);
      };
      fetchComments();
    }
  }, [photo?.photo._id, searchParams]);

  const handleCommentSuccess = () => {
    if (photo && photo.photo._id) {
      setRefreshKey(refreshKey + 1);
      getPhotoDetails(photo.photo._id, searchParams)
        .then(setPhoto)
        .catch(error => {
          console.error("Error fetching photo details after comment success:", error);
        });
      getCommentsByPhotoId(photo.photo._id)
        .then(({ comments }) => setComments(comments as Comment[]))
        .catch(error => {
          console.error("Error fetching comments after comment success:", error);
        });
    }
  };

  if (!photo || !photo.photo._id) {
    return (
      <div className="min-h-screen justify-center content-center">
        <SpinLoading />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <ScrollArea className="flex-grow overflow-auto">
        <div>
          <Post onCommentIconClick={handleCommentIconClick} photo={photo} />
        </div>
        <div className="overflow-auto mb-4">
          {loading ? (
            <div className="flex justify-center my-4">
              <SpinLoading />
            </div>
          ) : (
            <CommentList key={refreshKey} comments={comments} photoId={photo.photo._id} onSuccess={handleCommentSuccess} />
          )}
        </div>
      </ScrollArea>
      <div className="sticky bottom-3 w-full bg-[var(--comment-form)]">
        <Separator className="mb-3" />
        <CommentForm
          ref={commentFormRef}
          showIcon={false}
          photoId={photo.photo._id}
          onSuccess={handleCommentSuccess} />
      </div>
    </div>
  );
}

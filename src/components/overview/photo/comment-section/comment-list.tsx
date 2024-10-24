'use client';
import ReplyCommentForm from "./reply-comment-form";
import { Separator } from "@/components/ui/separator";
import { CommentCard } from "./comment-card";
import ReplyList from "./reply-list";
import SortSelect from "@/components/shared/sort-select";
import { getCommentsByPhotoId } from "@/lib/data";
import { useEffect, useState } from "react";
import SpinLoading from "@/components/shared/spin-loading";
import { Comment } from "@/lib/define";

export default function CommentList({ photoId, onReplySuccess }: { photoId: string, onReplySuccess?: () => void }) {

  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      const { comments } = await getCommentsByPhotoId(photoId);
      setComments(comments);
      setLoading(false);
    };

    fetchComments();
  }, [photoId]);

  // const sortOptions = [
  //   {
  //     label: "Newest",
  //     value: "newest",
  //     field: "sort",
  //   },
  //   {
  //     label: "Oldest",
  //     value: "oldest",
  //     field: "sort",
  //   },
  // ];

  if (loading) {
    return <SpinLoading />
  }

  return (
    <>
      <Separator className="mb-4"/>
      {comments.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">
          No comments yet.
        </div>
      ) : (
        <>
          {/* <SortSelect
            className="my-2 p-0"
            variant="ghost"
            sort="newest"
            options={sortOptions}
            url={"/comments"}
          /> */}
          {comments.map((comment) => (
            <div key={comment._id} className="mb-4">
              <CommentCard comment={comment} showIcon={false} />
              <ReplyCommentForm replyTo={comment.userInfo.fullName} replyToId={comment._id} photoId={photoId} onSuccess={onReplySuccess} />
              <ReplyList replies={comment.replies}/>
            </div>
          ))}
        </>
      )}
    </>
  );
}

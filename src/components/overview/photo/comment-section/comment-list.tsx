'use client';
import ReplyCommentForm from "./reply-comment-form";
import { Separator } from "@/components/ui/separator";
import { CommentCard } from "./comment-card";
import ReplyList from "./reply-list";
import SortSelect from "@/components/shared/sort-select";
import { Comment } from "@/lib/define";
import { useState } from "react";

export default function CommentList({
  photoId,
  comments,
  onSuccess
} : {
  photoId: string
  comments: Comment[]
  onSuccess?: () => void
}) {

  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  const sortOptions = [
    {
      label: "Newest",
      value: "newest",
      field: "sort",
    },
    {
      label: "Oldest",
      value: "oldest",
      field: "sort",
    },
  ];

  const handleReplyClick = (commentId: string) => {
    setActiveReplyId(prevId => (prevId === commentId ? null : commentId)); // Toggle reply form
  };

  return (
    <>
      <Separator/>
      {comments.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">
          No comments yet.
        </div>
      ) : (
        <>
          <SortSelect
            className="my-2 p-0"
            variant="ghost"
            sort="newest"
            options={sortOptions}
            url={"/comments"}
          />
          {comments.map((comment) => (
            <div key={comment._id}>
              <CommentCard 
                comment={comment}
                showIcon={false}
                photoId={photoId}
                onReplyClick={() => handleReplyClick(comment._id)
                }
              />
              {activeReplyId === comment._id && (
                <ReplyCommentForm 
                  replyTo={comment.userInfo.fullName}
                  replyToId={comment._id}
                  photoId={photoId}
                  isReplyOpen={activeReplyId === comment._id}
                  onSuccess={onSuccess}
                />
              )}
              <ReplyList replies={comment.replies}/>
            </div>
          ))}
        </>
      )}
    </>
  );
}

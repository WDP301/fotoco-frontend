'use client'
import CommentList from "../comment-section/comment-list"
import CommentForm from "../comment-section/comment-form"
import Post from "./post"
import React, { useRef } from "react";
import { PhotoResponse } from "@/lib/define";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";


export default function PostSection({photo}:{photo: PhotoResponse}) {

  interface CommentFormRef {
    focusTextArea: () => void;
  }
  const commentFormRef = useRef<CommentFormRef>(null);

  const handleCommentIconClick = () => {
    commentFormRef.current?.focusTextArea();
  };

  return (
    <div className="flex flex-col h-screen">
      <ScrollArea className="flex-grow overflow-auto">
        <div>
          <Post onCommentIconClick={handleCommentIconClick} photo={photo} />
        </div>
        <div className="overflow-auto mb-4">
          <CommentList />
        </div>
      </ScrollArea>
      <div className="sticky bottom-2 w-full bg-[var(--comment-form)]">
        <Separator className="mb-3" />
        <CommentForm ref={commentFormRef} showIcon={false} />
      </div>
  </div>
  );
}
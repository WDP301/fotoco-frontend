'use client'
import CommentList from "../comment-section/comment-list"
import CommentForm from "../comment-section/comment-form"
import Post from "./post"
import React, { useRef } from "react";

export function PostSection() {

  interface CommentFormRef {
    focusTextArea: () => void;
  }
  const commentFormRef = useRef<CommentFormRef>(null);

  const handleCommentIconClick = () => {
    commentFormRef.current?.focusTextArea();
  };
  return (
    <div className="flex h-screen flex-col">
      <Post onCommentIconClick={handleCommentIconClick} />

      <CommentList />

      <div className="sticky bottom-3">
        <CommentForm ref={commentFormRef} />
      </div>
    </div>
  );
}
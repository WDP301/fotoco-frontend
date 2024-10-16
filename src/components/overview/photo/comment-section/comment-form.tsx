'use client';
import { Textarea } from "@/components/ui/textarea";
import React, { useState, forwardRef, useImperativeHandle } from "react";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { SendHorizontal } from "lucide-react";

// eslint-disable-next-line react/display-name
const CommentForm = forwardRef((_, ref) => {
  const [comment, setComment] = useState("");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => ({
    focusTextArea: () => {
      textareaRef.current?.focus();
    },
  }));

  return (
    <>
      <form className="relative">
        <div className="grid gap-4">
          <div className="flex gap-4 items-start">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            
            <Textarea
              ref={textareaRef}
              className="p-2 pr-10 resize-none w-full scrollbar-hide"
              placeholder="Type your comment here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            
            {comment.trim() && (
              <button 
                type="submit" 
                className="absolute right-2 bottom-2 text-primary"
              >
                <SendHorizontal className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
});


export default CommentForm;
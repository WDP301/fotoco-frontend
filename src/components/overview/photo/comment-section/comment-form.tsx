'use client';
import { Textarea } from "@/components/ui/textarea";
import React, { useState, forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import { User } from "@/lib/define";
import { getUser } from "@/lib/data";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { CornerDownRight, SendHorizontal } from "lucide-react";
import AvatarPicture from "@/components/shared/avatar-picture";

interface CommentFormProps {
  showIcon?: boolean;
  replyTo?: string;
}

interface CommentFormRef {
  focusTextArea: () => void;
}

const CommentForm = forwardRef<CommentFormRef, CommentFormProps>(({ showIcon, replyTo }, ref) => {
  const [comment, setComment] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => ({
    focusTextArea: () => {
      textareaRef.current?.focus();
    },
  }));

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    (async () => {
      const user = (await getUser()) as User;
      setUser(user);
    })();
  }, []);

  return (
    <>
      <form className="relative">
        <div className="grid gap-4">
          <div className="flex gap-4 items-start">
            {showIcon && (
              <CornerDownRight className="h-6 w-6 text-muted-foreground" />
            )}
            <AvatarPicture src={user?.img || ''} />
            <Textarea
              ref={textareaRef}
              className="p-2 pr-10 resize-none w-full scrollbar-hide"
              placeholder={replyTo ? `Reply to ${replyTo}...` : "Write a comment..."}
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

CommentForm.displayName = "CommentForm";
export default CommentForm;
'use client';
import { Textarea } from "@/components/ui/textarea";
import React, { useState, forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import { User } from "@/lib/define";
import { getUser } from "@/lib/data";
import { CornerDownRight, SendHorizontal } from "lucide-react";
import AvatarPicture from "@/components/shared/avatar-picture";
import { commentPhoto, replyComment } from "@/lib/action";

interface CommentFormProps {
  showIcon?: boolean;
  replyTo?: string;
  replyToId?: string;
  photoId: string;
  onSuccess?: () => void;
}

interface CommentFormRef {
  focusTextArea: () => void;
}

const CommentForm = forwardRef<CommentFormRef, CommentFormProps>(({ showIcon, replyTo, replyToId, photoId, onSuccess }, ref) => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let response;
    if (replyTo && replyToId) {
      response = await replyComment(photoId, replyToId, comment);
    } else {
      response = await commentPhoto(photoId, comment);
    }

    if (response.isSuccess) {
      setComment("");
      if (onSuccess) {
        onSuccess();
      }
    } else {
      console.log(response.error);
    }
  };

  return (
    <>
      <form className="relative" onSubmit={handleSubmit}>
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
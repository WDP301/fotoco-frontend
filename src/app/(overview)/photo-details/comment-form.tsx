'use client';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

const CommentForm = () => {
  const [comment, setComment] = useState("");

  const handleCancel = () => {
    setComment("");
  };

  return (
    <form>
      <div className="grid gap-4">
        <div className="flex gap-4 items-start">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Textarea
            className="p-2 resize-none w-full"
            placeholder="Type your comment here..."
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <div className="ml-auto flex gap-2">
            {comment.trim() && (
              <>
                <Button type="button" className="">
                  Send
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;

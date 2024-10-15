'use client';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { SendHorizontal } from "lucide-react";

export default function CommentForm() {
  const [comment, setComment] = useState("");

  return (
    <div className="mb-3">
      <form className="relative">
        <div className="grid gap-4">
          <div className="flex gap-4 items-start">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            
            <Textarea
              className="p-2 pr-10 resize-none w-full scrollbar-hide"  // Thêm padding-right (pr-10) để dành chỗ cho icon Send
              placeholder="Type your comment here..."
              rows={3}
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
    </div>
  );
};


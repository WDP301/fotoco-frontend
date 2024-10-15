'use client';
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis, Flag } from "lucide-react";
import { useState } from "react";
import ReplyCommentForm from "./reply-comment-form";


export default function CommentList() {


  const [isReplyOpen, setIsReplyOpen] = useState(false);

  const handleReplyClick = () => {
    setIsReplyOpen(true);
  }

  return (
    <ScrollArea className="h-[600px]">
    {Array.from({ length: 14 }).map((_, index) => (
      <div key={index} className="flex flex-col gap-2 pb-3">
        <div className="flex flex-col items-start text-left text-sm">
          <div className="flex items-start">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src="./avatar/noavatar.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">John Doe</div>
                <div className="line-clamp-1 text-xs">10/10/2024</div>
              </div>
            </div>
            <div className="ml-auto text-xs text-muted-foreground">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Ellipsis className="h-4 w-4 hover:text-primary" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      Report this comment
                      <DropdownMenuShortcut>
                        <Flag className="ml-2 h-4 w-4" />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="whitespace-pre-wrap pt-4 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel
            scelerisque ligula. Aenean lacinia pulvinar dui vitae sollicitudin.
            Suspendisse potenti.
          </div>
          {!isReplyOpen ? (
            <div className="text-xs py-1 text-gray-400 cursor-pointer" onClick={handleReplyClick}>
              Reply
            </div>
          ) : (
            <ReplyCommentForm setIsReplyOpen={setIsReplyOpen} />
          )}
        </div>
      </div>
    ))}
  </ScrollArea>
  
  );
};


'use client';
import { Badge } from "@/components/ui/badge";
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


const CommentList = () => {


  const [isReplyOpen, setIsReplyOpen] = useState(false);

  const handleReplyClick = () => {
    setIsReplyOpen(true);
  }

  const handleReplyCancel = () => {
    setIsReplyOpen(false);
  }

  const handleReplySubmit = (e) => {
    e.preventDefault();
    console.log("Reply submitted");
    setIsReplyOpen(false);
    
  }

  return (
    <ScrollArea className="h-scroll h-full">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col items-start gap-2 text-left text-sm">
          <div className="flex flex-col">
            <div className="flex items-start">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src="./avatar/noavatar.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="font-semibold">Name</div>
                  <div className="line-clamp-1 text-xs">10/10/2024</div>
                </div>
              </div>
              <div className="ml-auto text-xs text-muted-foreground">
                <Button variant="ghost" size="icon" className="hover:bg-muted">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Ellipsis className="h-4 w-4" />
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
                </Button>
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
              <form onSubmit={handleReplySubmit} className="py-2">
                <input
                  type="text"
                  className="text-sm border p-1 rounded w-full"
                  placeholder="Write a reply..."
                />
                <button type="submit" className="mt-2 bg-blue-500 text-white px-2 py-1 rounded">
                  Submit
                </button>
                <button type="button" className="mt-2 bg-blue-500 text-white px-2 py-1 rounded" onClick={handleReplyCancel}>
                  Cancel
                </button>
              </form>
            )}
            
          </div>
        </div>
      </div>
    </ScrollArea>

  );
};

export default CommentList;

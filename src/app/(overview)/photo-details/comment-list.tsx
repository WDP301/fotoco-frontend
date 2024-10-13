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

const EmailList = () => {
  return (
    <ScrollArea className="h-[200px]">
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
            <div className="text-xs py-1 text-gray-400">
              Reply
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>

  );
};

export default EmailList;

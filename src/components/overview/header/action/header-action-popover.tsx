'use client';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
// import CreateGroupDialog from './create-group-dialog';
import { useLanguage } from '@/components/provider/language-provider';
import JoinGroupDialog from './join-group-dialog';

export default function HeaderActionPopover() {
  const { dict } = useLanguage();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="hidden">
          <Plus />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 m-0 p-1">
        <div className="grid ">
          <h4 className="leading-none px-2 py-1.5 text-sm font-semibold">
            {dict.header.action.title}
          </h4>
          <Separator className="my-1" />
          <div className="grid grid-cols-1 ">
            <JoinGroupDialog />
            {/* <CreateGroupDialog /> */}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

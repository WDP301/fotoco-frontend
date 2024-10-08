'use client';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Plus, SquarePlus } from 'lucide-react';
import { useLanguage } from '@/components/provider/language-provider';
import JoinGroupDialog from './join-group-dialog';
import CreateGroupDiaLog from '../../group/group-list/create-group-dialog';

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
            <CreateGroupDiaLog>
              <div className=" w-full flex justify-between relative select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer hover:bg-accent hover:text-accent-foreground">
                <div>
                    {dict.button.createGroup}
                </div>
                <SquarePlus className="w-5 h-5" />
              </div>
            </CreateGroupDiaLog>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

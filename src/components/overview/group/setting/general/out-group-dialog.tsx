'use client';

import { useLanguage } from '@/components/provider/language-provider';
// import { useSocket } from '@/components/socket-io-provider';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useSocket } from '@/hooks/use-socket';
import { outGroup } from '@/lib/action';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function OutGroupDialog({
  groupId,
  userId,
}: {
  groupId: string;
  userId: string;
}) {
  const socket = useSocket();
  const router = useRouter();
  const [checkbox, setCheckbox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { dict } = useLanguage();

  const handleCheckboxChange = (event: any) => {
    setCheckbox(!checkbox);
  };

  const handleOutGroup = async () => {
    setIsLoading(true);
    const result = await outGroup(groupId, userId);
    if (!result?.isSuccess) {
      toast.error(result?.error);
    } else {
      socket?.reconnect();
      toast.success(dict.outGroup.message.success);
      router.refresh();
    }
    setIsLoading(false);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">{dict.outGroup.button}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dict.outGroup.dialogTitle}</DialogTitle>
          <DialogDescription>
            {dict.outGroup.dialogDescription}
          </DialogDescription>
        </DialogHeader>
        <div className="items-top flex space-x-2">
          <Checkbox
            id="terms1"
            onCheckedChange={handleCheckboxChange}
            checked={checkbox}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {dict.outGroup.labelCheckbox}
            </label>
            <p className="text-sm text-muted-foreground">
              {dict.outGroup.contentCheckbox}
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            disabled={!checkbox || isLoading}
            variant="destructive"
            onClick={handleOutGroup}
          >
            {dict.outGroup.buttonConfirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

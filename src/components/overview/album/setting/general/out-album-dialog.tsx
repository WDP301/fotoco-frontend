'use client';

import { useLanguage } from '@/components/provider/language-provider';
import { outAlbum } from '@/lib/action';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export default function OutAlbumDialog({
  albumId,
  userId,
}: {
  albumId: string;
  userId: string;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const { dict } = useLanguage();

  const handleCheckboxChange = (event: any) => {
    setCheckbox(!checkbox);
  };

  const handleOutAlbum = async () => {
    setIsLoading(true);
    const result = await outAlbum(albumId, userId);
    if (!result?.isSuccess) {
      toast.error(result?.error);
    } else {
      toast.success(dict.outAlbum.message.success);
      router.refresh();
    }
    setIsLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">{dict.outAlbum.button}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dict.outAlbum.dialogTitle}</DialogTitle>
          <DialogDescription>
            {dict.outAlbum.dialogDescription}
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
              {dict.outAlbum.labelCheckbox}
            </label>
            <p className="text-sm text-muted-foreground">
              {dict.outAlbum.contentCheckbox}
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            disabled={!checkbox || isLoading}
            variant="destructive"
            onClick={handleOutAlbum}
          >
            {dict.outAlbum.buttonConfirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

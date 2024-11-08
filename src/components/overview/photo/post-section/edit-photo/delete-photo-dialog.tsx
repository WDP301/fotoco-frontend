'use client';

import { Icons } from '@/components/icons/icons';
import { useLanguage } from '@/components/provider/language-provider';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { deletePhoto } from '@/lib/action';
import { PhotoDetails } from '@/lib/define';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export function DeletePhotoDialog({ photo }: { photo: PhotoDetails }) {
  const router = useRouter();
  const { dict } = useLanguage();
  const [checkbox, setCheckbox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeletePhoto = async () => {
    setIsLoading(true);
    const result = await deletePhoto(photo._id, photo.belonging);
    if (result?.isSuccess) {
      toast.success(dict.photoDetail.delete.message.success);
      router.push(`/albums/${photo.belonging}`);
    } else {
      toast.error(dict.photoDetail.delete.message.error);
    }
    setIsLoading(false);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className=" w-full flex justify-between relative select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer hover:bg-accent hover:text-accent-foreground">
          <div>{dict.photoDetail.action.delete}</div>
          <Trash className="w-5 h-5" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dict.photoDetail.delete.title}</DialogTitle>
        </DialogHeader>
        <div className="items-top flex space-x-2">
          <Checkbox
            checked={checkbox}
            id="delete"
            onCheckedChange={() => setCheckbox(!checkbox)}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="delete"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {dict.photoDetail.delete.description}
            </label>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            disabled={!checkbox || isLoading}
            onClick={handleDeletePhoto}
            variant="destructive"
          >
            {isLoading && (
              <Icons.spinner className=" mr-2 h-4 w-4 animate-spin" />
            )}
            {dict.button.delete}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

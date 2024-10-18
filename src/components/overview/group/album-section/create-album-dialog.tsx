'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import CreateAlbumForm from './create-album-form';
import { useLanguage } from '@/components/provider/language-provider';
import { Button } from '@/components/ui/button';
import { Images } from 'lucide-react';
import { useState } from 'react';

export default function CreateAlbumDiaLog({ groupId }: { groupId: string }) {
  const [open, setOpen] = useState(false);
  const { dict } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Images className="mr-2 h-4 w-4 text-primary" />
          {dict.button.createAlbum}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dict.createAlbum.dialogTitle}</DialogTitle>
          <DialogDescription>
            {dict.createAlbum.dialogDescription}
          </DialogDescription>
        </DialogHeader>
        <CreateAlbumForm setOpen={setOpen} groupId={groupId} />
      </DialogContent>
    </Dialog>
  );
}

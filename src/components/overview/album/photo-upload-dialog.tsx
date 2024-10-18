'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import PhotoUploadForm from './photo-upload-form';
import { ImageUp } from 'lucide-react';
import { useLanguage } from '@/components/provider/language-provider';

export default function PhotoUploadDialog({ albumId }: { albumId: string }) {
  const { dict } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <ImageUp className="h-4 w-4 mr-2 text-primary" />
          {dict.photo.upload.title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            {dict.photo.upload.heading}
          </DialogTitle>
          <DialogDescription className="text-center">
            {dict.photo.upload.description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <PhotoUploadForm albumId={albumId} setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

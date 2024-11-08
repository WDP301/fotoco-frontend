'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SearchParams, SearchPhotoParams } from '@/lib/define';
import { Suspense, useState } from 'react';
import SpinLoading from '@/components/shared/spin-loading';
import { useRouter } from 'next/navigation';
import { createUrl } from '@/lib/utils';
import GalleryView from '../../album/gallery-view';
import { Expand } from 'lucide-react';

export default function PhotoExpand({
  albumId,
  searchParams,
  currentPhotoId,
}: {
  albumId: string;
  searchParams: SearchPhotoParams;
  currentPhotoId: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
      }}
    >
      <DialogTrigger asChild className="cursor-pointer">
        <button className="text-white absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-gray-800">
          <Expand className="h-6 w-6" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px] p-0 bg-transparent border-none shadow-none">
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <Suspense
          key={`${searchParams.page || '1'}-${searchParams.sort || 'desc'}-${searchParams.pageSize}-${searchParams.filter || 'all'}-${searchParams.search || ''}-${searchParams.mode}`}
          fallback={<SpinLoading />}
        >
          <GalleryView
            albumId={albumId}
            searchParams={searchParams}
            currentPhotoId={currentPhotoId}
          />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}

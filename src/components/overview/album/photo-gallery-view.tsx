'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SearchParams, SearchPhotoParams } from '@/lib/define';
import { Suspense, useState } from 'react';
import GalleryView from './gallery-view';
import SpinLoading from '@/components/shared/spin-loading';
import { useLanguage } from '@/components/provider/language-provider';
import { useRouter } from 'next/navigation';
import { createUrl } from '@/lib/utils';

export default function PhotoGalleryView({
  albumId,
  searchParams,
}: {
  albumId: string;
  searchParams: SearchPhotoParams;
}) {
  const { push } = useRouter();
  const { dict } = useLanguage();
  const [open, setOpen] = useState(true);

  const handleChangeMode = () => {
    const searchParams = new URLSearchParams(location.search);
    const pathName = location.pathname;
    searchParams.delete(SearchParams.MODE);
    push(createUrl(pathName, searchParams));
  };
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        if (open) {
          handleChangeMode();
        }
        setOpen(!open);
      }}
    >
      <DialogTrigger asChild className="cursor-pointer">
        <div className="w-full flex justify-center mt-5">
          <Button>{dict.button.openGallery}</Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px] p-0 bg-transparent border-none shadow-none">
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <Suspense
          key={`${searchParams.page || '1'}-${searchParams.sort || 'desc'}-${searchParams.pageSize}-${searchParams.filter || 'all'}-${searchParams.search || ''}-${searchParams.mode}`}
          fallback={<SpinLoading />}
        >
          <GalleryView albumId={albumId} searchParams={searchParams} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}

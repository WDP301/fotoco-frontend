'use client';
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { XIcon } from "lucide-react"
import { PhotoResponse, SearchPhotoParams } from "@/lib/define";
import Image from "next/image";
import Link from "next/link";
import { cn, fetchPhotoSize } from "@/lib/utils";
import { useEffect, useState } from "react";
import SpinLoading from "@/components/shared/spin-loading";

type PhotoCarouselProps = {
  photo: PhotoResponse,
  searchParams: SearchPhotoParams
}
export default function PhotoCarousel({
  photo,
  searchParams
}: PhotoCarouselProps) {
  
  const queryString = new URLSearchParams(searchParams as any).toString();
  const [loading, setLoading] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 1000 });
  useEffect(() => {
    setLoading(true);
    fetchPhotoSize(photo?.photo.url).then((size) => {
        setDimensions(size);
    });
    setLoading(false);
}, [photo?.photo.url]);

  if (loading) {
    return (
      <div className="min-h-screen justify-center content-center">
        <SpinLoading />
      </div>
    )
  }

  return (
      <div className="relative flex items-center justify-center bg-black w-full h-screen group">
        <div className="inline-block items-center justify-center overflow-hidden">
          <div
              className={cn(
                  dimensions.width > dimensions.height
                      ? 'md:w-full'
                      : 'md:h-[100vh]',
                  'flex justify-center shadow-none'
              )}
          >
            <Image
              src={photo?.photo.url || '/background/default-vertical.jpg'}
              width={dimensions.width}
              height={dimensions.height}
              alt={photo?.photo.title || 'Photo'} 
              className="max-h-screen max-w-full object-contain"
            />
          </div>
        </div>
        {photo?.prevPhoto && (
          <Link href={`/photos/${photo?.prevPhoto}?${queryString}`}>
            <button className="absolute left-2 opacity-0 hover: group-hover:opacity-100 transition-opacity rounded-full hover:bg-gray-800">
              <ChevronLeft className="h-10 w-10" />
            </button>
          </Link>
        )}
        {photo?.nextPhoto && (
          <Link href={`/photos/${photo?.nextPhoto}?${queryString}`}>
            <button className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity rounded-full hover:bg-gray-800">
              < ChevronRight className="h-10 w-10" />
            </button>
          </Link>
        )}
        
        <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-gray-800">
          <Expand className="h-6 w-6" />
        </button>

        <Link href={`/albums/${photo?.photo.belonging}?${queryString}`}>
          <button className="absolute top-2 left-2 p-2 rounded-full hover:bg-gray-800">
            <XIcon className="h-7 w-7" />
          </button>
        </Link>
      </div>
  );
}
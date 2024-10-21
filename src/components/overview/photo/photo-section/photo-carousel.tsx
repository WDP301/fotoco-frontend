'use client';
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { XIcon } from "lucide-react"
import { useRouter } from "next/navigation";
import { PhotoResponse, SearchPhotoParams } from "@/lib/define";
import Image from "next/image";
import Link from "next/link";

type PhotoCarouselProps = {
  photo: PhotoResponse,
  searchParams: SearchPhotoParams
}
export default function PhotoCarousel({
  photo,
  searchParams
}: PhotoCarouselProps) {
  const route = useRouter();
  const queryString = new URLSearchParams(searchParams as any).toString();
  const handleCloseClick = () => {
    route.push(`/albums/${photo?.photo.belonging}?${queryString}`);
  }
  
  return (
      <div className="relative flex items-center justify-center bg-black w-full h-screen group">
        <div className="inline-block items-center justify-center overflow-hidden">
          <Image
            src={photo?.photo.url || '/background/default-vertical.jpg'}
            width={600}
            height={600}
            alt={photo?.photo.title || 'Photo'} 
            className="max-h-screen max-w-full object-contain"
          />
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

        <button onClick={handleCloseClick}>
          <XIcon className="h-10 w-10 absolute top-2 left-2 p-2 rounded-full hover:bg-gray-800" />
        </button>
      </div>
  );
}
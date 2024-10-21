'use client';
import { useEffect, useState, useMemo, useCallback } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { Photo, SearchPhotoParams } from '@/lib/define';
import Link from 'next/link';

interface GalleryProps {
  photos: Photo[];
  currentPhoto?: Photo; // Optional currentPhoto prop
}

const Gallery = ({ photos, currentPhoto }: GalleryProps) => {
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbnailApi, setThumbnailApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Find index of the current photo
  const initialIndex = useMemo(() => {
    if (!currentPhoto) return 0;
    const index = photos.findIndex((photo) => photo._id === currentPhoto._id);
    return index !== -1 ? index : 0;
  }, [currentPhoto, photos]);

  const handleClick = useCallback(
    (index: number) => {
      if (!mainApi || !thumbnailApi) {
        return;
      }
      thumbnailApi.scrollTo(index);
      mainApi.scrollTo(index);
      setCurrent(index);
    },
    [mainApi, thumbnailApi, setCurrent]
  );

  const mainImage = useMemo(
    () =>
      photos.map((photo, index) => (
        <CarouselItem key={index}>
          <Link
            href={`/photos/${photo._id}`}
            className="w-full h-[75vh] flex justify-center"
          >
            <Image
              className="object-contain h-full"
              src={photo.url}
              alt={`Photo ${index}: ${photo?.title || 'Photo'}`}
              width={1000}
              height={1000}
              quality={100}
              priority={true}
            />
          </Link>
        </CarouselItem>
      )),
    [photos]
  );

  const thumbnailImages = useMemo(
    () =>
      photos.map((photo, index) => (
        <CarouselItem
          key={index}
          className="relative aspect-square w-full basis-1/12 mx-2"
          onClick={() => handleClick(index)}
        >
          <Image
            className={`${index === current ? 'border-primary border-2 rounded-lg' : 'rounded-lg'}`}
            src={photo.url}
            fill
            sizes="100px"
            alt={`Carousel Thumbnail Image ${index + 1}: ${photo?.title || 'Photo'}`}
            style={{ objectFit: 'cover' }}
          />
        </CarouselItem>
      )),
    [photos, current, handleClick]
  );

  useEffect(() => {
    if (!mainApi || !thumbnailApi) {
      return;
    }

    const handleTopSelect = () => {
      const selected = mainApi.selectedScrollSnap();
      setCurrent(selected);
      thumbnailApi.scrollTo(selected);
    };

    const handleBottomSelect = () => {
      const selected = thumbnailApi.selectedScrollSnap();
      setCurrent(selected);
      mainApi.scrollTo(selected);
    };

    mainApi.on('select', handleTopSelect);
    thumbnailApi.on('select', handleBottomSelect);

    // Scroll to the initial index when the component mounts
    mainApi.scrollTo(initialIndex);
    thumbnailApi.scrollTo(initialIndex);
    setCurrent(initialIndex);

    return () => {
      mainApi.off('select', handleTopSelect);
      thumbnailApi.off('select', handleBottomSelect);
    };
  }, [mainApi, thumbnailApi, initialIndex]);

  return (
    <div className="w-full">
      <Carousel setApi={setMainApi} className="w-full">
        <CarouselContent>{mainImage}</CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <Carousel setApi={setThumbnailApi}>
        <CarouselContent className="m-2">{thumbnailImages}</CarouselContent>
      </Carousel>
    </div>
  );
};

export default Gallery;

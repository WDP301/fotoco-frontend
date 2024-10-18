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
import { Photo } from '@/lib/define';
import Link from 'next/link';

const Gallery = ({ photos }: { photos: Photo[] }) => {
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbnailApi, setThumbnailApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

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

    return () => {
      mainApi.off('select', handleTopSelect);
      thumbnailApi.off('select', handleBottomSelect);
    };
  }, [mainApi, thumbnailApi]);

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

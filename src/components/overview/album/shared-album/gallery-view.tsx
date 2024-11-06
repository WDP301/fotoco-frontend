'use client';
import { useEffect, useState, useMemo, useCallback} from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { SharedAlbum } from '@/lib/define';
import ListPagination from '@/components/shared/list-pagination';

const SharedGalleryView = ({ sharedAlbum }: {sharedAlbum: SharedAlbum}) => {
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbnailApi, setThumbnailApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const handleFullscreen = (index: number) => {
    const imageContainer = document.getElementById(`image-container-${index}`);
    if (imageContainer) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        imageContainer.requestFullscreen();
      }
    }
  };

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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        const nextIndex = (current + 1) % sharedAlbum.photos.length;
        handleClick(nextIndex);
      } else if (event.key === 'ArrowLeft') {
        const prevIndex = (current - 1 + sharedAlbum.photos.length) % sharedAlbum.photos.length;
        handleClick(prevIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [current, handleClick, sharedAlbum.photos.length]);

  const mainImage = useMemo(
    () =>
      sharedAlbum.photos.map((photo, index) => (
        <CarouselItem key={index}>
            <div id={`image-container-${index}`} className="w-full h-[75vh] flex justify-center">
                <Image
                className="object-contain h-full"
                src={photo.url}
                alt={`Photo ${index}: ${photo?.title || 'Photo'}`}
                width={1000}
                height={1000}
                quality={100}
                priority={true}
                onClick={() => handleFullscreen(index)}
                />
            </div>
        </CarouselItem>
      )),
    [sharedAlbum.photos]
  );

  const thumbnailImages = useMemo(
    () =>
      sharedAlbum.photos.map((photo, index) => (
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
    [sharedAlbum.photos, current, handleClick]
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

    mainApi.scrollTo(0);
    thumbnailApi.scrollTo(0);

    return () => {
      mainApi.off('select', handleTopSelect);
      thumbnailApi.off('select', handleBottomSelect);
    };
  }, [mainApi, thumbnailApi]);

  return (
    <div className="w-full px-24">
      <Carousel setApi={setMainApi} className="w-full">
        <CarouselContent>{mainImage}</CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <Carousel setApi={setThumbnailApi}>
        <CarouselContent className="m-2">{thumbnailImages}</CarouselContent>
      </Carousel>
      <ListPagination meta={sharedAlbum.pageMeta} bookmark="album-name" />
    </div>
  );
};

export default SharedGalleryView;

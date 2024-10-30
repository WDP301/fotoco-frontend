'use client';

import Gallery from '@/components/shared/gallery-images';
import ListPagination from '@/components/shared/list-pagination';
import { getPhotosByAlbumId } from '@/lib/data';
import { PageMeta, Photo, SearchPhotoParams } from '@/lib/define';
import { useEffect, useState } from 'react';

export default function GalleryView({
  albumId,
  searchParams,
  currentPhotoId,
}: {
  albumId: string;
  searchParams: SearchPhotoParams;
  currentPhotoId?: string;
}) {
  const [photos, setPhotos] = useState([] as Photo[]);
  const [pageMeta, setPageMeta] = useState({
    totalPages: 0,
    page: 0,
    pageSize: 0,
    hasNext: false,
    hasPrev: false,
  } as PageMeta);
  const [currentPhoto, setCurrentPhoto] = useState({} as Photo);

  useEffect(() => {
    const fetchPhotos = async () => {
      const { photos, pageMeta } = await getPhotosByAlbumId(
        albumId,
        searchParams
      );

      if (currentPhotoId) {
        const currentPhoto = photos.find(
          (photo) => photo._id === currentPhotoId
        );
        currentPhoto
          ? setCurrentPhoto(currentPhoto)
          : setCurrentPhoto(photos[0]);
      }

      setPhotos(photos);
      setPageMeta(pageMeta);
    };
    fetchPhotos();
  }, [albumId, searchParams, currentPhotoId]);
  return (
    <>
      <div>
        <Gallery photos={photos} currentPhoto={currentPhoto} />
      </div>
      <div>
        <ListPagination meta={pageMeta} bookmark="album-name" />
      </div>
    </>
  );
}

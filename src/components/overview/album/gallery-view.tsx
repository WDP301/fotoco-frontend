'use client';

import Gallery from '@/components/shared/gallery-images';
import ListPagination from '@/components/shared/list-pagination';
import { getPhotosByAlbumId } from '@/lib/data';
import { PageMeta, Photo, SearchPhotoParams } from '@/lib/define';
import { useEffect, useState } from 'react';

export default function GalleryView({
  albumId,
  searchParams,
}: {
  albumId: string;
  searchParams: SearchPhotoParams;
}) {
  const [photos, setPhotos] = useState([] as Photo[]);
  const [pageMeta, setPageMeta] = useState({
    totalPages: 0,
    page: 0,
    pageSize: 0,
    hasNext: false,
    hasPrev: false,
  } as PageMeta);

  useEffect(() => {
    const fetchPhotos = async () => {
      const { photos, pageMeta } = await getPhotosByAlbumId(
        albumId,
        searchParams
      );
      setPhotos(photos);
      setPageMeta(pageMeta);
    };
    fetchPhotos();
  }, [albumId, searchParams]);
  return (
    <>
      <div>
        <Gallery photos={photos} />
      </div>
      <div>
        <ListPagination meta={pageMeta} bookmark="album-name" />
      </div>
    </>
  );
}

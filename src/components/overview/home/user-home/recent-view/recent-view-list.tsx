'use client';

import { Button } from '@/components/ui/button';
import { getPhotosByPhotosList } from '@/lib/data';
import Link from 'next/link';
import { RecentViewCard } from './recent-view-card';
import { useLanguage } from '@/components/provider/language-provider';
import { useEffect, useState } from 'react';
import { RecentPhoto } from '@/lib/define';
import { getPhotoViewHistory } from '@/lib/utils';
import GroupListLoading from '@/components/overview/group/loading/group-list-loading';

export default function RecentViewList() {
  const { dict } = useLanguage();
  const [photos, setPhotos] = useState<RecentPhoto[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const photosViewHistory = getPhotoViewHistory().slice(0, 10);
      const result = await getPhotosByPhotosList(photosViewHistory);

      setPhotos(result);
      setLoading(false);
    })();
  }, []);
  if (loading) {
    return <GroupListLoading />;
  }
  if (!photos || photos.length === 0) {
    return (
      <div className="flex justify-center items-center h-24">
        {dict.recentView.noRecentView}
      </div>
    );
  }
  return (
    <div className="container mx-auto">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 max-sm:p-4 max-sm:flex max-sm:flex-col max-sm:items-center">
        {photos.map((photo) => (
          <RecentViewCard key={photo._id} photo={photo} />
        ))}
      </div>
      <div className=" w-full flex justify-center my-5">
        <Button asChild>
          <Link href="/recent-view">{dict.userHome.home.viewAllPhotos}</Link>
        </Button>
      </div>
    </div>
  );
}

'use client';

import { useLanguage } from '@/components/provider/language-provider';
import { RecentPhoto } from '@/lib/define';
import { RecentViewCard } from '../home/user-home/recent-view/recent-view-card';
import GroupListLoading from '../group/loading/group-list-loading';

export default function RecentViewList({
  photos,
  loading,
}: {
  photos: RecentPhoto[];
  loading: boolean;
}) {
  const { dict } = useLanguage();
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
    </div>
  );
}

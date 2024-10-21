import { Button } from '@/components/ui/button';
import { getRecentViewPhotos } from '@/lib/data';
import { getDictionary } from '@/lib/dictionaries';
import Link from 'next/link';
import { RecentViewCard } from './recent-view-card';

export default async function RecentViewList() {
  const { photos } = await getRecentViewPhotos({ page: 1, pageSize: 8 });
  const dict = await getDictionary();
  if (!photos || photos.length === 0) {
    return (
      <div className="flex justify-center items-center h-24">
        {dict.errorMessage.noPhotoFound}
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
          <Link href="/recent-views">{dict.userHome.home.viewAllPhotos}</Link>
        </Button>
      </div>
    </div>
  );
}

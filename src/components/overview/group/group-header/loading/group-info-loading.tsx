import BreadcrumbLoading from '@/components/shared/loading/breadcrumb-loading';
import { Skeleton } from '@/components/ui/skeleton';

export default function GroupInfoLoading() {
  return (
    <div>
      <div className="my-2">
        <BreadcrumbLoading />
      </div>
      <div className="flex justify-between items-center gap-2">
        {/* Group Title Skeleton */}
        <Skeleton className="h-6 w-40" />

        {/* Settings Button Skeleton */}
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>

      {/* Bottom Section: Group Type Icon and Text */}
      <div className="flex gap-2 mt-2 items-center">
        {/* Group Type Icon Skeleton */}
        <Skeleton className="h-4 w-4 rounded-full" />
        {/* Group Type Text Skeleton */}
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}

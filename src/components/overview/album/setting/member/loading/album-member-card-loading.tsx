import { Skeleton } from '@/components/ui/skeleton';

export default function AlbumMemberCardLoading() {
  return (
    <div className="mb-2">
      <div className="flex gap-2">
        {/* Avatar Skeleton */}
        <div>
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>

        <div className="flex flex-col justify-around w-full space-y-2">
          {/* Name and Role Skeleton */}
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Popover Button Skeleton */}
        <Skeleton className="ml-auto h-6 w-6 rounded-full" />
      </div>

      {/* Separator Skeleton */}
      <Skeleton className="my-4 h-px w-full" />
    </div>
  );
}

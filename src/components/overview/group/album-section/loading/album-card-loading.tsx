import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export default function AlbumCardLoading({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn('relative group', className)}>
      <div className="grid overflow-hidden rounded-lg aspect-square">
        {/* Skeleton structure for three images */}
        <div className="grid grid-cols-3 gap-1">
          <div className="col-span-2 h-full">
            <Skeleton className="object-cover w-full h-full" />
          </div>
          <div className="grid grid-rows-2 gap-1 h-full">
            <Skeleton className="object-cover w-full h-full" />
            <Skeleton className="object-cover w-full h-full" />
          </div>
        </div>
      </div>

      {/* Skeleton for album details */}
      {/* <div className="absolute inset-0 flex flex-col justify-end p-4 text-white opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:bg-black group-hover:bg-opacity-50 md:opacity-100 md:group-hover:opacity-100 rounded-lg">
        <Skeleton className="h-6 w-3/4 mb-2" /> 
        <Skeleton className="h-4 w-1/2" /> 
      </div> */}
    </div>
  );
}

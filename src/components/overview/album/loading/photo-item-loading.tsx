import { Skeleton } from '@/components/ui/skeleton';

const PhotoItemLoading = ({ randomHeight }: { randomHeight: number }) => {
  return (
    <div className="relative overflow-hidden rounded-lg">
      {/* Adjust the height of the skeleton dynamically */}
      <Skeleton
        className={`w-full rounded-lg`}
        style={{ height: `${randomHeight}px` }}
      />
      {/* <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-50 rounded-lg">
        <div className="flex items-center mb-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="ml-2 space-y-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
        <Skeleton className="h-4 w-full mb-2" />
        <div className="flex space-x-6">
          <Skeleton className="h-5 w-8" />
          <Skeleton className="h-5 w-8" />
        </div>
      </div> */}
    </div>
  );
};

export default PhotoItemLoading;

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface AvatarCirclesLoadingProps {
  className?: string;
  numSkeletons?: number;
}

const AvatarCirclesLoading = ({
  numSkeletons = 3,
  className,
}: AvatarCirclesLoadingProps) => {
  return (
    <div className={cn('z-10 flex -space-x-4 rtl:space-x-reverse', className)}>
      {Array.from({ length: numSkeletons }).map((_, index) => (
        <Skeleton
          key={index}
          className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-800"
        />
      ))}
      <Skeleton className="h-10 w-10 rounded-full border-2 border-white bg-black text-center text-xs font-medium text-white dark:border-gray-800 dark:bg-white dark:text-black" />
    </div>
  );
};

export default AvatarCirclesLoading;

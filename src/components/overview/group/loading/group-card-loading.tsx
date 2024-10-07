'use client';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export function GroupCardLoading() {
  return (
    <div className="max-w-xs w-full group/card">
      <div
        className={cn(
          ' cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl max-w-sm mx-auto backgroundImage flex flex-col justify-between'
        )}
      >
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  );
}

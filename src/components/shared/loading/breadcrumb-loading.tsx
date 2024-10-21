import { Skeleton } from '@/components/ui/skeleton';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function BreadcrumbLoading() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Skeleton for Home Icon and Home Text */}
        <BreadcrumbItem>
          <Skeleton className="flex gap-1 items-center w-16 h-4" />
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {/* Skeleton for intermediate breadcrumb items */}
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="flex gap-2 items-center">
            <BreadcrumbItem>
              <Skeleton className="w-24 h-4" />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </div>
        ))}

        {/* Skeleton for the last breadcrumb item */}
        <BreadcrumbItem>
          <Skeleton className="w-32 h-4" />
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

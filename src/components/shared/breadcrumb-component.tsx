'use client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { BreadItem } from '@/lib/define';
import { Home } from 'lucide-react';
import { useLanguage } from '../provider/language-provider';
import Link from 'next/link';

export default function BreadcrumbComponent({
  breadcrumbs,
}: {
  breadcrumbs: BreadItem[];
}) {
  const { dict } = useLanguage();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem key="home-item">
          <Link href="/" className="flex gap-1 items-center">
            <Home className="w-4 h-4 " />
            {dict.home}
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {breadcrumbs
          .slice(0, breadcrumbs.length - 1)
          .map((breadcrumb, index) => (
            <div key={`${index}-item`} className="flex gap-2 items-center">
              <BreadcrumbItem>
                <Link href={breadcrumb.url}>{breadcrumb.title}</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </div>
          ))}
        <BreadcrumbItem key="last-item">
          <BreadcrumbPage>
            {breadcrumbs[breadcrumbs.length - 1].title}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

import PhotoDateRangePicker from '@/components/overview/recent-view/photo-date-range-picker';
import BreadcrumbComponent from '@/components/shared/breadcrumb-component';
import { BreadItem } from '@/lib/define';
import { getDictionary } from '@/lib/dictionaries';
import { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
  const dict = await getDictionary();

  return {
    title: `${dict.recentView.title}`,
    description: dict.recentView.description,
  };
};

export default async function RecentViewPage() {
  const dict = await getDictionary();
  const breadItems = [
    {
      title: dict.breadcrumb.recentView,
      url: '/recent-view',
    },
  ] as BreadItem[];
  return (
    <div>
      <div className="mt-2">
        <BreadcrumbComponent breadcrumbs={breadItems} />
      </div>
      <PhotoDateRangePicker />
    </div>
  );
}

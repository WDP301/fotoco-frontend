'use client';

import { DateRangePicker } from '@/components/ui/date-range-picker';
import { getPhotosByPhotosList } from '@/lib/data';
import { PageMeta, RecentPhoto } from '@/lib/define';
import { getPhotoViewHistory } from '@/lib/utils';
import { useEffect, useState } from 'react';
import RecentViewList from './recent-view-list';
import { useLanguage } from '@/components/provider/language-provider';
import { useSearchParams } from 'next/navigation';
import ListPagination from '@/components/shared/list-pagination';

type DateRange = {
  range: {
    from: Date;
    to?: Date;
  };
};

export default function PhotoDateRangePicker() {
  const { dict } = useLanguage();
  const [photos, setPhotos] = useState<RecentPhoto[]>([]);
  const [pageMeta, setPageMeta] = useState({
    totalPages: 0,
    page: 0,
    pageSize: 0,
    hasNext: false,
    hasPrev: false,
  } as PageMeta);
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const handleUpdate = async (
    values: DateRange,
    page: number = 1,
    pageSize: number = 10
  ) => {
    setLoading(true);
    const { photos: photosViewHistory, pageMeta } = getPhotoViewHistory(
      values.range.from,
      values.range.to,
      page,
      pageSize
    );
    setPageMeta(pageMeta);
    const result = await getPhotosByPhotosList(photosViewHistory);
    setPhotos(result);
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      const dateFrom = searchParams.get('from')
        ? new Date(searchParams.get('from') as string)
        : new Date();
      dateFrom.setHours(0, 0, 0, 0);
      const dateTo = searchParams.get('to')
        ? new Date(searchParams.get('to') as string)
        : new Date();
      const page = searchParams.get('page')
        ? parseInt(searchParams.get('page') as string)
        : 1;
      const pageSize = searchParams.get('pageSize')
        ? parseInt(searchParams.get('pageSize') as string)
        : 10;

      setFrom(dateFrom);
      setTo(dateTo);

      await handleUpdate(
        {
          range: { from: dateFrom, to: dateTo },
        },
        page,
        pageSize
      );
    })();
  }, [searchParams]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between gap-2 my-5">
        <h3 id="recent-view">{dict.recentView.title}</h3>
        <div className="max-sm:mx-auto">
          <DateRangePicker
            onUpdate={(values) => handleUpdate(values)}
            initialDateFrom={from}
            initialDateTo={to}
            align="start"
            showCompare={false}
            disabled={(date) => date > new Date()}
          />
        </div>
      </div>

      <div className="mt-5">
        <RecentViewList photos={photos} loading={loading} />
      </div>
      <div className="my-3">
        <ListPagination meta={pageMeta} bookmark="recent-view" />
      </div>
    </div>
  );
}

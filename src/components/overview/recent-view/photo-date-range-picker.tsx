'use client';

import { DateRangePicker } from '@/components/ui/date-range-picker';
import { getPhotosByPhotosList } from '@/lib/data';
import { RecentPhoto } from '@/lib/define';
import { getPhotoViewHistory } from '@/lib/utils';
import { useEffect, useState } from 'react';
import RecentViewList from './recent-view-list';
import { useLanguage } from '@/components/provider/language-provider';

type DateRange = {
  range: {
    from: Date;
    to?: Date;
  };
};

export default function PhotoDateRangePicker() {
  const { dict } = useLanguage();
  const [photos, setPhotos] = useState<RecentPhoto[]>([]);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (values: DateRange) => {
    setLoading(true);
    const photosViewHistory = getPhotoViewHistory(
      values.range.from,
      values.range.to
    );
    const result = await getPhotosByPhotosList(photosViewHistory);
    setPhotos(result);
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      await handleUpdate({
        range: { from: new Date(0), to: new Date() },
      });
    })();
  }, []);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between gap-2 my-5">
        <h3>{dict.recentView.title}</h3>
        <div className="max-sm:mx-auto">
          <DateRangePicker
            onUpdate={(values) => handleUpdate(values)}
            initialDateFrom={new Date()}
            initialDateTo={new Date()}
            align="start"
            showCompare={false}
            disabled={(date) => date > new Date()}
          />
        </div>
      </div>

      <div className="my-5">
        <RecentViewList photos={photos} loading={loading} />
      </div>
    </div>
  );
}

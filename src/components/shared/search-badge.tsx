'use client';

import { Badge } from '@/components/ui/badge';
import { createUrl } from '@/lib/utils';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../provider/language-provider';
import { SearchParams } from '@/lib/define';

export default function SearchBadge({
  query,
  className,
}: {
  query: string;
  className?: string;
}) {
  const { dict } = useLanguage();
  const { replace } = useRouter();

  const handleClearSearch = () => {
    const searchParams = new URLSearchParams(location.search);
    const pathName = location.pathname;
    searchParams.delete(SearchParams.SEARCH);
    searchParams.delete(SearchParams.PAGE);
    replace(createUrl(pathName, searchParams));
  };
  return (
    <Badge variant="default" className={className}>
      {dict.common.searchResultsFor}: {query}
      <button
        className="ml-2 text-xs text-gray-500"
        onClick={handleClearSearch}
      >
        <X className="h-4 w-4" />
      </button>
    </Badge>
  );
}

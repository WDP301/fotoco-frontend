'use client';

import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { SearchParams } from '@/lib/define';
import { createUrl } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchBar({ placeholder }: { placeholder: string[] }) {
  const { push } = useRouter();
  const [value, setValue] = useState('');
  const [placeholderView, setPlaceholderView] = useState(placeholder);

  const handleSearchChange = (value: string) => {
    setValue(value);
    setPlaceholderView([]);
  };

  const handleSearchSubmit = () => {
    const searchParams = new URLSearchParams(location.search);
    const pathName = location.pathname;

    searchParams.delete(SearchParams.PAGE);
    searchParams.delete(SearchParams.SEARCH);
    searchParams.set(SearchParams.SEARCH, value);
    push(createUrl(pathName, searchParams), { scroll: false });

    setPlaceholderView(placeholder);
  };
  return (
    <PlaceholdersAndVanishInput
      placeholders={placeholderView}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        handleSearchChange(e.target.value)
      }
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSearchSubmit()}
    />
  );
}

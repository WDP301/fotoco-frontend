'use client';

import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { createUrl } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchBar({ placeholder }: { placeholder: string[] }) {
  const [value, setValue] = useState('');
  const { replace } = useRouter();
  const [placeholderView, setPlaceholderView] = useState(placeholder);

  const handleSearchChange = (value: string) => {
    setValue(value);
    setPlaceholderView([]);
  };

  const handleSearchSubmit = () => {
    setPlaceholderView(placeholder);
    const searchParams = new URLSearchParams(location.search);
    const pathName = location.pathname;
    searchParams.set('search', value);
    replace(createUrl(pathName, searchParams));
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

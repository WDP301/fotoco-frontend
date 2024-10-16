'use client';

import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { useParams } from '@/hooks/use-params';
import { useState } from 'react';

export default function SearchBar({ placeholder }: { placeholder: string[] }) {
  const [value, setValue] = useState('');
  const { setParams, deleteParam } = useParams();
  const [placeholderView, setPlaceholderView] = useState(placeholder);

  const handleSearchChange = (value: string) => {
    setValue(value);
    setPlaceholderView([]);
  };

  const handleSearchSubmit = () => {
    console.log('searching for:', value);
    setPlaceholderView(placeholder);
    deleteParam('page');
    deleteParam('search');
    setParams('search', value);
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

'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useDebouncedCallback } from 'use-debounce';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import React, { useEffect } from 'react';
import { ArrowDownUp } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { cn, createUrl } from '@/lib/utils';
import { CheckIcon } from '@radix-ui/react-icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchParams, SortOption } from '@/lib/define';
import { VariantProps } from 'class-variance-authority';
import { Button, buttonVariants } from '@/components/ui/button';
import { useLanguage } from '../provider/language-provider';

interface SortSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  sort?: string;
  options: SortOption[];
  url: string;
}

export default function SortSelect({
  sort,
  options,
  url,
  ...props
}: Readonly<SortSelectProps>) {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const [selected, setSelected] = React.useState<string[]>([]);
  const { dict } = useLanguage();

  useEffect(() => {
    if (sort) setSelected(sort.split(','));
  }, [sort]);

  const handleSortChange = useDebouncedCallback(() => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete(SearchParams.SORT);
    if (selected) newParams.set(SearchParams.SORT, selected.join(','));
    push(createUrl(url, newParams));
  }, 600);

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button {...props}>
            <ArrowDownUp className="mr-2 size-4 text-primary" />
            {dict.button.sort}
            {selected.length > 0 && (
              <>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal lg:hidden"
                >
                  {selected.length}
                </Badge>
                <div className="hidden space-x-1 lg:flex">
                  {selected
                    .map((selectedValue) =>
                      options.find((option) => option.value === selectedValue)
                    )
                    .filter(Boolean)
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option?.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option?.label}
                      </Badge>
                    ))}
                </div>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0" align="start">
          <Command>
            <CommandList>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selected.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => {
                        if (!isSelected) {
                          const newSelected = selected.filter((item) => {
                            const currentItemField = options.find(
                              (option) => option.value === item
                            )?.field;
                            const selectedOptionField = option.field;
                            return currentItemField !== selectedOptionField;
                          });
                          newSelected.push(option.value);
                          setSelected(newSelected);
                        } else {
                          setSelected(
                            selected.filter((item) => item !== option.value)
                          );
                        }
                        handleSortChange();
                      }}
                    >
                      <div
                        className={cn(
                          'mr-2 flex size-4 items-center justify-center rounded-sm border border-primary',
                          isSelected
                            ? 'bg-primary text-primary-foreground'
                            : 'opacity-50 [&_svg]:invisible'
                        )}
                      >
                        <CheckIcon
                          className={cn('size-4')}
                          aria-hidden="true"
                        />
                      </div>
                      <span>{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              {selected.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => {
                        setSelected([]);
                        const newParams = new URLSearchParams(
                          searchParams.toString()
                        );
                        newParams.delete(SearchParams.SORT);
                        push(createUrl(url, newParams));
                      }}
                      className="justify-center text-center"
                    >
                      Clear
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

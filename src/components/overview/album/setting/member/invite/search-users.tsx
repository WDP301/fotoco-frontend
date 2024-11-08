'use client';

import * as React from 'react';
import { Check, UserRoundSearch } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { AlbumInfo, SearchUser } from '@/lib/define';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getAlbumInfo, getSearchGroupMembers, getUsers } from '@/lib/data';
import { useLanguage } from '@/components/provider/language-provider';

export function SearchUsers({
  albumId,
  field,
}: {
  albumId: string;
  field: any;
}) {
  const { dict } = useLanguage();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(field.value || '');
  const [inputValue, setInputValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const [users, setUsers] = React.useState([] as SearchUser[]);
  const [user, setUser] = React.useState<SearchUser | null>(null);
  const [album, setAlbum] = React.useState<AlbumInfo | null>(null);
  const [groupId, setGroupId] = React.useState('');

  React.useEffect(() => {
    const fetchAlbumInfo = async () => {
      const albumData = await getAlbumInfo(albumId);
      setAlbum(albumData);
      setGroupId(albumData.group._id);
    };

    fetchAlbumInfo();
  }, [albumId]);

  const handleValueChange = (value: string) => {
    setInputValue(value);
    setOpen(!!value);
  };

  React.useEffect(() => {
    if (inputValue === '') {
      setUsers([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      getSearchGroupMembers(groupId, inputValue).then(
        (members: SearchUser[]) => {
          setUsers(members);
        }
      );
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue, groupId]);

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          asChild
          className="w-full flex justify-between m-0 px-3 "
        >
          <Button variant="outline" role="combobox" aria-expanded={open}>
            {value
              ? users.find(
                  (user) =>
                    user.email === value ||
                    user.username === value ||
                    user.fullName === value
                )?.email
              : dict.album.setting.member.invite.search.heading}
            <UserRoundSearch className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[164%]" align="start">
          <Command>
            <CommandInput
              placeholder={dict.album.setting.member.invite.search.heading}
              onValueChange={handleValueChange}
            />
            <CommandList>
              <CommandEmpty>
                {dict.album.setting.member.invite.search.noResult}
              </CommandEmpty>
              <CommandGroup>
                {users.map((user) => (
                  <CommandItem
                    key={user._id}
                    value={user.email}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue);
                      setUser(user);
                      setOpen(false);
                      field.onChange(currentValue);
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === user.email ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    <div key={user._id} className="mb-2">
                      <div className="flex gap-2">
                        <Avatar className="border-solid border-sky-500 border-2 w-[40px] h-[40px]">
                          <AvatarImage
                            src={user.img || '/avatar/noavatar.png'}
                            alt="picture"
                          />
                          <AvatarFallback>{'A'}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col justify-around">
                          <p className="text-sm font-medium leading-none">
                            {user.fullName}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

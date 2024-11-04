'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/components/provider/language-provider';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Icons } from '@/components/icons/icons';
import { getInviteAlbumMemberSchema } from '@/lib/form-schema';
import { inviteUserToAlbum } from '@/lib/action';
import AlbumMemberTypeIcon from '@/components/shared/album-member-type-icon';
import { getAlbumInfo } from '@/lib/data';
import { AlbumInfo } from '@/lib/define';
import { SearchUsers } from './search-users';

export function InviteMember({ albumId }: { albumId: string }) {
  const { dict } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const [album, setAlbum] = useState<AlbumInfo | null>(null);

  useEffect(() => {
    const fetchAlbumInfo = async () => {
      const albumData = await getAlbumInfo(albumId);
      setAlbum(albumData);
    };

    fetchAlbumInfo();
  }, [albumId]);

  const form = useForm<z.infer<ReturnType<typeof getInviteAlbumMemberSchema>>>({
    resolver: zodResolver(getInviteAlbumMemberSchema(dict.lang)),
    defaultValues: {
      email: '',
      role: 'MEMBER',
    },
  });

  const onSubmit = async (
    values: z.infer<ReturnType<typeof getInviteAlbumMemberSchema>>
  ) => {
    setIsLoading(true);
    // send invite
    const result = await inviteUserToAlbum(albumId, values);
    if (!result?.isSuccess) {
      toast.error(result?.error);
    } else {
      toast.success(dict.album.setting.member.invite.success);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">
                  {dict.form.email}
                </FormLabel>
                <FormControl>
                  <SearchUsers albumId={albumId} field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => {
              const displayValue = {
                OWNER: dict.role.album.owner,
                MEMBER: dict.role.album.member,
                CONTRIBUTOR: dict.role.album.contributor,
              };

              return (
                <FormItem>
                  <FormLabel className="text-primary">
                    {dict.form.albumMemberRole}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue>{displayValue[field.value]}</SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="MEMBER">
                        <div className="flex items-center gap-3">
                          <AlbumMemberTypeIcon
                            type="MEMBER"
                            className="inline-block w-4 h-4"
                          />
                          <div>{dict.role.album.member}</div>
                        </div>
                      </SelectItem>
                      <SelectItem value="CONTRIBUTOR">
                        <div className="flex items-center gap-3">
                          <AlbumMemberTypeIcon
                            type="CONTRIBUTOR"
                            className="inline-block w-4 h-4"
                          />
                          <div>{dict.role.album.contributor}</div>
                        </div>
                      </SelectItem>
                      <SelectItem value="OWNER">
                        <div className="flex items-center gap-3">
                          <AlbumMemberTypeIcon
                            type="OWNER"
                            className="inline-block w-4 h-4"
                          />
                          <div>{dict.role.album.owner}</div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div className="flex justify-center md:justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className=" mr-2 h-4 w-4 animate-spin" />
              )}
              {dict.button.invite}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

'use client';

import { useLanguage } from '@/components/provider/language-provider';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { updateAlbum } from '@/lib/action';
import { AlbumInfo, AlbumSetting } from '@/lib/define';
import { getUpdateAlbumSettingSchema } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { revalidateTag } from 'next/cache';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export default function AlbumSettingForm({
  albumSetting,
  album,
  albumId,
}: {
  albumSetting: AlbumSetting;
  album: AlbumInfo;
  albumId: string;
}) {
  const { dict } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<ReturnType<typeof getUpdateAlbumSettingSchema>>>(
    {
      resolver: zodResolver(getUpdateAlbumSettingSchema(dict.lang)),
      defaultValues: {
        setting: {
          allow_invite: albumSetting.setting.allow_invite || false,
          // allow_share_album: albumSetting.setting.allow_share_album || false,
          // allow_share_photo: albumSetting.setting.allow_share_photo || false,
        },
        title: album.title,
        description: album.description,
      },
    }
  );
  const handleUpdateAlbum = async (
    values: z.infer<ReturnType<typeof getUpdateAlbumSettingSchema>>
  ) => {
    setIsLoading(true);
    const result = await updateAlbum(albumId, values);
    if (!result?.isSuccess) {
      toast.error(result?.error);
    } else {
      form.setValue('setting', {
        allow_invite: result.data.allow_invite || false,
        // allow_share_album: result.data?.allow_share_album || false,
        // allow_share_photo: result.data?.allow_share_photo || false,
      });
      toast.success(dict.album.setting.general.message.success);
    }
    setIsLoading(false);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleUpdateAlbum)}
        className="space-y-8"
      >
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <div className="grid w-full gap-1.5">
              <FormItem>
                <FormLabel>
                  <Label htmlFor="title" className="text-primary">
                    {dict.createAlbum.title}&nbsp;
                    <span className="text-red-500">*</span>
                  </Label>
                </FormLabel>
                <FormControl>
                  <Input
                    id="title"
                    className="col-span-3"
                    placeholder={dict.createAlbum.titlePlaceholder}
                    type="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                    autoFocus
                    disabled={
                      albumSetting.setting.role !== 'OWNER' || isLoading
                    }
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage></FormMessage>
              </FormItem>
            </div>
          )}
        />

        <FormField
          name="description"
          control={form.control}
          render={({ field }) => {
            return (
              <div className="grid w-full gap-1.5">
                <FormItem>
                  <FormLabel className="text-primary">
                    <Label htmlFor="description">
                      {dict.createAlbum.description}
                    </Label>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      id="description"
                      className="col-span-3 resize-none"
                      placeholder={dict.createAlbum.descriptionPlaceholder}
                      autoCapitalize="none"
                      autoCorrect="off"
                      disabled={
                        albumSetting.setting.role !== 'OWNER' || isLoading
                      }
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage></FormMessage>
                </FormItem>
              </div>
            );
          }}
        />

        <div>
          <h3 className="mb-4 text-lg font-medium">
            {dict.album.setting.title}
          </h3>
          <div className="space-y-4">
            <FormField
              name="setting.allow_invite"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {dict.album.setting.general.allowInvite.title}
                    </FormLabel>
                    <FormDescription>
                      {dict.album.setting.general.allowInvite.description}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={
                        albumSetting.setting.role !== 'OWNER' || isLoading
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* <FormField
              name="setting.allow_share_album"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {dict.album.setting.general.allowShareAlbum.title}
                    </FormLabel>
                    <FormDescription>
                      {dict.album.setting.general.allowShareAlbum.description}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={
                        albumSetting.setting.role !== 'OWNER' || isLoading
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            /> */}
            {/* <FormField
              name="setting.allow_share_photo"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {dict.album.setting.general.allowSharePhoto.title}
                    </FormLabel>
                    <FormDescription>
                      {dict.album.setting.general.allowSharePhoto.description}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={
                        albumSetting.setting.role !== 'OWNER' || isLoading
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            /> */}
          </div>
        </div>
        {albumSetting.setting.role === 'OWNER' && (
          <Button type="submit">{dict.button.updateAlbum}</Button>
        )}
      </form>
    </Form>
  );
}

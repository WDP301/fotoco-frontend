'use client';

import { useLanguage } from '@/components/provider/language-provider';
import GroupTypeIcon from '@/components/shared/group-type-icon';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { updateGroup } from '@/lib/action';
import { GroupInfo, GroupSetting } from '@/lib/define';
import { getUpdateGroupSettingSchema } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export default function GroupSettingForm({
  groupSetting,
  group,
  groupId,
}: {
  groupSetting: GroupSetting;
  group: GroupInfo;
  groupId: string;
}) {
  const router = useRouter();
  const { dict } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<ReturnType<typeof getUpdateGroupSettingSchema>>>(
    {
      resolver: zodResolver(getUpdateGroupSettingSchema(dict.lang)),
      defaultValues: {
        setting: {
          allow_invite: groupSetting.setting.allow_invite || false,
          allow_create_album: groupSetting.setting.allow_create_album || false,
          allow_share_album: groupSetting.setting.allow_share_album || false,
          allow_share_photo: groupSetting.setting.allow_share_photo || false,
        },
        type: group.type as 'PUBLIC' | 'PRIVATE' | 'HIDDEN',
        title: group.title,
        description: !group.description ? 'No description' : group.description,
        groupImg: group.groupImg,
      },
    }
  );

  const handleUpdateGroup = async (
    values: z.infer<ReturnType<typeof getUpdateGroupSettingSchema>>
  ) => {
    setIsLoading(true);
    const result = await updateGroup(groupId, values);
    if (!result?.isSuccess) {
      toast.error(dict.group.setting.general.message.error);
    } else {
      router.push(`/groups/${groupId}/settings`);
      router.refresh();
      toast.success(dict.group.setting.general.message.success);
    }
    setIsLoading(false);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleUpdateGroup)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <div className="grid w-full gap-1.5">
              <FormItem>
                <FormLabel>
                  <Label htmlFor="title" className="text-primary">
                    {dict.createGroup.title}&nbsp;
                    <span className="text-red-500">*</span>
                  </Label>
                </FormLabel>
                <FormControl>
                  <Input
                    id="title"
                    className="col-span-3"
                    placeholder={dict.createGroup.titlePlaceholder}
                    type="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                    autoFocus
                    disabled={
                      groupSetting.setting.role !== 'OWNER' || isLoading
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
          control={form.control}
          name="description"
          render={({ field }) => (
            <div className="grid w-full gap-1.5">
              <FormItem>
                <FormLabel className="text-primary">
                  <Label htmlFor="description">
                    {dict.createGroup.description}
                  </Label>
                </FormLabel>
                <FormControl>
                  <Textarea
                    id="description"
                    className="col-span-3 resize-none"
                    placeholder={dict.createGroup.descriptionPlaceholder}
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={
                      groupSetting.setting.role !== 'OWNER' || isLoading
                    }
                    rows={4}
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
          control={form.control}
          name="type"
          render={({ field }) => {
            const displayValue = {
              PUBLIC: dict.createGroup.public,
              PRIVATE: dict.createGroup.private,
              HIDDEN: dict.createGroup.hidden,
            };

            return (
              <FormItem>
                <FormLabel className="text-primary">
                  {dict.createGroup.type}
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={groupSetting.setting.role !== 'OWNER' || isLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue>{displayValue[field.value]}</SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem
                      value="PUBLIC"
                      title={dict.createGroup.tooltipContent.public}
                    >
                      <div className="flex items-center gap-3">
                        <GroupTypeIcon
                          type="PUBLIC"
                          className="inline-block w-4 h-4"
                        />
                        <div>{dict.createGroup.public}</div>
                      </div>
                    </SelectItem>
                    <SelectItem
                      value="PRIVATE"
                      title={dict.createGroup.tooltipContent.private}
                    >
                      <div className="flex items-center gap-3">
                        <GroupTypeIcon
                          type="PRIVATE"
                          className="inline-block w-4 h-4"
                        />
                        <div>{dict.createGroup.private}</div>
                      </div>
                    </SelectItem>
                    <SelectItem
                      value="HIDDEN"
                      title={dict.createGroup.tooltipContent.hidden}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <GroupTypeIcon
                            type="HIDDEN"
                            className="inline-block w-4 h-4"
                          />
                          <div>{dict.createGroup.hidden}</div>
                        </div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <div>
          <h3 className="mb-4 text-lg font-medium">
            {dict.group.setting.title}
          </h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="setting.allow_invite"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {dict.group.setting.general.allowInvite.title}
                    </FormLabel>
                    <FormDescription>
                      {dict.group.setting.general.allowInvite.description}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={
                        groupSetting.setting.role !== 'OWNER' ||
                        isLoading ||
                        group.type === 'HIDDEN'
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="setting.allow_create_album"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {dict.group.setting.general.allowCreateAlbum.title}
                    </FormLabel>
                    <FormDescription>
                      {dict.group.setting.general.allowCreateAlbum.description}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={
                        groupSetting.setting.role !== 'OWNER' ||
                        isLoading ||
                        group.type === 'HIDDEN'
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="setting.allow_share_album"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {dict.group.setting.general.allowShareAlbum.title}
                    </FormLabel>
                    <FormDescription>
                      {dict.group.setting.general.allowShareAlbum.description}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={
                        groupSetting.setting.role !== 'OWNER' ||
                        isLoading ||
                        group.type === 'HIDDEN' ||
                        group.type === 'PRIVATE'
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="setting.allow_share_photo"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {dict.group.setting.general.allowSharePhoto.title}
                    </FormLabel>
                    <FormDescription>
                      {dict.group.setting.general.allowSharePhoto.description}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={
                        groupSetting.setting.role !== 'OWNER' ||
                        isLoading ||
                        group.type === 'HIDDEN' ||
                        group.type === 'PRIVATE'
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        {groupSetting.setting.role === 'OWNER' && (
          <Button type="submit">{dict.button.updateGroup}</Button>
        )}
      </form>
    </Form>
  );
}

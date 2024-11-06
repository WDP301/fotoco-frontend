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
import { getInviteGroupMemberSchema } from '@/lib/form-schema';
import { useLanguage } from '@/components/provider/language-provider';
import { useState } from 'react';
import { inviteUserToGroup } from '@/lib/action';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import GroupMemberTypeIcon from '@/components/shared/group-member-type-icon';
import { Icons } from '@/components/icons/icons';

export function InviteMember({ groupId }: { groupId: string }) {
  const { dict } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<ReturnType<typeof getInviteGroupMemberSchema>>>({
    resolver: zodResolver(getInviteGroupMemberSchema(dict.lang)),
    defaultValues: {
      email: '',
      role: 'MEMBER',
    },
  });

  const onSubmit = async (
    values: z.infer<ReturnType<typeof getInviteGroupMemberSchema>>
  ) => {
    setIsLoading(true);
    // send invite
    const result = await inviteUserToGroup(groupId, values);
    if (!result?.isSuccess) {
      toast.error(result?.error);
    } else {
      toast.success(dict.group.setting.member.invite.success);
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">{dict.form.email}</FormLabel>
              <FormControl>
                <Input placeholder={dict.form.email} {...field} />
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
              OWNER: dict.role.group.owner,
              MEMBER: dict.role.group.member,
            };

            return (
              <FormItem>
                <FormLabel className="text-primary">
                  {dict.form.groupMemberRole}
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
                        <GroupMemberTypeIcon
                          type="MEMBER"
                          className="inline-block w-4 h-4"
                        />
                        <div>{dict.role.group.member}</div>
                      </div>
                    </SelectItem>
                    <SelectItem value="OWNER">
                      <div className="flex items-center gap-3">
                        <GroupMemberTypeIcon
                          type="OWNER"
                          className="inline-block w-4 h-4"
                        />
                        <div>{dict.role.group.owner}</div>
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
  );
}

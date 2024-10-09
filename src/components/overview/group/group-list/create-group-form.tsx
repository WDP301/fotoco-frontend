'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { getCreateGroupSchema } from '@/lib/form-schema';
import { useLanguage } from '@/components/provider/language-provider';

import { createGroup } from '@/lib/action';
import { useRouter } from 'next/navigation';

import { Icons } from '@/components/icons/icons';

import { toast } from 'sonner';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import GroupTypeIcon from '@/components/shared/group-type-icon';

export default function CreateGroupForm({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { dict } = useLanguage();

  const form = useForm<z.infer<ReturnType<typeof getCreateGroupSchema>>>({
    resolver: zodResolver(getCreateGroupSchema(dict.lang)),
    defaultValues: {
      title: '',
      description: '',
      type: 'PUBLIC',
    },
  });

  const handleCreateGroup = async (
    values: z.infer<ReturnType<typeof getCreateGroupSchema>>
  ) => {
    setIsLoading(true);
    const result = await createGroup(values);
    if (!result?.isSuccess) {
      toast.error(dict.createGroup.message.error)
    }else{
      toast.success(dict.createGroup.message.success);
      setOpen(false);
      router.refresh();
    }
    setIsLoading(false);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCreateGroup)}>
          <div className="grid gap-4 py-4">
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
                        disabled={isLoading}
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
                        className="col-span-3"
                        placeholder={dict.createGroup.descriptionPlaceholder}
                        autoCapitalize="none"
                        autoCorrect="off"
                        disabled={isLoading}
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
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue>{displayValue[field.value]}</SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="PUBLIC" title={dict.createGroup.tooltipContent.public}>
                          <div className="flex items-center gap-3">
                            <GroupTypeIcon
                              type="PUBLIC"
                              className="inline-block w-4 h-4"
                            />
                            <div>{dict.createGroup.public}</div>
                          </div>
                        </SelectItem>
                        <SelectItem value="PRIVATE" title={dict.createGroup.tooltipContent.private}>
                          <div className="flex items-center gap-3">
                            <GroupTypeIcon
                              type="PRIVATE"
                              className="inline-block w-4 h-4"
                            />
                            <div>{dict.createGroup.private}</div>
                          </div>
                        </SelectItem>
                        <SelectItem value="HIDDEN" title={dict.createGroup.tooltipContent.hidden}>
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
          </div>
          <Button type="submit" disabled={isLoading} className='w-full mt-4'>
            {isLoading && (
              <Icons.spinner className=" mr-2 h-4 w-4 animate-spin" />
            )}
            {dict.createGroup.button}
          </Button>
        </form>
      </Form>
    </>
  );
}

'use client';

import { Icons } from '@/components/icons/icons';
import { useLanguage } from '@/components/provider/language-provider';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { PhotoDetails } from '@/lib/define';
import { getUpdatePhotoFormSchema } from '@/lib/form-schema';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { FilePenLine } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { editPhoto } from '@/lib/action';
import { TagsInput } from '@/components/ui/tags-input';

export function EditPhotoDialog({ photo }: { photo: PhotoDetails }) {
  const { dict } = useLanguage();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<ReturnType<typeof getUpdatePhotoFormSchema>>>({
    resolver: zodResolver(getUpdatePhotoFormSchema(dict.lang)),
    defaultValues: {
      title: photo?.title || '',
      tags: photo?.tags || [],
    },
  });

  async function onSubmit(
    data: z.infer<ReturnType<typeof getUpdatePhotoFormSchema>>
  ) {
    setIsLoading(true);
    const result = await editPhoto(photo._id, photo.belonging, data);
    if (result.isSuccess) {
      router.refresh();
      toast.success(dict.photoDetail.edit.message.success);
      setOpen(false);
    } else {
      toast.error(result?.error || dict.photoDetail.edit.message.error);
    }
    setIsLoading(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className=" w-full flex justify-between relative select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer hover:bg-accent hover:text-accent-foreground">
          <div>{dict.photoDetail.action.edit}</div>
          <FilePenLine className="w-5 h-5" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-primary">
            {dict.photoDetail.edit.title}
          </DialogTitle>
          <DialogDescription>
            {dict.photoDetail.edit.description}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">
                    {dict.photoDetail.edit.form.title.label}
                  </FormLabel>
                  <FormControl
                    className={cn('', !field.value && 'text-muted-foreground')}
                  >
                    <Input
                      placeholder={dict.photoDetail.edit.form.title.placeholder}
                      {...field}
                      autoFocus
                    />
                  </FormControl>
                  <FormDescription className="text-left">
                    {dict.photoDetail.edit.form.title.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel className="text-left text-primary">
                    {dict.photoDetail.edit.form.tags.label}
                  </FormLabel>
                  <FormControl className="w-full">
                    <TagsInput
                      value={(field.value as string[]) || []}
                      onValueChange={field.onChange}
                      placeholder={dict.photoDetail.edit.form.tags.placeholder}
                    />
                  </FormControl>
                  <FormDescription className="text-left">
                    {dict.photoDetail.edit.form.tags.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between md:justify-end gap-2">
              <Button
                type="submit"
                disabled={
                  isLoading ||
                  (JSON.stringify(photo?.tags || []) ===
                    JSON.stringify(form.getValues('tags')) &&
                    photo?.title === form.getValues('title'))
                }
              >
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                {dict.button.saveChanges}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

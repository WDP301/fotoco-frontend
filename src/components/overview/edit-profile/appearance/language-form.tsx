'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { changeLanguage } from '@/lib/action';
import { useState } from 'react';
import { Icons } from '@/components/icons/icons';
import { useLanguage } from '@/components/provider/language-provider';
import { toast } from 'sonner';

const FormSchema = z.object({
  language: z.enum(['en', 'vi']),
});

export function LanguageForm({ lang }: { lang: string }) {
  const { dict, updateLanguage } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(lang);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    const result = await changeLanguage(data.language);
    if (result.isSuccess) {
      toast.success(dict.editProfile.appearance.language.message.success);
      updateLanguage(data.language);
    } else {
      toast.error(dict.editProfile.appearance.language.message.error);
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {dict.editProfile.appearance.language.title}
              </FormLabel>
              <Select
                onValueChange={(value) => {
                  setSelectedLanguage(value);
                  field.onChange(value);
                }}
                defaultValue={lang}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="vi">Vietnamese</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                {dict.editProfile.appearance.language.description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={lang === selectedLanguage || isLoading}>
          {isLoading && (
            <Icons.spinner className=" mr-2 h-4 w-4 animate-spin" />
          )}
          {dict.button.changeLanguage}
        </Button>
      </form>
    </Form>
  );
}

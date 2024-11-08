'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { useLanguage } from '@/components/provider/language-provider';

const appearanceFormSchema = z.object({
  theme: z.enum(['light', 'dark', 'system'], {
    required_error: 'Please select a theme.',
  }),
});

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

export function AppearanceForm() {
  const { dict } = useLanguage();
  const { setTheme, theme } = useTheme();

  const [currentTheme, setCurrentTheme] = useState(theme);
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
  });

  function onSubmit(data: AppearanceFormValues) {
    setTheme(data.theme);
    setCurrentTheme(data.theme);
    toast.success(dict.editProfile.appearance.theme.message.success);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-primary">
                {dict.editProfile.appearance.title}
              </FormLabel>
              <FormDescription>
                {dict.editProfile.appearance.description}
              </FormDescription>
              <FormMessage />
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid max-w-md md:max-w-lg grid-cols-1 md:grid-cols-3 gap-8 pt-2"
              >
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary text-primary">
                    <FormControl>
                      <RadioGroupItem
                        value="light"
                        className="sr-only"
                        onClick={() => setSelectedTheme('light')}
                      />
                    </FormControl>
                    <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                      <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                        <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                      </div>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">
                      {dict.modeToggle.light}
                    </span>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary text-primary">
                    <FormControl>
                      <RadioGroupItem
                        value="dark"
                        className="sr-only"
                        onClick={() => setSelectedTheme('dark')}
                      />
                    </FormControl>
                    <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                      <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                        <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-slate-400" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-slate-400" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                        </div>
                      </div>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">
                      {dict.modeToggle.dark}
                    </span>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary text-primary">
                    <FormControl>
                      <RadioGroupItem
                        value="system"
                        className="sr-only"
                        onClick={() => setSelectedTheme('system')}
                      />
                    </FormControl>
                    <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent transition-all duration-300">
                      <div className="space-y-2 rounded-sm bg-gradient-to-r from-black to-white p-2">
                        <div className="space-y-2 rounded-md bg-gradient-to-r from-black to-white p-2 shadow-lg">
                          <div className="h-2 w-[80px] rounded-lg bg-gradient-to-r from-slate-800 to-[#ecedef] animate-pulse" />
                          <div className="h-2 w-[100px] rounded-lg bg-gradient-to-r from-slate-800 to-[#ecedef] animate-pulse" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-gradient-to-r from-black to-white p-2 shadow-lg">
                          <div className="h-4 w-4 rounded-full bg-gradient-to-r from-slate-800 animate-pulse" />
                          <div className="h-2 w-[100px] rounded-lg bg-gradient-to-r from-slate-800 to-[#ecedef] animate-pulse" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-gradient-to-r from-black to-white p-2 shadow-lg">
                          <div className="h-4 w-4 rounded-full bg-gradient-to-r from-slate-800 animate-pulse" />
                          <div className="h-2 w-[100px] rounded-lg bg-gradient-to-r from-slate-800 to-[#ecedef] animate-pulse" />
                        </div>
                      </div>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">
                      {dict.modeToggle.system}
                    </span>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={currentTheme === selectedTheme}>
          {dict.button.changeTheme}
        </Button>
      </form>
    </Form>
  );
}

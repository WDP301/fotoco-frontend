'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '../../ui/button';
import { useState } from 'react';
import { Icons } from '../../icons/icons';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { login } from '@/lib/action';
import { PasswordInput } from '@/components/ui/password-input';
import { getLoginFormSchema } from '@/lib/form-schema';
import { useLanguage } from '@/components/provider/language-provider';

export default function UserAuthLoginForm() {
  const router = useRouter();
  const { dict } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [loginResult, setLoginResult] = useState<
    { error?: string; isSuccess?: boolean } | undefined
  >(undefined);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const form = useForm<z.infer<ReturnType<typeof getLoginFormSchema>>>({
    resolver: zodResolver(getLoginFormSchema(dict.lang)),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const handleLogin = async (
    values: z.infer<ReturnType<typeof getLoginFormSchema>>
  ) => {
    setIsLoading(true);

    const result = await login(values);
    if (!result?.isSuccess) {
      setLoginResult(result);
    } else {
      setLoginResult({ isSuccess: true });
      router.push(callbackUrl || '/');
      // App reload to update user to socket
      window.location.reload();
    }
    setIsLoading(false);
  };

  return (
    <>
      {loginResult?.error && (
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>{dict.error.title}</AlertTitle>
          <AlertDescription>{loginResult?.error}</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-8">
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email" className="text-primary">
                    {dict.form.email}
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      autoFocus
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between">
                    <FormLabel htmlFor="pasword" className="text-primary">
                      {dict.form.password}
                    </FormLabel>
                    <FormDescription className="items-start">
                      <Link
                        href={'/forgot-password'}
                        className="underline-offset-4 hover:underline hover:text-primary h-full text-primary"
                      >
                        {dict.form.forgotPassword}
                      </Link>
                    </FormDescription>
                  </div>
                  <FormControl>
                    <PasswordInput
                      id="password"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="mt-5"
              variant="default"
            >
              {isLoading && (
                <Icons.spinner className=" mr-2 h-4 w-4 animate-spin" />
              )}
              {dict.form.login}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

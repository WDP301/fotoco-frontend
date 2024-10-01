'use client';
import {
  EnvelopeOpenIcon,
  ExclamationTriangleIcon,
} from '@radix-ui/react-icons';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PasswordInput } from '@/components/ui/password-input';
import { useRouter, useSearchParams } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Icons } from '@/components/icons/icons';
import { register } from '@/lib/action';
import { getRegisterFormSchema } from '@/lib/form-schema';
import { useLanguage } from '@/components/provider/language-provider';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthRegisterForm({
  className,
  ...props
}: UserAuthFormProps) {
  const { push } = useRouter();
  const { dict } = useLanguage();

  const [registerResult, setRegisterResult] = React.useState<
    { error?: string } | undefined
  >(undefined);
  const searchParams = useSearchParams();
  const success = searchParams.get('success');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const form = useForm<z.infer<ReturnType<typeof getRegisterFormSchema>>>({
    resolver: zodResolver(getRegisterFormSchema(dict.lang)),
    defaultValues: {
      fullName: '',
      username: '',
      email: '',
      phoneNumber: '',
      password: '',
    },
  });

  const handleRegister = async (
    values: z.infer<ReturnType<typeof getRegisterFormSchema>>
  ) => {
    setIsLoading(true);

    const result = await register(values);

    if (result.isSuccess) {
      setRegisterResult(undefined);
      push('/register?success=true');
    } else {
      setRegisterResult({
        error: result.error || 'Unknown error',
      });
    }

    setIsLoading(false);
  };

  if (success) {
    return (
      <Alert>
        <EnvelopeOpenIcon className="h-4 w-4 text-primary" />
        <AlertTitle className="text-primary">
          {dict.register.message.success}
        </AlertTitle>
        <AlertDescription className="text-primary">
          {dict.register.message.successInfo}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      {registerResult?.error && (
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>{dict.register.message.error}</AlertTitle>
          <AlertDescription>{registerResult?.error}</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleRegister)}
          className="space-y-8"
        >
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">
                    {dict.form.fullName}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoFocus
                      disabled={isLoading}
                      placeholder={dict.form.fullName}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">
                    {dict.form.username}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder={dict.form.username}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">
                    {dict.form.email}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="name@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">
                    {dict.form.phoneNumber}
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder={dict.form.phoneNumber}
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
                    <FormLabel className="text-primary">
                      {dict.form.password}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                  </div>
                  <FormControl>
                    <PasswordInput disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="mt-5">
              {isLoading && (
                <Icons.spinner className=" mr-2 h-4 w-4 animate-spin" />
              )}
              {dict.form.register}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

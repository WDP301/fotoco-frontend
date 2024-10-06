'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { UserRoundPlus } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Icons } from '@/components/icons/icons';
import { joinGroup } from '@/lib/action';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useToast } from '@/hooks/use-toast';
import { getJoinGroupSchema } from '@/lib/form-schema';
import { useLanguage } from '@/components/provider/language-provider';

export default function JoinGroupDialog() {
  const router = useRouter();
  const { toast } = useToast();
  const { dict } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<
    { error?: string; errorType?: string; isSuccess?: boolean } | undefined
  >(undefined);
  const form = useForm<z.infer<ReturnType<typeof getJoinGroupSchema>>>({
    resolver: zodResolver(getJoinGroupSchema(dict.lang)),
    defaultValues: {
      code: '',
    },
  });

  async function onSubmit(
    data: z.infer<ReturnType<typeof getJoinGroupSchema>>
  ) {
    setIsLoading(true);

    const result = await joinGroup(data);
    if (!result?.isSuccess) {
      setResult(result);
      toast({
        variant: 'destructive',
        title: dict.joinGroup.message.error,
        description: result.error,
      });
    } else {
      toast({
        description: dict.joinGroup.message.successInfo,
      });
      setResult({ isSuccess: true });
      setOpen(false);
      router.push('/groups');
      router.refresh();
    }
    setIsLoading(false);
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <div className=" w-full flex justify-between relative select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer hover:bg-accent hover:text-accent-foreground">
          <div>{dict.joinGroup.title}</div>
          <UserRoundPlus className="w-5 h-5" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>{dict.joinGroup.heading}</AlertDialogTitle>
          <AlertDialogDescription>
            {dict.joinGroup.headingInfo}
          </AlertDialogDescription>
          <div className="flex flex-col gap-5 items-center w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* {result?.error && (
                  <Alert variant="destructive">
                    <ExclamationTriangleIcon className="h-4 w-4" />
                    <AlertTitle>{dict.joinGroup.message.error}</AlertTitle>
                    <AlertDescription>{result?.error}</AlertDescription>
                  </Alert>
                )} */}
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputOTP
                          maxLength={6}
                          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                          {...field}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <AlertDialogFooter>
                  <AlertDialogCancel>{dict.button.cancel}</AlertDialogCancel>
                  <Button type="submit">
                    {isLoading && (
                      <Icons.spinner className=" mr-2 h-4 w-4 animate-spin" />
                    )}
                    {dict.button.join}
                  </Button>
                </AlertDialogFooter>
              </form>
            </Form>
          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

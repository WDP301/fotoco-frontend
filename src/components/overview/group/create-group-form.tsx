'use client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState } from 'react';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { getCreateGroupFormSchema } from "@/lib/form-schema"
import { useLanguage } from '@/components/provider/language-provider';

import { createGroup } from "@/lib/action";
import { useRouter } from "next/navigation";

import { Icons } from '@/components/icons/icons';

import { toast } from 'sonner';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"


export default function CreateGroupForm({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<
  { error?: string; errorType?: string; isSuccess?: boolean } | undefined
  >(undefined);
  const { dict } = useLanguage();

  const form = useForm<z.infer<ReturnType<typeof getCreateGroupFormSchema>>>({
    resolver: zodResolver(getCreateGroupFormSchema(dict.lang)),
    defaultValues: {
      title: "",
      description: "",
    }
  })

  const handleCreateGroup = async (values: z.infer<ReturnType<typeof getCreateGroupFormSchema>>) => {
    setIsLoading(true);
    const result = await createGroup(values);
    if (!result?.isSuccess) {
      setResult(result);
    }else{
      toast.success(result.isSuccess);
      setResult({isSuccess: true});
      setOpen(false);
      // router.push('/groups'); // Co the dung 1 trong 2 cai
      router.refresh();
    }
    setIsLoading(false);
  }

  return (
    <>
      {result?.error && (
          <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{result?.error}</AlertDescription>
      </Alert>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCreateGroup)}>
          <div className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => 
                <div className="grid w-full gap-1.5">
                  <FormItem>
                    <FormLabel>
                      <Label htmlFor="title" className="text-primary">
                        Group Title&nbsp;
                        <span className="text-red-500">*</span>
                        </Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                      id="title"
                      className="col-span-3"
                      placeholder="Type your group title here."
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
              }/>
            
            <FormField 
              control={form.control}
              name="description"
              render={({ field }) => 
                <div className="grid w-full gap-1.5">
                  <FormItem>
                    <FormLabel className="text-primary">
                      <Label htmlFor="description">Description</Label>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                      id="description"
                      className="col-span-3"
                      placeholder="Type your description here."
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
              }/>
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading && (
                <Icons.spinner className=" mr-2 h-4 w-4 animate-spin" />
            )}
            Create
          </Button>
        </form>
      </Form>  
    </>
  )
}

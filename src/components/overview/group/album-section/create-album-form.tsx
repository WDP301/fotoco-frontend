import { useLanguage } from "@/components/provider/language-provider";
import { createAlbum } from "@/lib/action";
import { getCreateAlbumSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { Icons } from '@/components/icons/icons';
import { Textarea } from "@/components/ui/textarea"

export default function CreateAlbumForm({
    groupId,
    setOpen 
}: {
    groupId: string,
    setOpen: (open: boolean) => void 
}) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { dict } = useLanguage();


    const form = useForm<z.infer<ReturnType<typeof getCreateAlbumSchema>>>({
        resolver: zodResolver(getCreateAlbumSchema(dict.lang)),
        defaultValues: {
          title: "",
          description: "",
        }
      })

    const handleCreateAlbum = async (values: z.infer<ReturnType<typeof getCreateAlbumSchema>>) => {
        setIsLoading(true);
        const result = await createAlbum(groupId, values);
        if (!result?.isSuccess) {
            toast.error(dict.createAlbum.message.error)
        }else{
          toast.success(dict.createAlbum.message.success);
          setOpen(false);
          router.refresh();
        }
        setIsLoading(false);
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleCreateAlbum)}>
                <div className="grid gap-4 py-4">
                    <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => 
                        <div className="grid w-full gap-1.5">
                        <FormItem>
                            <FormLabel>
                            <Label htmlFor="title" className="text-primary">
                                {dict.createAlbum.title}&nbsp;
                                <span className="text-red-500">*</span>
                                </Label>
                            </FormLabel>
                            <FormControl>
                            <Input
                            id="title"
                            className="col-span-3"
                            placeholder={dict.createAlbum.titlePlaceholder}
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
                            <Label htmlFor="description">{dict.createAlbum.description}</Label>
                            </FormLabel>
                            <FormControl>
                            <Textarea
                            id="description"
                            className="col-span-3"
                            placeholder={dict.createAlbum.descriptionPlaceholder}
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
                    }/>
                </div>
                <Button type="submit" disabled={isLoading} className="w-full mt-4">
                    {isLoading && (
                        <Icons.spinner className=" mr-2 h-4 w-4 animate-spin" />
                    )}
                    {dict.createAlbum.button}
                </Button>
                </form>
            </Form> 
        </>
    )
}
'use client';
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/provider/language-provider"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { convertTimeToSecond } from "@/lib/utils"
import { shareAlbum } from "@/lib/action";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy } from "lucide-react";
import { useState } from "react";
import { siteConfig } from '@/config/site';
import { toast } from "sonner";

export function ShareAlbumForm({albumId}: {albumId: string}) {
    
    const { dict } = useLanguage();
    const [loading, setLoading] = useState(false);
    const [shareLink, setShareLink] = useState<string | null>(null);
    const [copyButtonTooltipText, setCopyButtonTooltipText] = useState(dict.shareAlbumDialog.shareAlbumForm.copy);
    const [showTooltip, setShowTooltip] = useState(false);

    const form = useForm({
        defaultValues: {
            timeValue: 1,
            timeUnit: "days",
        },
    });

    const handleCreateShareAlbumLink = async (data: { timeValue: number; timeUnit: string }) => {
        setLoading(true);
        const timeInSeconds = convertTimeToSecond(data.timeValue, data.timeUnit);
        const response = await shareAlbum(albumId, timeInSeconds);
        setLoading(false);
        if (response.isSuccess) {
            setShareLink(`${siteConfig.url}/shared/album/${response.data.shareAlbumToken}`);
        }else {
          toast.error(dict.shareAlbumDialog.shareAlbumForm.error)
        }
    };

    const handleCopy = () => {
        if (shareLink) {
            navigator.clipboard.writeText(shareLink).then(() => {
                setCopyButtonTooltipText(dict.shareAlbumDialog.shareAlbumForm.copied);
                setShowTooltip(true);
                setTimeout(() => {
                    setCopyButtonTooltipText(dict.shareAlbumDialog.shareAlbumForm.copy);
                    setShowTooltip(false);
                }, 2000);
            });
        }
    };

    return (
        <>
            {shareLink ? (
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input
                            id="link"
                            value={shareLink}
                            readOnly
                        />
                    </div>
                    <div className="relative">
                        <Button 
                            type="button" 
                            size="sm" 
                            className="px-3" 
                            onClick={handleCopy}
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                        >
                            <span className="sr-only">{copyButtonTooltipText}</span>
                            <Copy className="h-4 w-4" />
                        </Button>
                        {showTooltip && (
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded bg-gray-700 text-white text-sm whitespace-nowrap">
                                {copyButtonTooltipText}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleCreateShareAlbumLink)} className="w-2/3 space-y-4">
                        <div className="flex items-center space-x-2">
                            <FormLabel className="whitespace-nowrap">
                                {dict.shareAlbumDialog.shareAlbumForm.label}
                            </FormLabel>
                            <FormField
                                control={form.control}
                                name="timeValue"
                                rules={{ 
                                    required: { value: true, message: dict.shareAlbumDialog.shareAlbumForm.rules.required },
                                    min: { value: 1, message: dict.shareAlbumDialog.shareAlbumForm.rules.min },
                                    max: { value: 100, message: dict.shareAlbumDialog.shareAlbumForm.rules.max },
                                }}
                                render={({ field }) => (
                                    <FormItem className="flex items-center space-x-2">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                className="w-16"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="timeUnit"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue="days"
                                            >
                                                <SelectTrigger className="w-30">
                                                    <SelectValue placeholder="Select unit" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="days">{dict.shareAlbumDialog.shareAlbumForm.choices.days}</SelectItem>
                                                    <SelectItem value="weeks">{dict.shareAlbumDialog.shareAlbumForm.choices.weeks}</SelectItem>
                                                    <SelectItem value="months">{dict.shareAlbumDialog.shareAlbumForm.choices.months}</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {form.formState.errors.timeValue && (
                            <div className="text-red-500 text-sm">
                                {form.formState.errors.timeValue.message}
                            </div>
                        )}

                        <Button type="submit" disabled={loading}>
                            {loading ? dict.shareAlbumDialog.shareAlbumForm.loading : dict.shareAlbumDialog.shareAlbumForm.button}
                        </Button>
                    </form>
                </Form>
            )}
        </>
    );
}

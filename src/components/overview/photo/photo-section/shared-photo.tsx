'use client';
import { getSharedPhoto } from "@/lib/data";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn, fetchPhotoSize, getDateFormatted } from '@/lib/utils';
import { Icons } from "@/components/icons/icons";
import { siteConfig } from "@/config/site";
import { CalendarDays, Copy, Expand, Info, ImageIcon} from "lucide-react";
import { useLanguage } from "@/components/provider/language-provider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { SharedPhoto } from "@/lib/define";
import AvatarPicture from "@/components/shared/avatar-picture";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";


export default function SharedPhoto({ photo }: { photo: SharedPhoto }) {
    const { dict } = useLanguage();
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const [copyButtonTooltipText, setCopyButtonTooltipText] = useState(dict.sharePhotoDialog.sharePhotoForm.copy);
    const [showTooltip, setShowTooltip] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 1000, height: 1000 });

    useEffect(() => {
        fetchPhotoSize(photo?.photo.url).then((setDimensions));
    }, [photo?.photo.url]);

    const handleCopyLink = () => {
        const shareLink = window.location.href;
        navigator.clipboard.writeText(shareLink).then(() => {
            setCopyButtonTooltipText(dict.sharePhotoDialog.sharePhotoForm.copied);
            setShowTooltip(true);
        });
        setTimeout(() => {
            setCopyButtonTooltipText(dict.sharePhotoDialog.sharePhotoForm.copy);
            setShowTooltip(false);
        }, 2000);
    };

    const handleFullscreen = () => {
        if (imageContainerRef.current) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                imageContainerRef.current.requestFullscreen();
            }
        }
    };

    return (
        <>
            <div className="relative flex items-center justify-center bg-black w-full h-screen">
                
                <div ref={imageContainerRef} className="inline-block items-center justify-center overflow-hidden">
                    <div
                        className={cn(
                            dimensions.width > dimensions.height ? 'md:w-full' : 'md:h-[100vh]',
                            'flex justify-center shadow-none'
                        )}
                    >
                        <Image
                            src= {photo?.photo?.url || '/background/default-vertical.jpg'}
                            width={dimensions.width}
                            height={dimensions.height}
                            alt= {photo?.photo?.title || 'Photo'}
                            className="max-h-screen max-w-full object-contain"
                        />
                    </div>
                </div>

                {/* Button List */}
                <div className="absolute top-0 right-5 m-4 flex items-center space-x-2 text-white">
                    <Popover>
                        <PopoverTrigger>
                            <div className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition">
                                <Info className="h-6 w-6" />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className="flex items-center space-x-2">
                                <h4>Details</h4>
                                <Info className="h-5 w-5" />
                            </div>
                            <Separator className="my-3" />
                                <div className="flex items-center space-x-4">
                                    <ImageIcon className="h-5 w-5" />
                                    <div className="line-clamp-1 text-md">{photo?.photo.title}</div>
                                </div>
                            <Separator className="my-3" />
                            <div className="flex items-start gap-4">
                                <AvatarPicture src={photo?.photo.owner.img || ''} />
                                <div className="grid gap-1">
                                    <div className="line-clamp-1 text-muted-foreground text-xs">Owner</div>
                                    <div className="font-semibold text-sm">{photo?.photo.owner.fullName}</div>
                                </div>
                            </div>
                            <Separator className="my-3" />
                            <div className="flex items-start gap-4">
                                <AvatarPicture src={photo?.shareUser.img || ''} />
                                <div className="grid gap-1">
                                    <div className="line-clamp-1 text-muted-foreground text-xs">Shared by</div>
                                    <div className="font-semibold text-sm">{photo?.shareUser.fullName}</div>
                                </div>
                            </div>
                            <Separator className="my-3" />
                            <div className="-mx-2 flex items-start space-x-4 rounded-md p-2">
                                <CalendarDays className="mt-px h-5 w-5" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">Expired Time</p>
                                    <p className="text-sm text-muted-foreground">
                                        {photo?.expiredTime && getDateFormatted(photo.expiredTime, dict.lang)}
                                    </p>
                                </div>
                            </div>
                            <Separator className="my-3" />
                            <Link href="/">
                                <div className="flex items-center justify-center space-x-1 text-primary">
                                    <Icons.cloud className="h-6 w-6" />
                                    <span className="font-bold">{siteConfig.name}</span>
                                </div>
                            </Link>
                        </PopoverContent>
                    </Popover>
                    <div className="relative">
                        <button 
                            onClick={handleCopyLink} 
                            className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition"
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                        >
                            <Copy className="h-6 w-6" />
                        </button>
                        {showTooltip && (
                            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded bg-gray-700 text-white text-sm whitespace-nowrap">
                                {copyButtonTooltipText}
                            </div>
                        )}
                    </div>
                    <button onClick={handleFullscreen} className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition">
                        <Expand className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </>
    );
}

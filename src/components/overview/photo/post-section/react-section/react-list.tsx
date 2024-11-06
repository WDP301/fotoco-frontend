import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import { formatNumber, getDateFormatted } from "@/lib/utils"
import AvatarPicture from "@/components/shared/avatar-picture"
import { getReactListByPhotoId } from "@/lib/data"
import { useState } from "react"
import { React } from "@/lib/define"
import { useLanguage } from "@/components/provider/language-provider"
import { ScrollArea } from "@/components/ui/scroll-area"
import SpinLoading from "@/components/shared/spin-loading"

export default function ReactList({
    photoId,
    reactsCount,
}: {
    photoId: string
    reactsCount: number,
}) {

    const {dict} = useLanguage();
    const [reacts, setReacts] = useState<React[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDialogOpenChange = (open: boolean) => {
        setIsDialogOpen(open);
        if (open) {
            loadReacts();
        }
    };

    const loadReacts = async () => {
        setLoading(true);
        const reacts = await getReactListByPhotoId(photoId);
        setReacts(reacts);
        setLoading(false);
    };

    return (
        <Dialog onOpenChange={handleDialogOpenChange}>
            <DialogTrigger>
                <div className="font-semibold hover:text-primary transition-colors duration-200">{formatNumber(reactsCount)}</div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>{dict.reactList.title}</DialogTitle>
                <DialogDescription>{dict.reactList.description}</DialogDescription>
                </DialogHeader>
                {loading ? (
                    <div className="flex justify-center my-4">
                        <SpinLoading />
                    </div>
                ): (
                    <>
                        {reacts && reacts.length === 0 ? (
                            <div className="text-center text-muted-foreground">{dict.reactList.noReaction}</div>
                        ) : (
                            <ScrollArea className="max-h-64">
                                {reacts.map((react) => (
                                    <div key={react._id} className="flex items-center mb-4">
                                        <AvatarPicture src={react.userInfo.img || ""} />
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none">{react.userInfo.fullName}</p>
                                            <p className="text-sm text-muted-foreground">{react.userInfo.email}</p>
                                        </div>
                                        <div className="ml-auto text-sm text-muted-foreground">
                                            {react.createdAt ? getDateFormatted(react.createdAt, dict.lang) : ""}
                                        </div>
                                    </div>
                                ))}
                            </ScrollArea>
                        )}
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}
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
import { useCallback, useEffect, useState } from "react"
import { React } from "@/lib/define"
import { useLanguage } from "@/components/provider/language-provider"
import { on } from "events"
import { ScrollArea } from "@/components/ui/scroll-area"
import { get } from "http"

export default function ReactList({
    photoId,
    reactsCount,
    onReactUpdate
}: {
    photoId: string
    reactsCount: number,
    onReactUpdate: () => void
}) {

    const {dict} = useLanguage();
    const [reacts, setReacts] = useState<React[]>([]);
    // const [lastReactLoadId, setLastReactLoadId] = useState<string>("");

    useEffect(() => {
        const getReacts = async () => {
            const reacts = await getReactListByPhotoId(photoId);
            setReacts(reacts);
            onReactUpdate();
        }
        getReacts();
    }, [photoId, onReactUpdate]);
    

    return (
        <>
        <Dialog>
            <DialogTrigger>
                <div className="font-semibold hover:text-primary transition-colors duration-200">{formatNumber(reactsCount)}</div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>React List</DialogTitle>
                <DialogDescription>A list of users who have interacted with this photo through reactions.</DialogDescription>
                </DialogHeader>
                {reacts &&reacts.length === 0 ? (
                    <div className="text-center text-muted-foreground">No reacts yet</div>
                ): (
                    <ScrollArea className="max-h-64">
                            {reacts.map((react) => (
                                <div key={react._id} className="flex items-center mb-4">
                                <AvatarPicture src={react.userInfo.img || ""} />
                                <div className="ml-4 space-y-1">
                                  <p className="text-sm font-medium leading-none">{react.userInfo.fullName}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {react.userInfo.email}
                                  </p>
                                </div>
                                <div className=" ml-auto text-sm text-muted-foreground">
                                    {react.createdAt ? getDateFormatted(react.createdAt, dict.lang) : ""}
                                </div>
                              </div>
                            ))}
                    </ScrollArea>   
                )}
            </DialogContent>
        </Dialog>
        </>
    )
}
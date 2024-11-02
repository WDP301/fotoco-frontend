import AvatarPicture from "@/components/shared/avatar-picture";
import { BasicTooltip } from "@/components/shared/basic-tooltip";

export default function SharedAlbumHeader() {
    return (
        <div className="space-y-1">
            <p>Album</p>
            <div className="flex items-center space-x-5">
                <h1>Album Name</h1>
            </div>
            <div className="flex items-start space-x-2">
                <p className="text-muted-foreground">Shared by</p>
                <div className="font-semibold">Name</div> 
            </div>
        </div>
    )
}
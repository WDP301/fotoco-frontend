import { SharedAlbum } from "@/lib/define";
import { getDictionary } from "@/lib/dictionaries";

export default async function SharedAlbumHeader({sharedAlbum}: {sharedAlbum: SharedAlbum}) {
    
    const dict = await getDictionary();
    return (
        <div className="space-y-1">
            <p>Album</p>
            <div className="flex items-center space-x-5">
                <h1>{sharedAlbum.album.title}</h1>
            </div>
            <div className="flex items-start space-x-2">
                <p className="text-muted-foreground">{dict.sharedAlbum.sharedBy}</p>
                <div className="font-semibold">{sharedAlbum.shareUser.fullName}</div> 
            </div>
        </div>
    )
}
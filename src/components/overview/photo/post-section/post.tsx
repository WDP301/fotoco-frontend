import {
  Ellipsis,
  Flag,
} from "lucide-react"

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

import { Badge } from "@/components/ui/badge"
import SharePhotoDialog from "./share-photo-section/share-photo-dialog"
import ReactSection from "./react-section/react-section"
import { PhotoResponse } from "@/lib/define"
import AvatarPicture from "@/components/shared/avatar-picture"
import { getDateFormatted } from "@/lib/utils"
import { useLanguage } from "@/components/provider/language-provider"


interface Post{
    id: number;
    userId: number;
    body: string;
}
export default function Post({
  onCommentIconClick, photo
} : {
  onCommentIconClick: () => void, photo: PhotoResponse
}) {

  const { dict } = useLanguage();

    return (
        <>
          <div className="flex items-start">
            <div className="flex items-start gap-4">
              <AvatarPicture src={photo?.photo.owner.img || ""} />
              <div className="grid gap-1">
                <div className="font-semibold">{photo?.photo.owner.fullName}</div>
                <div className="line-clamp-1 text-xs">{getDateFormatted(photo?.photo.createdAt, dict.lang)}</div>
              </div>
            </div>
            <div className="ml-auto text-xs text-muted-foreground">
              <Button variant="ghost" size="icon" className="hover:bg-muted">
                  <DropdownMenu>
                      <DropdownMenuTrigger asChild>   
                          <Ellipsis className="h-4 w-4"/>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                          <DropdownMenuGroup>
                              <DropdownMenuItem>
                                  Report
                                  <DropdownMenuShortcut>
                                      <Flag className="ml-2 h-4 w-4" />
                                  </DropdownMenuShortcut>
                              </DropdownMenuItem>
                          </DropdownMenuGroup>
                      </DropdownMenuContent>
                  </DropdownMenu>
              </Button>
            </div>
          </div>
          {photo?.photo.title && (
            <div className="whitespace-pre-wrap text-sm mt-3">
                {photo?.photo.title}
            </div>
          )}
          {photo?.photo.tags && (
            <div className="flex flex-wrap gap-1 mt-3">
              {photo?.photo.tags.map((tag) => (
                <Badge key={tag} className="text-xs">{tag}</Badge>
              ))}
            </div>
          )}
          <div className="flex flex-col justify-between py-3 w-1/2">
            <div className="flex items-center w-full">
                <ReactSection 
                  photo={photo}
                  isLiked={photo?.isReacted}
                  onCommentIconClick={onCommentIconClick}
                />
                <div className="mr-4">
                    <SharePhotoDialog />
                </div>
            </div>
          </div>
        </>
    )
}
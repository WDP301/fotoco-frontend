import { Ellipsis, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { Badge } from '@/components/ui/badge';
import ReactSection from './react-section/react-section';
import { PhotoResponse } from '@/lib/define';
import AvatarPicture from '@/components/shared/avatar-picture';
import { getDateFormatted, getFormatDistanceToNow } from '@/lib/utils';
import { useLanguage } from '@/components/provider/language-provider';
import { EditPhotoDialog } from './edit-photo/edit-photo-dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/components/provider/auth-provider';
import { DeletePhotoDialog } from './edit-photo/delete-photo-dialog';
import SharePhotoDialog from './share-photo-section/share-photo-dialog';

interface Post {
  id: number;
  userId: number;
  body: string;
}
export default function Post({
  onCommentIconClick,
  photo,
}: {
  onCommentIconClick: () => void;
  photo: PhotoResponse;
}) {
  const { dict } = useLanguage();
  const { user } = useAuth();

  return (
    <>
      <div className="flex items-start">
        <div className="flex items-start gap-4">
          <AvatarPicture src={photo?.photo.owner.img || ''} />
          <div className="grid gap-1">
            <div className="font-semibold">{photo?.photo.owner.fullName}</div>
            <div
              className="line-clamp-1 text-xs"
              title={getDateFormatted(photo?.photo.createdAt, dict.lang)}
            >
              {getFormatDistanceToNow(photo?.photo.createdAt, dict.lang)}
            </div>
          </div>
        </div>
        <div className="ml-auto text-xs text-muted-foreground">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-muted">
                <Ellipsis className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-52 m-0 p-1">
              <div className="grid ">
                <div className="grid grid-cols-1 ">
                  {user?._id === photo?.photo.owner._id && (
                    <>
                      <EditPhotoDialog photo={photo.photo} />
                      <Separator className="my-1" />
                      <DeletePhotoDialog photo={photo.photo} />
                    </>
                  )}

                  {user?._id !== photo?.photo.owner._id && (
                    <>
                      <Separator className="my-1" />
                      <div className=" w-full flex justify-between relative select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer hover:bg-accent hover:text-accent-foreground">
                        <div>Report</div>
                        <Flag className="w-5 h-5" />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
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
            <Badge key={tag} className="text-xs">
              {tag}
            </Badge>
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
            <SharePhotoDialog photoId={photo?.photo._id} />
          </div>
        </div>
      </div>
    </>
  );
}

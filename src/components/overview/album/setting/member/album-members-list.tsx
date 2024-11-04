import AvatarPicture from '@/components/shared/avatar-picture';
import ListPagination from '@/components/shared/list-pagination';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { getAlbumMembers, getUser } from '@/lib/data';
import { SearchAlbumMembersParams } from '@/lib/define';
import { getDictionary } from '@/lib/dictionaries';
import { Ellipsis, SquareUserRound } from 'lucide-react';
import { KickAlbumMemberDialog } from './kick-album-member-dialog';
import { Separator } from '@/components/ui/separator';

export default async function AlbumMembersList({
  albumId,
  searchParams,
}: {
  albumId: string;
  searchParams: SearchAlbumMembersParams;
}) {
  const dict = await getDictionary();
  const { users, pageMeta } = await getAlbumMembers(albumId, searchParams);
  const me = await getUser();

  return (
    <div>
      {users.map((user, index) => (
        <div key={index} className="mb-2">
          <div className="flex gap-2">
            <AvatarPicture src={user.img} />
            <div className="flex flex-col justify-around">
              <p className="leading-none">
                {user.fullName} (
                {(user.role === 'owner' && dict.role.album.owner) ||
                  (user.role === 'contributor' &&
                    dict.role.album.contributor) ||
                  (user.role === 'member' && dict.role.album.member)}
                )
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                @{user.username}
              </p>
            </div>
            {/* non justify center for below */}
            <div className="ml-auto ">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="hidden">
                    <Ellipsis className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-32 m-0 px-1 py-1">
                  <div className="grid ">
                    <div className="grid grid-cols-1 ">
                      <div className=" w-full flex justify-between relative select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer hover:bg-accent hover:text-accent-foreground">
                        <div>{dict.button.profile}</div>
                        <SquareUserRound className="w-4 h-4" />
                      </div>
                      {user._id !== me?._id && user.role !== 'owner' && (
                        <KickAlbumMemberDialog
                          albumId={albumId}
                          userId={user._id}
                        />
                      )}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <Separator className="my-4" />
        </div>
      ))}
      <div className="my-3">
        <ListPagination meta={pageMeta} bookmark="album-member" />
      </div>
    </div>
  );
}

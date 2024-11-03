import { getDictionary } from '@/lib/dictionaries';
import { InviteMember } from './invite-member';
import { getAlbumSetting } from '@/lib/data';

export default async function InviteSection({ albumId }: { albumId: string }) {
  const dict = await getDictionary();
  const albumSetting = await getAlbumSetting(albumId);

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 mb-2">
        <h3>{dict.album.setting.member.invite.title}</h3>
      </div>
      {albumSetting.setting.role === 'OWNER' ||
      albumSetting.setting.allow_invite ? (
        <div className="flex justify-center items-center gap-5">
          <InviteMember albumId={albumId} />
        </div>
      ) : (
        <div className="mt-5">
          <p>{dict.album.setting.member.invite.disabled}</p>
        </div>
      )}
    </div>
  );
}

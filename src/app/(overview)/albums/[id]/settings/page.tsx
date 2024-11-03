import AlbumSettingForm from '@/components/overview/album/setting/general/album-setting-form';
import OutAlbumDialog from '@/components/overview/album/setting/general/out-album-dialog';
import { Separator } from '@/components/ui/separator';
import { getAlbumInfo, getAlbumSetting, getUser } from '@/lib/data';
import { getDictionary } from '@/lib/dictionaries';

export default async function SettingsLayout({
  params,
}: {
  params: { id: string };
}) {
  const album = await getAlbumInfo(params.id);
  const me = await getUser();
  const dict = await getDictionary();

  if (!album) {
    return (
      <div className="flex justify-center items-center h-96">
        {dict.albumNotFound.title}
      </div>
    );
  }

  const albumSetting = await getAlbumSetting(params.id);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-primary">
          {dict.album.setting.general.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {dict.album.setting.general.description}
        </p>
      </div>
      <Separator />
      <AlbumSettingForm
        albumSetting={albumSetting}
        album={album}
        albumId={params.id}
      />
      <Separator />
      <OutAlbumDialog albumId={params.id} userId={me._id} />
    </div>
  );
}

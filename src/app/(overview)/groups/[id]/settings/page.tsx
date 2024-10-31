import GroupSettingForm from '@/components/overview/group/setting/general/group-setting-form';
import OutGroupDialog from '@/components/overview/group/setting/general/out-group-dialog';
import { Separator } from '@/components/ui/separator';
import { getGroupInfo, getGroupSetting, getUser } from '@/lib/data';
import { getDictionary } from '@/lib/dictionaries';

export default async function SettingsGroupPage({
  params,
}: {
  params: { id: string };
}) {
  const group = await getGroupInfo(params.id);
  const me = await getUser();
  const dict = await getDictionary();

  if (!group || !me) {
    return (
      <div className="flex justify-center items-center h-96">
        {dict.groupNotFound.title}
      </div>
    );
  }

  const groupSetting = await getGroupSetting(params.id);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-primary">
          {dict.group.setting.general.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {dict.group.setting.general.description}
        </p>
      </div>
      <Separator />
      <GroupSettingForm
        groupSetting={groupSetting}
        group={group}
        groupId={params.id}
      />
      <Separator />
      <OutGroupDialog groupId={params.id} userId={me._id} />
    </div>
  );
}

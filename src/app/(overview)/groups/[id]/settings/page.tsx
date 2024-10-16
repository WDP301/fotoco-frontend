import { Separator } from '@/components/ui/separator';
import { getGroupInfo } from '@/lib/data';
import { getDictionary } from '@/lib/dictionaries';

export default async function SettingsGroupPage({
  params,
}: {
  params: { id: string };
}) {
  const group = await getGroupInfo(params.id);
  const dict = await getDictionary();
  if (!group) {
    return (
      <div className="flex justify-center items-center h-96">
        {dict.groupNotFound.title}
      </div>
    );
  }
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
      {/* <ProfileForm user={user} /> */}
    </div>
  );
}

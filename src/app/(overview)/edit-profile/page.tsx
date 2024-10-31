import { ProfileForm } from '@/components/overview/edit-profile/profile/profile-form';
import { Separator } from '@/components/ui/separator';
import { getUser } from '@/lib/data';
import { getDictionary } from '@/lib/dictionaries';

export default async function SettingsProfilePage() {
  const user = await getUser();
  const dict = await getDictionary();
  if (!user) {
    return (
      <div className="flex justify-center items-center h-96">No user found</div>
    );
  }
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-primary">
          {dict.editProfile.profile.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {dict.editProfile.profile.description}
        </p>
      </div>
      <Separator />
      <ProfileForm user={user} />
    </div>
  );
}

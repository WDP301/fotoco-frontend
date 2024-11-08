import LogoutAllDialog from '@/components/overview/edit-profile/security/logout-all/logout-all-dialog';
import { Separator } from '@/components/ui/separator';
import { siteConfig } from '@/config/site';
import { getDictionary } from '@/lib/dictionaries';
import { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
  const dict = await getDictionary();

  return {
    title: `${dict.editProfile.security.title} | ${siteConfig.name}`,
    description: dict.editProfile.security.description,
  };
};

export default async function SettingsAppearancePage() {
  const dict = await getDictionary();
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-primary">
          {dict.editProfile.security.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {dict.editProfile.security.description}
        </p>
      </div>
      <Separator />
      <div className="space-y-6 mt-10">
        <div>
          <h3 className="text-lg font-medium text-primary">
            {dict.editProfile.security.logOutAll.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {dict.editProfile.security.logOutAll.description}
          </p>
        </div>
        <LogoutAllDialog />
        <Separator />
      </div>
    </div>
  );
}

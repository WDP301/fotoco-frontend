import { AppearanceForm } from '@/components/overview/edit-profile/appearance/appearance-form';
import { LanguageForm } from '@/components/overview/edit-profile/appearance/language-form';
import { Separator } from '@/components/ui/separator';
import { siteConfig } from '@/config/site';
import { getDictionary } from '@/lib/dictionaries';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

export const generateMetadata = async (): Promise<Metadata> => {
  const dict = await getDictionary();

  return {
    title: `${dict.editProfile.appearance.title} | ${siteConfig.name}`,
    description: dict.editProfile.appearance.description,
  };
};

export default async function SettingsAppearancePage() {
  const language = cookies().get('lang')?.value || 'en';
  const dict = await getDictionary();
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">
          {dict.editProfile.appearance.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {dict.editProfile.appearance.description}
        </p>
      </div>
      <Separator />
      <LanguageForm lang={language} />
      <Separator />
      <AppearanceForm />
    </div>
  );
}

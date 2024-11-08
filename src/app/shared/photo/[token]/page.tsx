import PhotoNotFound from "@/components/overview/photo/photo-not-found";
import SharedPhoto from "@/components/overview/photo/photo-section/shared-photo";
import { siteConfig } from "@/config/site";
import { getSharedPhoto } from "@/lib/data";
import { Metadata } from "next";

export async function generateMetadata({ params }: {params: {token: string}}): Promise<Metadata> {
    const photo = await getSharedPhoto(params.token);
    if (!photo) {
        return {
            title: 'Photo Not Found',
            description: 'Photo Not Found',
        };
    }
    return {
        title: {
            default: `Share photo - ${photo.shareUser.fullName} - ${siteConfig.name}`,
            template: `%s | ${siteConfig.name}`,
        },
        description: `Share photo - ${photo.shareUser.fullName} - ${siteConfig.name}`,
    };
}

export default async function SharePhotoPage({params}: {params: {token: string}}) {
    const photo = await getSharedPhoto(params.token);
    if (!photo) {
        return <PhotoNotFound />;
      }
    return (
        <SharedPhoto photo={photo}/>
    );
}
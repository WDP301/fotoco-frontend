import SharedAlbumHeader from "@/components/overview/album/shared-album/album-header";
import SharedGalleryView from "@/components/overview/album/shared-album/gallery-view";
import { siteConfig } from "@/config/site";

export async function generateMetadata({ params }: {params: {token: string}}) {
    return {
        title: {
            default: `Share Album - ${params.token} - ${siteConfig.name}`,
            template: `%s | ${siteConfig.name}`,
        },
        description: `Share Album - ${params.token} - ${siteConfig.name}`,
    };
}
export default function ShareAlbumPage({params}: {params : {token: string}}) {
    return (
        <div className="p-24">
            <div className="space-y-8">
                <SharedAlbumHeader />
                <SharedGalleryView />
            </div>
        </div>
    )
}
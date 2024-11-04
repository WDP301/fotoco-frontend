
import AlbumNotFound from "@/components/overview/album/album-not-found";
import SharedAlbumHeader from "@/components/overview/album/shared-album/album-header";
import SharedGalleryView from "@/components/overview/album/shared-album/gallery-view";
import { siteConfig } from "@/config/site";
import { getSharedAlbum } from "@/lib/data";

export async function generateMetadata({ params }: {params: {token: string}}) {
    const sharedAlbum = await getSharedAlbum(params.token);
    if (!sharedAlbum) {
        return {
            title: 'Album Not Found',
            description: 'Album Not Found',
        };
    }
    return {
        title: {
            default: `Share Album - ${sharedAlbum.album.title} - ${siteConfig.name}`,
            template: `%s | ${siteConfig.name}`,
        },
        description: `Share Album - ${sharedAlbum.album.title} - ${siteConfig.name}`,
    };
}
export default async function ShareAlbumPage({params}: {params : {token: string}}) {
    const sharedAlbum = await getSharedAlbum(params.token);
    if (!sharedAlbum) {
        return <AlbumNotFound />;
    }
    return (
        <div className="px-24 py-16">
            <div className="space-y-8">
                <SharedAlbumHeader sharedAlbum={sharedAlbum}/>
                <SharedGalleryView sharedAlbum={sharedAlbum} />
            </div>
        </div>
    )
}
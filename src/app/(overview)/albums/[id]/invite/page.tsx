import AlbumNotFound from '@/components/overview/album/album-not-found';
import AcceptInviteToAlbum from '@/components/overview/album/invite/accept-invite';
import { Card } from '@/components/ui/card';
import { getPublicAlbumInfo } from '@/lib/data';
import { getDictionary } from '@/lib/dictionaries';
import { interpolateString } from '@/lib/utils';
import Image from 'next/image';

export default async function AcceptInviteToAlbumPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { inviteToken: string };
}) {
  const album = await getPublicAlbumInfo(params.id);

  if (!album) {
    return <AlbumNotFound />;
  }
  const dict = await getDictionary();

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="shadow-lg overflow-hidden max-w-4xl w-full">
        <div className="flex flex-col sm:flex-row items-center sm:items-start">
          <div className="sm:w-1/3">
            <div className="relative group">
              {/* Conditional rendering based on the number of images */}
              <div className="grid overflow-hidden rounded-lg aspect-square">
                {album.lastPhotos.length === 1 ||
                album.lastPhotos.length === 0 ? (
                  // Single image full width
                  <Image
                    src={
                      album.lastPhotos[0] || '/background/default-vertical.jpg'
                    } // Assuming images is an array of image URLs
                    alt={album.title}
                    width={300}
                    height={300}
                    className="object-cover w-full h-full overflow-hidden"
                  />
                ) : album.lastPhotos.length === 2 ? (
                  // Two images: one larger, one smaller
                  <div className="grid grid-cols-3 gap-1">
                    <div className="col-span-2 h-full">
                      <Image
                        src={
                          album.lastPhotos[0] ||
                          '/background/default-vertical.jpg'
                        }
                        alt={album.title}
                        width={300 * 0.66}
                        height={300}
                        className="object-cover w-full h-full overflow-hidden"
                      />
                    </div>
                    <div className="h-full">
                      <Image
                        src={album.lastPhotos[1]}
                        alt={album.title}
                        width={300 * 0.33}
                        height={300}
                        className="object-cover w-full h-full overflow-hidden"
                      />
                    </div>
                  </div>
                ) : (
                  // Three images: one large, two smaller
                  <div className="grid grid-cols-3 gap-1">
                    <div className="col-span-2 h-full">
                      <Image
                        src={
                          album.lastPhotos[0] ||
                          '/background/default-vertical.jpg'
                        }
                        alt={album.title}
                        width={300 * 0.66}
                        height={300}
                        className="object-cover w-full h-full overflow-hidden"
                      />
                    </div>
                    <div className="grid grid-rows-2 gap-1 h-full">
                      <Image
                        src={album.lastPhotos[1]}
                        alt={album.title}
                        width={300 * 0.33}
                        height={300 * 0.5}
                        className="object-cover w-full h-full overflow-hidden"
                      />
                      <Image
                        src={album.lastPhotos[2]}
                        alt={album.title}
                        width={300 * 0.33}
                        height={300 * 0.5}
                        className="object-cover w-full h-full overflow-hidden"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="sm:w-2/3 sm:pl-8 mt-4 sm:mt-0 p-4">
            <h2 className="text-2xl font-bold max-sm:text-center">
              {dict.album.invite.title}: {album?.title}
            </h2>
            <h3 className="text-xl text-gray-600 max-sm:text-center mt-2">
              {interpolateString(dict.album.invite.fromGroup, {
                groupName: album.group.title,
              })}
            </h3>
            <p className="text-gray-700 mt-4 line-clamp-2">
              {album?.description}
            </p>
            <div className="mt-6">
              <AcceptInviteToAlbum
                album={album}
                inviteToken={searchParams.inviteToken}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

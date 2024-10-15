import Image from 'next/image';
import { cn, formatNumber } from '@/lib/utils';
import { Album } from '@/lib/define';
import Link from 'next/link';

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  album: Album;
  width?: number;
  height?: number;
}

export function AlbumCard({
  album,
  width = 300, // Set default width
  height = 300, // Set default height
  className,
  ...props
}: AlbumArtworkProps) {
  return (
    <Link href={`/albums/${album._id}`}>
      <div className={cn('relative group', className)} {...props}>
        {/* Conditional rendering based on the number of images */}
        <div className="grid overflow-hidden rounded-lg aspect-square">
          {album.lastPhotos.length === 1 || album.lastPhotos.length === 0 ? (
            // Single image full width
            <Image
              src={album.lastPhotos[0] || '/background/default-vertical.jpg'} // Assuming images is an array of image URLs
              alt={album.title}
              width={width}
              height={height}
              className="object-cover w-full h-full overflow-hidden"
            />
          ) : album.lastPhotos.length === 2 ? (
            // Two images: one larger, one smaller
            <div className="grid grid-cols-3 gap-1">
              <div className="col-span-2 h-full">
                <Image
                  src={
                    album.lastPhotos[0] || '/background/default-vertical.jpg'
                  }
                  alt={album.title}
                  width={width * 0.66}
                  height={height}
                  className="object-cover w-full h-full overflow-hidden"
                />
              </div>
              <div className="h-full">
                <Image
                  src={album.lastPhotos[1]}
                  alt={album.title}
                  width={width * 0.33}
                  height={height}
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
                    album.lastPhotos[0] || '/background/default-vertical.jpg'
                  }
                  alt={album.title}
                  width={width * 0.66}
                  height={height}
                  className="object-cover w-full h-full overflow-hidden"
                />
              </div>
              <div className="grid grid-rows-2 gap-1 h-full">
                <Image
                  src={album.lastPhotos[1]}
                  alt={album.title}
                  width={width * 0.33}
                  height={height * 0.5}
                  className="object-cover w-full h-full overflow-hidden"
                />
                <Image
                  src={album.lastPhotos[2]}
                  alt={album.title}
                  width={width * 0.33}
                  height={height * 0.5}
                  className="object-cover w-full h-full overflow-hidden"
                />
              </div>
            </div>
          )}
        </div>

        {/* Album details (with hover animation) */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 text-white opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:bg-black group-hover:bg-opacity-50 md:opacity-100 md:group-hover:opacity-100 rounded-lg">
          <h4 className="font-bold text-lg transform transition-transform duration-500 ease-in-out group-hover:translate-y-0 translate-y-4">
            {album.title}
          </h4>
          <p className="text-sm text-gray-300 transform transition-transform duration-500 ease-in-out group-hover:translate-y-0 translate-y-4">
            {formatNumber(album.photosCount || 0)} items
          </p>
        </div>
      </div>
    </Link>
  );
}

'use client';
import { useLanguage } from '@/components/provider/language-provider';
import AvatarPicture from '@/components/shared/avatar-picture';
import { RecentPhoto } from '@/lib/define';
import { cn, getDateFormatted } from '@/lib/utils';
import Link from 'next/link';

export function RecentViewCard({ photo }: { photo: RecentPhoto }) {
  const { dict } = useLanguage();
  return (
    <Link href={`/photos/${photo._id}`} className="max-w-xs w-full group/card">
      <div
        className={cn(
          'cursor-pointer overflow-hidden relative card aspect-[3/4] rounded-md shadow-xl max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4'
        )}
        // Need to use inline style to set background image, use className not working
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)), url(${photo.url || '/background/default-vertical.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
        <div className="flex flex-row items-center space-x-4 z-10">
          <AvatarPicture
            src={photo?.owner?.img}
            alt={photo.owner.fullName + ' avatar'}
          />
          <div className="flex flex-col">
            <p className="font-normal text-base text-gray-50 relative z-10 line-clamp-1">
              {photo?.owner?.fullName}
            </p>
            <p className="text-sm text-gray-400">{photo?.owner?.username}</p>
          </div>
        </div>
        <div className="text content">
          <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10 line-clamp-1">
            {photo?.title}
          </h1>
          <p className="font-normal text-sm text-gray-50 relative z-10 my-4 line-clamp-1">
            {getDateFormatted(photo?.viewedAt, dict.lang)}
          </p>
        </div>
      </div>
    </Link>
  );
}

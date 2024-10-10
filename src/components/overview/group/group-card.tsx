'use client';
import { useLanguage } from '@/components/provider/language-provider';
import { Group } from '@/lib/define';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function GroupCard({ group }: { group: Group }) {
  const { dict } = useLanguage();

  return (
    <Link href={`/groups/${group._id}`} className="max-w-xs w-full group/card">
      <div
        className={cn(
          ' cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4'
        )}
        // Need to use inline style to set background image, use className not working
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)), url(${group.groupImg || '/background/default-vertical.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
        <div className="flex flex-col">
          <p className="text-sm text-gray-400">
            {group?.albumsCount || 0} albums
          </p>
        </div>
        <div className="text content">
          <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10 line-clamp-1">
            {group?.title}
          </h1>
          <p className="font-normal text-base text-gray-50 relative z-10">
            {group?.membersCount || 0} {dict.groupCard.members}
          </p>
        </div>
      </div>
    </Link>
  );
}

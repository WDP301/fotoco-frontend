'use client';
import { Group } from '@/lib/define';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function GroupCard({ group }: { group: Group }) {
  return (
    <Link href={`/groups/${group._id}`} className="max-w-xs w-full group/card">
      <div
        className={cn(
          'cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4',
          `bg-[url('${group?.groupImg || '/background/default-vertical.jpg'}')] bg-cover bg-center`
        )}
      >
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
        <div className="flex flex-col">
          <p className="font-normal text-base text-gray-50 relative z-10">
            {group?.membersCount || 0} members
          </p>
          <p className="text-sm text-gray-400">
            {group?.albumCount || 0} albums
          </p>
        </div>
        <div className="text content">
          <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10 line-clamp-1">
            {group?.title}
          </h1>
          <p className="font-normal text-sm text-gray-50 relative z-10 my-4 line-clamp-2">
            {group?.description}
          </p>
        </div>
      </div>
    </Link>
  );
}

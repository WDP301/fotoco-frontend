'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Photo } from '@/lib/define';
import AvatarPicture from '@/components/shared/avatar-picture';
import { Heart, MessageCircle } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

const PhotoItem = ({ photo }: { photo: Photo }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden rounded-lg"
    >
      <Link href={`/photos/${photo._id}`}>
        <div className="group relative cursor-pointer">
          <Image
            className="object-cover rounded-lg h-full transition-transform duration-300 ease-in-out group-hover:scale-110"
            src={photo.url}
            width={1000}
            height={1000}
            alt={photo.title || `Photo ${photo._id}`}
          />
          <div
            className={`absolute inset-0 flex flex-col justify-end p-4 text-white transition-opacity duration-500 ease-in-out ${
              isHovered ? 'opacity-100 delay-75' : 'opacity-0'
            } bg-black bg-opacity-50 rounded-lg`}
          >
            <div className="flex items-center mb-2">
              <AvatarPicture
                src={photo.owner.img}
                className="border-2 border-white rounded-full"
              />
              <div className="ml-2">
                <span className="font-bold text-lg">
                  {photo.owner.fullName}
                </span>
                <span className="block text-sm text-gray-300">
                  @{photo.owner.username}
                </span>
              </div>
            </div>
            <h4 className="line-clamp-1 mb-2">{photo.title}</h4>
            <div className="flex space-x-6">
              <span className="flex items-center space-x-1">
                <Heart className="h-5 w-5" />
                <span>{formatNumber(photo.reactsCount)}</span>
              </span>
              <span className="flex items-center space-x-1">
                <MessageCircle className="h-5 w-5" />
                <span>{formatNumber(photo.commentsCount)}</span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PhotoItem;

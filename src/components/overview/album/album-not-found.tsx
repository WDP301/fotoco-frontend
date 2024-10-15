'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/components/provider/language-provider';

const AlbumNotFound = () => {
  const { dict } = useLanguage();
  return (
    <>
      <div className="w-full h-[90vh] flex flex-col justify-center">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <div className="text-center text-xl">
              {dict.albumNotFound.heading}
            </div>
            <div className="text-center text-lg text-neutral-600">
              {dict.albumNotFound.info}
            </div>
          </div>
          <div className="flex justify-center ">
            <Image
              src="/not-found/404.png"
              alt="404 Not Found"
              width={300}
              height={300}
              className="rounded-md object-cover"
            />
          </div>
          <div className="flex justify-center gap-3">
            <Link href="">
              <Button onClick={() => window.location.reload()}>
                {dict.button.tryAgain}
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline">{dict.button.home}</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlbumNotFound;

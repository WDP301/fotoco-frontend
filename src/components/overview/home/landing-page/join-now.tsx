'use client';

import { useLanguage } from '@/components/provider/language-provider';
import { Button } from '@/components/ui/button';
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect';
import Link from 'next/link';

export function JoinNow() {
  const { dict } = useLanguage();

  // Get words for the typewriter effect from the language dictionary
  const words = dict.joinNow.typewriter;

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base">
        {dict.joinNow.intro}
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <Button variant="secondary" className="w-40 h-10 rounded-xl" asChild>
          <Link href="/login">{dict.joinNow.button.login}</Link>
        </Button>
        <Button variant="default" className="w-40 h-10 rounded-xl">
          <Link href="/register">{dict.joinNow.button.joinNow}</Link>
        </Button>
      </div>
    </div>
  );
}

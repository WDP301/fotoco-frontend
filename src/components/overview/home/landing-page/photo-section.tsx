'use client';
import { useLanguage } from '@/components/provider/language-provider';
import { LayoutGrid } from '@/components/ui/layout-grid';
import React from 'react';

export function PhotoSection() {
  return (
    <div className="h-screen w-full">
      <LayoutGrid cards={cards} />
    </div>
  );
}

const SkeletonOne = () => {
  const { dict } = useLanguage();

  return (
    <div>
      <p className="font-bold text-4xl text-white">
        {dict.photoSection.skeletonOne.title}
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        {dict.photoSection.skeletonOne.description}
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  const { dict } = useLanguage();

  return (
    <div>
      <p className="font-bold text-4xl text-white">
        {dict.photoSection.skeletonTwo.title}
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        {dict.photoSection.skeletonTwo.description}
      </p>
    </div>
  );
};

const SkeletonThree = () => {
  const { dict } = useLanguage();

  return (
    <div>
      <p className="font-bold text-4xl text-white">
        {dict.photoSection.skeletonThree.title}
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        {dict.photoSection.skeletonThree.description}
      </p>
    </div>
  );
};

const SkeletonFour = () => {
  const { dict } = useLanguage();

  return (
    <div>
      <p className="font-bold text-4xl text-white">
        {dict.photoSection.skeletonFour.title}
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        {dict.photoSection.skeletonFour.description}
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: 'md:col-span-2',
    thumbnail:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: 'col-span-1',
    thumbnail:
      'https://images.unsplash.com/photo-1534531688091-a458257992cb?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: 'col-span-1',
    thumbnail:
      'https://plus.unsplash.com/premium_photo-1683734677818-74b42347f4ca?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: 'md:col-span-2',
    thumbnail:
      'https://images.unsplash.com/photo-1516553174826-d05833723cd4?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

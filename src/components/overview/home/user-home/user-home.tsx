'use client';

import { useLanguage } from '@/components/provider/language-provider';
import SpinLoading from '@/components/shared/spin-loading';
import { User } from '@/lib/define';
import { Suspense } from 'react';
import GroupList from './group/group-list';

const message = [
  [0, 4, 'night'],
  [5, 11, 'morning'],
  [12, 17, 'afternoon'],
  [18, 24, 'night'],
];

export default function UserHome({ user }: { user: User }) {
  const { dict } = useLanguage();

  const getGreeting = () => {
    let hour: number = new Date().getHours();
    for (let i = 0; i < message.length; i++) {
      if (hour >= Number(message[i][0]) && hour <= Number(message[i][1])) {
        return dict.userHome.greeting[message[i][2]]; // Fetch the greeting from dict
      }
    }
  };

  return (
    <div>
      <div className="w-full text-center mb-5">
        <h1 className="text-2xl font-bold">
          {getGreeting()}, {user.fullName}
        </h1>
        {/* <p className="mt-2">{dict.userHome.home.introText}</p> */}
      </div>
      <span className={`text-2xl font-bold`}>{dict.userHome.home.myGroup}</span>
      <Suspense fallback={<SpinLoading />}>
        <GroupList />
      </Suspense>
      <span className={`text-2xl font-bold`}>
        {dict.userHome.home.recentView}
      </span>
      {/* <Suspense fallback={<SpinLoading />}>
                      <RecentViewList />
                  </Suspense> */}
    </div>
  );
}

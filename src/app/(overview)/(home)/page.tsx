import LandingPage from '@/components/overview/home/landing-page/landing-page';
import GroupList from '@/components/overview/home/user-home/group/group-list';
import RecentViewList from '@/components/overview/home/user-home/recent-view/recent-view-list';
import UserHome from '@/components/overview/home/user-home/user-home';
import SpinLoading from '@/components/shared/spin-loading';
import { getUser } from '@/lib/data';
import { getDictionary } from '@/lib/dictionaries';
import { Suspense } from 'react';

const message: [number, number, 'morning' | 'afternoon' | 'night'][] = [
  [0, 4, 'night'],
  [5, 11, 'morning'],
  [12, 17, 'afternoon'],
  [18, 24, 'night'],
];

export default async function Home() {
  const user = await getUser();
  const dict = await getDictionary();

  const getGreeting = () => {
    let hour: number = new Date().getHours();
    for (let i = 0; i < message.length; i++) {
      if (hour >= Number(message[i][0]) && hour <= Number(message[i][1])) {
        return dict.userHome.greeting[
          message[i][2] as 'morning' | 'afternoon' | 'night'
        ]; // Fetch the greeting from dict
      }
    }
  };

  return (
    <>
      {user ? (
        <div>
          <div className="w-full text-center mb-5">
            <h1 className="text-2xl font-bold">
              {getGreeting()}, {user.fullName}
            </h1>
            <p className="mt-2">{dict.userHome.home.introText}</p>
          </div>
          <span className={`text-2xl font-bold`}>
            {dict.userHome.home.myGroup}
          </span>
          <Suspense fallback={<SpinLoading />}>
            <GroupList />
          </Suspense>
          <span className={`text-2xl font-bold`}>
            {dict.userHome.home.recentView}
          </span>
          <Suspense fallback={<SpinLoading />}>
            <RecentViewList />
          </Suspense>
        </div>
      ) : (
        <LandingPage />
      )}
    </>
  );
}

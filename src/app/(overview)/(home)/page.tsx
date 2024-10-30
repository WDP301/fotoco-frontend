import GroupListLoading from '@/components/overview/group/loading/group-list-loading';
import LandingPage from '@/components/overview/home/landing-page/landing-page';
import RecentViewList from '@/components/overview/home/user-home/recent-view/recent-view-list';
import { Suspense } from 'react';
import GroupSection from '@/components/overview/home/user-home/group/group-section';
import { getDictionary } from '@/lib/dictionaries';
import { getUser } from '@/lib/data';

const message: [number, number, 'morning' | 'afternoon' | 'night'][] = [
  [0, 4, 'night'],
  [5, 11, 'morning'],
  [12, 17, 'afternoon'],
  [18, 24, 'night'],
];

export default async function Home({
  searchParams,
}: {
  searchParams: { filter?: string };
}) {
  const user = await getUser();

  console.log('>>>>user', user);
  const dict = await getDictionary();

  const getGreeting = () => {
    const hour: number = new Date().getHours();
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
      {user._id ? (
        <div>
          <div className="w-full text-center mb-5">
            <h2>
              {getGreeting()}, {user.fullName}
            </h2>
            <p className="mt-2">{dict.userHome.home.introText}</p>
          </div>

          <span className={`text-2xl font-bold`}>
            {dict.userHome.home.recentView}
          </span>
          <div className="my-5">
            <Suspense fallback={<GroupListLoading />}>
              <RecentViewList />
            </Suspense>
          </div>

          <span className={`text-2xl font-bold`}>
            {dict.userHome.home.myGroup}
          </span>

          <GroupSection filter={searchParams.filter} />
        </div>
      ) : (
        <LandingPage />
      )}
    </>
  );
}

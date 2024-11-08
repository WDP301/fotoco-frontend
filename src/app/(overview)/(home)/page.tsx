import LandingPage from '@/components/overview/home/landing-page/landing-page';
import RecentViewList from '@/components/overview/home/user-home/recent-view/recent-view-list';
import GroupSection from '@/components/overview/home/user-home/group/group-section';
import { getDictionary } from '@/lib/dictionaries';
import { getUser } from '@/lib/data';
import GreetingClient from '@/components/shared/greeting-client';

export default async function Home({
  searchParams,
}: {
  searchParams: { filter?: string };
}) {
  const user = await getUser();

  const dict = await getDictionary();

  return (
    <>
      {user ? (
        <div>
          <div className="w-full text-center mb-5">
            <GreetingClient user={user} />
            <p className="mt-2">{dict.userHome.home.introText}</p>
          </div>

          <span className={`text-2xl font-bold`}>
            {dict.userHome.home.recentView}
          </span>
          <div className="my-5">
            <RecentViewList />
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

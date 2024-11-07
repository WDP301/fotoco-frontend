'use client';

import { User } from '@/lib/define';
import { useLanguage } from '../provider/language-provider';

const message: [number, number, 'morning' | 'afternoon' | 'night'][] = [
  [0, 4, 'night'],
  [5, 11, 'morning'],
  [12, 17, 'afternoon'],
  [18, 24, 'night'],
];

export default function GreetingClient({ user }: { user: User }) {
  const { dict } = useLanguage();
  const getGreeting = () => {
    const hour: number = new Date().getHours();
    for (let i = 0; i < message.length; i++) {
      if (hour >= Number(message[i][0]) && hour <= Number(message[i][1])) {
        return dict.userHome.greeting[
          message[i][2] as 'morning' | 'afternoon' | 'night'
        ];
      }
    }
  };
  return (
    <h2>
      {getGreeting()}, {user.fullName}
    </h2>
  );
}

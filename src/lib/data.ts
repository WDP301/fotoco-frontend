'use server';

import customFetch from '@/config/fetch';
import { User } from './define';

export const getUser = async () => {
  const response = await customFetch('/users/me', {
    method: 'GET',
    next: { revalidate: 3600 },
  })
    .then((res) => res.json())
    .catch(() => null);

  return response?.user as User;
};

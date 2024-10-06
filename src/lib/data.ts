'use server';

import customFetch from '@/config/fetch';
import { Group, PageMeta, SearchGroupParams, User } from './define';

function objectToQueryString(params: Record<string, any>): string {
  return new URLSearchParams(params).toString();
}

export const getUser = async () => {
  const response = await customFetch('/users/me', {
    method: 'GET',
    next: { revalidate: 3600 },
  })
    .then((res) => res.json())
    .catch(() => null);

  return response?.user as User;
};

const pageMetaDefault = {
  totalPages: 0,
  page: 0,
  pageSize: 0,
  hasNext: false,
  hasPrev: false,
} as PageMeta;

export const getAllGroup = async (searchParams: SearchGroupParams) => {
  const queryString = objectToQueryString(searchParams);
  const response = await customFetch(`/groups?${queryString}`, {
    method: 'GET',
    next: { revalidate: 60 },
  })
    .then((res) => res.json())
    .catch((error) => null);

  if (response?.success) {
    return {
      pageMeta: response.pageMeta as PageMeta,
      groups: response.groups as Group[],
    };
  }

  return {
    pageMeta: pageMetaDefault as PageMeta,
    groups: [] as Group[],
  };
};

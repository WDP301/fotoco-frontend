'use server';

import customFetch from '@/config/fetch';
import {
  Group,
  GroupInfo,
  GroupUser,
  PageMeta,
  RecentPhoto,
  SearchGroupMembersParams,
  SearchGroupParams,
  SearchRecentViewParams,
  User,
} from './define';

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
    // next: { revalidate: 60 },
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

export const getRecentViewPhotos = async (
  searchParams: SearchRecentViewParams
) => {
  const queryString = objectToQueryString(searchParams);
  const response = await customFetch(`/photos/recent-views?${queryString}`, {
    method: 'GET',
    next: { revalidate: 120 },
  })
    .then((res) => res.json())
    .catch((error) => null);

  if (response?.success) {
    return {
      pageMeta: response.pageMeta as PageMeta,
      photos: response.photos as RecentPhoto[],
    };
  }

  return {
    pageMeta: pageMetaDefault as PageMeta,
    photos: [] as RecentPhoto[],
  };
};

export const getGroupInfo = async (groupId: string) => {
  try {
    const response = await customFetch(`/groups/${groupId}`, {
      method: 'GET',
      next: { revalidate: 120 },
    })
      .then((res) => res.json())
      .catch((error) => null);
    return response as GroupInfo;
  } catch (error) {
    return {} as GroupInfo;
  }
};

export const getGroupMembers = async (
  groupId: string,
  searchParams: SearchGroupMembersParams
) => {
  try {
    const queryString = objectToQueryString(searchParams);
    const response = await customFetch(
      `/groups/${groupId}/members?${queryString}`,
      {
        method: 'GET',
        next: { revalidate: 3600 },
      }
    )
      .then((res) => res.json())
      .catch((error) => null);

    if (response?.success) {
      return {
        pageMeta: response.pageMeta as PageMeta,
        users: response.users as GroupUser[],
      };
    }

    return {
      pageMeta: pageMetaDefault as PageMeta,
      users: response.users as GroupUser[],
    };
  } catch (error) {
    return {
      pageMeta: pageMetaDefault as PageMeta,
      users: [] as GroupUser[],
    };
  }
};

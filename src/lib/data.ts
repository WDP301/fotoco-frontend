'use server';

import customFetch from '@/config/fetch';
import {
  Album,
  Group,
  GroupInfo,
  GroupUser,
  PageMeta,
  RecentPhoto,
  SearchAlbumParams,
  SearchGroupMembersParams,
  SearchGroupParams,
  SearchRecentViewParams,
  User,
} from './define';
import http from '@/config/axios';

function objectToQueryString(params: Record<string, any>): string {
  return new URLSearchParams(params).toString();
}

// export const getUser = async () => {
//   try {
//     const response = await customFetch('/users/me', {
//       method: 'GET',
//       next: { revalidate: 3600 },
//     });

//     if (!response.ok) {
//       if (response.status === 401) {
//         return {} as User;
//       }
//       throw new Error('Failed to fetch user data');
//     }

//     const data = await response.json();
//     return data.user as User;
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     return {} as User;
//   }
// };

// TODO: Can't use customFetch
export const getUser = async () => {
  const response = await http
    .get('/users/me')
    .then((res) => {
      return res.data.user as User;
    })
    .catch(() => {
      return null;
    });

  return response;
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
    .catch(() => null);

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
    .catch(() => null);

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
      .catch(() => null);
    return response as GroupInfo;
  } catch {
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
      .catch(() => null);

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
  } catch {
    return {
      pageMeta: pageMetaDefault as PageMeta,
      users: [] as GroupUser[],
    };
  }
};

export const getAlbumsByGroupId = async (
  groupId: string,
  searchParams: SearchAlbumParams
) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const queryString = objectToQueryString(searchParams);
    const response = await customFetch(
      `/groups/${groupId}/albums?${queryString}`,
      {
        method: 'GET',
        // next: { revalidate: 3600 },
        cache: 'no-store',
      }
    )
      .then((res) => res.json())
      .catch(() => null);

    if (response?.success) {
      return {
        pageMeta: response.pageMeta as PageMeta,
        albums: response.albums as Album[],
      };
    }

    return {
      pageMeta: pageMetaDefault as PageMeta,
      albums: response.albums as Album[],
    };
  } catch {
    return {
      pageMeta: pageMetaDefault as PageMeta,
      albums: [] as Album[],
    };
  }
};

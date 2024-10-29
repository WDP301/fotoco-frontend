'use server';

import customFetch from '@/config/fetch';
import {
  Album,
  AlbumInfo,
  Group,
  GroupInfo,
  GroupUser,
  PageMeta,
  PhotoResponse,
  Photo,
  RecentPhoto,
  SearchAlbumParams,
  SearchGroupMembersParams,
  SearchGroupParams,
  SearchPhotoParams,
  SearchRecentViewParams,
  SearchUser,
  User,
  Comment,
  React,
} from './define';
import http from '@/config/axios';
import { getPlaiceholder } from 'plaiceholder';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function objectToQueryString(params: Record<string, any>): string {
  return new URLSearchParams(params).toString();
}

export const getUser = async () => {
  try {
    const response = await customFetch('/users/me', {
      method: 'GET',
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      if (response.status === 401) {
        return {} as User;
      }
      throw new Error('Failed to fetch user data');
    }

    const data = await response.json();
    return data.user as User;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return {} as User;
  }
};

// TODO: Can't use customFetch
// export const getUser = async () => {
//   const response = await http
//     .get('/users/me')
//     .then((res) => {
//       return res.data.user as User;
//     })
//     .catch(() => {
//       return null;
//     });

//   return response;
// };

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
      // next: { revalidate: 120 },
    })
      .then((res) => res.json())
      .catch(() => null);
    return response as GroupInfo;
  } catch {
    return {} as GroupInfo;
  }
};

export const getAlbumInfo = async (albumId: string) => {
  try {
    const response = await customFetch(`/albums/${albumId}`, {
      method: 'GET',
      // next: { revalidate: 120 },
    })
      .then((res) => res.json())
      .catch(() => null);
    return response as AlbumInfo;
  } catch {
    return {} as AlbumInfo;
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
        // next: { revalidate: 3600 },
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

export const getAlbumMembers = async (
  albumId: string,
  searchParams: SearchGroupMembersParams
) => {
  try {
    const queryString = objectToQueryString(searchParams);
    const response = await customFetch(
      `/albums/${albumId}/members?${queryString}`,
      {
        method: 'GET',
        // next: { revalidate: 3600 },
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
    const queryString = objectToQueryString(searchParams);
    const response = await customFetch(
      `/groups/${groupId}/albums?${queryString}`,
      {
        method: 'GET',
        // next: { revalidate: 3600 },
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

export const getPhotosByAlbumId = async (
  albumId: string,
  searchParams: SearchPhotoParams
) => {
  try {
    const queryString = objectToQueryString(searchParams);
    const response = await customFetch(
      `/albums/${albumId}/photos?${queryString}`,
      {
        method: 'GET',
        // next: { revalidate: 3600 },
      }
    )
      .then((res) => res.json())
      .catch(() => null);

    if (response?.success) {
      return {
        photos: response.photos as Photo[],
        pageMeta: response.pageMeta as PageMeta,
      };
    }

    return {
      photos: [] as Photo[],
      pageMeta: pageMetaDefault as PageMeta,
    };
  } catch (error) {
    return {
      photos: [] as Photo[],
      pageMeta: pageMetaDefault as PageMeta,
    };
  }
};

export default async function getBase64(imageUrl: string) {
  try {
    const res = await fetch(imageUrl);

    if (!res.ok) {
      throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`);
    }

    const buffer = await res.arrayBuffer();

    const { base64 } = await getPlaiceholder(Buffer.from(buffer));

    //console.log(`base64: ${base64}`)

    return base64;
  } catch (e) {
    if (e instanceof Error) console.log(e.stack);
  }
}


export const getPhotoDetails = async (
  photoId: string,
  SearchPhotoParams: SearchPhotoParams
) => {
  try {
    const queryString = objectToQueryString(SearchPhotoParams);
    const response = await customFetch(`/photos/${photoId}?${queryString}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .catch((error) => null);
    return response as PhotoResponse;
  } catch (error) {
    return {} as PhotoResponse;
  }
};

export const getCommentsByPhotoId = async (photoId: string) => {
  try {
    const response = await customFetch(`/photos/${photoId}/comments`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .catch((error) => null);
    return {
      comments: response.comments as Comment[],
    };
  } catch (error) {
    return {
      comments: [] as Comment[],
    };
  }
};

export const getUsers = async (search: string) => {
  try {
    const queryString = objectToQueryString({ search });
    const response = await customFetch(`/users?${queryString}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .catch(() => null);

    return (response?.users as SearchUser[]) || [];
  } catch (error) {
    return [] as SearchUser[];
  }
};

export const getReactListByPhotoId = async (photoId: string, lastReactLoadId?: string) => {
  try {
    const queryString = lastReactLoadId ? `?lastReactLoadId=${lastReactLoadId}` : "";
    const response = await customFetch(`/photos/${photoId}/reacts${queryString}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .catch(() => null);
      return (response?.reacts as React[]) || [];
  } catch (error) {
    return [] as React[];
  }
}
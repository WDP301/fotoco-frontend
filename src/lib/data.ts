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
  GroupSetting,
  Comment,
  React,
  SharedPhoto,
  AlbumSetting,
  SearchAlbumMembersParams,
  AlbumUser,
  PublicGroupInfo,
  SharedAlbum,
  PublicAlbumInfo,
} from './define';
import { getPlaiceholder } from 'plaiceholder';
import { cookies } from 'next/headers';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function objectToQueryString(params: Record<string, any>): string {
  return new URLSearchParams(params).toString();
}

export const getUser = async (forceRefresh = false) => {
  try {
    const cookieStore = cookies();
    const signature = cookieStore.get('signature');
    const response = await customFetch(
      '/users/me',
      {
        method: 'GET',
      },
      {
        revalidate: 3600,
        tags: [`user-${signature}`, 'user'],
      }
    )
      .then((res) => res.json())
      .catch(() => null);

    if (response?.status === 401) {
      throw new Error('Failed to fetch user data');
    }

    if (response?.success) {
      return response.user;
    }
  } catch (error) {
    // console.error('Error fetching user data:', error);
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
  const cookieStore = cookies();
  const signature = cookieStore.get('signature');
  const response = await customFetch(
    `/groups?${queryString}`,
    {
      method: 'GET',
    },
    {
      revalidate: 3600,
      tags: [`groups-${signature}`, 'groups'],
    }
  )
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
    const cookieStore = cookies();
    const signature = cookieStore.get('signature');
    const response = await customFetch(
      `/groups/${groupId}`,
      {
        method: 'GET',
      },
      {
        revalidate: 3600,
        tags: [`group-${groupId}-${signature}`, `group-${groupId}`],
      }
    )
      .then((res) => res.json())
      .catch(() => null);
    return response as GroupInfo;
  } catch {
    return {} as GroupInfo;
  }
};

export const getPublicGroupInfo = async (groupId: string) => {
  try {
    const cookieStore = cookies();
    const signature = cookieStore.get('signature');
    const response = await customFetch(
      `/public/${groupId}`,
      {
        method: 'GET',
      },
      {
        revalidate: 3600,
        tags: [`group-${groupId}-${signature}`, `group-${groupId}`],
      }
    )
      .then((res) => res.json())
      .catch(() => null);
    return response as PublicGroupInfo;
  } catch {
    return {} as PublicGroupInfo;
  }
};

export const getPublicAlbumInfo = async (albumId: string) => {
  try {
    const cookieStore = cookies();
    const signature = cookieStore.get('signature');
    const response = await customFetch(
      `/public/albums/${albumId}`,
      {
        method: 'GET',
      },
      {
        revalidate: 3600,
        tags: [`album-${albumId}-${signature}`, `album-${albumId}`],
      }
    )
      .then((res) => res.json())
      .catch(() => null);
    return response as PublicAlbumInfo;
  } catch {
    return {} as PublicAlbumInfo;
  }
};

export const getGroupSetting = async (groupId: string) => {
  try {
    const response = await customFetch(
      `/groups/${groupId}/setting`,
      {
        method: 'GET',
      },
      {
        revalidate: 3600,
        tags: [`group-${groupId}-setting`],
      }
    )
      .then((res) => res.json())
      .catch(() => null);
    return response as GroupSetting;
  } catch {
    return {} as GroupSetting;
  }
};

export const getAlbumSetting = async (albumId: string) => {
  try {
    const response = await customFetch(`/albums/${albumId}/setting`, {
      method: 'GET',
      // next: { revalidate: 120 },
    })
      .then((res) => res.json())
      .catch(() => null);
    return response as AlbumSetting;
  } catch {
    return {} as AlbumSetting;
  }
};

export const getAlbumInfo = async (albumId: string) => {
  try {
    const cookieStore = cookies();
    const signature = cookieStore.get('signature');
    const response = await customFetch(
      `/albums/${albumId}`,
      {
        method: 'GET',
      },
      {
        revalidate: 3600,
        // TODO: Need to use tag `albums-${groupId}` instead of albums and change revalidateTag(`albums`) in updateGroup function to revalidateTag(`albums-${groupId}`)
        tags: [`album-${albumId}-${signature}`, `albums`],
      }
    )
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
    const cookieStore = cookies();
    const signature = cookieStore.get('signature');
    const response = await customFetch(
      `/groups/${groupId}/members?${queryString}`,
      {
        method: 'GET',
      },
      {
        revalidate: 3600,
        tags: [
          `group-${groupId}-members-${signature}`,
          `group-${groupId}-members`,
        ],
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
  searchParams: SearchAlbumMembersParams
) => {
  try {
    const queryString = objectToQueryString(searchParams);
    const cookieStore = cookies();
    const signature = cookieStore.get('signature');
    const response = await customFetch(
      `/albums/${albumId}/members?${queryString}`,
      {
        method: 'GET',
      },
      {
        revalidate: 3600,
        tags: [
          `album-${albumId}-members-${signature}`,
          `album-${albumId}-members`,
        ],
      }
    )
      .then((res) => res.json())
      .catch(() => null);

    if (response?.success) {
      return {
        pageMeta: response.pageMeta as PageMeta,
        users: response.users as AlbumUser[],
      };
    }

    return {
      pageMeta: pageMetaDefault as PageMeta,
      users: response.users as AlbumUser[],
    };
  } catch {
    return {
      pageMeta: pageMetaDefault as PageMeta,
      users: [] as AlbumUser[],
    };
  }
};

export const getAlbumsByGroupId = async (
  groupId: string,
  searchParams: SearchAlbumParams
) => {
  try {
    const queryString = objectToQueryString(searchParams);
    const cookieStore = cookies();
    const signature = cookieStore.get('signature');
    const response = await customFetch(
      `/groups/${groupId}/albums?${queryString}`,
      {
        method: 'GET',
      },
      {
        revalidate: 3600,
        tags: [`albums-${groupId}-${signature}`, `albums-${groupId}`],
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
    const cookieStore = cookies();
    const signature = cookieStore.get('signature');
    const response = await customFetch(
      `/albums/${albumId}/photos?${queryString}`,
      {
        method: 'GET',
      }
      // TODO: Need to revalidate tag `photos-${albumId}` after upload photos then uncomment this
      // {
      //   revalidate: 3600,
      //   tags: [`photos-${albumId}-${signature}`, `photos-${albumId}`],
      // }
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
    const cookieStore = cookies();
    const signature = cookieStore.get('signature');
    const response = await customFetch(
      `/photos/${photoId}?${queryString}`,
      {
        method: 'GET',
      },
      {
        revalidate: 3600,
        tags: [`photo-${photoId}-${signature}`, `photo-${photoId}`],
      }
    )
      .then((res) => res.json())
      .catch((error) => null);
    return response as PhotoResponse;
  } catch (error) {
    return {} as PhotoResponse;
  }
};

export const getCommentsByPhotoId = async (photoId: string) => {
  try {
    const cookieStore = cookies();
    const signature = cookieStore.get('signature');
    const response = await customFetch(
      `/photos/${photoId}/comments`,
      {
        method: 'GET',
      },
      {
        revalidate: 3600,
        tags: [`comments-${photoId}-${signature}`, `comments-${photoId}`],
      }
    )
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

export const getReactListByPhotoId = async (
  photoId: string,
  lastReactLoadId?: string
) => {
  try {
    const cookieStore = cookies();
    const signature = cookieStore.get('signature');
    const queryString = lastReactLoadId
      ? `?lastReactLoadId=${lastReactLoadId}`
      : '';
    const response = await customFetch(
      `/photos/${photoId}/reacts${queryString}`,
      {
        method: 'GET',
      },
      {
        revalidate: 3600,
        tags: [`reacts-${photoId}-${signature}`, `reacts-${photoId}`],
      }
    )
      .then((res) => res.json())
      .catch(() => null);
    return (response?.reacts as React[]) || [];
  } catch (error) {
    return [] as React[];
  }
};

export const getSharedPhoto = async (sharePhotoToken: string) => {
  try {
    const queryString = objectToQueryString({ sharePhotoToken });
    const response = await customFetch(`/photos/share-photo?${queryString}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .catch(() => null);
    return response as SharedPhoto;
  } catch (error) {
    return {} as SharedPhoto;
  }
};

export const getSearchGroupMembers = async (
  groupId: string,
  search: string
) => {
  try {
    const queryString = objectToQueryString({ search });
    const response = await customFetch(
      `/groups/${groupId}/members?${queryString}`,
      {
        method: 'GET',
      }
    )
      .then((res) => res.json())
      .catch(() => null);

    return (response?.users as SearchUser[]) || [];
  } catch (error) {
    return [] as SearchUser[];
  }
};

export const getSharedAlbum = async (shareAlbumToken: string) => {
  try {
    const queryString = objectToQueryString({ shareAlbumToken });
    const response = await customFetch(`/albums/share?${queryString}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .catch(() => null);
    return response as SharedAlbum;
  } catch (error) {
    return {} as SharedAlbum;
  }
};

export const getPhotosByPhotosList = async (
  photos: { photoId: string; viewedAt: string }[]
) => {
  try {
    const queryString = objectToQueryString({
      photosId: photos.map((p) => p.photoId).join(','),
    });
    const response = await customFetch(
      `/photos/list-by-ids?${queryString}`,
      {
        method: 'GET',
      },
      {
        revalidate: 3600,
      }
    )
      .then((res) => res.json())
      .catch(() => null);
    const photosList = response.photos as RecentPhoto[];

    return photosList
      .map((photo) => {
        const viewedAt = photos.find((p) => p.photoId === photo._id)?.viewedAt;
        return { ...photo, viewedAt } as RecentPhoto;
      })
      .sort((a, b) => {
        return (
          new Date(b.viewedAt ?? 0).getTime() -
          new Date(a.viewedAt ?? 0).getTime()
        );
      });
  } catch (error) {
    return [] as RecentPhoto[];
  }
};

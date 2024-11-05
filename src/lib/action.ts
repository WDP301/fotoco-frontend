'use server';

import { z } from 'zod';
import {
  getCreateAlbumSchema,
  getCreateGroupSchema,
  getInviteAlbumMemberSchema,
  getInviteGroupMemberSchema,
  getJoinGroupSchema,
  getLoginFormSchema,
  getProfileFormSchema,
  getRegisterFormSchema,
  getUpdateAlbumSettingSchema,
  getUpdateGroupSettingSchema,
  getUpdatePhotoFormSchema,
} from './form-schema';
import http from '@/config/axios';
import { cookies } from 'next/headers';
import { AuthResponse, User, UserJWT, UserNotification } from './define';
import { v4 as uuidv4 } from 'uuid';
import { base64Decode } from './utils';
import { revalidateTag } from 'next/cache';

const MAX_AGE_REFRESH_TOKEN = 60 * 60 * 24 * 90;

export async function getAuthHeader() {
  const accessToken = cookies().get('access-token')?.value;
  if (accessToken) {
    return { Authorization: `Bearer ${accessToken}` };
  }
  return {};
}

export const register = async (
  formData: z.infer<ReturnType<typeof getRegisterFormSchema>>
) => {
  try {
    const {
      fullName,
      username,
      email,
      phoneNumber,
      password,
    }: z.infer<ReturnType<typeof getRegisterFormSchema>> = formData;

    const response = await http
      .post('/auth/register', {
        fullName,
        username,
        email,
        phoneNumber,
        password,
      })
      .then((res) => {
        return {
          isSuccess: res.data.success,
          error: '',
        };
      })
      .catch((error) => {
        return {
          isSuccess: false,
          error:
            (error?.response?.data?.message as string) ||
            'An unexpected error occurred',
        };
      });
    return response;
  } catch (error: any) {
    return {
      isSuccess: false,
      error: error.message || 'An unexpected error occurred',
    };
  }
};

export const active = async (token: string, active: string) => {
  return await http
    .get(`/auth/activate/${token}`, {
      params: { active },
    })
    .then((res) => {
      return {
        isSuccess: true,
        error: res.data.message as string,
      };
    })
    .catch((error) => {
      return {
        isSuccess: false,
        error:
          (error?.response?.data?.message as string) ||
          'An unexpected error occurred',
      };
    });
};

const handleStoreUserCredentials = (
  signature: string,
  accessToken: string,
  refreshToken: string
): void => {
  const payload = base64Decode(accessToken.split('.')[1]);
  const cookie = cookies();
  const user = JSON.parse(payload) as UserJWT;
  cookie.set('refresh-token', refreshToken, {
    maxAge: MAX_AGE_REFRESH_TOKEN,
  });
  cookie.set('signature', signature, { maxAge: MAX_AGE_REFRESH_TOKEN });
  const expiryDate = new Date(user.exp * 1000);
  cookie.set('access-token', accessToken, {
    expires: expiryDate,
    httpOnly: false,
  });
};

export const oauthSuccess = (
  signature: string,
  accessToken: string,
  refreshToken: string
): Promise<void> => {
  // Fix change to promise to handle the case router push before the cookie is set
  return new Promise((resolve) => {
    setTimeout(() => {
      handleStoreUserCredentials(signature, accessToken, refreshToken);
      resolve();
    }, 0);
  });
};

export const login = async (
  formData: z.infer<ReturnType<typeof getLoginFormSchema>>
) => {
  try {
    const { email, password }: z.infer<ReturnType<typeof getLoginFormSchema>> =
      formData;
    const signature = uuidv4();
    const response = await http
      .post('/auth/login', {
        email,
        password,
        signature,
      })
      .then((res) => {
        const { accessToken, refreshToken } = res.data;

        handleStoreUserCredentials(signature, accessToken, refreshToken);

        return {
          isSuccess: true,
          error: '',
        };
      })
      .catch((error) => {
        return {
          isSuccess: false,
          error: error?.response?.data?.message || 'Unknown error',
        };
      });
    return response;
  } catch (error: any) {
    return {
      isSuccess: false,
      error: error.message || 'Unknown error',
    };
  }
};

export async function refreshAccessToken(token: string, signature: string) {
  return await http
    .post(`/auth/refresh-token`, {
      refreshToken: token,
      signature,
    })
    .then((res) => {
      return res.data as AuthResponse;
    })
    .catch((error) => {
      throw error;
    });
}

export const logout = async () => {
  const refreshToken = cookies().get('refresh-token')?.value;
  const signature = cookies().get('signature')?.value;
  try {
    cookies().delete('access-token');
    cookies().delete('refresh-token');
    cookies().delete('signature');
    cookies().delete('lang');
    await http.delete('/auth/logout', { data: { refreshToken, signature } });
    return {
      isSuccess: true,
      error: '',
    };
  } catch (error: any) {
    return {
      isSuccess: false,
      error: error.message || 'Unknown error',
    };
  }
};

export const joinGroup = async (
  formData: z.infer<ReturnType<typeof getJoinGroupSchema>>
) => {
  const { code }: z.infer<ReturnType<typeof getJoinGroupSchema>> = formData;

  const response = await http
    .post('/groups/join', {
      groupCode: code,
    })
    .then(() => {
      return {
        isSuccess: true,
        error: '',
      };
    })
    .catch((error) => {
      return {
        isSuccess: false,
        error: error?.response?.data?.message || 'Unknown error',
      };
    });

  return response;
};

export const createGroup = async (
  formData: z.infer<ReturnType<typeof getCreateGroupSchema>>
) => {
  const {
    title,
    description,
  }: z.infer<ReturnType<typeof getCreateGroupSchema>> = formData;

  const response = await http
    .post('/groups/create', {
      title,
      description,
      type: formData.type,
    })
    .then(() => {
      return {
        isSuccess: true,
        error: '',
      };
    })
    .catch((error) => {
      return {
        isSuccess: false,
        error: error?.response?.data?.message || 'Unknown error',
      };
    });

  return response;
};

export const createAlbum = async (
  groupId: string,
  formData: z.infer<ReturnType<typeof getCreateAlbumSchema>>
) => {
  const {
    title,
    description,
  }: z.infer<ReturnType<typeof getCreateAlbumSchema>> = formData;

  const response = await http
    .post(`/groups/${groupId}/create-album`, {
      title,
      description,
    })
    .then(() => {
      return {
        isSuccess: true,
        error: '',
      };
    })
    .catch((error) => {
      return {
        isSuccess: false,
        error: error?.response?.data?.message || 'Unknown error',
      };
    });

  return response;
};

export const getUserNotifications = async () => {
  try {
    const response = await http.get('/notifications/my-notifications');
    return response.data.notifications as UserNotification[];
  } catch (error) {
    return [] as UserNotification[];
  }
};

export const markNotificationAsSeen = async (notificationId: string) => {
  const response = await http
    .put(`/notifications/${notificationId}/mark-as-seen`, undefined)
    .then((res) => {
      return {
        isSuccess: true,
        error: '',
      };
    })
    .catch((error) => {
      return {
        isSuccess: false,
        error: error?.response?.data?.message || 'Unknown error',
      };
    });

  return response;
};

export const commentPhoto = async (photoId: string, content: string) => {
  const response = await http
    .post(`/photos/${photoId}/comment`, {
      content,
    })
    .then((res) => {
      return {
        isSuccess: true,
        error: '',
      };
    })
    .catch((error) => {
      return {
        isSuccess: false,
        error: error?.response?.data?.message || 'Unknown error',
      };
    });

  return response;
};

export const replyComment = async (
  photoId: string,
  commentId: string,
  content: string
) => {
  const response = await http
    .post(`/photos/${photoId}/reply/${commentId}`, {
      content,
    })
    .then((res) => {
      return {
        isSuccess: true,
        error: '',
      };
    })
    .catch((error) => {
      return {
        isSuccess: false,
        error: error?.response?.data?.message || 'Unknown error',
      };
    });

  return response;
};

export const acceptInviteToGroup = async (
  groupId: string,
  inviteToken: string
) => {
  const response = await http
    .post(`/groups/${groupId}/accept-invite`, undefined, {
      params: { inviteToken },
    })
    .then((res) => {
      return {
        isSuccess: true,
        error: '',
      };
    })
    .catch((error) => {
      return {
        isSuccess: false,
        error: error?.response?.data?.message || 'Unknown error',
      };
    });
  return response;
};
export const acceptInviteToAlbum = async (
  albumId: string,
  inviteToken: string
) => {
  const response = await http
    .post(`/albums/${albumId}/accept-invite`, undefined, {
      params: { inviteToken },
    })
    .then((res) => {
      return {
        isSuccess: true,
        error: '',
      };
    })
    .catch((error) => {
      return {
        isSuccess: false,
        error: error?.response?.data?.message || 'Unknown error',
      };
    });
  return response;
};

export const inviteUserToGroup = async (
  groupId: string,
  formData: z.infer<ReturnType<typeof getInviteGroupMemberSchema>>
) => {
  const {
    email,
    role,
  }: z.infer<ReturnType<typeof getInviteGroupMemberSchema>> = formData;

  const response = await http
    .post(`/groups/${groupId}/invite`, {
      email,
      role,
    })
    .then((res) => {
      return {
        isSuccess: true,
        error: '',
      };
    })
    .catch((error) => {
      return {
        isSuccess: false,
        error: error?.response?.data?.message || 'Unknown error',
      };
    });
  return response;
};

export const inviteUserToAlbum = async (
  albumId: string,
  formData: z.infer<ReturnType<typeof getInviteAlbumMemberSchema>>
) => {
  const {
    email,
    role,
  }: z.infer<ReturnType<typeof getInviteAlbumMemberSchema>> = formData;

  const response = await http
    .post(`/albums/${albumId}/invite`, {
      email,
      role,
    })
    .then((res) => {
      return {
        isSuccess: true,
        error: '',
      };
    })
    .catch((error) => {
      return {
        isSuccess: false,
        error: error?.response?.data?.message || 'Unknown error',
      };
    });
  return response;
};

export const outGroup = async (groupId: string, userId: string) => {
  const response = await http
    .put(`groups/${groupId}/out/${userId}`, undefined)
    .then((res) => {
      return {
        isSuccess: true,
        error: '',
      };
    })
    .catch((error) => {
      return {
        isSuccess: false,
        error: error?.response?.data?.message || 'Unknown error',
      };
    });
  return response;
};

export const outAlbum = async (albumId: string, userId: string) => {
  const response = await http
    .put(`albums/${albumId}/out/${userId}`, undefined)
    .then((res) => {
      return {
        isSuccess: true,
        error: '',
      };
    })
    .catch((error) => {
      return {
        isSuccess: false,
        error: error?.response?.data?.message || 'Unknown error',
      };
    });
  return response;
};

export const reactPhoto = async (photoId: string) => {
  const response = await http
    .post(`/photos/${photoId}/react`)
    .then((res) => {
      return {
        isSuccess: true,
        error: '',
        data: res.data,
      };
    })
    .catch((error) => {
      return {
        isSuccess: false,
        error: error?.response?.data?.error.message || 'Unknown error',
        data: null,
      };
    });
  return response;
};

export const updateGroup = async (
  groupId: string,
  formData: z.infer<ReturnType<typeof getUpdateGroupSettingSchema>>
) => {
  const {
    title,
    description,
    type,
    groupImg,
    setting,
  }: z.infer<ReturnType<typeof getUpdateGroupSettingSchema>> = formData;

  const response = await http
    .put(`/groups/${groupId}/update`, {
      title,
      description,
      type,
      groupImg,
      setting,
    })
    .then((res) => {
      return {
        isSuccess: true,
        error: '',
        data: res.data.setting as {
          allow_invite?: boolean;
          allow_create_album?: boolean;
          allow_share_album?: boolean;
          allow_share_photo?: boolean;
        },
      };
    })
    .catch((error) => {
      return {
        isSuccess: false,
        error: error?.response?.data?.message || 'Unknown error',
        data: {} as {
          allow_invite?: boolean;
          allow_create_album?: boolean;
          allow_share_album?: boolean;
          allow_share_photo?: boolean;
        },
      };
    });

  return response;
};
export const updateAlbum = async (
  albumId: string,
  formData: z.infer<ReturnType<typeof getUpdateAlbumSettingSchema>>
) => {
  const {
    title,
    description,
    setting,
  }: z.infer<ReturnType<typeof getUpdateAlbumSettingSchema>> = formData;

  const response = await http
    .put(`/albums/${albumId}/update`, {
      title,
      description,
      setting,
    })
    .then((res) => {
      return {
        isSuccess: true,
        error: '',
        data: res.data.setting as {
          allow_invite?: boolean;
          allow_share_album?: boolean;
          allow_share_photo?: boolean;
        },
      };
    })
    .catch((error) => {
      return {
        isSuccess: false,
        error: error?.response?.data?.message || 'Unknown error',
        data: {} as {
          allow_invite?: boolean;
          allow_share_album?: boolean;
          allow_share_photo?: boolean;
        },
      };
    });

  return response;
};

export const changeLanguage = async (language: string) => {
  const response = await http
    .put(`/users/me/setting`, {
      lang: language,
    })
    .then(() => {
      cookies().set('lang', language);
      return {
        isSuccess: true,
        error: '',
      };
    })
    .catch((error) => {
      return {
        isSuccess: false,
        error: error?.response?.data?.message || 'Unknown error',
      };
    });
  return response;
};

export const editPhoto = async (
  photoId: string,
  formData: z.infer<ReturnType<typeof getUpdatePhotoFormSchema>>
) => {
  const { title, tags } = formData;
  const response = await http
    .put(`/photos/${photoId}/update`, {
      title,
      tags,
    })
    .then(() => {
      return {
        isSuccess: true,
        error: '',
      };
    })
    .catch((error) => {
      return {
        isSuccess: false,
        error: error?.response?.data?.message || 'Unknown error',
      };
    });
  return response;
};

export const deletePhoto = async (photoId: string) => {
  return await http
    .delete(`/photos/${photoId}`)
    .then((res) => {
      return {
        isSuccess: true,
        error: '',
      };
    })
    .catch((error) => {
      return {
        isSuccess: false,
        error: error?.response?.data?.message || 'Unknown error',
      };
    });
};

export const updateUserProfile = async (
  formData: z.infer<ReturnType<typeof getProfileFormSchema>>
) => {
  try {
    const { image, fullName, username, phoneNumber, bio } = formData;

    const response = await http
      .put('/users/me/profile', {
        img: image,
        fullName,
        username,
        phoneNumber,
        bio,
      })
      .then((res) => {
        revalidateTag('user');
        return {
          isSuccess: true,
          error: '',
          data: res.data.user as User,
        };
      })
      .catch((error) => {
        return {
          isSuccess: false,
          error: error?.response?.data?.message || 'Unknown error',
          data: {} as User,
        };
      });

    return response;
  } catch (error: any) {
    return {
      isSuccess: false,
      error: error?.response?.data?.message || 'Unknown error',
      data: {} as User,
    };
  }
};

export const uploadImage = async (formData: FormData) => {
  try {
    const response = await http
      .post('/public/upload', formData)
      .then((res) => {
        return {
          isSuccess: true,
          error: '',
          data: res.data.url,
        };
      })
      .catch((error) => {
        return {
          isSuccess: false,
          error: error?.response?.data?.message || 'Unknown error',
          data: null,
        };
      });

    return response;
  } catch (error: any) {
    return {
      isSuccess: false,
      error: error.message || 'Unknown error',
      data: null,
    };
  }
};

export const sharePhoto = async (photoId: string, time: number) => {
  const response = await http
    .post(`/photos/${photoId}/share`, {
      time,
    })
    .then((res) => {
      return {
        isSuccess: true,
        error: '',
        data: res.data,
      };
    })
    .catch((error) => {
      return {
        isSuccess: false,
        error: error?.response?.data?.message || 'Unknown error',
        data: null,
      };
    });
  return response;
};

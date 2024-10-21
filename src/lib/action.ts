'use server';

import { z } from 'zod';
import {
  getCreateAlbumSchema,
  getCreateGroupSchema,
  getJoinGroupSchema,
  getLoginFormSchema,
  getRegisterFormSchema,
} from './form-schema';
import http from '@/config/axios';
import { cookies } from 'next/headers';
import { AuthResponse, UserJWT, UserNotification } from './define';
import { v4 as uuidv4 } from 'uuid';
import { base64Decode } from './utils';

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
): void => {
  handleStoreUserCredentials(signature, accessToken, refreshToken);
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
    return response.data as UserNotification[];
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

'use server';

import { z } from 'zod';
import { getCreateGroupFormSchema, getRegisterFormSchema } from './form-schema';
import http from '@/config/axios';

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
          error: (error?.response?.data?.message as string) || 'Unknown error',
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
        error: (error?.response?.data?.message as string) || 'Unknown error',
      };
    });
};

export const createGroup = async (
  formData: z.infer<ReturnType<typeof getCreateGroupFormSchema>>
) => {
  try {
    const { title, description }: z.infer<ReturnType<typeof getCreateGroupFormSchema>> = formData;

    const response = await http
      .post('/group/create', {
        title,
        description,
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
          error: (error?.response?.data?.message as string) || 'Unknown error',
        };
      });
    return response;
  } catch (error: any) {
    return {
      isSuccess: false,
      error: error.message || 'Unknown error',
    };
  }
}
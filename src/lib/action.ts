'use server';

import { z } from 'zod';
import { getRegisterFormSchema } from './form-schema';
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
          message: '',
          code: '',
        };
      })
      .catch((error) => {
        return {
          isSuccess: false,
          message:
            (error?.response?.data?.message as string) || 'Unknown error',
          code: (error?.response?.data?.code as string) || 'UC-00-BR-00',
        };
      });
    return response;
  } catch (error: any) {
    return {
      isSuccess: false,
      message: error.message || 'Unknown error',
      code: 'UC-00-BR-00',
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
        message: res.data.message as string,
        code: '',
      };
    })
    .catch((error) => {
      return {
        isSuccess: false,
        message: (error?.response?.data?.message as string) || 'Unknown error',
        code: (error?.response?.data?.code as string) || 'UC-00-BR-00',
      };
    });
};

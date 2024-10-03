import { z } from 'zod';
import { Locale } from './define';
import { getDictionary } from './utils';

export const getValidationMessages = (lang: Locale) => {
  const dict = getDictionary(lang);
  return dict.validation;
};

export const getRegisterFormSchema = (lang: Locale) => {
  const { registerFormSchema: messages } = getValidationMessages(lang);

  return z.object({
    fullName: z
      .string({ required_error: messages.fullName.required })
      .min(6, { message: messages.fullName.min })
      .max(50, { message: messages.fullName.max }),
    username: z
      .string({ required_error: messages.username.required })
      .min(6, { message: messages.username.min })
      .max(20, { message: messages.username.max }),
    email: z
      .string({ required_error: messages.email.required })
      .email({ message: messages.email.invalid }),
    phoneNumber: z
      .string()
      .min(10, { message: messages.phoneNumber.min })
      .optional()
      .or(z.literal(''))
      .transform((e) => (e === '' ? undefined : e)),
    password: z
      .string({ required_error: messages.password.required })
      .min(8, { message: messages.password.min })
      .refine((password) => /^(?=.*[A-Za-z])(?=.*\d).+$/.test(password), {
        message: messages.password.pattern,
      }),
  });
};

export const getCreateGroupFormSchema = (lang: Locale) => {
  const { createGroupFormSchema: messages } = getValidationMessages(lang);

  return z.object({
    title: z
      .string({ required_error: messages.title.required })
      .min(3, { message: messages.title.min })
      .max(50, { message: messages.title.max }),
    description: z
      .string()
      .optional()
      .or(z.literal(''))
      .transform((e) => (e === '' ? undefined : e)),
  });
}

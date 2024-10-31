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

export const getLoginFormSchema = (lang: Locale) => {
  const { loginFormSchema: messages } = getValidationMessages(lang);

  return z.object({
    email: z
      .string({ required_error: messages.email.required })
      .email({ message: messages.email.invalid }),
    password: z
      .string({ required_error: messages.password.required })
      .min(8, { message: messages.password.min }),
  });
};

export const getUpdatePhotoFormSchema = (lang: Locale) => {
  const { updatePhotoFormSchema: messages } = getValidationMessages(lang);
  return z.object({
    title: z.string().max(50, { message: messages.title.max }).optional(),
    tags: z
      .array(
        z.object({
          id: z.string(),
          text: z.string(),
        })
      )
      .max(10, messages.tags.max),
  });
};

export const getJoinGroupSchema = (lang: Locale) => {
  const { joinGroupSchema: messages } = getValidationMessages(lang);

  return z.object({
    code: z
      .string({ required_error: messages.code.required })
      .min(6, { message: messages.code.min })
      .max(6, { message: messages.code.max }),
  });
};

export const getCreateGroupSchema = (lang: Locale) => {
  const { createGroupSchema: messages } = getValidationMessages(lang);

  return z.object({
    title: z
      .string({ required_error: messages.title.required })
      .min(3, { message: messages.title.min })
      .max(50, { message: messages.title.max }),

    description: z
      .string()
      .optional()
      .refine((val) => val === undefined || val === '' || val.length >= 10, {
        message: messages.description.min,
      })
      .refine((val) => val === undefined || val === '' || val.length <= 300, {
        message: messages.description.max,
      }),

    type: z.enum(['PUBLIC', 'PRIVATE', 'HIDDEN']),
  });
};

export const getUpdateGroupSettingSchema = (lang: Locale) => {
  const { createGroupSchema: messages } = getValidationMessages(lang);

  return z.object({
    title: z
      .string({ required_error: messages.title.required })
      .min(3, { message: messages.title.min })
      .max(50, { message: messages.title.max }),

    description: z
      .string()
      .optional()
      .refine((val) => val === undefined || val === '' || val.length >= 10, {
        message: messages.description.min,
      })
      .refine((val) => val === undefined || val === '' || val.length <= 300, {
        message: messages.description.max,
      }),
    groupImg: z.string().optional(),
    type: z.enum(['PUBLIC', 'PRIVATE', 'HIDDEN']),
    setting: z.object({
      allow_invite: z.boolean(),
      allow_create_album: z.boolean(),
      allow_share_album: z.boolean(),
      allow_share_photo: z.boolean(),
    }),
  });
};

export const getCreateAlbumSchema = (lang: Locale) => {
  const { createAlbumSchema: messages } = getValidationMessages(lang);

  return z.object({
    title: z
      .string({ required_error: messages.title.required })
      .min(2, { message: messages.title.min })
      .max(50, { message: messages.title.max }),

    description: z
      .string()
      .optional()
      .refine((val) => val === undefined || val === '' || val.length >= 10, {
        message: messages.description.min,
      })
      .refine((val) => val === undefined || val === '' || val.length <= 300, {
        message: messages.description.max,
      }),
  });
};

export const getCommentFormSchema = (lang: Locale) => {
  const { commentSchema: messages } = getValidationMessages(lang);

  return z.object({
    content: z
      .string({ required_error: messages.content.required })
      .max(300, { message: messages.content.max }),
  });
};

export const getInviteGroupMemberSchema = (lang: Locale) => {
  const { inviteGroupMemberSchema: messages } = getValidationMessages(lang);

  return z.object({
    email: z
      .string({ required_error: messages.email.required })
      .email({ message: messages.email.invalid }),
    role: z.enum(['MEMBER', 'OWNER']),
  });
};

export const getProfileFormSchema = (lang: Locale) => {
  const { profileFormSchema: messages } = getValidationMessages(lang);

  return z.object({
    image: z.any().optional(),
    fullName: z
      .string({ required_error: messages.fullName.required })
      .min(6, { message: messages.fullName.min })
      .max(50, { message: messages.fullName.max }),
    username: z
      .string({ required_error: messages.username.required })
      .min(6, { message: messages.username.min })
      .max(20, { message: messages.username.max }),
    email: z.string().email({ message: messages.email.invalid }).optional(),
    phoneNumber: z
      .string()
      .min(10, { message: messages.phoneNumber.min })
      .optional()
      .or(z.literal(''))
      .transform((e) => (e === '' ? undefined : e)),
    bio: z
      .string()
      .max(10000, { message: messages.bio.max })
      .optional()
      .or(z.literal(''))
      .transform((e) => (e === '' ? undefined : e)),
  });
};

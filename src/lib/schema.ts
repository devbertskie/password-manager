import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE } from '@/constants';
import { z } from 'zod';

export const formRegisterSchema = z.object({
  username: z
    .string()
    .min(6, { message: 'Username must contain at least 6 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Username must contain at least 6 characters' }),
});

export const formLoginSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export const profileFormSchema = z.object({
  username: z
    .string()
    .transform((value) => value.replace(/\s+/g, ''))
    .pipe(z.string().min(6, { message: 'Min at least 6 characters' })),
  email: z
    .string()
    .transform((value) => value.replace(/\s+/g, ''))
    .pipe(z.string().email('Invalid Email')),
});

export const avatarUploadSchema = z.object({
  imageUrl: z
    .custom<FileList>((f) => f instanceof FileList, 'Required')
    .refine((files) => files.length !== 0, `File is Required!`)
    .refine((files) => files.length <= 1, `Only one image allowed.`)
    .refine(
      (files) => Array.from(files).every((file) => file.size <= MAX_IMAGE_SIZE),
      `File size should be less than 5 MB`,
    )
    .refine(
      (files) =>
        Array.from(files).every((file) =>
          ALLOWED_IMAGE_TYPES.includes(file.type),
        ),
      `Only these types are allowed .jpg .png .jpeg`,
    ),
});

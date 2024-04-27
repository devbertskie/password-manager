import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE } from '@/constants';
import { z } from 'zod';

export const formRegisterSchema = z.object({
  username: z
    .string()
    .min(6, { message: 'Username must contain at least 6 characters' })
    .trim(),
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(6, { message: 'Username must contain at least 6 characters' })
    .trim(),
});

export const formLoginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Email is required' })
    .toLowerCase()
    .trim(),
  password: z.string().min(1, { message: 'Password is required' }).trim(),
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

export const credentialFormSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current Password is required'),
    newPassword: z
      .string()
      .min(6, 'Password must be at least minimum of 6 characters'),
    confirmPassword: z.string().min(1, 'Confirm Password is required'),
  })
  .refine(
    (values) => {
      return values.newPassword === values.confirmPassword;
    },
    {
      message: 'Password must match!',
      path: ['confirmPassword'],
    },
  );

export const webCredentialFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  siteUrl: z.string().url('Url is required'),
  usernameOrEmail: z.string().min(1, 'Username/Email is required'),
  password: z.string().min(1, 'Password is required'),
  isImportant: z.boolean().default(false).optional(),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: 'Email is required' })
    .toLowerCase()
    .trim(),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(1, { message: 'New password is required' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm password is required' }),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password must match!',
  });

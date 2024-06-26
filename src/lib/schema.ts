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
    .min(6, { message: 'Password must contain at least 6 characters' })
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
  username: z.optional(
    z.string().min(6, { message: 'Min at least 6 characters' }).trim(),
  ),
  email: z.optional(z.string().email('Invalid Email').toLowerCase().trim()),
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
    currentPassword: z.string().min(1, 'Current Password is required').trim(),
    newPassword: z
      .string()
      .min(6, 'Password must be at least minimum of 6 characters')
      .trim(),
    confirmPassword: z.string().min(1, 'Confirm Password is required').trim(),
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

// EMAIL CREDENTIAL SCHEMA

export const emailCredentialFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  siteUrl: z.string().url('Url is required'),
  usernameOrEmail: z
    .string()
    .email('Email is required')
    .min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
  isImportant: z.boolean().default(false).optional(),
});

// NOTE

const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);

type Literal = z.infer<typeof literalSchema>;

type Json = Literal | { [key: string]: Json } | Json[];

const jsonSchema: z.ZodType<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]),
);

export const noteFormSchema = z.object({
  title: z.string().min(6, 'Minimumn of 6 characters').trim(),
  content: z
    .string()
    .min(6, { message: 'Minimum of 6 characters' })
    // .max(1000, { message: 'Maximum of 1000 characters' })
    .trim()
    .transform((str, ctx): z.infer<typeof jsonSchema> => {
      try {
        return JSON.parse(str);
      } catch (error) {
        ctx.addIssue({ code: 'custom', message: 'Invalid JSON' });
        return z.NEVER;
      }
    }),
  isImportant: z.boolean().default(false).optional(),
});

import { z } from 'zod';

export const formRegisterSchema = z.object({
  username: z
    .string()
    .min(6, { message: 'Username muct contain at least 6 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Username muct contain at least 6 characters' }),
});

export const formLoginSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

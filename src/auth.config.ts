import { NextAuthConfig } from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';
import { formLoginSchema } from './lib/schema';
import { db } from './db';
import { compare } from 'bcrypt';

export const authConfig = {
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials) {
        if (!credentials) return null;

        const loginSchemaFields = formLoginSchema.safeParse(credentials);
        if (!loginSchemaFields.success) return null;

        const { email, password } = loginSchemaFields.data;

        const existingUser = await db.user.findFirst({
          where: { email },
          select: {
            id: true,
            email: true,
            password: true,
          },
        });
        if (!existingUser) return null;

        const isPasswordValid = await compare(password, existingUser.password);

        if (!isPasswordValid) return null;

        const { password: omittedPassword, ...rest } = existingUser;

        return {
          ...rest,
          id: String(rest.id),
        };
      },
    }),
  ],
} satisfies NextAuthConfig;

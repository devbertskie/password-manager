import { db } from '@/db';
import { compare } from 'bcrypt';
import NextAuth from 'next-auth';

import Credentials from 'next-auth/providers/credentials';
import { InvalidCredentialError } from '@/lib/errors';

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new InvalidCredentialError();
        }

        const existingUser = await db.user.findUnique({
          where: { email: String(credentials.email) },
        });

        if (!existingUser) {
          throw new InvalidCredentialError();
        }

        const isPasswordMatched = await compare(
          String(credentials.password),
          existingUser.password,
        );

        if (!isPasswordMatched) {
          throw new InvalidCredentialError();
        }

        return {
          id: String(existingUser.id),
          email: existingUser.email,
          username: existingUser.username,
          picture: existingUser.image_url,
          userId: String(existingUser.id),
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, trigger, session, user }) {
      if (trigger === 'update') {
        return { ...token, ...session.user };
      }
      if (user) {
        return {
          ...token,
          username: user.username,
          userId: user.id,
          picture: user.picture,
        };
      }
      return token;
    },

    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
});

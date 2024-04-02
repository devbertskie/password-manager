import { db } from '@/db';
import { compare } from 'bcrypt';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  // secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Invalid credentials!');
        }

        const existingUser = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!existingUser) {
          throw new Error('No credentials found!');
        }

        const isPasswordMatched = await compare(
          credentials.password,
          existingUser.password,
        );

        if (!isPasswordMatched) {
          throw new Error('Invalid Credentials');
        }

        return {
          id: String(existingUser.id),
          email: existingUser.email,
          username: existingUser.username,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      console.log(user);
      if (user) {
        return {
          ...token,
          username: user.username,
        };
      }

      return token;
    },

    async session({ session, token, user }) {
      console.log(token);
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
        },
      };
    },
  },
};

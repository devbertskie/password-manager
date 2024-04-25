/* eslint-disable no-unused-vars */
import NextAuth, { type DefaultSession } from 'next-auth';
import authConfig from '@/auth.config';
import { JWT } from 'next-auth/jwt';
import { db } from '@/db';
import { UserRole } from '@prisma/client';
import { setFlash } from '@/components/shared/feedback';

declare module 'next-auth' {
  interface Session {
    user: {
      username: string;
      role: UserRole;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    username: string;
    role: UserRole;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  pages: {
    signIn: '/login',
    error: '/error',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user }) {
      if (!user || !user.id) return false;
      const currentUser = await db.user.findUnique({
        where: { id: Number(user.id) },
      });
      if (!currentUser) return false;
      if (!currentUser.emailVerified) return false;
      setFlash({
        type: 'SUCCESS',
        message: 'Welcome back 🎉',
        timestamp: Date.now(),
      });
      return true;
    },
    async jwt({ token, trigger, session }) {
      if (!token.sub) return token;

      const currentUser = await db.user.findUnique({
        where: { id: Number(token.sub) },
      });

      // trigger when user update the image profile
      if (trigger === 'update' && session?.user.image) {
        token.picture = session.user.image;
      }

      if (!currentUser || !currentUser.role || !currentUser.username)
        return token;
      token.picture = currentUser.image_url;
      token.username = currentUser.username;
      token.role = currentUser.role;
      return token;
    },
    async session({ token, session, trigger }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.username = token.username;
        session.user.image = token.picture;
        session.user.role = token.role;
      }
      return session;
    },
  },
  ...authConfig,
});

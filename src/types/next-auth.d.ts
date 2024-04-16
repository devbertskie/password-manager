/* eslint-disable no-unused-vars */
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    username: string;
    picture: string;
    userId: string;
  }
  interface Session {
    user: User & {
      username: string;
      picture: string;
      userId: string;
    };
    token: {
      username: string;
      userId: string;
    };
  }
}

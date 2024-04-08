/* eslint-disable no-unused-vars */
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    username: string;
    picture: string;
  }
  interface Session {
    user: User & {
      username: string;
      picture: string;
    };
    token: {
      username: string;
    };
  }
}

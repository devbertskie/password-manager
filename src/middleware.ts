export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/dashboard',
    '/web',
    '/passwords',
    '/identities',
    '/emails',
    '/notes',
  ],
};

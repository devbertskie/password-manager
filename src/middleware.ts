import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {}
export const config = {
  matcher: [
    '/dashboard',
    '/web',
    '/passwords',
    '/identities',
    '/emails',
    '/notes',
    '/settings',
  ],
};

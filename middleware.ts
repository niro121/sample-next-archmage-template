import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { auth } from '@/lib/auth';

// export async function middleware(request: NextRequest) {
//   const session = await auth();
//   console.log({ session });

//   const currentUrl = new URL(request.url);
//   const pathname = currentUrl.pathname;
//   const isAdmin = session?.user.isAdmin;

//   console.log({ pathname });

//   // Prevent redirection loop by not redirecting if already on the correct page
//   if (session?.user) {
//     if (isAdmin && pathname === '/login') {
//       return NextResponse.redirect(new URL('/dashboard/products', request.url));
//     } else if (!isAdmin && pathname !== '/login') {
//       return NextResponse.redirect(new URL('/dashboard', request.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
// };

import NextAuth from 'next-auth';
import { authConfig } from './lib/auth.config';

export default NextAuth(authConfig as any).auth;

// console.log('executed the middleware');

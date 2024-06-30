import { NextResponse } from 'next/server';
import { db } from './db';
import { users } from './models/users/usersModel';
import { eq } from 'drizzle-orm';

const dashboardConfigs = [
  {
    route: '/dashboard/users',
    isPrivateRoute: true,
    isAdmin: true
  },
  {
    route: '/dashboard/products',
    isPrivateRoute: false
  },
  {
    route: '/dashboard/settings',
    isPrivateRoute: true,
    isAdmin: true
  }
];

export const authConfig = {
  pages: {
    signIn: '/login'
  },
  providers: [],

  callbacks: {
    async signIn({ user, account, profile }: any) {
      if (account && account.provider === 'github') {
        try {
          const currentUser = await db
            .select()
            .from(users)
            .where(eq(users.email, user.email as string));

          if (currentUser.length === 0) {
            await db.insert(users).values({
              name: user.name as string,
              email: user.email as string,
              username: profile && (profile.login as string)
            });
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      }
      return true;
    },
    async session({ session, user }: any) {
      try {
        const currentUser = await db
          .select()
          .from(users)
          .where(eq(users.email, session.user.email as string));

        if (currentUser.length > 0) {
          session.user = {
            ...session.user,
            isAdmin: currentUser[0].isadmin
          };
        }
        return session;
      } catch (err) {
        console.log(err);
        return session;
      }
    },
    authorized({ auth, request }: any) {
      const user = auth?.user;
      const isAdmin = auth?.user.isAdmin;
      const currentPath = request.nextUrl?.pathname;

      const response = NextResponse.redirect(new URL('/login', request.url));

      if (user) {
        if (currentPath === '/login') {
          return NextResponse.redirect(new URL('/dashboard', request.url));
        }
      }

      const dashboardRoute = dashboardConfigs.find(
        (config) => config.route === currentPath
      );

      if (dashboardRoute) {
        if (dashboardRoute.isPrivateRoute) {
          if (!user) {
            return NextResponse.redirect(new URL('/login', request.url));
          }

          if (dashboardRoute.isAdmin && !isAdmin) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
          }
        }
      }

      return NextResponse.next();
    }
  }
};

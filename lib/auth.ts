import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { db } from './db';
import { users } from './models/users/usersModel';
import { eq } from 'drizzle-orm';
import { authConfig } from './auth.config';

declare module 'next-auth' {
  interface Session {
    user: {
      image: string;
      name: string | null;
      email: string | null;
      username: string | null;
      isAdmin: boolean | null;
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [GitHub],
  callbacks: {
    async signIn({ user, account, profile }) {
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
    async session({ session, user }) {
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
    ...authConfig.callbacks
  }
});

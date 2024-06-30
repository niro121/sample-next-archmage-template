import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
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
    ...authConfig.callbacks
  }
});

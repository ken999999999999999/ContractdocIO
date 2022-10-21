import GoogleProvider from 'next-auth/providers/google';
import type { Session } from 'next-auth';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';

export const authOptions: NextAuthOptions = {
  secret: process.env.SECRET,
  callbacks: {
    session({ session, token }: { session: Session; token: JWT }) {
      return session; // The return type will match the one returned in `useSession()`
    }
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })
  ]
};

export default NextAuth(authOptions);

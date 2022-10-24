import IdentityServer4Provider from 'next-auth/providers/identity-server4';
import type { Session } from 'next-auth';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';

export const authOptions: NextAuthOptions = {
  secret: process.env.SECRET,
  callbacks: {
    async jwt({ account, token }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session; // The return type will match the one returned in `useSession()`
    }
  },
  providers: [
    IdentityServer4Provider({
      issuer: process.env.IdentityServer4_Issuer,
      clientId: process.env.IdentityServer4_CLIENT_ID
    })
  ]
};

export default NextAuth(authOptions);

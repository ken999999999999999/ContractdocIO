import IdentityServer4Provider from 'next-auth/providers/identity-server4';
import NextAuth, { NextAuthOptions } from 'next-auth';

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
      clientId: process.env.IdentityServer4_CLIENT_ID,
      clientSecret: process.env.IdentityServer4_CLIENT_SECRET,
      authorization: {
        params: { scope: 'openid profile ContactdocIO.WebUIAPI' }
      }
    })
  ]
};

export default NextAuth(authOptions);

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { ethers } from 'ethers';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      return true; // Allow sign-in
    },
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
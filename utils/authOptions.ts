import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { Session, Profile } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on successful signin
    async signIn({ profile }: { profile?: Profile }): Promise<boolean> {
      if (profile?.email) {
        console.log(profile);
        return true;
      }
      return false; // return false if no email found in profile
    },
    // Modifies the session object
    async session({ session }: { session: Session }): Promise<Session> {
      console.log(session);
      return session;
    },
  },
};

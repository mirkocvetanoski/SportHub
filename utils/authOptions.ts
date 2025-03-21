import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { Session, Profile } from 'next-auth';
import User from '@/models/User';
import connectDB from '@/config/database';

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
        // 1. Connect to database
        await connectDB();
        // 2. Check if user exists
        const userExists = await User.findOne({ email: profile.email });
        // 3. If not, then add user to database
        if (!userExists) {
          await User.create({
            googleId: profile.sub,
            email: profile.email,
          });
        }
      }
      // 4. Return true to allow sign in
      return true;
    },
    // Modifies the session object
    async session({ session }: { session: Session }): Promise<Session> {
      if (session.user) {
        const user = await User.findOne({ email: session.user.email });
        if (user) {
          session.user.id = user._id.toString();
        }
      }
      return session;
    },
  },
};

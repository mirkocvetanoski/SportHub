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
        try {
          // 1. Connect to the database if not already connected
          await connectDB();

          // 2. Check if the user exists in the database
          const userExists = await User.findOne({ email: profile.email });

          // 3. If user doesn't exist, create a new user
          if (!userExists) {
            await User.create({
              googleId: profile.sub,
              email: profile.email,
            });
          }
        } catch (error) {
          console.error('Error during sign-in:', error);
          return false; // Return false in case of an error
        }
      }
      return true;
    },
    // Modifies the session object
    async session({ session }: { session: Session }): Promise<Session> {
      if (session.user) {
        try {
          const user = await User.findOne({ email: session.user.email });
          if (user) {
            session.user.id = user._id.toString();
          }
        } catch (error) {
          console.error('Error fetching user during session update:', error);
        }
      }
      return session;
    },
  },
};

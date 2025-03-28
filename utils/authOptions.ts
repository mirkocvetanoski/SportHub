import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/models/User';
import connectDB from '@/config/database';
import bcrypt from 'bcryptjs';

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
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'email@example.com',
        },
        password: { label: 'Password', type: 'password' },
        username: { label: 'Username', type: 'text', required: false },
      },
      async authorize(credentials) {
        await connectDB();

        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        const existingUser = await User.findOne({ email: credentials.email });

        if (!existingUser) {
          throw new Error('Invalid credentials');
        }

        if (!existingUser.password) {
          throw new Error('Please sign in with your social account');
        }

        const isMatch = await bcrypt.compare(
          credentials.password,
          existingUser.password
        );

        if (!isMatch) {
          throw new Error('Invalid credentials');
        }

        return {
          id: existingUser._id.toString(),
          email: existingUser.email,
          name: existingUser.name || existingUser.username,
          username: existingUser.username,
          createdAt: existingUser.createdAt.toISOString(), // ✅ Include createdAt
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      await connectDB();

      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.username = user.username;
        token.createdAt = user.createdAt; // ✅ Ensure createdAt is stored
      }

      if (account?.provider === 'google') {
        let existingUser = await User.findOne({ email: token.email });

        if (!existingUser) {
          existingUser = await User.create({
            googleId: token.sub,
            email: token.email,
            name: token.name,
            username: token.email?.split('@')[0],
          });
        } else if (!existingUser.googleId) {
          existingUser.googleId = token.sub;
          await existingUser.save();
        }

        token.id = existingUser._id.toString();
        token.username = existingUser.username;
        token.createdAt = existingUser.createdAt.toISOString(); // ✅ Convert Date to string
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.username = token.username as string;
        session.user.createdAt = token.createdAt as string; // Pass createdAt to session
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

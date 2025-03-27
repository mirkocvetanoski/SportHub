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

        // If no username is provided and the user exists -> login flow
        if (!credentials.username && existingUser) {
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
          };
        }

        // If username is provided
        if (credentials.username) {
          // Check if email already exists with a different user
          if (existingUser && existingUser.email !== credentials.email) {
            throw new Error('Email is already registered');
          }

          const usernameExists = await User.findOne({
            username: credentials.username,
          });

          // If username exists, throw an error
          if (usernameExists) {
            throw new Error('Username is already taken');
          }

          // If user does not exist, create a new user
          if (!existingUser) {
            const hashedPassword = await bcrypt.hash(credentials.password, 12);
            const newUser = await User.create({
              email: credentials.email,
              password: hashedPassword,
              username: credentials.username,
              name: credentials.username,
            });

            return {
              id: newUser._id.toString(),
              email: newUser.email,
              name: newUser.name,
              username: newUser.username,
            };
          }
        }

        // If no username is provided and user does not exist -> throw an error
        throw new Error('Username is required for registration');
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
      }

      if (account?.provider === 'google') {
        const existingUser = await User.findOne({ email: token.email });

        if (!existingUser) {
          const newUser = await User.create({
            googleId: token.sub,
            email: token.email,
            name: token.name,
            username: token.email?.split('@')[0],
          });
          token.id = newUser._id.toString();
          token.username = newUser.username;
        } else {
          if (!existingUser.googleId) {
            existingUser.googleId = token.sub;
            await existingUser.save();
          }
          token.id = existingUser._id.toString();
          token.username = existingUser.username;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.username = token.username as string;
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

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
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', required: true },
        password: { label: 'Password', type: 'password', required: true },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error('Missing email or password');
        }

        await connectDB();

        let user = await User.findOne({ email: credentials.email });

        if (!user) {
          // If no user is found, create a new one (Sign-up logic)
          const hashedPassword = await bcrypt.hash(credentials.password, 12);
          user = await User.create({
            email: credentials.email,
            password: hashedPassword,
            name: credentials.email.split('@')[0], // Default name logic, modify as needed
          });
        } else {
          // If user exists, check the password
          const isMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isMatch) {
            throw new Error('Invalid credentials');
          }
        }

        return { id: user._id.toString(), email: user.email, name: user.name };
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
      }

      if (account?.provider === 'google') {
        const existingUser = await User.findOne({ email: token.email });

        if (!existingUser) {
          const newUser = await User.create({
            googleId: token.sub,
            email: token.email,
            name: token.name,
          });
          token.id = newUser._id.toString();
        } else {
          token.id = existingUser._id.toString();
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

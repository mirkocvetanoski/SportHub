// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      googleId: string;
      username: string;
      email: string;
      name: string;
      createdAt?: string;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    username: string;
    createdAt?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    username: string;
  }
}

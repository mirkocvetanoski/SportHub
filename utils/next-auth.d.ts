// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      username: string;
      email: string;
      name: string;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    username: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    username: string;
  }
}

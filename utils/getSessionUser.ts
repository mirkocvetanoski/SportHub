import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';
import { Session } from 'next-auth';

interface SessionUser {
  user: {
    id: string;
    // Other properties of user can be added here if needed
  };
  userId: string;
}

export const getSessionUser = async (): Promise<SessionUser | null> => {
  try {
    const session: Session | null = await getServerSession(authOptions);

    // Check if the session is null or if session.user is undefined
    if (!session) {
      console.error('No session found');
      return null;
    }

    if (!session.user) {
      console.error('Session exists, but no user found', session);
      return null;
    }

    // Assuming the session contains a user object with an id property
    return {
      user: session.user,
      userId: session.user.id,
    };
  } catch (error) {
    console.error('Error retrieving session:', error);
    return null;
  }
};

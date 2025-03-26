import Navbar from './Navbar';
import { ColorModeProvider } from '@/components/ui/color-mode';
import User from '@/models/User';
import { SimpleGrid } from '@chakra-ui/react';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

interface JwtPayload {
  userId: string;
}

const MainLayout = async ({ children }: MainLayoutProps) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('SPORTSHUB_ACCESS_TOKEN')?.value;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      const user = await User.findById(decoded.userId);
      console.log(user);
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }

  return (
    <ColorModeProvider forcedTheme="dark">
      <SimpleGrid width="100vw">
        <Navbar />
        {children}
      </SimpleGrid>
    </ColorModeProvider>
  );
};

export default MainLayout;

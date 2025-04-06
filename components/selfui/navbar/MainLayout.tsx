import Navbar from './Navbar';
import { SimpleGrid } from '@chakra-ui/react';

import { ColorModeProvider } from '@/components/ui/color-mode';
import { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
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

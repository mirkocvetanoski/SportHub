import Navbar from './Navbar';

import { ColorModeProvider } from '@/components/ui/color-mode';
import { Theme } from '@chakra-ui/react';

const MainLayout = (props: { children: React.ReactNode }) => {
  const { children } = props;

  return (
    <ColorModeProvider forcedTheme="dark">
      <Theme colorScheme="dark">
        <main className="min-w-screen grid min-h-screen grid-cols-1 items-start justify-items-center">
          <Navbar />
          {children}
        </main>
      </Theme>
    </ColorModeProvider>
  );
};

export default MainLayout;

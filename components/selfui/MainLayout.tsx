import Navbar from './Navbar';

import { ColorModeProvider } from '@/components/ui/color-mode';
import { SimpleGrid, Theme } from '@chakra-ui/react';

const MainLayout = (props: { children: React.ReactNode }) => {
  const { children } = props;

  return (
    <ColorModeProvider forcedTheme="dark">
      <Theme colorScheme="dark">
        <SimpleGrid width="100vw">
          <Navbar />
          {children}
        </SimpleGrid>
      </Theme>
    </ColorModeProvider>
  );
};

export default MainLayout;

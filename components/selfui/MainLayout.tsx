import Navbar from './Navbar';

import { ColorModeProvider } from '@/components/ui/color-mode';
import { SimpleGrid, Theme } from '@chakra-ui/react';
import { cookies } from 'next/headers';

const MainLayout = async (props: { children: React.ReactNode }) => {
  const { children } = props;

  const cookieStore = await cookies();
  const token = cookieStore.get('SPORTSHUB_ACCESS_TOKEN');

  console.log(token);

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

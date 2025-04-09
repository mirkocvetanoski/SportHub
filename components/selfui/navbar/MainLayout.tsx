import Navbar from './Navbar';
import { SimpleGrid } from '@chakra-ui/react';
import { ReactNode } from 'react';
interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = async ({ children }: MainLayoutProps) => {
  return (
    <SimpleGrid width="100vw">
      <Navbar />
      {children}
    </SimpleGrid>
  );
};

export default MainLayout;

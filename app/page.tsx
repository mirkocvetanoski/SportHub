import Competitions from '@/components/selfui/main/Competitions';
import MainLayout from '@/components/selfui/navbar/MainLayout';

const HomePage = async () => {
  return (
    <MainLayout>
      <Competitions />
    </MainLayout>
  );
};

export default HomePage;

import Competitions from '@/components/selfui/main/Competitions';
import MainLayout from '@/components/selfui/navbar/MainLayout';
import connectDB from '@/config/database';

const HomePage = async () => {
  await connectDB();

  return (
    <MainLayout>
      <Competitions />
    </MainLayout>
  );
};

export default HomePage;

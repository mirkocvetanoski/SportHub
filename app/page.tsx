import MainLayout from '@/components/selfui/MainLayout';
import connectDB from '@/config/database';

const HomePage = async () => {
  await connectDB();

  return (
    <MainLayout>
      <div className="h-[calc(100vh-100px)]">HomePage</div>
    </MainLayout>
  );
};

export default HomePage;

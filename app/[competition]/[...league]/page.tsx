import MainLayout from '@/components/selfui/navbar/MainLayout';
import Competitions from '@/components/selfui/main/Competitions';
import Leagues from '@/components/selfui/main/Leagues';
import Footer from '@/components/selfui/footer/Footer';
import { ActiveLeague } from '@/components/selfui/main/ActiveLeague';

const ActiveLeaguePage = () => {
  return (
    <MainLayout>
      <Competitions />
      <ActiveLeague />
      <Leagues />
      <Footer />
    </MainLayout>
  );
};

export default ActiveLeaguePage;

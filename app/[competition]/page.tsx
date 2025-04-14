import MainLayout from '@/components/selfui/navbar/MainLayout';
import Competitions from '@/components/selfui/main/Competitions';
import Leagues from '@/components/selfui/sidebar/Leagues';
import Footer from '@/components/selfui/footer/Footer';

const CompetitionsPage = () => {
  return (
    <MainLayout>
      <Competitions />
      <Leagues />
      <Footer />
    </MainLayout>
  );
};

export default CompetitionsPage;

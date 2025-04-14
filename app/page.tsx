import Footer from '@/components/selfui/footer/Footer';
import Competitions from '@/components/selfui/main/Competitions';
import MainLayout from '@/components/selfui/navbar/MainLayout';
import Leagues from '@/components/selfui/sidebar/Leagues';

export default function HomePage() {
  return (
    <MainLayout>
      <Competitions />
      <Leagues />
      <Footer />
    </MainLayout>
  );
}

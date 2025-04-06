import Competitions from '@/components/selfui/main/Competitions';
import MainLayout from '@/components/selfui/navbar/MainLayout';

export default function HomePage() {
  return (
    <MainLayout>
      <Competitions />
      <div>Scores</div>
    </MainLayout>
  );
}

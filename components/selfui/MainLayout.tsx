import Navbar from './Navbar';

const MainLayout = (props: { children: React.ReactNode }) => {
  const { children } = props;

  return (
    <main className="min-w-screen grid min-h-screen grid-cols-1 items-start justify-items-center">
      <Navbar />
      {children}
    </main>
  );
};

export default MainLayout;

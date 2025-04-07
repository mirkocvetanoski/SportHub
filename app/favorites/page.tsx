import Competitions from '@/components/selfui/main/Competitions';
import MainLayout from '@/components/selfui/navbar/MainLayout';
import React from 'react';

const Favorites = () => {
  return (
    <MainLayout>
      <Competitions />
      <div>Favorites</div>
    </MainLayout>
  );
};

export default Favorites;

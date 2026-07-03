'use client';

import React from 'react';
import TeamsGallery from '../../components/Teams/TeamsGallery';
import TeamComparison from '../../components/Teams/TeamComparison';
import Footer from '../../components/Navigation/Footer';

export default function TeamsPage() {
  return (
    <main style={{ backgroundColor: '#000', minHeight: '100vh' }}>
      <TeamsGallery />
      <TeamComparison />
      <Footer />
    </main>
  );
}
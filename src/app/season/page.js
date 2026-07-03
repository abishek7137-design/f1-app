'use client';

import React from 'react';
import SeasonHero from '../../components/Season/SeasonHero';
import FullDriverStandings from '../../components/Season/FullDriverStandings';
import ConstructorChampionship from '../../components/Home/ConstructorChampionship';
import SeasonCalendar from '../../components/Season/SeasonCalendar';
import SeasonStatsDashboard from '../../components/Season/SeasonStatsDashboard';
import Footer from '../../components/Navigation/Footer';

export default function SeasonPage() {
  return (
    <main style={{ backgroundColor: '#000', minHeight: '100vh' }}>
      <SeasonHero />
      <FullDriverStandings />
      <ConstructorChampionship />
      <SeasonStatsDashboard />
      <SeasonCalendar />
      <Footer />
    </main>
  );
}
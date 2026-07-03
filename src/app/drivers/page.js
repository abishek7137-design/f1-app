'use client';

import React, { useState } from 'react';
import NavigationBar from '../../components/Navigation/NavigationBar';
import Footer from '../../components/Navigation/Footer';
import { driversExtendedData } from '../../data/driversData';

// Section Components (To be built)
import DriverHero from '../../components/Drivers/Sections/DriverHero';
import DriverCarousel from '../../components/Drivers/Sections/DriverCarousel';
import DriverStandingsAnimated from '../../components/Drivers/Sections/DriverStandingsAnimated';
import HeadToHead from '../../components/Drivers/Sections/HeadToHead';
import CareerTimeline from '../../components/Drivers/Sections/CareerTimeline';
import DriverEquipment from '../../components/Drivers/Sections/DriverEquipment';
import DriverHUD from '../../components/Drivers/Sections/DriverHUD';
import TeamRadio from '../../components/Drivers/Sections/TeamRadio';
import FavoriteCircuitsMap from '../../components/Drivers/Sections/FavoriteCircuitsMap';
import PhotoGallery from '../../components/Drivers/Sections/PhotoGallery';
import TrophyRoom from '../../components/Drivers/Sections/TrophyRoom';
import NextRacePredictor from '../../components/Drivers/Sections/NextRacePredictor';

export default function DriversPage() {
  // Global state for the 12-section layout
  const [selectedDriverId, setSelectedDriverId] = useState(driversExtendedData[0].id);

  // Derive the active driver object
  const activeDriver = driversExtendedData.find(d => d.id === selectedDriverId) || driversExtendedData[0];

  return (
    <main style={{ backgroundColor: '#050505', minHeight: '100vh', overflowX: 'hidden' }}>
      <NavigationBar />
      
      {/* SECTION 1: Fullscreen Hero */}
      <DriverHero driver={activeDriver} />

      {/* SECTION 2: Featured Drivers Carousel */}
      <DriverCarousel 
        activeDriverId={activeDriver.id} 
        onSelectDriver={setSelectedDriverId} 
        allDrivers={driversExtendedData} 
      />

      {/* SECTION 3: 2026 Driver Championship */}
      <DriverStandingsAnimated />

      {/* SECTION 4: Head to Head */}
      <HeadToHead currentDriver={activeDriver} allDrivers={driversExtendedData} />

      {/* SECTION 5: Career Timeline */}
      <CareerTimeline driver={activeDriver} />

      {/* SECTION 6: Driver Equipment */}
      <DriverEquipment driver={activeDriver} />

      {/* SECTION 7: Statistics HUD */}
      <DriverHUD driver={activeDriver} />

      {/* SECTION 8: Team Radio */}
      <TeamRadio driver={activeDriver} />

      {/* SECTION 9: Favorite Circuits Map */}
      <FavoriteCircuitsMap driver={activeDriver} />

      {/* SECTION 10: Photo Gallery */}
      <PhotoGallery driver={activeDriver} />

      {/* SECTION 11: Trophy Room */}
      <TrophyRoom driver={activeDriver} />

      {/* SECTION 12: Next Race Predictor */}
      <NextRacePredictor driver={activeDriver} />

      <Footer />
    </main>
  );
}

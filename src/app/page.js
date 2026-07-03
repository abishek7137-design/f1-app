'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ScrollSequence from '../components/Intro/ScrollSequence';
import NextRace from '../components/Home/NextRace';
import DriverChampionship from '../components/Home/DriverChampionship';
import ConstructorChampionship from '../components/Home/ConstructorChampionship';
import FeaturedDrivers from '../components/Home/FeaturedDrivers';
import FeaturedTeams from '../components/Home/FeaturedTeams';
import CircuitSpotlight from '../components/Home/CircuitSpotlight';
import Technology from '../components/Home/Technology';
import LiveTimingPreview from '../components/Home/LiveTimingPreview';
import TicketBooking from '../components/Home/TicketBooking';
import History from '../components/Home/History';
import Footer from '../components/Navigation/Footer';
import styles from './page.module.css';
import { useResponsiveViewport } from '@/hooks/useResponsive';

export default function Home() {
  const viewport = useResponsiveViewport(0.2);
  return (
    <main>
      <ScrollSequence />
      
      {/* 
        This transparent Hero Section seamlessly rolls up over the fixed canvas background
        once the 800vh sequence is completed. Frame 1390 acts as the background.
      */}
      <section className={styles.heroSection}>
        <motion.h1 
          className={styles.headline}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          FORMULA 1
        </motion.h1>
        
        <motion.h2 
          className={styles.subheadline}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          The Pinnacle of Motorsport
        </motion.h2>
      </section>

      <NextRace />
      <DriverChampionship />
      <ConstructorChampionship />
      <FeaturedDrivers />
      <FeaturedTeams />
      <CircuitSpotlight />
      <Technology />
      <LiveTimingPreview />
      <TicketBooking />
      <History />
      <Footer />
    </main>
  );
}

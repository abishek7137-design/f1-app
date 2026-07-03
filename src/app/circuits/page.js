'use client';
import React from 'react';
import styles from './page.module.css';
import { circuitsData } from '../../data/mockData';
import Footer from '../../components/Navigation/Footer';
import CircuitHero from '../../components/Circuits/CircuitHero';
import FeaturedCircuit from '../../components/Circuits/FeaturedCircuit';
import SectionTitle from '../../components/Circuits/SectionTitle';
import CircuitJourney from '../../components/Circuits/CircuitJourney';
import GlobalStats from '../../components/Circuits/GlobalStats';
import CircuitCTA from '../../components/Circuits/CircuitCTA';

export default function CircuitsPage() {
  return (
    <main className={styles.main}>
      <CircuitHero />
      <FeaturedCircuit circuit={circuitsData[0]} />
      <SectionTitle 
        title="Formula 1 World Circuits" 
        subtitle="Experience every legendary Grand Prix venue on the calendar."
      />
      <CircuitJourney circuits={circuitsData} />
      <GlobalStats />
      <CircuitCTA />
      <Footer />
    </main>
  );
}
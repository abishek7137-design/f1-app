'use client';

import React from 'react';
import styles from './page.module.css';
import { circuitsData } from '../../data/mockData';
import Footer from '../../components/Navigation/Footer';
import CircuitHero from '../../components/Circuits/CircuitHero';
import HorizontalGallery from '../../components/Circuits/HorizontalGallery';

export default function CircuitsPage() {
  return (
    <main className={styles.main}>
      <CircuitHero />
      <HorizontalGallery circuits={circuitsData} />
      <Footer />
    </main>
  );
}
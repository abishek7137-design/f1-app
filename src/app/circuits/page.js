'use client';

import React, { useState, useMemo } from 'react';
import styles from './page.module.css';
import { circuitsData } from '../../data/mockData';
import Footer from '../../components/Navigation/Footer';
import CircuitHero from '../../components/Circuits/CircuitHero';
import CircuitFilter from '../../components/Circuits/CircuitFilter';
import CircuitGallery from '../../components/Circuits/CircuitGallery';
import CircuitStats from '../../components/Circuits/CircuitStats';
import FeaturedCircuit from '../../components/Circuits/FeaturedCircuit';
import CalendarTimeline from '../../components/Circuits/CalendarTimeline';
import CircuitCTA from '../../components/Circuits/CircuitCTA';

export default function CircuitsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const filteredCircuits = useMemo(() => {
    return circuitsData.filter((circuit) => {
      const matchesSearch = circuit.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            circuit.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            circuit.city.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesContinent = selectedContinent === 'All' || circuit.continent === selectedContinent;
      const matchesType = selectedType === 'All' || circuit.type === selectedType;

      return matchesSearch && matchesContinent && matchesType;
    });
  }, [searchQuery, selectedContinent, selectedType]);

  return (
    <main className={styles.main}>
      <CircuitHero />
      <CircuitStats circuitsData={circuitsData} />
      
      <CircuitFilter 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedContinent={selectedContinent}
        setSelectedContinent={setSelectedContinent}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      <CircuitGallery circuits={filteredCircuits} />
      
      <FeaturedCircuit />
      
      <CalendarTimeline circuits={circuitsData} />
      
      <CircuitCTA />
      
      <Footer />
    </main>
  );
}
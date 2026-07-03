'use client';
import React from 'react';
import CircuitJourneyItem from './CircuitJourneyItem';
import styles from './CircuitJourney.module.css';

export default function CircuitJourney({ circuits }) {
  const journeyCircuits = circuits.slice(1);
  
  return (
    <div className={styles.journeyContainer}>
      {journeyCircuits.map((circuit, index) => (
        <CircuitJourneyItem key={circuit.id} circuit={circuit} index={index} />
      ))}
    </div>
  );
}

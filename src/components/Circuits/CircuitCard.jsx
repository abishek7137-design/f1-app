'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import styles from './CircuitCard.module.css';

export default function CircuitCard({ circuit }) {
  let raceDistance = "N/A";
  if (circuit.laps && circuit.length) {
    const lengthNum = parseFloat(circuit.length.replace(/[^0-9.]/g, ''));
    if (!isNaN(lengthNum)) {
      raceDistance = (circuit.laps * lengthNum).toFixed(3) + ' km';
    }
  }

  return (
    <motion.div 
      className={styles.card}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className={styles.imageContainer}>
        <img 
          src="https://images.unsplash.com/photo-1541461975765-a6e5a408ff39?q=80&w=2000&auto=format&fit=crop" 
          alt={circuit.name}
          className={styles.bgImage}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <span className={styles.grandPrix}>{circuit.grandPrix}</span>
            <h2 className={styles.name}>{circuit.name}</h2>
          </div>
          <div className={styles.countryGroup}>
            <span className={styles.country}>{circuit.country}</span>
            <div className={styles.flagAccent} />
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>Track Length</span>
            <span className={styles.statValue}>{circuit.length}</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>Corners</span>
            <span className={styles.statValue}>{circuit.corners}</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>DRS Zones</span>
            <span className={styles.statValue}>{circuit.drsZones}</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>Lap Record</span>
            <span className={styles.statValue}>{circuit.lapRecord}</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>Race Distance</span>
            <span className={styles.statValue}>{raceDistance}</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>Elevation</span>
            <span className={styles.statValue}>{circuit.elevation || "N/A"}</span>
          </div>
        </div>

        <div className={styles.footer}>
          <span className={styles.circuitType}>{circuit.type} Circuit</span>
          
          <button className={styles.exploreBtn}>
            <span>Explore Circuit</span>
            <ChevronRight className={styles.btnIcon} size={20} />
            <motion.div className={styles.btnGlow} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

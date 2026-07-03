'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { driversData } from '../../data/mockData';
import styles from './DriversGrid.module.css';

export default function DriversGrid() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredDrivers = activeFilter === 'all' 
    ? driversData 
    : driversData.filter(d => d.filter === activeFilter);

  return (
    <>
      <section className={styles.heroSection}>
        <div className={styles.heroBg} style={{ backgroundImage: `url(/images/hero/drivers_hero.png)` }} />
        <div className={styles.heroGradient} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>The Grid</h1>
          <p className={styles.heroSubtitle}>20 of the best drivers in the world</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.header}>
          <motion.h3 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            The Grid
          </motion.h3>
          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Drivers Museum
          </motion.h1>
          
          <motion.div 
            className={styles.filterContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <button 
              className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.active : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Era
            </button>
            <button 
              className={`${styles.filterBtn} ${activeFilter === 'current' ? styles.active : ''}`}
              onClick={() => setActiveFilter('current')}
            >
              Current Grid
            </button>
            <button 
              className={`${styles.filterBtn} ${activeFilter === 'legends' ? styles.active : ''}`}
              onClick={() => setActiveFilter('legends')}
            >
              Legends
            </button>
          </motion.div>
        </div>

        <motion.div layout className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {filteredDrivers.map((driver) => (
              <motion.div 
                key={driver.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={styles.driverCard}
              >
                <div className={styles.imageWrapper}>
                  <img src={driver.image} alt={driver.name} className={styles.driverImage} />
                  <div className={styles.imageOverlay} />
                  <div className={styles.numberWatermark}>{driver.number}</div>
                </div>
                <div className={styles.info}>
                  <div className={styles.infoHeader}>
                    <h3 className={styles.name}>{driver.firstName} <span>{driver.lastName}</span></h3>
                    <img src={`https://flagcdn.com/w40/${driver.nationality === 'British' ? 'gb' : driver.nationality === 'Dutch' ? 'nl' : driver.nationality === 'Monegasque' ? 'mc' : driver.nationality === 'Brazilian' ? 'br' : 'un'}.png`} alt={driver.nationality} className={styles.flag} />
                  </div>
                  <div className={styles.teamTag} style={{ borderColor: driver.color, color: driver.color }}>
                    {driver.team}
                  </div>
                </div>
                <div className={styles.cardGlow} style={{ background: `radial-gradient(circle at center, ${driver.color}20 0%, transparent 70%)` }} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </>
  );
}

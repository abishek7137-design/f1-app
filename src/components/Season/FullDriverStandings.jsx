'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { driversData } from '../../data/mockData';
import styles from './FullDriverStandings.module.css';

export default function FullDriverStandings() {
  const sortedDrivers = [...driversData].sort((a, b) => b.points - a.points);

  const handleImageError = (e) => {
    // Gracefully hide the entire portrait wrapper if the image doesn't exist
    if (e.target.parentElement) {
      e.target.parentElement.style.display = 'none';
    }
  };

  const getDriverId = (firstName, lastName) => {
    return `${firstName.toLowerCase()}-${lastName.toLowerCase()}`.replace(/[^a-z0-9-]/g, '');
  };

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <motion.h3 
          className={styles.subtitle}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          2026 World Championship
        </motion.h3>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Driver Standings
        </motion.h2>
      </div>

      <div className={styles.standingsGrid}>
        {sortedDrivers.map((driver, index) => (
          <motion.div 
            key={driver.id}
            className={styles.driverCard}
            style={{ '--team-color': driver.color }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: (index % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Left Content (60%) */}
            <div className={styles.contentWrapper}>
              <div className={styles.cardHeader}>
                <span className={styles.position}>0{index + 1}</span>
                <div className={styles.points}>
                  {driver.points} <span className={styles.ptsLabel}>PTS</span>
                </div>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.driverInfo}>
                  <span className={styles.firstName}>{driver.firstName}</span>
                  <span className={styles.lastName}>{driver.lastName}</span>
                  <span className={styles.teamName}>{driver.team}</span>
                </div>
                
                {/* Additional Stats revealed on hover */}
                <div className={styles.hiddenStats}>
                  <div className={styles.statLine}>
                    <span>Wins</span> <strong>{driver.wins || 0}</strong>
                  </div>
                  <div className={styles.statLine}>
                    <span>Podiums</span> <strong>{driver.podiums || 0}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Portrait (40%) */}
            <div className={styles.portraitWrapper}>
              <img 
                src={`/images/drivers/${getDriverId(driver.firstName, driver.lastName)}.webp`} 
                alt={`${driver.firstName} ${driver.lastName}`} 
                className={styles.portrait}
                onError={handleImageError}
              />
              <div className={styles.portraitGradient} />
              <div className={styles.carbonOverlay} />
              
              {/* Glass reflection sweep */}
              <div className={styles.glassSweep} />
            </div>

            {/* Giant Background Number */}
            <div className={styles.driverNumber}>{driver.number}</div>

            {/* Team Accents */}
            <div className={styles.teamColorGlow} />
            <div className={styles.teamColorBar} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

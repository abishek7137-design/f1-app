'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import styles from './TrophyRoom.module.css';
import { useResponsiveViewport } from '@/hooks/useResponsive';

export default function TrophyRoom({ driver }) {
  const viewport = useResponsiveViewport(0.2);
  if (!driver.trophies || driver.trophies.length === 0) return null;

  return (
    <section className={styles.trophySection}>
      <div className={styles.container}>
        
        <div className={styles.header}>
          <Trophy size={32} color="#FFD700" />
          <h2 className={styles.title}>Trophy Room</h2>
          <p className={styles.subtitle}>Major Achievements</p>
        </div>

        <div className={styles.shelves}>
          {driver.trophies.map((trophy, idx) => (
            <motion.div 
              key={idx}
              className={styles.trophyItem}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className={styles.pedestalGlow} style={{ background: trophy.color }} />
              
              <div className={styles.trophyIcon}>
                <Trophy size={48} color={trophy.color} strokeWidth={1} />
                <div className={styles.sparkle} />
              </div>
              
              <div className={styles.plate}>
                <span className={styles.year}>{trophy.year}</span>
                <span className={styles.name}>{trophy.name}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

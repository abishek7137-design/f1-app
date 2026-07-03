'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import styles from './CalendarTimeline.module.css';

export default function CalendarTimeline({ circuits }) {
  return (
    <section className={styles.timelineSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>2026 Season Calendar</h2>
        <p className={styles.subtitle}>24 Races. 5 Continents. 1 Champion.</p>
      </div>

      <div className={styles.timelineContainer}>
        <div className={styles.timelineLine} />

        {circuits.map((circuit, index) => (
          <motion.div 
            key={circuit.id} 
            className={styles.timelineNode}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className={styles.nodePoint} />
            
            <div className={styles.nodeContent}>
              <div className={styles.roundBadge}>Round {index + 1}</div>
              <h3 className={styles.grandPrix}>{circuit.grandPrix}</h3>
              <p className={styles.location}>{circuit.city}, {circuit.country}</p>
              
              <div className={styles.metaData}>
                <span className={styles.metaItem}>
                  <Calendar size={14} />
                  TBA 2026
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

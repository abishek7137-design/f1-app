'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Route, Timer, Activity, TrendingUp } from 'lucide-react';
import styles from './CircuitGallery.module.css';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function CircuitGallery({ circuits }) {
  if (circuits.length === 0) {
    return (
      <div className={styles.noResults}>
        <h2>No circuits found</h2>
        <p>Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className={styles.galleryWrapper}>
      <motion.div 
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }}
      >
        {circuits.map(circuit => (
          <motion.div key={circuit.id} className={styles.card} variants={itemVariants}>
            <div className={styles.imageContainer}>
              <img 
                src="https://images.unsplash.com/photo-1541461975765-a6e5a408ff39?q=80&w=800&auto=format&fit=crop" 
                alt={circuit.name} 
                className={styles.image}
              />
              <div className={styles.overlay} />
              <div className={styles.topInfo}>
                <span className={`${styles.badge} glass`}>{circuit.type}</span>
                <span className={styles.country}>{circuit.country}</span>
              </div>
            </div>

            <div className={styles.content}>
              <h3 className={styles.name}>{circuit.name}</h3>
              <p className={styles.grandPrix}>{circuit.grandPrix}</p>

              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <Route size={16} className={styles.statIcon} />
                  <div>
                    <span className={styles.statLabel}>Length</span>
                    <span className={styles.statValue}>{circuit.length}</span>
                  </div>
                </div>
                <div className={styles.statItem}>
                  <Activity size={16} className={styles.statIcon} />
                  <div>
                    <span className={styles.statLabel}>Corners</span>
                    <span className={styles.statValue}>{circuit.corners}</span>
                  </div>
                </div>
                <div className={styles.statItem}>
                  <Timer size={16} className={styles.statIcon} />
                  <div>
                    <span className={styles.statLabel}>Lap Record</span>
                    <span className={styles.statValue}>{circuit.lapRecord}</span>
                  </div>
                </div>
                <div className={styles.statItem}>
                  <TrendingUp size={16} className={styles.statIcon} />
                  <div>
                    <span className={styles.statLabel}>DRS Zones</span>
                    <span className={styles.statValue}>{circuit.drsZones}</span>
                  </div>
                </div>
              </div>

              <button className={styles.exploreBtn}>
                <span>Explore Circuit</span>
                <motion.div className={styles.btnGlow} />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

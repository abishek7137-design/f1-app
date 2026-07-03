'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import styles from './FeaturedCircuit.module.css';
import { useResponsiveViewport } from '@/hooks/useResponsive';

export default function FeaturedCircuit({ circuit }) {
  const viewport = useResponsiveViewport(0.2);
  if (!circuit) return null;

  return (
    <section className={styles.section}>
      <div className={styles.backgroundContainer}>
        <img 
          src="/images/backgrounds/track-02.jpg" 
          alt="Featured Circuit" 
          className={styles.backgroundImage} 
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <motion.div 
          className={styles.glassPanel}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className={styles.header}>
            <span className={styles.label}>Featured Circuit</span>
            <h2 className={styles.title}>{circuit.name}</h2>
            <h3 className={styles.subtitle}>{circuit.grandPrix}</h3>
          </div>

          <div className={styles.stats}>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Length</span>
              <span className={styles.statValue}>{circuit.length}</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Corners</span>
              <span className={styles.statValue}>{circuit.corners}</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Lap Record</span>
              <span className={styles.statValue}>{circuit.lapRecord}</span>
            </div>
          </div>

          <button className={styles.exploreBtn}>
            <span>Explore {circuit.city}</span>
            <ChevronRight className={styles.btnIcon} size={20} />
            <motion.div className={styles.btnGlow} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

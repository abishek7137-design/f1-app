'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import styles from './FeaturedCircuit.module.css';

export default function FeaturedCircuit() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section className={styles.featuredSection}>
      <motion.div 
        className={styles.background}
        style={{ y }}
      />
      <div className={styles.overlay} />

      <div className={styles.container}>
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className={styles.label}>Featured Circuit</span>
          <h2 className={styles.title}>MONACO<br/>GRAND PRIX</h2>
          <p className={styles.description}>
            The jewel in the Formula 1 crown. A circuit that demands absolute precision, where the slightest mistake ends your race in the barriers. 
            Winning here is the ultimate achievement for any driver.
          </p>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>First GP</span>
              <span className={styles.statValue}>1950</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Length</span>
              <span className={styles.statValue}>3.337 km</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Corners</span>
              <span className={styles.statValue}>19</span>
            </div>
          </div>

          <button className={styles.ctaButton}>
            Discover Monaco
            <ChevronRight size={20} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

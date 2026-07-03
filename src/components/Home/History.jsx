'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './History.module.css';
import { useResponsiveViewport } from '@/hooks/useResponsive';

export default function History() {
  const viewport = useResponsiveViewport(0.2);
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        <motion.div 
          className={styles.imageWrapper}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewport}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <img src="/f1-sequence/00001.jpg" alt="F1 Heritage" className={styles.image} />
        </motion.div>

        <motion.div 
          className={styles.info}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewport}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          <h3 className={styles.subtitle}>Heritage</h3>
          <h2 className={styles.title}>Over 70 Years of Glory</h2>
          <p className={styles.description}>
            Since 1950, Formula 1 has been the proving ground for the greatest drivers and most innovative engineers in history. From the perilous early days to the ultra-advanced hybrid era, it remains the pinnacle of motorsport.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

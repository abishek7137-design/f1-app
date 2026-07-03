'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './CircuitHero.module.css';

export default function CircuitHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className={styles.hero}>
      <motion.div 
        className={styles.background} 
        style={{ y, opacity }}
      />
      <div className={styles.overlay} />
      
      <div className={styles.content}>
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          FORMULA 1<br/>WORLD CIRCUITS
        </motion.h1>
        
        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Explore every legendary Grand Prix venue.
        </motion.p>
      </div>

      <motion.div 
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <span className={styles.scrollText}>SCROLL TO EXPLORE</span>
        <div className={styles.scrollLine}>
          <motion.div 
            className={styles.scrollDot}
            animate={{ y: [0, 40, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

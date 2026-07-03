'use client';
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './CircuitHero.module.css';
import { useResponsiveParallax } from '@/hooks/useResponsive';

export default function CircuitHero() {
  const { scrollY } = useScroll();
  const y = useResponsiveParallax(scrollY, [0, 800], [0, 250]);
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
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          FORMULA 1
          <br/>
          WORLD CIRCUITS
        </motion.h1>
      </div>
    </section>
  );
}

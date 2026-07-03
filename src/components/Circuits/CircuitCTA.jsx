'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './CircuitCTA.module.css';
import { useResponsiveViewport } from '@/hooks/useResponsive';

export default function CircuitCTA() {
  const viewport = useResponsiveViewport(0.2);
  return (
    <section className={styles.section}>
      <div className={styles.background} />
      <div className={styles.content}>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
        >
          EXPERIENCE THE PINNACLE<br/>OF MOTORSPORT
        </motion.h2>
        <motion.button 
          className={styles.ctaBtn}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{ delay: 0.3 }}
        >
          <span>Get Tickets</span>
          <ArrowRight size={20} className={styles.icon} />
          <div className={styles.btnGlow} />
        </motion.button>
      </div>
    </section>
  );
}

'use client';
import React from 'react';
import { motion } from 'framer-motion';
import styles from './SectionTitle.module.css';
import { useResponsiveViewport } from '@/hooks/useResponsive';

export default function SectionTitle({ title, subtitle }) {
  const viewport = useResponsiveViewport(0.2);
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.8 }}
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewport}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}

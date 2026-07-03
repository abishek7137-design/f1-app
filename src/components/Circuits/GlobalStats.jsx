'use client';
import React from 'react';
import { motion } from 'framer-motion';
import styles from './GlobalStats.module.css';

export default function GlobalStats() {
  const stats = [
    { label: 'Total Circuits', value: '24' },
    { label: 'Continents', value: '5' },
    { label: 'Total Corners', value: '412' },
    { label: 'Total Kilometers', value: '1,324' }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div 
          className={styles.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className={styles.statCard}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
              }}
            >
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

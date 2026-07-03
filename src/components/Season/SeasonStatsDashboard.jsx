'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Timer, Flag, Crosshair } from 'lucide-react';
import styles from './SeasonStatsDashboard.module.css';
import { useResponsiveViewport } from '@/hooks/useResponsive';

export default function SeasonStatsDashboard() {
  const viewport = useResponsiveViewport(0.2);
  const stats = [
    { id: 'poles', title: 'Pole Positions', driver: 'Max Verstappen', value: 11, icon: <Flag size={24} />, color: '#3671C6' },
    { id: 'fastest', title: 'Fastest Laps', driver: 'Max Verstappen', value: 8, icon: <Timer size={24} />, color: '#3671C6' },
    { id: 'wins', title: 'Race Wins', driver: 'Max Verstappen', value: 15, icon: <Trophy size={24} />, color: '#3671C6' },
    { id: 'podiums', title: 'Most Podiums', driver: 'Max Verstappen', value: 19, icon: <Crosshair size={24} />, color: '#3671C6' },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <motion.h3 
          className={styles.subtitle}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewport}
        >
          Performance
        </motion.h3>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewport}
          transition={{ delay: 0.1 }}
        >
          Season Statistics
        </motion.h2>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <motion.div 
            key={stat.id}
            className={styles.statCard}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewport}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapper} style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <h4 className={styles.statTitle}>{stat.title}</h4>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statDriver}>{stat.driver}</div>
            </div>
            <div className={styles.glow} style={{ background: `radial-gradient(circle at top right, ${stat.color}30 0%, transparent 70%)` }} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

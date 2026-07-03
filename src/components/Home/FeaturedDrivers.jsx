'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './FeaturedDrivers.module.css';
import { useResponsiveViewport } from '@/hooks/useResponsive';

export default function FeaturedDrivers() {
  const viewport = useResponsiveViewport(0.2);
  const drivers = [
    { 
      id: "max-verstappen", 
      name: "Max Verstappen", 
      number: "1", 
      team: "Red Bull Racing", 
      image: "/images/drivers/max-verstappen.webp",
      flag: "🇳🇱",
      championships: 3,
      wins: 61,
      podiums: 106,
      poles: 40
    },
    { 
      id: "lewis-hamilton", 
      name: "Lewis Hamilton", 
      number: "44", 
      team: "Ferrari", 
      image: "/images/drivers/lewis-hamilton.webp",
      flag: "🇬🇧",
      championships: 7,
      wins: 104,
      podiums: 198,
      poles: 104
    },
    { 
      id: "fernando-alonso", 
      name: "Fernando Alonso", 
      number: "14", 
      team: "Aston Martin", 
      image: "/images/drivers/fernando-alonso.webp",
      flag: "🇪🇸",
      championships: 2,
      wins: 32,
      podiums: 106,
      poles: 22
    }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <div>
          <h3 className={styles.subtitle}>Superstars</h3>
          <h2 className={styles.title}>Featured Drivers</h2>
        </div>
        <Link href="/drivers" className={styles.viewAll}>
          All Drivers
        </Link>
      </div>

      <div className={styles.editorialGrid}>
        {drivers.map((driver, index) => (
          <motion.div 
            key={driver.id}
            className={styles.driverCard}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover="hover"
          >
            <div className={styles.imageWrapper}>
              <img 
                src={driver.image} 
                alt={driver.name} 
                className={styles.driverImage} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/drivers/placeholder.jpg";
                }}
              />
            </div>
            
            <div className={styles.overlay} />
            <motion.div 
              className={styles.glassmorphismOverlay}
              variants={{
                hover: { opacity: 1 }
              }}
              initial={{ opacity: 0 }}
            />
            
            <div className={styles.driverContent}>
              <div className={styles.headerInfo}>
                <div className={styles.driverNumber}>{driver.number}</div>
                <div className={styles.flag}>{driver.flag}</div>
              </div>
              <h3 className={styles.driverName}>{driver.name}</h3>
              <p className={styles.teamName}>{driver.team}</p>
              
              <motion.div 
                className={styles.statsContainer}
                variants={{
                  hover: { opacity: 1, y: 0, height: 'auto' }
                }}
                initial={{ opacity: 0, y: 20, height: 0 }}
              >
                <div className={styles.statGrid}>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>{driver.championships}</span>
                    <span className={styles.statLabel}>Titles</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>{driver.wins}</span>
                    <span className={styles.statLabel}>Wins</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>{driver.podiums}</span>
                    <span className={styles.statLabel}>Podiums</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>{driver.poles}</span>
                    <span className={styles.statLabel}>Poles</span>
                  </div>
                </div>
                
                <Link href={`/drivers/${driver.id}`} className={styles.viewBtn}>
                  View Driver
                </Link>
              </motion.div>
            </div>
            
            <motion.div 
              className={styles.accentBorder}
              variants={{
                hover: { opacity: 1, scale: 1 }
              }}
              initial={{ opacity: 0, scale: 0.95 }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

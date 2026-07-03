'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './TicketBooking.module.css';

export default function TicketBooking() {
  return (
    <section className={styles.section}>
      {/* Hospitality luxury imagery placeholder */}
      <motion.div 
        className={styles.background} 
        style={{ backgroundImage: `url('/f1-sequence/01200.jpg')` }}
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      
      <div className={styles.content}>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Paddock Club™
        </motion.h2>
        
        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Experience Formula 1 from the ultimate vantage point. 
          Unrivaled access, world-class hospitality, and the sheer thrill of the pit lane.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link href="/tickets" className={styles.ctaButton}>
            Book Experience
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Ticket, ArrowRight } from 'lucide-react';
import styles from './CircuitCTA.module.css';
import Link from 'next/link';

export default function CircuitCTA() {
  return (
    <section className={styles.ctaSection}>
      <motion.div 
        className={styles.container}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.content}>
          <h2 className={styles.title}>EXPERIENCE IT LIVE</h2>
          <p className={styles.subtitle}>
            Feel the roar of the engines. Be part of the spectacle. Secure your tickets for the 2026 FIA Formula One World Championship™.
          </p>
          
          <div className={styles.buttonGroup}>
            <Link href="/tickets" className={styles.primaryBtn}>
              <Ticket size={20} />
              Buy Tickets
            </Link>
            <Link href="/season" className={styles.secondaryBtn}>
              View Season Schedule
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Search, Bell, User } from 'lucide-react';
import styles from './NavigationBar.module.css';

const NavigationBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show navigation only after scrolling past the 800vh sequence (approx 7.5 * window height)
    const threshold = typeof window !== 'undefined' ? window.innerHeight * 7.5 : 5000;
    setIsVisible(latest > threshold);
  });

  const menuItems = [
    { name: 'Season', path: '/season' },
    { name: 'Drivers', path: '/drivers' },
    { name: 'Teams', path: '/teams' },
    { name: 'Circuits', path: '/circuits' },
    { name: 'Live', path: '/live' },
    { name: 'Tickets', path: '/tickets' }
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav 
          className={`${styles.navWrapper} glass`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href="/" className={styles.logo}>
            FORMULA 1
          </Link>

          <ul className={styles.navLinks}>
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link href={item.path} className={styles.link}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <Search className={styles.actionIcon} size={20} />
            <Bell className={styles.actionIcon} size={20} />
            <User className={styles.actionIcon} size={20} />
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default NavigationBar;

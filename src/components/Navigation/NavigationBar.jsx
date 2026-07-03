'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Search, Bell, User } from 'lucide-react';
import styles from './NavigationBar.module.css';

const NavigationBar = () => {
  const [isPastHero, setIsPastHero] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const threshold = typeof window !== 'undefined' ? window.innerHeight * 0.35 : 350;
    setIsPastHero(latest > threshold);
  });

  useEffect(() => {
    let observer;
    
    const observeFooter = () => {
      const footer = document.querySelector('footer');
      if (footer && !observer) {
        observer = new IntersectionObserver(
          (entries) => {
            setIsFooterVisible(entries[0].isIntersecting);
          },
          { root: null, rootMargin: '0px', threshold: 0 }
        );
        observer.observe(footer);
        return true;
      }
      return false;
    };

    let observed = observeFooter();

    const mutationObserver = new MutationObserver(() => {
      if (!observed) {
        observed = observeFooter();
      }
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (observer) observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  const isVisible = isPastHero && !isFooterVisible;

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
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
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

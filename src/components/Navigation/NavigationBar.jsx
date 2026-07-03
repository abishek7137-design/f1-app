'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Search, Bell, User } from 'lucide-react';
import styles from './NavigationBar.module.css';

const NavigationBar = () => {
  const [isPastHero, setIsPastHero] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const isHomePage = pathname === '/';
    const threshold = isHomePage 
      ? (typeof window !== 'undefined' ? window.innerHeight * 7.5 : 7500)
      : 100;
      
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
      if (!observed) observed = observeFooter();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    return () => {
      if (observer) observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isVisible = isPastHero && !isFooterVisible;

  const menuItems = [
    { name: 'Season', path: '/season' },
    { name: 'Drivers', path: '/drivers' },
    { name: 'Teams', path: '/teams' },
    { name: 'Circuits', path: '/circuits' },
    { name: 'Live', path: '/live' },
    { name: 'Book Tickets', path: '/tickets' }
  ];

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.nav 
            className={styles.navWrapper}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Link href="/" className={styles.logo}>
              FORMULA 1
            </Link>

            <div className={styles.rightSection}>
              <ul className={styles.menu}>
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <Link href={item.path} className={styles.menuItem}>
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
            </div>
            
            <div 
              className={styles.mobileMenuToggle}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && isVisible && (
          <motion.div 
            className={styles.mobileOverlay}
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          >
            <ul className={styles.mobileNavLinks}>
              {menuItems.map((item, i) => (
                <motion.li 
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={item.path} className={styles.mobileLink}>
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavigationBar;

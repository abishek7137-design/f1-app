'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <Link href="/" className={styles.logo}>
          FORMULA 1
        </Link>
        
        <div className={styles.links}>
          <div className={styles.column}>
            <span className={styles.columnHeader}>Racing</span>
            <Link href="/season" className={styles.link}>Season</Link>
            <Link href="/drivers" className={styles.link}>Drivers</Link>
            <Link href="/teams" className={styles.link}>Teams</Link>
            <Link href="/circuits" className={styles.link}>Circuits</Link>
          </div>

          <div className={styles.column}>
            <span className={styles.columnHeader}>Experience</span>
            <Link href="/live" className={styles.link}>Live Timing</Link>
            <Link href="/tickets" className={styles.link}>Tickets & Paddock</Link>
            <Link href="/membership" className={styles.link}>Membership</Link>
          </div>

          <div className={styles.column}>
            <span className={styles.columnHeader}>About</span>
            <Link href="/technology" className={styles.link}>Technology</Link>
            <Link href="/history" className={styles.link}>History</Link>
            <Link href="/rules" className={styles.link}>Rules</Link>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.copyright}>
          © 2026 Formula One World Championship Limited. 
        </div>
        <div className={styles.socials}>
          <a href="#" className={styles.socialLink}>TWITTER</a>
          <a href="#" className={styles.socialLink}>INSTAGRAM</a>
          <a href="#" className={styles.socialLink}>YOUTUBE</a>
        </div>
      </div>
    </footer>
  );
}

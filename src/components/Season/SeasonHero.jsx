'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import styles from './SeasonHero.module.css';

export default function SeasonHero() {
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scaleText = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  // Letter by letter animation for the title
  const titleText = "Season 2026";
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      }
    }
  };

  // Generate random particles only after mounting
  const particles = mounted ? Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  })) : [];

  return (
    <section ref={containerRef} className={styles.section}>
      <motion.div 
        className={styles.backgroundImage}
        style={{ 
          y: y1, 
          opacity
        }}
      >
        <div className={styles.grainOverlay} />
        <div className={styles.gradientOverlay} />
        
        {/* Cinematic Lens Bloom */}
        <div className={styles.lensBloom} />
        
        {/* Animated Light Streaks */}
        <div className={styles.lightStreak} style={{ top: '30%', animationDelay: '0s' }} />
        <div className={styles.lightStreak} style={{ top: '60%', animationDelay: '3s', opacity: 0.5, transform: 'scaleX(0.7)' }} />

        {/* Floating Dust Particles */}
        <div className={styles.particlesContainer}>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className={styles.particle}
              style={{
                width: p.size,
                height: p.size,
                left: `${p.x}%`,
                top: `${p.y}%`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </motion.div>

      <motion.div 
        className={styles.content} 
        style={{ y: yText, opacity: opacityText, scale: scaleText }}
      >
        <motion.div
          className={styles.badgeContainer}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
        >
          <span className={styles.badge}>Official F1 Ecosystem</span>
        </motion.div>
        
        <motion.h1 
          className={styles.title}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {titleText.split("").map((char, index) => (
            <motion.span 
              key={index} 
              variants={letterVariants}
              className={char === " " ? styles.space : styles.letter}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>
        
        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
        >
          Mission Control
        </motion.p>
      </motion.div>

      <motion.div 
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
      >
        <motion.div
          className={styles.scrollIconWrapper}
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={36} className={styles.scrollIcon} />
        </motion.div>
      </motion.div>
    </section>
  );
}

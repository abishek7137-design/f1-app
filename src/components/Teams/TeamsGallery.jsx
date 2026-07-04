'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { teamsData } from '../../data/mockData';
import { ChevronRight, Trophy, Flag } from 'lucide-react';
import styles from './TeamsGallery.module.css';
import { useResponsiveViewport } from '@/hooks/useResponsive';

export default function TeamsGallery() {
  const viewport = useResponsiveViewport(0.2);
  return (
    <>
      <section className={styles.heroSection}>
        <div className={styles.heroBg} style={{ backgroundImage: `url(/images/teams_hero_1782900739734.png)` }} />
        <div className={styles.heroGradient} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>The Garages</h1>
          <p className={styles.heroSubtitle}>Where engineering meets perfection</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.header}>
          <motion.h3 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Constructors
          </motion.h3>
          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Luxury Brands
          </motion.h1>
        </div>

        <div className={styles.grid}>
          {teamsData.map((team, index) => (
            <TeamCard
             key={team.id}
             team={team}
             index={index}
              viewport={viewport}
             />
          ))}
        </div>
      </section>
    </>
  );
}

function TeamCard({ team, index, viewport }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { damping: 30, stiffness: 200 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { damping: 30, stiffness: 200 });
  const glowX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), { damping: 30, stiffness: 200 });
  const glowY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), { damping: 30, stiffness: 200 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    e.target.parentElement.classList.add(styles.carbonFallback);
  };

  return (
    <motion.div 
      ref={cardRef}
      className={styles.teamCard}
      style={{ '--team-color': team.color, rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.6, delay: (index % 2) * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.cardImageBg} style={{ transform: "translateZ(-20px) scale(1.05)" }}>
        <img 
          src={`/images/teams/${team.id}.webp`} 
          alt={`${team.name} Garage`} 
          className={styles.bgImage}
          onError={handleImageError}
        />
        <div className={styles.imageOverlay} />
        <div className={styles.glassSweep} />
      </div>

      <div className={styles.cardContent} style={{ transform: "translateZ(30px)" }}>
        <div className={styles.teamHeader}>
          <div>
            <h2 className={styles.teamName}>{team.name}</h2>
            <span className={styles.teamBase}>{team.base}</span>
          </div>
        </div>

        <div className={styles.teamPhilosophy}>
          <p>"{team.philosophy}"</p>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statBox}>
            <Trophy size={20} color={team.color} />
            <div>
              <span className={styles.statValue}>{team.championships}</span>
              <span className={styles.statLabel}>Titles</span>
            </div>
          </div>
          <div className={styles.statBox}>
            <Flag size={20} color={team.color} />
            <div>
              <span className={styles.statValue}>{team.wins}</span>
              <span className={styles.statLabel}>Wins</span>
            </div>
          </div>
        </div>

        <div className={styles.cardFooter}>
          <div className={styles.personnel}>
            <span className={styles.personRole}>Principal</span>
            <span className={styles.personName}>{team.principal}</span>
          </div>
          <button className={styles.exploreBtn} style={{ color: team.color }}>
            Explore Brand <ChevronRight size={16} />
          </button>
        </div>
      </div>
      
      <motion.div 
        className={styles.teamColorGlow} 
        style={{ 
          background: `radial-gradient(circle at ${glowX}% ${glowY}%, var(--team-color) 0%, transparent 70%)`,
          transform: "translateZ(1px)"
        }} 
      />
      <div className={styles.teamColorBar} style={{ backgroundColor: team.color }} />
    </motion.div>
  );
}

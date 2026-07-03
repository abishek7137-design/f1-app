'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './DriverChampionship.module.css';

export default function DriverChampionship() {
  const drivers = [
    { 
      pos: 1, 
      name: "Max Verstappen", 
      team: "Red Bull Racing", 
      points: 400, 
      color: "#3671C6",
      image: "/images/drivers/max-verstappen.webp",
      stats: { wins: 8, podiums: 11, poles: 9 }
    },
    { 
      pos: 2, 
      name: "Lando Norris", 
      team: "McLaren", 
      points: 331, 
      color: "#FF8000",
      image: "/images/drivers/lando-norris.webp"
    },
    { 
      pos: 3, 
      name: "Charles Leclerc", 
      team: "Ferrari", 
      points: 307, 
      color: "#E8002D",
      image: "/images/drivers/charles-leclerc.webp"
    }
  ];

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "/images/drivers/placeholder.jpg";
  };

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <div>
          <h3 className={styles.subtitle}>Standings</h3>
          <h2 className={styles.title}>Driver Championship</h2>
        </div>
        <Link href="/standings" className={styles.viewAll}>
          Full Standings
        </Link>
      </div>

      <div className={styles.podiumContainer}>
        {/* Leader - Massive Editorial Block */}
        <motion.div 
          className={styles.leaderPanel}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover="hover"
        >
          <div className={styles.leaderGlow} style={{ '--team-color': drivers[0].color }} />
          <div className={styles.carbonBg} />
          
          <div className={styles.leaderContent}>
            <div className={styles.driverInfo}>
              <div className={styles.position}>01</div>
              <h3 className={styles.driverName}>{drivers[0].name}</h3>
              <p className={styles.driverTeam} style={{ color: drivers[0].color }}>
                {drivers[0].team}
              </p>
              
              <div className={styles.pointsContainer}>
                <span className={styles.points}>{drivers[0].points}</span>
                <span className={styles.ptsLabel}>PTS</span>
              </div>
              
              <div className={styles.statsRow}>
                <div className={styles.stat}>
                  <span>{drivers[0].stats.wins}</span> Wins
                </div>
                <div className={styles.stat}>
                  <span>{drivers[0].stats.podiums}</span> Podiums
                </div>
                <div className={styles.stat}>
                  <span>{drivers[0].stats.poles}</span> Poles
                </div>
              </div>
            </div>

            <div className={styles.imageContainer}>
              <img 
                src={drivers[0].image} 
                alt={drivers[0].name} 
                className={styles.leaderImage}
                onError={handleImageError}
              />
              <div className={styles.imageGradientOverlay} />
            </div>
          </div>
          
          <motion.div 
            className={styles.animatedBorder}
            variants={{
              hover: { opacity: 1, scale: 1 }
            }}
          />
        </motion.div>

        {/* Challengers - Staggered List */}
        <div className={styles.challengers}>
          {drivers.slice(1).map((driver, index) => (
            <motion.div 
              key={driver.pos}
              className={styles.challengerPanel}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
              whileHover="hover"
            >
              <div className={styles.challengerGlow} style={{ '--team-color': driver.color }} />
              
              <div className={styles.challengerContent}>
                <div className={styles.challengerLeft}>
                  <span className={styles.challengerPos}>0{driver.pos}</span>
                  <div>
                    <h3 className={styles.challengerName}>{driver.name}</h3>
                    <p className={styles.challengerTeam} style={{ color: driver.color }}>
                      {driver.team}
                    </p>
                  </div>
                </div>
                <div className={styles.challengerPoints}>
                  {driver.points} <span className={styles.ptsLabel}>PTS</span>
                </div>
              </div>

              <div className={styles.challengerImageContainer}>
                <img 
                  src={driver.image} 
                  alt={driver.name} 
                  className={styles.challengerImage}
                  onError={handleImageError}
                />
                <div className={styles.imageGradientOverlay} />
              </div>
              
              <motion.div 
                className={styles.animatedBorder}
                variants={{
                  hover: { opacity: 1 }
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

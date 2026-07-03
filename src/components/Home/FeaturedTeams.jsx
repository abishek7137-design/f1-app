'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './FeaturedTeams.module.css';

export default function FeaturedTeams() {
  const teams = [
    { 
      id: "ferrari", 
      name: "Scuderia Ferrari", 
      principal: "Frédéric Vasseur",
      drivers: "Charles Leclerc, Lewis Hamilton",
      championships: 16,
      wins: 244,
      powerUnit: "Ferrari",
      location: "Maranello, Italy",
      image: "/images/teams/ferrari.webp",
      color: "#E8002D"
    },
    { 
      id: "mclaren", 
      name: "McLaren", 
      principal: "Andrea Stella",
      drivers: "Lando Norris, Oscar Piastri",
      championships: 8,
      wins: 184,
      powerUnit: "Mercedes",
      location: "Woking, United Kingdom",
      image: "/images/teams/mclaren.webp",
      color: "#FF8000"
    },
    { 
      id: "redbull", 
      name: "Red Bull Racing", 
      principal: "Christian Horner",
      drivers: "Max Verstappen, Sergio Perez",
      championships: 6,
      wins: 115,
      powerUnit: "Honda RBPT",
      location: "Milton Keynes, United Kingdom",
      image: "/images/teams/redbull.webp",
      color: "#3671C6"
    },
    { 
      id: "mercedes", 
      name: "Mercedes-AMG", 
      principal: "Toto Wolff",
      drivers: "George Russell, Kimi Antonelli",
      championships: 8,
      wins: 125,
      powerUnit: "Mercedes",
      location: "Brackley, United Kingdom",
      image: "/images/teams/mercedes.webp",
      color: "#27F4D2"
    },
    { 
      id: "astonmartin", 
      name: "Aston Martin", 
      principal: "Mike Krack",
      drivers: "Fernando Alonso, Lance Stroll",
      championships: 0,
      wins: 0,
      powerUnit: "Mercedes",
      location: "Silverstone, United Kingdom",
      image: "/images/teams/astonmartin.webp",
      color: "#229971"
    },
    { 
      id: "alpine", 
      name: "Alpine", 
      principal: "Bruno Famin",
      drivers: "Pierre Gasly, Esteban Ocon",
      championships: 2,
      wins: 1,
      powerUnit: "Renault",
      location: "Enstone, United Kingdom",
      image: "/images/teams/alpine.webp",
      color: "#0090FF"
    },
    { 
      id: "williams", 
      name: "Williams", 
      principal: "James Vowles",
      drivers: "Alexander Albon, Carlos Sainz",
      championships: 9,
      wins: 114,
      powerUnit: "Mercedes",
      location: "Grove, United Kingdom",
      image: "/images/teams/williams.webp",
      color: "#005AFF"
    },
    { 
      id: "haas", 
      name: "Haas F1 Team", 
      principal: "Ayao Komatsu",
      drivers: "Nico Hulkenberg, Kevin Magnussen",
      championships: 0,
      wins: 0,
      powerUnit: "Ferrari",
      location: "Kannapolis, United States",
      image: "/images/teams/haas.webp",
      color: "#FFFFFF"
    },
    { 
      id: "racingbulls", 
      name: "Racing Bulls", 
      principal: "Laurent Mekies",
      drivers: "Yuki Tsunoda, Daniel Ricciardo",
      championships: 0,
      wins: 2,
      powerUnit: "Honda RBPT",
      location: "Faenza, Italy",
      image: "/images/teams/racingbulls.webp",
      color: "#6692FF"
    },
    { 
      id: "sauber", 
      name: "Sauber", 
      principal: "Alessandro Alunni Bravi",
      drivers: "Valtteri Bottas, Zhou Guanyu",
      championships: 0,
      wins: 1,
      powerUnit: "Ferrari",
      location: "Hinwil, Switzerland",
      image: "/images/teams/sauber.webp",
      color: "#52E252"
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
          <h3 className={styles.subtitle}>Constructors</h3>
          <h2 className={styles.title}>Featured Teams</h2>
        </div>
        <Link href="/teams" className={styles.viewAll}>
          All Teams
        </Link>
      </div>

      <div className={styles.teamsContainer}>
        {teams.map((team, index) => {
          return (
            <motion.div 
              key={team.id} 
              className={styles.teamCard}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover="hover"
            >
              <div className={styles.cardGlow} style={{ '--team-color': team.color }} />
              
              <div className={styles.cardInner}>
                <div className={styles.imageContainer}>
                  <img 
                    src={team.image} 
                    alt={team.name} 
                    className={styles.teamImage} 
                    onError={handleImageError}
                  />
                  <div className={styles.glassReflection} />
                  <div className={styles.imageOverlay} />
                </div>
                
                <div className={styles.teamContent}>
                  <div className={styles.contentHeader}>
                    <h3 className={styles.teamName} style={{ color: team.color }}>{team.name}</h3>
                    <span className={styles.championships}>{team.championships}x Champions</span>
                  </div>
                  
                  <div className={styles.statsGrid}>
                    <div className={styles.statRow}>
                      <span className={styles.statLabel}>Team Principal</span>
                      <span className={styles.statValue}>{team.principal}</span>
                    </div>
                    <div className={styles.statRow}>
                      <span className={styles.statLabel}>Drivers</span>
                      <span className={styles.statValue}>{team.drivers}</span>
                    </div>
                    <div className={styles.statRow}>
                      <span className={styles.statLabel}>Power Unit</span>
                      <span className={styles.statValue}>{team.powerUnit}</span>
                    </div>
                    <div className={styles.statRow}>
                      <span className={styles.statLabel}>Race Wins</span>
                      <span className={styles.statValue}>{team.wins}</span>
                    </div>
                    <div className={styles.statRow}>
                      <span className={styles.statLabel}>Base</span>
                      <span className={styles.statValue}>{team.location}</span>
                    </div>
                  </div>
                  
                  <div className={styles.actionRow}>
                    <Link href={`/teams/${team.id}`} className={styles.exploreBtn} style={{ borderColor: team.color }}>
                      Explore Team
                    </Link>
                  </div>
                </div>
              </div>

              <motion.div 
                className={styles.animatedBorder}
                variants={{
                  hover: { opacity: 1, borderColor: team.color }
                }}
                initial={{ opacity: 0, borderColor: 'rgba(255,255,255,0.1)' }}
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

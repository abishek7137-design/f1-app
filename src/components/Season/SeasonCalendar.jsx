'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ChevronRight, CloudRain, Clock } from 'lucide-react';
import styles from './SeasonCalendar.module.css';
import { useResponsiveViewport } from '@/hooks/useResponsive';

export default function SeasonCalendar() {
  const viewport = useResponsiveViewport(0.2);
  const races = [
    { round: 1, month: "Mar", days: "03-05", status: "Completed", circuitId: "bahrain", name: "Bahrain Grand Prix", city: "Sakhir", country: "Bahrain" },
    { round: 2, month: "Mar", days: "17-19", status: "Completed", circuitId: "saudi-arabia", name: "Saudi Arabian Grand Prix", city: "Jeddah", country: "Saudi Arabia" },
    { round: 3, month: "Mar", days: "31-02", status: "Completed", circuitId: "australia", name: "Australian Grand Prix", city: "Melbourne", country: "Australia" },
    { round: 4, month: "Apr", days: "21-23", status: "Completed", circuitId: "japan", name: "Japanese Grand Prix", city: "Suzuka", country: "Japan" },
    { round: 5, month: "May", days: "05-07", status: "Completed", circuitId: "china", name: "Chinese Grand Prix", city: "Shanghai", country: "China" },
    { round: 6, month: "May", days: "19-21", status: "Upcoming", circuitId: "miami", name: "Miami Grand Prix", city: "Miami", country: "USA" },
    { round: 7, month: "May", days: "26-28", status: "Upcoming", circuitId: "emilia-romagna", name: "Emilia-Romagna Grand Prix", city: "Imola", country: "Italy" },
    { round: 8, month: "Jun", days: "02-04", status: "Upcoming", circuitId: "monaco", name: "Monaco Grand Prix", city: "Monte Carlo", country: "Monaco" },
    { round: 9, month: "Jun", days: "16-18", status: "Upcoming", circuitId: "spain", name: "Spanish Grand Prix", city: "Barcelona", country: "Spain" },
    { round: 10, month: "Jun", days: "30-02", status: "Upcoming", circuitId: "canada", name: "Canadian Grand Prix", city: "Montreal", country: "Canada" },
    { round: 11, month: "Jul", days: "14-16", status: "Upcoming", circuitId: "austria", name: "Austrian Grand Prix", city: "Spielberg", country: "Austria" },
    { round: 12, month: "Jul", days: "28-30", status: "Upcoming", circuitId: "great-britain", name: "British Grand Prix", city: "Silverstone", country: "Great Britain" },
    { round: 13, month: "Aug", days: "11-13", status: "Upcoming", circuitId: "belgium", name: "Belgian Grand Prix", city: "Spa", country: "Belgium" },
    { round: 14, month: "Aug", days: "25-27", status: "Upcoming", circuitId: "hungary", name: "Hungarian Grand Prix", city: "Budapest", country: "Hungary" },
    { round: 15, month: "Sep", days: "08-10", status: "Upcoming", circuitId: "netherlands", name: "Dutch Grand Prix", city: "Zandvoort", country: "Netherlands" },
    { round: 16, month: "Sep", days: "22-24", status: "Upcoming", circuitId: "italy", name: "Italian Grand Prix", city: "Monza", country: "Italy" },
    { round: 17, month: "Oct", days: "06-08", status: "Upcoming", circuitId: "azerbaijan", name: "Azerbaijan Grand Prix", city: "Baku", country: "Azerbaijan" },
    { round: 18, month: "Oct", days: "20-22", status: "Upcoming", circuitId: "singapore", name: "Singapore Grand Prix", city: "Marina Bay", country: "Singapore" },
    { round: 19, month: "Nov", days: "03-05", status: "Upcoming", circuitId: "usa", name: "United States Grand Prix", city: "Austin", country: "USA" },
    { round: 20, month: "Nov", days: "10-12", status: "Upcoming", circuitId: "mexico", name: "Mexico City Grand Prix", city: "Mexico City", country: "Mexico" },
    { round: 21, month: "Nov", days: "17-19", status: "Upcoming", circuitId: "brazil", name: "São Paulo Grand Prix", city: "São Paulo", country: "Brazil" },
    { round: 22, month: "Dec", days: "01-03", status: "Upcoming", circuitId: "las-vegas", name: "Las Vegas Grand Prix", city: "Las Vegas", country: "USA" },
    { round: 23, month: "Dec", days: "08-10", status: "Upcoming", circuitId: "qatar", name: "Qatar Grand Prix", city: "Lusail", country: "Qatar" },
    { round: 24, month: "Dec", days: "15-17", status: "Upcoming", circuitId: "abu-dhabi", name: "Abu Dhabi Grand Prix", city: "Yas Marina", country: "UAE" }
  ];

  const handleImageError = (e) => {
    // If the image fails to load, hide the img element completely.
    // The parent .cardImageBg container will then display the rich CSS fallback (carbon fiber).
    e.target.style.display = 'none';
    e.target.parentElement.classList.add(styles.carbonFallback);
  };

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <motion.h3 
          className={styles.subtitle}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewport}
        >
          Calendar
        </motion.h3>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewport}
          transition={{ delay: 0.1 }}
        >
          Race Schedule
        </motion.h2>
      </div>

      <div className={styles.timelineGrid}>
        {races.map((race, index) => {
          return (
            <motion.div 
              key={race.round}
              className={styles.raceCard}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.6, delay: (index % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.cardImageBg}>
                <img 
                  src={`/images/calendar/${race.circuitId}.webp`}
                  alt={`${race.name} Aerial`}
                  className={styles.aerialImage}
                  onError={handleImageError}
                />
                <div className={styles.imageOverlay} />
                <div className={styles.glassSweep} />
              </div>

              <div className={styles.cardContent}>
                <div className={styles.raceLeft}>
                  <div className={styles.raceDate}>
                    <span className={styles.dateMonth}>{race.month}</span>
                    <span className={styles.dateDays}>{race.days}</span>
                  </div>
                  
                  <div className={styles.raceInfo}>
                    <span className={styles.raceRound}>Round {race.round}</span>
                    <span className={styles.raceName}>{race.name}</span>
                    <div className={styles.location}>
                      <MapPin size={14} /> {race.city}, {race.country}
                    </div>
                  </div>
                </div>

                <div className={styles.raceRight}>
                  {race.status === 'Upcoming' && (
                    <div className={styles.quickStats}>
                      <span className={styles.stat}><CloudRain size={16} /> 20%</span>
                      <span className={styles.stat}><Clock size={16} /> 15:00 Local</span>
                    </div>
                  )}
                  <button className={`${styles.actionButton} ${race.status === 'Completed' ? styles.btnSecondary : styles.btnPrimary}`}>
                    {race.status === 'Completed' ? 'View Results' : 'Book Tickets'} <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

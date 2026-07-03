'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Square, Mic, Radio } from 'lucide-react';
import styles from './TeamRadio.module.css';

export default function TeamRadio({ driver }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeMessageIdx, setActiveMessageIdx] = useState(-1);
  const scrollRef = useRef(null);

  if (!driver.radioTranscript || driver.radioTranscript.length === 0) return null;

  // Simulate audio playback timeline
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveMessageIdx(prev => {
          const next = prev + 1;
          if (next >= driver.radioTranscript.length) {
            setIsPlaying(false);
            return prev;
          }
          return next;
        });
      }, 3000); // 3 seconds per message
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, driver]);

  // Auto-scroll transcript
  useEffect(() => {
    if (scrollRef.current && activeMessageIdx >= 0) {
      const activeEl = scrollRef.current.children[activeMessageIdx];
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [activeMessageIdx]);

  const togglePlay = () => {
    if (!isPlaying && activeMessageIdx >= driver.radioTranscript.length - 1) {
      setActiveMessageIdx(-1);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section className={styles.radioSection}>
      <div className={styles.container}>
        
        <div className={styles.glassCard} style={{ '--team-color': driver.teamColor }}>
          
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.titleWrapper}>
              <Radio size={24} color={driver.teamColor} className={isPlaying ? styles.pulse : ''} />
              <h2 className={styles.title}>Team Radio</h2>
            </div>
            <div className={styles.status}>
              {isPlaying ? (
                <span className={styles.liveBadge}><span className={styles.liveDot} /> LIVE FEED</span>
              ) : (
                <span className={styles.offlineBadge}>STANDBY</span>
              )}
            </div>
          </div>

          <div className={styles.content}>
            
            {/* Visualizer */}
            <div className={styles.visualizer}>
              {Array.from({ length: 40 }).map((_, i) => (
                <motion.div 
                  key={i}
                  className={styles.bar}
                  animate={{ 
                    height: isPlaying ? [10, Math.random() * 80 + 20, 10] : 10,
                    opacity: isPlaying ? 1 : 0.3 
                  }}
                  transition={{ 
                    duration: 0.5, 
                    repeat: isPlaying ? Infinity : 0,
                    delay: i * 0.05 
                  }}
                  style={{ backgroundColor: driver.teamColor }}
                />
              ))}
            </div>

            {/* Transcript Box */}
            <div className={styles.transcriptBox}>
              <div className={styles.scrollArea} ref={scrollRef}>
                {driver.radioTranscript.map((msg, idx) => {
                  const isActive = idx === activeMessageIdx;
                  const isPast = idx < activeMessageIdx;
                  const isDriver = msg.speaker === driver.firstName;

                  return (
                    <motion.div 
                      key={idx}
                      className={`${styles.message} ${isActive ? styles.messageActive : ''} ${isPast ? styles.messagePast : ''} ${isDriver ? styles.messageDriver : styles.messageEngineer}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: isActive || isPast ? 1 : 0.2, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className={styles.msgMeta}>
                        <Mic size={12} /> {msg.speaker} • {msg.time}
                      </div>
                      <div className={styles.msgText}>
                        {msg.text}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Controls */}
            <div className={styles.controls}>
              <button 
                className={styles.playBtn} 
                onClick={togglePlay}
                style={{ backgroundColor: isPlaying ? 'rgba(255,255,255,0.1)' : driver.teamColor }}
              >
                {isPlaying ? <Square size={20} color="#fff" /> : <Play size={20} color="#fff" />}
              </button>
              <div className={styles.audioLine} />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

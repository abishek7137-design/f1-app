'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { teamsData } from '../../data/mockData';
import styles from './TeamComparison.module.css';

export default function TeamComparison() {
  const [teamAId, setTeamAId] = useState('red-bull-racing');
  const [teamBId, setTeamBId] = useState('ferrari'); // Changed default to Ferrari

  const teamA = teamsData.find(d => d.id === teamAId);
  const teamB = teamsData.find(d => d.id === teamBId);

  const maxStats = {
    wins: Math.max(...teamsData.map(d => d.wins)),
    championships: Math.max(...teamsData.map(d => d.championships)) || 1,
    poles: Math.max(...teamsData.map(d => d.poles)) || 1,
    podiums: Math.max(...teamsData.map(d => d.podiums)) || 1
  };

  const handleLogoError = (e, team) => {
    e.target.style.display = 'none';
    const fallback = e.target.parentElement.querySelector(`.${styles.logoFallback}`);
    if (fallback) fallback.style.display = 'flex';
  };

  const handleCarError = (e, team) => {
    e.target.style.display = 'none';
    const fallback = e.target.parentElement.querySelector(`.${styles.carFallback}`);
    if (fallback) fallback.style.display = 'block';
  };

  const renderStatBar = (team, statKey, isRight = false) => {
    const val = team[statKey];
    const pct = (val / maxStats[statKey]) * 100;

    return (
      <div className={`${styles.statRow} ${isRight ? styles.statRight : styles.statLeft}`}>
        <div className={styles.statHeader}>
          {!isRight && <span className={styles.statLabel}>{statKey}</span>}
          <span className={styles.statValue}>{val}</span>
          {isRight && <span className={styles.statLabel}>{statKey}</span>}
        </div>
        <div className={styles.barTrack}>
          <motion.div 
            className={styles.barFill}
            style={{ 
              backgroundColor: team.color,
              [isRight ? 'right' : 'left']: 0,
              boxShadow: `0 0 15px ${team.color}80`
            }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>
    );
  };

  const renderTextStat = (team, label, val, isRight = false) => (
    <div className={`${styles.textStatRow} ${isRight ? styles.textStatRight : styles.textStatLeft}`}>
      {!isRight && <span className={styles.textStatLabel}>{label}</span>}
      <span className={styles.textStatValue}>{val}</span>
      {isRight && <span className={styles.textStatLabel}>{label}</span>}
    </div>
  );

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h3 className={styles.subtitle}>Head to Head</h3>
        <h2 className={styles.title}>Compare Teams</h2>
      </div>

      <div className={styles.comparisonArena}>
        
        {/* Team A Column */}
        <div className={styles.teamColumn}>
          <div className={styles.selectWrapper}>
            <select 
              className={styles.selectBox} 
              value={teamAId} 
              onChange={(e) => setTeamAId(e.target.value)}
              style={{ '--team-color': teamA.color, borderColor: teamA.color, color: teamA.color }}
            >
              {teamsData.map(d => (
                <option key={d.id} value={d.id} disabled={d.id === teamBId}>{d.name}</option>
              ))}
            </select>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={teamA.id}
              className={styles.teamCard}
              style={{ '--team-color': teamA.color }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
            >
              <div className={styles.teamVisuals}>
                <div className={styles.logoContainer}>
                  <img 
                    src={`/images/team-logos/${teamA.id}.webp`} 
                    alt={`${teamA.name} logo`} 
                    className={styles.teamLogo}
                    onError={(e) => handleLogoError(e, teamA)}
                  />
                  <div className={styles.logoFallback} style={{ color: teamA.color, textShadow: `0 0 20px ${teamA.color}` }}>
                    {teamA.shortName}
                  </div>
                </div>
                
                <div className={styles.carContainer}>
                  <img 
                    src={`/images/team-cars/${teamA.id}.webp`} 
                    alt={`${teamA.name} car`} 
                    className={styles.teamCar}
                    onError={(e) => handleCarError(e, teamA)}
                  />
                  {/* Glowing Silhouette Fallback */}
                  <div 
                    className={styles.carFallback}
                    style={{
                      background: `linear-gradient(to right, transparent, ${teamA.color}, transparent)`,
                      boxShadow: `0 0 40px ${teamA.color}`
                    }}
                  />
                </div>
              </div>

              <div className={styles.statsContainer}>
                {renderStatBar(teamA, 'championships')}
                {renderStatBar(teamA, 'wins')}
                {renderStatBar(teamA, 'poles')}
                {renderStatBar(teamA, 'podiums')}

                <div className={styles.textStatsContainer}>
                  {renderTextStat(teamA, 'Base', teamA.base)}
                  {renderTextStat(teamA, 'Principal', teamA.principal)}
                  {renderTextStat(teamA, 'Power Unit', teamA.engine)}
                  {renderTextStat(teamA, 'Founded', teamA.founded)}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.vsColumn}>
          <motion.div 
            className={styles.vsCircle}
            animate={{ 
              boxShadow: [`0 0 10px ${teamA.color}`, `0 0 30px ${teamB.color}`, `0 0 10px ${teamA.color}`] 
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            VS
          </motion.div>
          <div className={styles.dividerLine} style={{ background: `linear-gradient(to bottom, ${teamA.color}, ${teamB.color})` }} />
        </div>

        {/* Team B Column */}
        <div className={styles.teamColumn}>
          <div className={styles.selectWrapper} style={{ justifyContent: 'flex-end' }}>
            <select 
              className={styles.selectBox} 
              value={teamBId} 
              onChange={(e) => setTeamBId(e.target.value)}
              style={{ '--team-color': teamB.color, borderColor: teamB.color, color: teamB.color, textAlign: 'right' }}
            >
              {teamsData.map(d => (
                <option key={d.id} value={d.id} disabled={d.id === teamAId}>{d.name}</option>
              ))}
            </select>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={teamB.id}
              className={styles.teamCard}
              style={{ '--team-color': teamB.color }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className={styles.teamVisuals}>
                <div className={styles.logoContainer}>
                  <img 
                    src={`/images/team-logos/${teamB.id}.webp`} 
                    alt={`${teamB.name} logo`} 
                    className={styles.teamLogo}
                    onError={(e) => handleLogoError(e, teamB)}
                  />
                  <div className={styles.logoFallback} style={{ color: teamB.color, textShadow: `0 0 20px ${teamB.color}` }}>
                    {teamB.shortName}
                  </div>
                </div>
                
                <div className={styles.carContainer}>
                  <img 
                    src={`/images/team-cars/${teamB.id}.webp`} 
                    alt={`${teamB.name} car`} 
                    className={styles.teamCar}
                    style={{ transform: 'scaleX(-1)' }} // Face the cars towards each other
                    onError={(e) => handleCarError(e, teamB)}
                  />
                  {/* Glowing Silhouette Fallback */}
                  <div 
                    className={styles.carFallback}
                    style={{
                      background: `linear-gradient(to right, transparent, ${teamB.color}, transparent)`,
                      boxShadow: `0 0 40px ${teamB.color}`
                    }}
                  />
                </div>
              </div>

              <div className={styles.statsContainer}>
                {renderStatBar(teamB, 'championships', true)}
                {renderStatBar(teamB, 'wins', true)}
                {renderStatBar(teamB, 'poles', true)}
                {renderStatBar(teamB, 'podiums', true)}

                <div className={styles.textStatsContainer}>
                  {renderTextStat(teamB, 'Base', teamB.base, true)}
                  {renderTextStat(teamB, 'Principal', teamB.principal, true)}
                  {renderTextStat(teamB, 'Power Unit', teamB.engine, true)}
                  {renderTextStat(teamB, 'Founded', teamB.founded, true)}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

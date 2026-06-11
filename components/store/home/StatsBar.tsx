'use client';

import { motion } from 'framer-motion';
import { STATS } from '@/lib/constants';
import { scaleIn, staggerContainer, viewport } from '@/lib/motion';
import styles from './StatsBar.module.css';

const ICONS = [
  <svg key="box" width="28" height="28" fill="none" stroke="#0f7cf5" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  <svg key="star" width="28" height="28" fill="none" stroke="#0f7cf5" strokeWidth="1.5" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  <svg key="shield" width="28" height="28" fill="none" stroke="#0f7cf5" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  <svg key="truck" width="28" height="28" fill="none" stroke="#0f7cf5" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
];

export default function StatsBar() {
  return (
    <section className={styles.section} aria-label="Company statistics">
      <motion.div 
        className={styles.grid}
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        {STATS.map((stat, i) => (
          <motion.div key={stat.label} className={styles.card} variants={scaleIn}>
            <div className={styles.icon}>{ICONS[i]}</div>
            <div className={styles.text}>
              <strong className={styles.value}>{stat.value}</strong>
              <span className={styles.label}>{stat.label}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

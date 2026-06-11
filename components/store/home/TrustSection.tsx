'use client';

import Image from 'next/image';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { TRUST_ITEMS } from '@/lib/constants';
import { fadeUp, staggerContainer, viewportLarge } from '@/lib/motion';
import styles from './TrustSection.module.css';

const TRUST_ICONS = [
  <svg key="truck" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>,
  <svg key="flask" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M9 3h6v8l4 9H5l4-9V3z" /><line x1="9" y1="3" x2="15" y2="3" /></svg>,
  <svg key="microscope" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M6 18h8" /><path d="M3 22h18" /><path d="M14 22a7 7 0 0 0 7-7h-4a3 3 0 0 1-3 3v4z" /><path d="M9 14 5 10l6-6 4 4-6 6z" /><path d="m12 3 2-2 5 5-2 2" /></svg>,
  <svg key="star" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
];

export default function TrustSection() {
  return (
    <section className={styles.section}>
      <motion.div 
        className={styles.container}
        variants={staggerContainer(0.2)}
        initial="hidden"
        whileInView="show"
        viewport={viewportLarge}
      >
        <motion.div className={styles.heading} variants={fadeUp}>
          <span className={styles.label}>Why Researchers Trust Us</span>
          <h2 className={styles.title}>Backed by Science. Driven by Integrity.</h2>
        </motion.div>

        <div className={styles.grid}>
          <div className={styles.col}>
            {TRUST_ITEMS.slice(0, 2).map((item, index) => (
              <motion.div key={item.title} variants={fadeUp}>
                <TrustCard icon={TRUST_ICONS[index]} title={item.title} body={item.body} side="left" />
              </motion.div>
            ))}
          </div>

          <motion.div className={styles.centerVial} variants={fadeUp}>
            <div className={styles.vialGlow} />
            <Image
              src="/images/products/tb500.png"
              alt="Zenith Biopeptides TB-500 peptide vial"
              fill
              sizes="230px"
              className={styles.vialImg}
            />
          </motion.div>

          <div className={styles.col}>
            {TRUST_ITEMS.slice(2).map((item, index) => (
              <motion.div key={item.title} variants={fadeUp}>
                <TrustCard icon={TRUST_ICONS[index + 2]} title={item.title} body={item.body} side="right" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function TrustCard({ icon, title, body, side }: { icon: ReactNode; title: string; body: string; side: 'left' | 'right' }) {
  return (
    <div className={`${styles.card} ${side === 'left' ? styles.leftCard : styles.rightCard}`}>
      <div className={styles.iconCircle}>{icon}</div>
      <div className={styles.cardText}>
        <strong>{title}</strong>
        <p>{body}</p>
      </div>
      <span className={styles.connector} aria-hidden />
    </div>
  );
}

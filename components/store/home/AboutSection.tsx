'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewportLarge } from '@/lib/motion';
import styles from './AboutSection.module.css';

const TRAITS = [
  {
    icon: <path d="M12 3a9 9 0 1 0 9 9" />,
    label: 'cGMP\nManufacturing',
    text: 'cGMP',
  },
  {
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    label: 'Rigorous\nQuality Control',
  },
  {
    icon: <><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" /><circle cx="12" cy="12" r="3" /></>,
    label: 'Transparent\n& Reliable',
  },
  {
    icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
    label: 'Trusted by\nResearchers',
  },
];

export default function AboutSection() {
  return (
    <section className={styles.section} id="about">
      <motion.div 
        className={styles.imageWrap}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={viewportLarge}
        transition={{ duration: 0.8, ease: [0, 0, 0.2, 1] }}
      >
        <Image
          src="/images/molecule.png"
          alt="3D molecular structure illustration"
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
          className={styles.molecule}
        />
      </motion.div>

      <motion.div 
        className={styles.copy}
        variants={staggerContainer(0.15)}
        initial="hidden"
        whileInView="show"
        viewport={viewportLarge}
      >
        <motion.span className="section-label" variants={fadeUp}>About Us</motion.span>
        <motion.h2 className={styles.title} variants={fadeUp}>About Zenith Biopeptides</motion.h2>
        <motion.div className={styles.divider} variants={fadeUp} />

        <motion.p variants={fadeUp}>
          At Zenith Biopeptides, we are committed to delivering the highest
          quality research compounds to support scientific advancement.
        </motion.p>
        <motion.p variants={fadeUp}>
          Every peptide is manufactured in state-of-the-art facilities and
          rigorously tested for purity, potency, and consistency.
        </motion.p>

        <motion.div className={styles.traits} variants={fadeUp}>
          {TRAITS.map(({ icon, label, text }) => (
            <div key={label} className={styles.trait}>
              <span className={styles.traitIcon}>
                <svg width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24" aria-hidden>
                  {icon}
                  {text && <text x="12" y="14" textAnchor="middle" fontSize="6" fontWeight="800" fill="currentColor" stroke="none">{text}</text>}
                </svg>
              </span>
              <small>{label}</small>
            </div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp}>
          <Link href="/about" className={styles.btn}>
            Learn More About Us <span aria-hidden>&rarr;</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

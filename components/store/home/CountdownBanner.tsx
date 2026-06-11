'use client';

import { useEffect, useState } from 'react';
import styles from './CountdownBanner.module.css';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const SALE_END = new Date(
  Date.now() +
    2 * 24 * 60 * 60 * 1000 +
    23 * 60 * 60 * 1000 +
    47 * 60 * 1000 +
    19 * 1000,
);

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export default function CountdownBanner() {
  const [time, setTime] = useState<TimeLeft>({ days: 2, hours: 23, minutes: 47, seconds: 19 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, SALE_END.getTime() - Date.now());
      setTime({
        days: Math.floor(diff / 86_400_000),
        hours: Math.floor((diff % 86_400_000) / 3_600_000),
        minutes: Math.floor((diff % 3_600_000) / 60_000),
        seconds: Math.floor((diff % 60_000) / 1_000),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { value: pad(time.days), label: 'DAYS' },
    { value: pad(time.hours), label: 'HOURS' },
    { value: pad(time.minutes), label: 'MINUTES' },
    { value: pad(time.seconds), label: 'SECONDS' },
  ];

  return (
    <div className={styles.banner}>
      <div className={styles.inner}>
        <div className={styles.promo}>
          <span className={styles.giftIcon} aria-hidden>
            <svg width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <polyline points="20 12 20 22 4 22 4 12" />
              <rect x="2" y="7" width="20" height="5" />
              <line x1="12" y1="22" x2="12" y2="7" />
              <path d="M12 7H7.5a2.5 2.5 0 1 1 0-5C11 2 12 7 12 7z" />
              <path d="M12 7h4.5a2.5 2.5 0 1 0 0-5C13 2 12 7 12 7z" />
            </svg>
          </span>
          <div className={styles.promoText}>
            <span>Fulfillment Launch Sale</span>
            <strong>15% OFF Sitewide</strong>
          </div>
        </div>

        <div className={styles.timer} aria-live="polite" aria-label="Sale countdown">
          {units.map(({ value, label }, index) => (
            <div key={label} className={styles.unit}>
              <span className={styles.value}>{value}</span>
              <small className={styles.label}>{label}</small>
              {index < units.length - 1 && <span className={styles.colon} aria-hidden>:</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

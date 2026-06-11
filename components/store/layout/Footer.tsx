'use client';

import Link from 'next/link';
import styles from './Footer.module.css';

function Logo() {
  return (
    <Link href="/" className={styles.logo} aria-label="Zenith Biopeptides Home">
      <span className={styles.hex}>Z</span>
      <span className={styles.logoText}>
        <strong>ZENITH</strong>
        <small>BIOPEPTIDES</small>
      </span>
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.grid}>
        <div className={styles.brand}>
          <Logo />
          <p>
            Premium research compounds
            <br />
            for scientific advancement.
          </p>
          <div className={styles.socials}>
            <a href="#" aria-label="Twitter">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
            </a>
            <a href="#" aria-label="Email">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            </a>
          </div>
        </div>

        <div className={styles.col}>
          <h3>Quick Links</h3>
          <Link href="/">Home</Link>
          <Link href="/shop">Shop All Products</Link>
          <Link href="/about">About Us</Link>
          <Link href="/faqs">FAQs</Link>
          <Link href="/about#coa">COA Reports</Link>
          <Link href="/contact">Contact Us</Link>
        </div>

        <div className={styles.col}>
          <h3>Customer Support</h3>
          <p className={styles.iconLine}>
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            support@zenithbiopeptides.com
          </p>
          <p className={styles.iconLine}>
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
            (858) 123-4567
          </p>
          <p className={styles.iconLine}>
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            Mon - Fri: 9AM - 5PM PST
          </p>
          <Link href="/contact" className={styles.outlineBtn}>
            Contact Us <span aria-hidden>&rarr;</span>
          </Link>
        </div>

        <div className={styles.col}>
          <h3>Newsletter</h3>
          <strong className={styles.offer}>Get 10% Off Your First Order</strong>
          <p>Stay updated on new products, exclusive offers, and research insights.</p>
          <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email for newsletter"
              className={styles.input}
            />
            <button type="submit" className={styles.subBtn}>Subscribe</button>
          </form>
        </div>

        <div className={styles.col}>
          <h3>Location</h3>
          <p>
            123 Research Blvd.
            <br />
            San Diego, CA 92121
            <br />
            United States
          </p>
          <div className={styles.mapWrap}>
            <div className={styles.mapPlaceholder}>
              <span className={styles.pin} aria-hidden>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <span className={styles.mapText}>Zenith Biopeptides</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>Copyright 2024 Zenith Biopeptides. All rights reserved.</span>
        <div className={styles.legal}>
          <Link href="/privacy">Privacy Policy</Link>
          <span className={styles.sep}>|</span>
          <Link href="/terms">Terms of Service</Link>
          <span className={styles.sep}>|</span>
          <Link href="/refunds">Refund Policy</Link>
        </div>
        <span className={styles.trust}>
          Excellent <span className={styles.stars} aria-label="5 stars">★★★★★</span> Trustpilot
        </span>
      </div>
    </footer>
  );
}

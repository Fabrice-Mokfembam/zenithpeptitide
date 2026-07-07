'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NAV_LINKS } from '@/lib/constants';
import { useCartStore } from '@/lib/store';
import { useHasMounted } from '@/lib/use-has-mounted';
import { createClient } from '@/lib/supabase/client';
import { logout } from '@/app/actions/auth';
import { User } from '@supabase/supabase-js';
import styles from './Header.module.css';

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

export default function Header() {
  const pathname = usePathname();
  const { items, toggleDrawer } = useCartStore();
  const mounted = useHasMounted();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Track scroll for shadow effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          <Logo />

          {/* Desktop nav */}
          <nav className={styles.nav} aria-label="Main navigation">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`${styles.navLink} ${pathname === href ? styles.active : ''}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className={styles.actions}>
            <Link className={styles.iconBtn} aria-label="Search products" href="/shop">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </Link>
            <Link className={styles.iconBtn} aria-label="Wishlist" href="/shop?wishlist=1">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </Link>
            <button className={styles.iconBtn} aria-label={`Cart (${mounted ? cartCount : 0} items)`} onClick={toggleDrawer}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              {mounted && cartCount > 0 && <sup className={styles.badge}>{cartCount}</sup>}
            </button>
            {user ? (
              <div className={styles.userMenu} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Link href="/account" className={styles.navLink} style={{ fontSize: '14px', fontWeight: 600 }}>My Account</Link>
                <form action={logout}>
                  <button type="submit" className={styles.navLink} style={{ fontSize: '14px', cursor: 'pointer' }}>Sign Out</button>
                </form>
              </div>
            ) : (
              <Link href="/login" className={styles.loginBtn}>Login</Link>
            )}
          </div>

          {/* Mobile: cart + hamburger only */}
          <div className={styles.mobileActions}>
            <button className={styles.iconBtn} aria-label={`Cart (${mounted ? cartCount : 0} items)`} onClick={toggleDrawer}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              {mounted && cartCount > 0 && <sup className={styles.badge}>{cartCount}</sup>}
            </button>
            <button
              className={`${styles.hamburger} ${mobileMenuOpen ? styles.open : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className={styles.mobileBackdrop} onClick={() => setMobileMenuOpen(false)} />
      )}
      <nav className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`} aria-label="Mobile navigation">
        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className={`${styles.mobileLink} ${pathname === href ? styles.active : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            {label}
          </Link>
        ))}
        <div className={styles.mobileMenuFooter}>
          {user ? (
            <>
              <Link href="/account" className={styles.mobileLoginBtn} style={{ marginBottom: '8px', background: 'transparent', color: 'var(--c-blue)', border: '1px solid var(--c-blue)' }} onClick={() => setMobileMenuOpen(false)}>
                My Account
              </Link>
              <form action={logout}>
                <button type="submit" className={styles.mobileLoginBtn} style={{ width: '100%', justifyContent: 'center' }}>
                  Sign Out
                </button>
              </form>
            </>
          ) : (
            <Link href="/login" className={styles.mobileLoginBtn} onClick={() => setMobileMenuOpen(false)}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Sign In / Register
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}

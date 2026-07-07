'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/lib/store';
import { useHasMounted } from '@/lib/use-has-mounted';
import styles from './MobileBottomNav.module.css';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { toggleDrawer, items } = useCartStore();
  const mounted = useHasMounted();

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className={styles.nav}>
      {/* Home */}
      <Link
        href="/"
        className={`${styles.tab} ${pathname === '/' ? styles.active : ''}`}
      >
        <span className={styles.iconWrap}>
          <svg
            className={styles.icon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
            <polyline points="9 21 9 14 15 14 15 21" />
          </svg>
        </span>
        <span className={styles.label}>Home</span>
      </Link>

      {/* Shop */}
      <Link
        href="/shop"
        className={`${styles.tab} ${pathname === '/shop' || pathname.startsWith('/shop/') ? styles.active : ''}`}
      >
        <span className={styles.iconWrap}>
          <svg
            className={styles.icon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        </span>
        <span className={styles.label}>Shop</span>
      </Link>

      {/* Cart */}
      <button
        className={styles.tab}
        onClick={toggleDrawer}
        type="button"
      >
        <span className={styles.iconWrap}>
          <svg
            className={styles.icon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          {mounted && itemCount > 0 && (
            <span className={styles.badge}>{itemCount}</span>
          )}
        </span>
        <span className={styles.label}>Cart</span>
      </button>

      {/* Wishlist */}
      <Link
        href="/shop?wishlist=1"
        className={styles.tab}
      >
        <span className={styles.iconWrap}>
          <svg
            className={styles.icon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </span>
        <span className={styles.label}>Wishlist</span>
      </Link>

      {/* Account */}
      <Link
        href="/login"
        className={`${styles.tab} ${pathname === '/login' ? styles.active : ''}`}
      >
        <span className={styles.iconWrap}>
          <svg
            className={styles.icon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </span>
        <span className={styles.label}>Account</span>
      </Link>
    </nav>
  );
}

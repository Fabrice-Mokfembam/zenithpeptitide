'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { useHasMounted } from '@/lib/use-has-mounted';
import { formatPrice } from '@/lib/utils';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
  const { items, isDrawerOpen, setDrawerOpen, removeItem, updateQuantity } = useCartStore();
  const mounted = useHasMounted();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`${styles.backdrop} ${isDrawerOpen ? styles.open : ''}`} 
        onClick={() => setDrawerOpen(false)}
      />

      {/* Drawer */}
      <div className={`${styles.drawer} ${isDrawerOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h2>Your Cart ({itemCount})</h2>
          <button className={styles.closeBtn} onClick={() => setDrawerOpen(false)} aria-label="Close cart">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div className={styles.body}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              <p>Your cart is empty.</p>
              <button className={styles.shopBtn} onClick={() => setDrawerOpen(false)}>Continue Shopping</button>
            </div>
          ) : (
            <div className={styles.itemList}>
              {items.map((item) => (
                <div key={item.id} className={styles.item}>
                  <div className={styles.itemImage}>
                    <Image src={item.image} alt={item.name} fill sizes="80px" />
                  </div>
                  <div className={styles.itemDetails}>
                    <div className={styles.itemHeader}>
                      <Link href={`/product/${item.slug}`} onClick={() => setDrawerOpen(false)} className={styles.itemName}>
                        {item.name}
                      </Link>
                      <button className={styles.removeBtn} onClick={() => removeItem(item.id)} aria-label="Remove item">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
                      </button>
                    </div>
                    <span className={styles.itemSize}>Size: {item.size}</span>
                    <div className={styles.itemFooter}>
                      <div className={styles.qtyBox}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                      <span className={styles.itemPrice}>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.subtotalRow}>
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <p className={styles.shippingNote}>Shipping & taxes calculated at checkout.</p>
            <Link 
              href="/checkout" 
              className={styles.checkoutBtn}
              onClick={() => setDrawerOpen(false)}
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

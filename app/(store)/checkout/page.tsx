'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { fadeUp, slideLeft, slideRight, staggerContainer } from '@/lib/motion';
import styles from './CheckoutPage.module.css';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 300 ? 0 : 15;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate processing delay
    setTimeout(() => {
      clearCart();
      router.push('/checkout/success');
    }, 1500);
  };

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <main className={styles.emptyMain}>
        <motion.div
          className={styles.emptyContainer}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <h1>Your Cart is Empty</h1>
          <p>Looks like you haven&apos;t added anything to your cart yet.</p>
          <Link href="/shop" className={styles.btn}>Return to Shop</Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Left Column - Forms */}
        <motion.div
          className={styles.leftCol}
          variants={slideLeft}
          initial="hidden"
          animate="show"
        >
          <form id="checkout-form" onSubmit={handleSubmit} className={styles.formGroup}>
            {/* Contact Info */}
            <motion.section className={styles.section} variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.1 }}>
              <div className={styles.sectionHeader}>
                <h2>Contact Information</h2>
                <span>Already have an account? <Link href="/login">Log in</Link></span>
              </div>
              <input type="email" placeholder="Email Address *" required className={styles.input} />
              <label className={styles.checkboxLabel}>
                <input type="checkbox" defaultChecked />
                <span>Email me with news and offers</span>
              </label>
            </motion.section>

            {/* Shipping Info */}
            <motion.section className={styles.section} variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.2 }}>
              <h2>Shipping Address</h2>
              <div className={styles.row}>
                <input type="text" placeholder="First Name *" required className={styles.input} />
                <input type="text" placeholder="Last Name *" required className={styles.input} />
              </div>
              <input type="text" placeholder="Address *" required className={styles.input} />
              <input type="text" placeholder="Apartment, suite, etc. (optional)" className={styles.input} />
              <div className={styles.row}>
                <input type="text" placeholder="City *" required className={styles.input} />
                <select className={styles.select} required defaultValue="">
                  <option value="" disabled>State *</option>
                  <option value="CA">California</option>
                  <option value="NY">New York</option>
                  <option value="TX">Texas</option>
                  <option value="FL">Florida</option>
                  {/* ... other states ... */}
                </select>
                <input type="text" placeholder="ZIP Code *" required className={styles.input} />
              </div>
            </motion.section>

            {/* Payment Info */}
            <motion.section className={styles.section} variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.3 }}>
              <h2>Payment</h2>
              <p className={styles.secureNote}>All transactions are secure and encrypted.</p>
              
              <div className={styles.paymentBox}>
                <div className={styles.paymentHeader}>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="payment" defaultChecked />
                    <span>Credit Card</span>
                  </label>
                  <div className={styles.cardIcons}>
                    {/* Placeholder for card icons */}
                    <span className={styles.cardIcon}>Visa</span>
                    <span className={styles.cardIcon}>MC</span>
                  </div>
                </div>
                <div className={styles.paymentBody}>
                  <input type="text" placeholder="Card Number *" required className={styles.input} />
                  <div className={styles.row}>
                    <input type="text" placeholder="Expiration Date (MM/YY) *" required className={styles.input} />
                    <input type="text" placeholder="Security Code *" required className={styles.input} />
                  </div>
                  <input type="text" placeholder="Name on Card *" required className={styles.input} />
                </div>
              </div>
            </motion.section>

            <button 
              type="submit" 
              className={`${styles.submitBtn} ${isSubmitting ? styles.loading : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : `Pay ${formatPrice(total)}`}
            </button>
          </form>
        </motion.div>

        {/* Right Column - Order Summary */}
        <motion.aside
          className={styles.rightCol}
          variants={slideRight}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.15 }}
        >
          <div className={styles.summaryCard}>
            <h2>Order Summary</h2>
            
            <motion.div
              className={styles.itemList}
              variants={staggerContainer(0.08)}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.3 }}
            >
              {items.map((item) => (
                <motion.div key={item.id} className={styles.item} variants={fadeUp}>
                  <div className={styles.itemImageWrap}>
                    <Image src={item.image} alt={item.name} fill sizes="60px" />
                    <span className={styles.itemBadge}>{item.quantity}</span>
                  </div>
                  <div className={styles.itemInfo}>
                    <strong>{item.name}</strong>
                    <span>{item.size}</span>
                  </div>
                  <span className={styles.itemPrice}>{formatPrice(item.price * item.quantity)}</span>
                </motion.div>
              ))}
            </motion.div>

            <div className={styles.totals}>
              <div className={styles.totalsRow}>
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className={styles.totalsRow}>
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className={`${styles.totalsRow} ${styles.finalTotal}`}>
                <span>Total</span>
                <div className={styles.totalPriceWrap}>
                  <span className={styles.currency}>USD</span>
                  <strong>{formatPrice(total)}</strong>
                </div>
              </div>
            </div>
          </div>
        </motion.aside>
      </div>
    </main>
  );
}

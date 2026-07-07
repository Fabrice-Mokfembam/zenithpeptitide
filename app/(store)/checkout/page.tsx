'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCartStore } from '@/lib/store';
import { useHasMounted } from '@/lib/use-has-mounted';
import { formatPrice } from '@/lib/utils';
import { fadeUp, slideLeft, slideRight, staggerContainer } from '@/lib/motion';
import { submitOrder } from '@/app/actions/checkout';
import styles from './CheckoutPage.module.css';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const mounted = useHasMounted();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [checkoutError, setCheckoutError] = useState('');

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'FULFILLMENT') {
      setDiscountApplied(0.15);
      setPromoError('');
    } else {
      setDiscountApplied(0);
      setPromoError('Invalid promo code');
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = subtotal * discountApplied;
  const subtotalAfterDiscount = subtotal - discountAmount;
  const shipping = subtotalAfterDiscount > 300 ? 0 : 15;
  const total = subtotalAfterDiscount + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setCheckoutError('');
    
    const formData = new FormData(e.target as HTMLFormElement);
    
    const orderData = {
      subtotal,
      shipping_fee: shipping,
      discount_total: discountAmount,
      total_amount: total,
      promo_code: discountApplied > 0 ? promoCode : '',
      contact_email: String(formData.get('email') ?? ''),
      shipping_name: `${formData.get('firstName') ?? ''} ${formData.get('lastName') ?? ''}`,
      shipping_address: `${formData.get('address')} ${formData.get('apartment') || ''}`.trim(),
      shipping_city: String(formData.get('city') ?? ''),
      shipping_state: String(formData.get('state') ?? ''),
      shipping_zip: String(formData.get('zip') ?? ''),
      items,
    };

    const res = await submitOrder(orderData);

    if ('error' in res) {
      setCheckoutError(res.error ?? 'An unexpected error occurred. Please try again.');
      setIsSubmitting(false);
    } else if (res.success) {
      clearCart();
      const params = new URLSearchParams({
        order: res.orderNumber,
        total: res.totalAmount.toFixed(2),
        pay: res.bitcoinPaymentString,
      });
      router.push(`/checkout/payment?${params.toString()}`);
    }
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
              <input type="email" name="email" placeholder="Email Address *" required className={styles.input} />
              <label className={styles.checkboxLabel}>
                <input type="checkbox" defaultChecked />
                <span>Email me with news and offers</span>
              </label>
            </motion.section>

            {/* Shipping Info */}
            <motion.section className={styles.section} variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.2 }}>
              <h2>Shipping Address</h2>
              <div className={styles.row}>
                <input type="text" name="firstName" placeholder="First Name *" required className={styles.input} />
                <input type="text" name="lastName" placeholder="Last Name *" required className={styles.input} />
              </div>
              <input type="text" name="address" placeholder="Address *" required className={styles.input} />
              <input type="text" name="apartment" placeholder="Apartment, suite, etc. (optional)" className={styles.input} />
              <div className={styles.row}>
                <input type="text" name="city" placeholder="City *" required className={styles.input} />
                <select name="state" className={styles.select} required defaultValue="">
                  <option value="" disabled>State *</option>
                  <option value="AL">Alabama</option><option value="AK">Alaska</option><option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option><option value="CA">California</option><option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option><option value="DE">Delaware</option><option value="FL">Florida</option>
                  <option value="GA">Georgia</option><option value="HI">Hawaii</option><option value="ID">Idaho</option>
                  <option value="IL">Illinois</option><option value="IN">Indiana</option><option value="IA">Iowa</option>
                  <option value="KS">Kansas</option><option value="KY">Kentucky</option><option value="LA">Louisiana</option>
                  <option value="ME">Maine</option><option value="MD">Maryland</option><option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option><option value="MN">Minnesota</option><option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option><option value="MT">Montana</option><option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option><option value="NH">New Hampshire</option><option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option><option value="NY">New York</option><option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option><option value="OH">Ohio</option><option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option><option value="PA">Pennsylvania</option><option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option><option value="SD">South Dakota</option><option value="TN">Tennessee</option>
                  <option value="TX">Texas</option><option value="UT">Utah</option><option value="VT">Vermont</option>
                  <option value="VA">Virginia</option><option value="WA">Washington</option><option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option><option value="WY">Wyoming</option>
                </select>
                <input type="text" name="zip" placeholder="ZIP Code *" required className={styles.input} />
              </div>
            </motion.section>

            {/* Payment Info */}
            <motion.section className={styles.section} variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.3 }}>
              <h2>Payment</h2>
              <p className={styles.secureNote}>Your order will be reserved while Bitcoin payment is completed.</p>
              
              <div className={styles.paymentBox}>
                <div className={styles.paymentHeader}>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="payment" defaultChecked />
                    <span>Bitcoin</span>
                  </label>
                  <div className={styles.cardIcons}>
                    <span className={styles.cardIcon}>BTC</span>
                  </div>
                </div>
                <div className={styles.paymentBody}>
                  <p className={styles.bitcoinNote}>
                    After placing your order, you will receive the Bitcoin payment details and wallet link.
                    We will begin processing after payment is reviewed.
                  </p>
                </div>
              </div>
            </motion.section>

            {checkoutError && (
              <div style={{ color: '#e9353e', padding: '12px', background: '#fdf2f2', borderRadius: '6px', marginBottom: '16px', fontWeight: 600 }}>
                {checkoutError}
              </div>
            )}

            <button 
              type="submit" 
              className={`${styles.submitBtn} ${isSubmitting ? styles.loading : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Preparing Bitcoin Payment...' : `Continue to Bitcoin Payment - ${formatPrice(total)}`}
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

            <div className={styles.promoSection} style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--c-border)' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="text" 
                  placeholder="Promo code" 
                  className={styles.input} 
                  style={{ marginBottom: 0 }}
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button type="button" onClick={handleApplyPromo} className={styles.btn} style={{ whiteSpace: 'nowrap' }}>
                  Apply
                </button>
              </div>
              {promoError && <p style={{ color: '#e9353e', fontSize: '12px', marginTop: '8px' }}>{promoError}</p>}
              {discountApplied > 0 && <p style={{ color: '#13a77c', fontSize: '12px', marginTop: '8px' }}>Promo code applied! (-15%)</p>}
            </div>

            <div className={styles.totals}>
              <div className={styles.totalsRow}>
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className={styles.totalsRow} style={{ color: '#13a77c' }}>
                  <span>Discount (15%)</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
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

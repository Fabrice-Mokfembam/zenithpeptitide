'use client';

import Link from 'next/link';
import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { fadeUp, scaleIn } from '@/lib/motion';
import styles from './PaymentPage.module.css';

function buildBitcoinUri(paymentString: string, orderNumber: string) {
  const trimmed = paymentString.trim();
  const message = `Zenith order ${orderNumber}`;

  if (trimmed.toLowerCase().startsWith('bitcoin:')) {
    const separator = trimmed.includes('?') ? '&' : '?';
    return trimmed.includes('message=')
      ? trimmed
      : `${trimmed}${separator}message=${encodeURIComponent(message)}`;
  }

  return `bitcoin:${trimmed}?message=${encodeURIComponent(message)}`;
}

function shortValue(value: string) {
  if (value.length <= 24) return value;
  return `${value.slice(0, 12)}...${value.slice(-10)}`;
}

function PaymentContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order') || 'ZEN-PENDING';
  const total = searchParams.get('total') || '0.00';
  const paymentString = searchParams.get('pay') || '';
  const [copied, setCopied] = useState<'payment' | 'order' | null>(null);

  const bitcoinUri = useMemo(
    () => buildBitcoinUri(paymentString, orderNumber),
    [paymentString, orderNumber]
  );

  const copy = async (label: 'payment' | 'order', value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    window.setTimeout(() => setCopied(null), 1800);
  };

  if (!paymentString) {
    return (
      <main className={styles.main}>
        <div className={styles.card}>
          <h1>Bitcoin payment is not configured</h1>
          <p>Please contact support with your order details before sending payment.</p>
          <Link href="/contact" className={styles.primaryBtn}>Contact Support</Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <motion.section
        className={styles.card}
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
        <div className={styles.header}>
          <motion.div
            className={styles.coin}
            variants={scaleIn}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.15 }}
          >
            BTC
          </motion.div>
          <div>
            <p className={styles.eyebrow}>Secure Bitcoin Payment</p>
            <h1>Send Bitcoin to complete your order</h1>
          </div>
        </div>

        <div className={styles.summary}>
          <div>
            <span>Order Number</span>
            <strong>{orderNumber}</strong>
          </div>
          <div>
            <span>Order Total</span>
            <strong>${total} USD</strong>
          </div>
        </div>

        <div className={styles.paymentBox}>
          <span>Bitcoin payment string</span>
          <code title={paymentString}>{shortValue(paymentString)}</code>
          <button type="button" onClick={() => copy('payment', paymentString)}>
            {copied === 'payment' ? 'Copied' : 'Copy'}
          </button>
        </div>

        <div className={styles.actions}>
          <a className={styles.primaryBtn} href={bitcoinUri}>
            Open Bitcoin Wallet
          </a>
          <button type="button" className={styles.secondaryBtn} onClick={() => copy('order', orderNumber)}>
            {copied === 'order' ? 'Copied Order' : 'Copy Order Number'}
          </button>
        </div>

        <ol className={styles.steps}>
          <li>Send the Bitcoin payment from your wallet.</li>
          <li>Include the order number in the wallet memo/message if available.</li>
          <li>After sending, submit the payment for review.</li>
        </ol>

        <Link
          href={`/checkout/success?order=${encodeURIComponent(orderNumber)}&payment=bitcoin`}
          className={styles.confirmBtn}
        >
          I Have Sent the Payment
        </Link>
      </motion.section>
    </main>
  );
}

export default function BitcoinPaymentPage() {
  return (
    <Suspense fallback={<main className={styles.main}><div className={styles.card}>Loading payment details...</div></main>}>
      <PaymentContent />
    </Suspense>
  );
}

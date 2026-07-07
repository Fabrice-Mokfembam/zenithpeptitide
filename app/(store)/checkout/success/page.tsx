'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, scaleIn } from '@/lib/motion';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order') || 'ZEN-PENDING';
  const isBitcoinPayment = searchParams.get('payment') === 'bitcoin';
  const title = isBitcoinPayment ? 'Payment Submitted' : 'Order Confirmed!';
  const message = isBitcoinPayment
    ? 'Thank you. Your order is awaiting Bitcoin network confirmation and payment review. We will begin processing once payment is verified.'
    : 'Thank you for your purchase. We have received your order and will begin processing it immediately.';

  return (
    <main style={{
      background: '#f8fbff',
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
    }}>
      <motion.div
        style={{
          background: '#fff',
          border: '1px solid #acd7ff',
          borderRadius: '12px',
          padding: '48px 32px',
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 10px 40px rgba(0, 102, 204, 0.08)',
        }}
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
        <motion.div
          style={{
            width: '64px',
            height: '64px',
            background: '#eafff5',
            border: '2px solid #13a77c',
            borderRadius: '50%',
            display: 'grid',
            placeItems: 'center',
            margin: '0 auto 24px',
            color: '#13a77c',
          }}
          variants={scaleIn}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.2 }}
        >
          <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" /></svg>
        </motion.div>

        <motion.h1
          style={{ fontSize: '24px', fontWeight: 800, color: '#061126', marginBottom: '8px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {title}
        </motion.h1>
        <motion.p
          style={{ color: '#3a5070', fontSize: '14px', marginBottom: '24px', lineHeight: 1.6 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {message}
        </motion.p>

        <motion.div
          style={{
            background: '#f0f8ff',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '32px',
            textAlign: 'left',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p style={{ fontSize: '12px', color: '#6b8aaa', marginBottom: '4px' }}>Order Number</p>
          <p style={{ fontSize: '16px', fontWeight: 700, color: '#0f7cf5' }}>{orderNumber}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link
            href="/shop"
            style={{
              display: 'inline-flex',
              width: '100%',
              justifyContent: 'center',
              padding: '14px',
              background: '#0f7cf5',
              color: '#fff',
              fontWeight: 700,
              borderRadius: '6px',
              transition: 'opacity 0.2s',
            }}
          >
            Continue Shopping
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  )
}

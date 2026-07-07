'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, slideLeft, slideRight } from '@/lib/motion';
import { signup } from '@/app/actions/auth';
import styles from '../login/LoginPage.module.css';

type AuthState = { error: string } | null;

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(async (_prevState, formData) => {
    return await signup(formData)
  }, null);

  return (
    <main className={styles.main}>
      <div className={styles.left}>
        <motion.div
          className={styles.formWrap}
          variants={slideLeft}
          initial="hidden"
          animate="show"
        >
          <Link href="/" className={styles.logo} aria-label="Zenith Biopeptides Home">
            <span className={styles.hex}>Z</span>
            <span className={styles.logoText}>
              <strong>ZENITH</strong>
              <small>BIOPEPTIDES</small>
            </span>
          </Link>
          
          <div className={styles.header}>
            <h1>Create an Account</h1>
            <p>Join Zenith Biopeptides for fast checkout and order tracking</p>
          </div>

          <form className={styles.form} action={formAction}>
            {state?.error && (
              <div style={{ color: '#e9353e', fontSize: '14px', marginBottom: '16px', padding: '10px', background: '#fdf2f2', borderRadius: '6px' }}>
                {state.error}
              </div>
            )}
            <div className={styles.inputGroup}>
              <label htmlFor="name">Full Name</label>
              <input type="text" name="name" id="name" placeholder="Dr. Jane Smith" required />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">Email Address</label>
              <input type="email" name="email" id="email" placeholder="name@company.com" required />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" placeholder="••••••••" required minLength={6} />
            </div>

            <button type="submit" className={styles.submitBtn} disabled={pending}>
              {pending ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>



          <p className={styles.footerText}>
            Already have an account? <Link href="/login">Sign In</Link>
          </p>
        </motion.div>
      </div>

      <motion.div
        className={styles.right}
        variants={slideRight}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.2 }}
      >
        <div className={styles.watermark}>Z</div>
        <motion.div
          className={styles.rightContent}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.4 }}
        >
          <h2>Premium Research Peptides</h2>
          <p>Trusted by researchers worldwide.</p>
        </motion.div>
        <div className={styles.dots} aria-hidden>
          <i /><i /><i /><i />
        </div>
      </motion.div>
    </main>
  );
}

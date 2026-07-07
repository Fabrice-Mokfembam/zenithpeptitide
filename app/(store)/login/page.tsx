'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, slideLeft, slideRight } from '@/lib/motion';
import { login } from '@/app/actions/auth';
import styles from './LoginPage.module.css';

type AuthState = { error: string } | null;

export default function LoginPage() {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(async (_prevState, formData) => {
    return await login(formData)
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
            <h1>Welcome Back</h1>
            <p>Sign in to your Zenith Biopeptides account</p>
          </div>

          <form className={styles.form} action={formAction}>
            {state?.error && (
              <div style={{ color: '#e9353e', fontSize: '14px', marginBottom: '16px', padding: '10px', background: '#fdf2f2', borderRadius: '6px' }}>
                {state.error}
              </div>
            )}
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email Address</label>
              <input type="email" name="email" id="email" placeholder="name@company.com" required />
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.labelRow}>
                <label htmlFor="password">Password</label>
                <Link href="#" className={styles.forgot}>Forgot password?</Link>
              </div>
              <input type="password" name="password" id="password" placeholder="••••••••" required />
            </div>

            <label className={styles.checkboxLabel}>
              <input type="checkbox" />
              <span>Remember me</span>
            </label>

            <button type="submit" className={styles.submitBtn} disabled={pending}>
              {pending ? 'Signing in...' : 'Sign In'}
            </button>
          </form>



          <p className={styles.footerText}>
            Don&apos;t have an account? <Link href="/register">Sign Up</Link>
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

import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import styles from './Account.module.css'

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1>My Account</h1>
        <p>Welcome back, {user.user_metadata?.full_name || user.email}</p>
      </div>

      <nav className={styles.nav}>
        <Link href="/account" className={`${styles.navLink} ${styles.active}`}>Dashboard</Link>
        <Link href="/account/orders" className={styles.navLink}>Orders</Link>
      </nav>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>Profile Information</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Name:</strong> {user.user_metadata?.full_name || 'Not provided'}</p>
          <p style={{ marginTop: '24px', color: 'var(--c-muted)', fontSize: '14px' }}>
            To update your profile information or password, please contact support.
          </p>
        </div>

        <div className={styles.card}>
          <h2>Recent Orders</h2>
          <p style={{ color: 'var(--c-muted)', marginBottom: '24px' }}>
            View and track your recent orders.
          </p>
          <Link href="/account/orders" className={styles.btn}>
            View All Orders
          </Link>
        </div>
      </div>
    </main>
  )
}

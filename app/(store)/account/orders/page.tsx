import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import styles from '../Account.module.css'
import { formatPrice } from '@/lib/utils'

export default async function OrdersPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  // Fetch orders
  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1>My Orders</h1>
        <p>View and track your order history</p>
      </div>

      <nav className={styles.nav}>
        <Link href="/account" className={styles.navLink}>Dashboard</Link>
        <Link href="/account/orders" className={`${styles.navLink} ${styles.active}`}>Orders</Link>
      </nav>

      <div className={styles.card}>
        {!orders || orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p style={{ color: 'var(--c-muted)', marginBottom: '24px' }}>You haven&apos;t placed any orders yet.</p>
            <Link href="/shop" className={styles.btn}>Start Shopping</Link>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td style={{ fontWeight: 600 }}>{order.order_number}</td>
                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                    <td>{formatPrice(order.total_amount)}</td>
                    <td>
                      <span className={`${styles.status} ${styles[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <Link href={`/account/orders/${order.id}`} className={styles.btnOutline} style={{ padding: '6px 12px', fontSize: '14px' }}>
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}

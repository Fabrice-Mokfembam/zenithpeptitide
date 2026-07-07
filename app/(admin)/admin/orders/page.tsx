import type { Metadata } from 'next';
import { createAdminClient } from '@/lib/supabase/admin';
import { formatPrice } from '@/lib/utils';
import styles from '../Admin.module.css';

export const metadata: Metadata = { title: 'Orders | Zenith Admin' };
export const dynamic = 'force-dynamic';

type AdminOrder = {
  id: string;
  order_number: string;
  contact_email: string;
  shipping_name: string;
  status: string;
  payment_status: string | null;
  total_amount: number;
  created_at: string;
};

async function getOrders() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('orders')
      .select('id, order_number, contact_email, shipping_name, status, payment_status, total_amount, created_at')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) return [];
    return (data ?? []) as AdminOrder[];
  } catch {
    return [];
  }
}

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Fulfillment</p>
          <h1>Orders</h1>
          <p>Review Bitcoin payment status, customer details, and fulfillment readiness.</p>
        </div>
      </header>

      <section className={styles.tablePanel}>
        <h2>Order Queue</h2>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? orders.map((order) => (
                <tr key={order.id}>
                  <td><b>{order.order_number}</b></td>
                  <td>
                    <b>{order.shipping_name}</b>
                    <p className={styles.muted}>{order.contact_email}</p>
                  </td>
                  <td>{formatPrice(order.total_amount)}</td>
                  <td><span className={styles.status}>{order.payment_status ?? 'awaiting_payment'}</span></td>
                  <td><span className={styles.status}>{order.status}</span></td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6}>
                    <p className={styles.muted}>No orders found yet, or Supabase admin access is not configured for this environment.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from 'next';
import { createAdminClient } from '@/lib/supabase/admin';
import { formatPrice } from '@/lib/utils';
import styles from '../Admin.module.css';

export const metadata: Metadata = { title: 'Customers | Zenith Admin' };
export const dynamic = 'force-dynamic';

type OrderRow = {
  contact_email: string;
  shipping_name: string;
  total_amount: number;
  created_at: string;
};

async function getCustomerRows() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('orders')
      .select('contact_email, shipping_name, total_amount, created_at')
      .order('created_at', { ascending: false })
      .limit(200);

    if (error) return [];
    return (data ?? []) as OrderRow[];
  } catch {
    return [];
  }
}

export default async function AdminCustomersPage() {
  const rows = await getCustomerRows();
  const customers = Array.from(rows.reduce((map, row) => {
    const current = map.get(row.contact_email) ?? {
      email: row.contact_email,
      name: row.shipping_name,
      orders: 0,
      total: 0,
      lastOrder: row.created_at,
    };

    current.orders += 1;
    current.total += Number(row.total_amount);
    if (new Date(row.created_at) > new Date(current.lastOrder)) current.lastOrder = row.created_at;
    map.set(row.contact_email, current);
    return map;
  }, new Map<string, { email: string; name: string; orders: number; total: number; lastOrder: string }>()).values());

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Relationships</p>
          <h1>Customers</h1>
          <p>Customer history is derived from checkout orders and contact emails.</p>
        </div>
      </header>

      <section className={styles.tablePanel}>
        <h2>Customer Directory</h2>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Orders</th>
                <th>Lifetime Value</th>
                <th>Last Order</th>
              </tr>
            </thead>
            <tbody>
              {customers.length > 0 ? customers.map((customer) => (
                <tr key={customer.email}>
                  <td><b>{customer.name}</b></td>
                  <td>{customer.email}</td>
                  <td>{customer.orders}</td>
                  <td>{formatPrice(customer.total)}</td>
                  <td>{new Date(customer.lastOrder).toLocaleDateString()}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5}>
                    <p className={styles.muted}>No customer order history found yet.</p>
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

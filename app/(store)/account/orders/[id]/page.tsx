import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import styles from '../../Account.module.css'
import { formatPrice } from '@/lib/utils'

type OrderItemRow = {
  id: string
  product_name: string
  quantity: number
  size: string
  price: number
}

type OrderWithItems = {
  order_number: string
  status: string
  created_at: string
  subtotal: number
  shipping_fee: number
  discount_total: number
  total_amount: number
  shipping_name: string
  shipping_address: string
  shipping_city: string
  shipping_state: string
  shipping_zip: string
  order_items: OrderItemRow[]
}

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  // Fetch order with items
  const { data } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (*)
    `)
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single()
  const order = data as OrderWithItems | null

  if (!order) {
    notFound()
  }

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <Link href="/account/orders" style={{ color: 'var(--c-muted)', textDecoration: 'none' }}>&larr; Back to Orders</Link>
        </div>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          Order {order.order_number}
          <span className={`${styles.status} ${styles[order.status]}`} style={{ fontSize: '14px', verticalAlign: 'middle' }}>
            {order.status}
          </span>
        </h1>
        <p>Placed on {new Date(order.created_at).toLocaleDateString()}</p>
      </div>

      <div className={styles.grid} style={{ gridTemplateColumns: '2fr 1fr' }}>
        <div className={styles.card}>
          <h2>Order Items</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {order.order_items.map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid var(--c-border)' }}>
                <div>
                  <h3 style={{ fontSize: '16px', marginBottom: '4px' }}>{item.product_name}</h3>
                  <p style={{ color: 'var(--c-muted)', fontSize: '14px' }}>Size: {item.size} | Qty: {item.quantity}</p>
                </div>
                <div style={{ fontWeight: 600 }}>
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className={styles.card}>
            <h2>Summary</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: 'var(--c-muted)' }}>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: 'var(--c-muted)' }}>Shipping</span>
              <span>{order.shipping_fee === 0 ? 'Free' : formatPrice(order.shipping_fee)}</span>
            </div>
            {order.discount_total > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: 'var(--c-green)' }}>
                <span>Discount</span>
                <span>-{formatPrice(order.discount_total)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--c-border)', fontWeight: 700, fontSize: '18px' }}>
              <span>Total</span>
              <span>{formatPrice(order.total_amount)}</span>
            </div>
          </div>

          <div className={styles.card}>
            <h2>Shipping Details</h2>
            <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, color: 'var(--c-muted)' }}>
              {order.shipping_name}<br/>
              {order.shipping_address}<br/>
              {order.shipping_city}, {order.shipping_state} {order.shipping_zip}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

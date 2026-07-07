'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { SHOP_PRODUCTS } from '@/lib/shop-data'

type CheckoutOrderData = {
  subtotal: number
  shipping_fee: number
  discount_total: number
  total_amount: number
  promo_code?: string
  contact_email: string
  shipping_name: string
  shipping_address: string
  shipping_city: string
  shipping_state: string
  shipping_zip: string
  items: CheckoutCartItem[]
}

type CheckoutCartItem = {
  slug: string
  quantity: number
  size: string
}

type ValidatedItem = {
  product_slug: string
  product_name: string
  quantity: number
  size: string
  price: number
}

type ValidatedOrder = {
  subtotal: number
  shipping_fee: number
  discount_total: number
  total_amount: number
  contact_email: string
  shipping_name: string
  shipping_address: string
  shipping_city: string
  shipping_state: string
  shipping_zip: string
  items: ValidatedItem[]
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const US_STATES = new Set([
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID',
  'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS',
  'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK',
  'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV',
  'WI', 'WY',
])
const ALLOWED_SIZES = new Set(['2mg', '5mg', '10mg', '20mg', '50mg'])
const PRODUCTS_BY_SLUG = new Map(SHOP_PRODUCTS.map((product) => [product.slug, product]))
const FREE_SHIPPING_THRESHOLD = 300
const SHIPPING_FEE = 15
const PROMO_CODE = 'FULFILLMENT'
const PROMO_DISCOUNT = 0.15

function cleanText(value: unknown, maxLength: number) {
  return String(value ?? '').trim().replace(/\s+/g, ' ').slice(0, maxLength)
}

function currency(value: number) {
  return Math.round(value * 100) / 100
}

function validateOrderData(orderData: CheckoutOrderData): { error: string } | { order: ValidatedOrder } {
  const contactEmail = cleanText(orderData.contact_email, 254).toLowerCase()
  const shippingName = cleanText(orderData.shipping_name, 120)
  const shippingAddress = cleanText(orderData.shipping_address, 240)
  const shippingCity = cleanText(orderData.shipping_city, 120)
  const shippingState = cleanText(orderData.shipping_state, 2).toUpperCase()
  const shippingZip = cleanText(orderData.shipping_zip, 20)

  if (!EMAIL_PATTERN.test(contactEmail)) {
    return { error: 'Please enter a valid email address.' }
  }

  if (!shippingName || !shippingAddress || !shippingCity || !shippingZip) {
    return { error: 'Please complete all required shipping fields.' }
  }

  if (!US_STATES.has(shippingState)) {
    return { error: 'Please select a valid US state.' }
  }

  if (!Array.isArray(orderData.items) || orderData.items.length === 0) {
    return { error: 'Your cart is empty.' }
  }

  if (orderData.items.length > 50) {
    return { error: 'Your cart has too many line items. Please contact support.' }
  }

  const items: ValidatedItem[] = []

  for (const item of orderData.items) {
    const product = PRODUCTS_BY_SLUG.get(cleanText(item.slug, 100))
    const quantity = Number(item.quantity)
    const size = cleanText(item.size, 20)

    if (!product || !product.inStock) {
      return { error: 'One or more cart items are no longer available.' }
    }

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      return { error: 'One or more cart quantities are invalid.' }
    }

    if (!ALLOWED_SIZES.has(size)) {
      return { error: 'One or more cart item sizes are invalid.' }
    }

    items.push({
      product_slug: product.slug,
      product_name: product.name,
      quantity,
      size,
      price: product.price,
    })
  }

  const subtotal = currency(items.reduce((sum, item) => sum + item.price * item.quantity, 0))
  const promoCode = cleanText(orderData.promo_code, 40).toUpperCase()
  const discount_total = promoCode === PROMO_CODE ? currency(subtotal * PROMO_DISCOUNT) : 0
  const subtotalAfterDiscount = currency(subtotal - discount_total)
  const shipping_fee = subtotalAfterDiscount > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
  const total_amount = currency(subtotalAfterDiscount + shipping_fee)

  return {
    order: {
      subtotal,
      shipping_fee,
      discount_total,
      total_amount,
      contact_email: contactEmail,
      shipping_name: shippingName,
      shipping_address: shippingAddress,
      shipping_city: shippingCity,
      shipping_state: shippingState,
      shipping_zip: shippingZip,
      items,
    },
  }
}

export async function submitOrder(orderData: CheckoutOrderData): Promise<
  { error: string } | { success: true; orderNumber: string; totalAmount: number; bitcoinPaymentString: string }
> {
  const sessionClient = await createClient()
  const bitcoinPaymentString = process.env.NEXT_PUBLIC_BITCOIN_PAYMENT_STRING

  if (!bitcoinPaymentString) {
    return { error: 'Bitcoin payments are not configured yet. Please contact support.' }
  }

  let adminClient: ReturnType<typeof createAdminClient>
  try {
    adminClient = createAdminClient()
  } catch (error) {
    console.error('Supabase admin client setup failed:', error)
    return { error: 'Checkout is not configured yet. Please contact support.' }
  }

  const validation = validateOrderData(orderData)
  if ('error' in validation) {
    return validation
  }

  const { order: validatedOrder } = validation
  const { data: { user } } = await sessionClient.auth.getUser()
  const orderNumber = `ZEN-${Math.floor(100000 + Math.random() * 900000)}`

  const { data: order, error: orderError } = await adminClient
    .from('orders')
    .insert({
      user_id: user?.id || null,
      order_number: orderNumber,
      status: 'awaiting_payment',
      payment_method: 'bitcoin',
      payment_status: 'awaiting_payment',
      subtotal: validatedOrder.subtotal,
      shipping_fee: validatedOrder.shipping_fee,
      discount_total: validatedOrder.discount_total,
      total_amount: validatedOrder.total_amount,
      shipping_name: validatedOrder.shipping_name,
      shipping_address: validatedOrder.shipping_address,
      shipping_city: validatedOrder.shipping_city,
      shipping_state: validatedOrder.shipping_state,
      shipping_zip: validatedOrder.shipping_zip,
      contact_email: validatedOrder.contact_email,
    })
    .select()
    .single()

  if (orderError || !order) {
    console.error('Order creation failed:', orderError)
    return { error: 'Failed to create order. Please try again.' }
  }

  const itemsToInsert = validatedOrder.items.map((item) => ({
    order_id: order.id,
    product_slug: item.product_slug,
    product_name: item.product_name,
    quantity: item.quantity,
    size: item.size,
    price: item.price,
  }))

  const { error: itemsError } = await adminClient
    .from('order_items')
    .insert(itemsToInsert)

  if (itemsError) {
    console.error('Order items creation failed:', itemsError)
    await adminClient.from('orders').delete().eq('id', order.id)
    return { error: 'Failed to create order. Please try again.' }
  }

  return {
    success: true,
    orderNumber,
    totalAmount: validatedOrder.total_amount,
    bitcoinPaymentString,
  }
}

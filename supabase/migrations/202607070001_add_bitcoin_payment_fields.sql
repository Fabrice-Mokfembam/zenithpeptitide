ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT 'bitcoin' NOT NULL,
  ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'awaiting_payment' NOT NULL;

UPDATE orders
SET
  status = 'awaiting_payment',
  payment_method = 'bitcoin',
  payment_status = 'awaiting_payment'
WHERE status = 'pending';

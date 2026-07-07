# Zenith Biopeptides — Admin UI Generation Prompt

Use this document as the full brief to generate the **admin dashboard UI only** for the Zenith Biopeptides project. Build polished, production-quality screens with realistic mock data. **Do not implement backend APIs, auth, or database logic yet** — focus entirely on layout, navigation, components, states, and visual design.

---

## Copy-paste prompt (start here)

```
You are building the admin dashboard UI for Zenith Biopeptides — a premium research peptide e-commerce storefront. This is UI-only (mock data, no real API). Match the existing storefront brand and extend it into a professional, data-dense admin experience.

## Project context

- **Brand:** Zenith Biopeptides — research peptides, COA documentation, third-party lab testing, "Research Use Only"
- **Storefront already exists** at routes like `/`, `/shop`, `/product/[slug]`, `/checkout`, `/about`, `/contact`, `/faqs`
- **Admin shell exists** at `/admin` with a minimal sidebar (Dashboard, Products, Orders, Customers, Settings) and placeholder dashboard page
- **Stack:** Next.js 16 (App Router), React 19, TypeScript, CSS Modules (NOT Tailwind for admin unless explicitly migrating), framer-motion for subtle animations
- **State today:** Zustand cart on storefront; types defined in `types/product.ts`, `types/order.ts`, `types/user.ts`

## Design system (must match storefront)

Use existing CSS variables from `app/globals.css`:

| Token | Value | Usage |
|-------|-------|-------|
| Primary blue | `#0f7cf5` | CTAs, active nav, links |
| Blue dark | `#0555c4` | Hover states |
| Blue light | `#36c5ff` | Accents, badges |
| Navy | `#020c1e` / `#041938` | Admin sidebar, dark surfaces |
| Ink | `#061126` | Headings |
| Text | `#0d1f38` | Body |
| Muted | `#6b8aaa` | Secondary text |
| Sky | `#e8f4ff` | Light backgrounds |
| Off-white | `#f8fbff` | Page background |
| Border | `#acd7ff` | Cards, inputs |
| Success | `#13a77c` | Delivered, in stock, approved |
| Error | `#e9353e` | Cancelled, out of stock, alerts |
| Font body | DM Sans | UI text |
| Font heading | Syne | Page titles, section headers |
| Radius | 4–12px | Cards, inputs, buttons |
| Shadow | `0 4px 24px rgba(0, 102, 204, 0.10)` | Elevated cards |

**Admin visual direction:**
- Dark navy sidebar + light content area (already started in `app/(admin)/layout.module.css`)
- Clean, clinical, scientific — not generic SaaS purple gradients
- Dense but readable: tables, filters, KPI cards, status pills
- Subtle framer-motion on page enter, KPI count-up feel, table row hover, drawer/modal transitions
- Icons: inline SVG, stroke style consistent with storefront (lucide-like, 1.5–2px stroke)

## File structure to create

```
app/(admin)/
  layout.tsx                    # Expand: collapsible sidebar, top bar, breadcrumbs, user menu
  layout.module.css
  admin/
    page.tsx                    # Dashboard overview
    Dashboard.module.css
  products/
    page.tsx                    # Product list
    [id]/page.tsx               # Product detail / edit
    new/page.tsx                # Create product
    Products.module.css
  orders/
    page.tsx                    # Order list
    [id]/page.tsx               # Order detail
    Orders.module.css
  customers/
    page.tsx                    # Customer list
    [id]/page.tsx               # Customer profile + order history
    Customers.module.css
  inventory/
    page.tsx                    # Stock levels, batch tracking, low-stock alerts
    Inventory.module.css
  coa/
    page.tsx                    # Certificate of Analysis management
    Coa.module.css
  batches/
    page.tsx                    # Batch/lot management linked to products
    Batches.module.css
  shipping/
    page.tsx                    # Shipments, carriers, tracking
    Shipping.module.css
  promotions/
    page.tsx                    # Promo codes, sales, featured products
    Promotions.module.css
  content/
    page.tsx                    # FAQs, pages, announcement bar copy
    Content.module.css
  reviews/
    page.tsx                    # Product reviews moderation
    Reviews.module.css
  analytics/
    page.tsx                    # Charts, reports, exports
    Analytics.module.css
  team/
    page.tsx                    # Admin users & roles
    Team.module.css
  settings/
    page.tsx                    # Store settings, shipping rules, tax, email templates
    Settings.module.css

components/admin/
  AdminSidebar.tsx
  AdminTopBar.tsx
  AdminBreadcrumbs.tsx
  StatCard.tsx
  DataTable.tsx
  StatusBadge.tsx
  SearchFilterBar.tsx
  EmptyState.tsx
  ConfirmModal.tsx
  SlideOver.tsx
  DateRangePicker.tsx
  Pagination.tsx
  ChartPlaceholder.tsx          # UI shell for charts (can use simple CSS bars)
  ProductForm.tsx
  OrderTimeline.tsx
  CoaUploadPanel.tsx
  BatchCard.tsx
  ActivityFeed.tsx
  QuickActions.tsx

lib/
  admin-mock-data.ts            # All mock admin data in one place
```

## Sidebar navigation (expand current 5 links to full IA)

Group nav items with section labels:

**Overview**
- Dashboard (`/admin`)
- Analytics (`/admin/analytics`)

**Commerce**
- Orders (`/admin/orders`)
- Products (`/admin/products`)
- Inventory (`/admin/inventory`)
- Promotions (`/admin/promotions`)

**Quality & Compliance**
- COA Documents (`/admin/coa`)
- Batch / Lot Tracking (`/admin/batches`)

**Customers**
- Customers (`/admin/customers`)
- Reviews (`/admin/reviews`)

**Operations**
- Shipping & Fulfillment (`/admin/shipping`)
- Content (`/admin/content`)

**System**
- Team & Roles (`/admin/team`)
- Settings (`/admin/settings`)

Include: collapse toggle, active state, nested sub-nav on mobile drawer, "View Storefront" link, admin avatar + logout dropdown in top bar.

---

## Pages to design (UI only, rich mock content)

### 1. Dashboard (`/admin`)

The command center. Must feel busy and useful.

**Top row — KPI stat cards (4–6):**
- Total Revenue (today / 7d / 30d toggle)
- Orders (pending fulfillment count badge)
- Average Order Value
- Active Products
- Low Stock Alerts (warning color)
- Pending COA Uploads

**Second row — two columns:**
- **Revenue chart** (7-day bar/line chart placeholder, CSS or simple SVG)
- **Orders by status** donut or horizontal bar: Pending, Processing, Shipped, Delivered, Cancelled

**Third row:**
- **Recent orders table** (8 rows): Order #, Customer, Products summary, Total, Status pill, Date, quick actions (View, Print label)
- **Activity feed**: "New order #ZEN-10482", "COA uploaded for TB-500 Batch ZB-2024-041", "Low stock: Ipamorelin 5mg", "Review flagged for moderation"

**Fourth row:**
- **Top products** ranked list with thumbnail, units sold, revenue
- **Quick actions** grid: Add Product, Create Promo, Upload COA, View Pending Orders, Export Report

**Alerts banner** at top when applicable: "3 orders awaiting shipment", "2 products below reorder threshold"

---

### 2. Products (`/admin/products`)

Full catalog management UI.

**List view:**
- Search by name, SKU, slug
- Filters: Category (Peptides, Blends, Amino Acids), Purity (99%+, 98%+), Stock status, COA status, Badge (Best Seller, Sale, New)
- Bulk actions: Publish, Unpublish, Delete, Export CSV
- Table columns: Thumbnail, Name, SKU, Category, Sizes/Variants, Price, Stock, Purity, COA, Status (Published/Draft), Actions
- Pagination (32 products — match storefront catalog size)

**Product detail / edit (`/admin/products/[id]`):**
- Tabbed layout: General | Variants & Pricing | Inventory | COA & Testing | SEO | Media
- General: name, slug, description (rich textarea), category, purity, research-use disclaimer toggle
- Variants: size options (2mg, 5mg, 10mg, 20mg) with price, SKU, stock per variant
- COA tab: batch selector, upload PDF area, lab name, test date, purity result
- Image gallery uploader (mock)
- Save / Save & Publish / Delete buttons sticky at bottom

**Create product (`/admin/products/new`):** Same form, empty state

Mock products should mirror storefront: TB-500, BPC-157, CJC-1295, Ipamorelin, etc.

---

### 3. Orders (`/admin/orders`)

**List view:**
- Status tabs: All | Pending | Processing | Shipped | Delivered | Cancelled
- Search: order #, email, customer name
- Date range filter
- Table: Order #, Date, Customer, Items count, Total, Payment status, Fulfillment status, Shipping method, Actions
- Row expand or slide-over preview optional

**Order detail (`/admin/orders/[id]`):**
- Header: Order #ZEN-104821, status stepper (Placed → Processing → Shipped → Delivered)
- Left column:
  - Line items with image, name, size, qty, price
  - Payment summary: subtotal, shipping, discount, total
  - Customer note / internal note textarea
- Right column:
  - Customer card (name, email, phone, order count)
  - Shipping address (editable mock)
  - Billing address
  - Tracking number input + carrier select
  - Timeline component: status changes with timestamps
- Action bar: Mark as Processing, Create Shipment, Print Packing Slip, Refund, Cancel Order, Send Email

Use `OrderStatus` type: `pending | processing | shipped | delivered | cancelled`

---

### 4. Customers (`/admin/customers`)

**List:** Name, Email, Orders count, Total spent, Last order date, Account status, Tags (Researcher, Wholesale, VIP)
**Detail:** Profile info, addresses, order history table, lifetime value stat, notes, email action buttons

---

### 5. Inventory (`/admin/inventory`)

Peptide-specific inventory view.

- Summary cards: Total SKUs, Units in stock, Low stock count, Out of stock count
- Table: Product, Variant (size), SKU, On hand, Reserved, Available, Reorder point, Batch count, Last restocked
- Low stock section highlighted in amber/red
- "Adjust stock" modal: +/- quantity, reason dropdown (Restock, Damage, Correction)
- Link to batch management

---

### 6. COA Documents (`/admin/coa`)

Certificate of Analysis is core to this brand.

- Table: Product, Batch/Lot #, Lab, Test date, Purity result, PDF status (Uploaded/Missing/Expired), Linked variants, Actions
- Upload panel: drag-and-drop PDF zone, batch ID, lab name, test date, purity %
- Preview card showing sample COA document thumbnail
- Filter: Missing COAs (compliance alert)

---

### 7. Batch / Lot Tracking (`/admin/batches`)

- Cards or table: Batch ID (e.g. ZB-2024-041), Product, Manufacture date, Expiry, Quantity produced, Quantity remaining, COA link, Status (Active/Depleted/Quarantined)
- Traceability view: which orders shipped from which batch

---

### 8. Shipping & Fulfillment (`/admin/shipping`)

- Pending shipments queue (orders ready to ship)
- Carrier settings display: USPS, UPS, FedEx (mock toggles)
- Shipping rules: Free shipping threshold ($300 — match storefront constant)
- Label print queue
- Tracking number bulk upload

---

### 9. Promotions (`/admin/promotions`)

- Active promos list: Code (e.g. FULFILLMENT), Discount (15%), Usage count, Expiry, Status
- Create promo form: code, type (percent/fixed), min order, date range, product scope
- Featured products picker (link to homepage featured section)
- Countdown banner settings (homepage sale timer)

---

### 10. Content (`/admin/content`)

- **Announcement bar** editor (storefront top banner text)
- **FAQ manager**: category, question, answer, order — mirror `/faqs` page categories
- **Static pages**: About, Contact blurb — simple rich text
- **Trust stats** editor (500+ shipped, 347 reviews, etc.)

---

### 11. Reviews (`/admin/reviews`)

- Moderation queue: product, rating, review text, date, status (Pending/Approved/Flagged)
- Bulk approve/reject
- Filter by rating, product

---

### 12. Analytics (`/admin/analytics`)

- Date range selector (7d, 30d, 90d, custom)
- Revenue over time (chart)
- Orders over time (chart)
- Conversion funnel mock: Visitors → Add to cart → Checkout → Purchase
- Top products by revenue and units
- Traffic sources placeholder
- Export CSV / PDF buttons (non-functional, UI only)

---

### 13. Team & Roles (`/admin/team`)

- Team member table: Name, Email, Role (Super Admin, Operations, Support, Read-only), Last active, Status
- Invite member modal
- Role permissions matrix (checkbox grid): Products, Orders, COA, Settings, etc.

---

### 14. Settings (`/admin/settings`)

Tabbed settings page:

- **General:** Store name, support email, logo upload, timezone
- **Shipping:** Free shipping threshold, flat rates, processing time
- **Payments:** Stripe/PayPal placeholders (connected/disconnected badges)
- **Tax:** State tax toggles
- **Email templates:** Order confirmation, shipped, COA available — preview panes
- **Compliance:** Research-use-only disclaimer text, footer legal
- **Notifications:** Admin alert preferences (low stock, new order, review flagged)

---

## Shared components (build reusable)

### DataTable
- Sortable column headers
- Row hover, selectable checkboxes
- Responsive: card layout on mobile
- Loading skeleton state
- Empty state with illustration/icon

### StatusBadge
Map colors to statuses:
- Pending → amber
- Processing → blue
- Shipped → purple
- Delivered → green
- Cancelled → red
- Published → green
- Draft → gray
- Low Stock → orange

### AdminTopBar
- Breadcrumbs
- Global search (cmd+K style optional)
- Notification bell with dropdown (mock alerts)
- Admin avatar menu

### SlideOver / Modal
- Order quick view, stock adjust, delete confirm, invite team member

---

## Mock data requirements

Create `lib/admin-mock-data.ts` with realistic peptide-industry data:

- 32 products (extend `SHOP_PRODUCTS`)
- 50+ orders across all statuses
- 30+ customers
- 20+ batches with COA linkage
- 5+ promo codes
- 15+ reviews in moderation
- Activity feed entries
- Dashboard KPI numbers that feel coherent

Use order IDs like `#ZEN-104821`. Use batch IDs like `ZB-2024-041`.

---

## Animation guidelines

Reuse patterns from `lib/motion.ts`:
- Page sections: fade up on enter (`whileInView`, once)
- KPI cards: subtle stagger
- Sidebar: smooth collapse
- Tables: no row stagger (too heavy) — hover transitions only
- Modals/slide-overs: slide + fade

---

## UX requirements

- Every list page has: search, filters, primary action button ("Add Product", "Create Promo")
- Every detail page has: back link, breadcrumb, primary + destructive actions
- Destructive actions use confirm modal
- Show empty states when filters return nothing
- Show loading skeletons (mock 300ms delay optional)
- Mobile: sidebar becomes drawer; tables become stacked cards
- Accessibility: focus states, aria labels on icon buttons, sufficient contrast

---

## Constraints

- **UI only** — mock data, no fetch, no auth guards, no database
- **Do not modify storefront** `(store)` routes unless adding a "Admin" link is needed
- Use **CSS Modules** per page/component (match existing codebase convention)
- Use `'use client'` only where needed (interactivity, framer-motion, tabs, modals)
- TypeScript strict — use existing types, extend in `types/` if needed
- Keep admin layout **separate** from store layout (no store header/footer in admin)

---

## Quality bar

The admin should feel like a real operations hub for a peptide research supplier — not a empty CRUD demo. Every page should have enough mock content to screenshot for a portfolio. Prioritize:

1. Dashboard (richest page)
2. Orders list + detail
3. Products list + edit
4. COA + Inventory (domain differentiators)
5. Everything else

Generate pixel-polished UI that a developer can wire to APIs later without redesigning.
```

---

## How to use this file

1. Copy everything inside the fenced prompt block above into your AI design/code tool (Cursor, v0, Figma AI, etc.).
2. Optionally attach screenshots of the storefront (`/`, `/shop`) and reference `public/reference.png` for brand alignment.
3. Generate **UI first** in batches: shell → dashboard → orders → products → compliance pages → settings.
4. Wire backend, auth, and real data in a later phase.

---

## Current admin baseline (what exists today)

| Item | Status |
|------|--------|
| Route `/admin` | Placeholder heading only |
| Admin layout | Dark sidebar + 5 nav links (routes not all created) |
| Storefront design tokens | Defined in `app/globals.css` |
| Product/Order/User types | Defined in `types/` |
| Mock shop catalog | `lib/shop-data.ts` (~32 products) |
| Admin mock data | **Not yet created** — prompt asks for `lib/admin-mock-data.ts` |

---

## Suggested generation order

1. Expand admin layout (sidebar groups, top bar, breadcrumbs)
2. `lib/admin-mock-data.ts`
3. Shared admin components (`StatCard`, `DataTable`, `StatusBadge`, …)
4. Dashboard page
5. Orders + Products (highest daily-use screens)
6. COA + Inventory + Batches (brand-specific)
7. Remaining pages
8. Polish: mobile, empty states, animations

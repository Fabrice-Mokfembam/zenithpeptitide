import type { Product } from '@/types/product';

export const SITE_NAME = 'Zenith Biopeptides';
export const SITE_DESCRIPTION = 'Premium purity peptides. Batch-tested. Trusted by researchers across the United States.';
export const FREE_SHIPPING_THRESHOLD = 300;
export const PROMO_CODE = 'FULFILLMENT';
export const PROMO_DISCOUNT = 15;

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'About Us', href: '/about' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Contact', href: '/contact' },
];

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'TB-500',
    slug: 'tb-500',
    category: 'Peptides',
    price: 59.99,
    purity: '99%+',
    badge: 'BEST SELLER',
    image: '/images/products/tb500.png',
    coaAvailable: true,
    weight: '5mg',
    inStock: true,
  },
  {
    id: '2',
    name: 'BPC-157',
    slug: 'bpc-157',
    category: 'Peptides',
    price: 49.99,
    originalPrice: 69.99,
    purity: '99%+',
    badge: 'SALE',
    image: '/images/products/bpc157.png',
    coaAvailable: true,
    weight: '5mg',
    inStock: true,
  },
  {
    id: '3',
    name: 'CJC-1295 (No DAC)',
    slug: 'cjc-1295-no-dac',
    category: 'Peptide Blends',
    price: 69.99,
    purity: '99%+',
    image: '/images/products/cjc1295.png',
    coaAvailable: true,
    weight: '5mg',
    inStock: true,
  },
  {
    id: '4',
    name: 'Ipamorelin',
    slug: 'ipamorelin',
    category: 'Peptide Blends',
    price: 44.99,
    purity: '99%+',
    image: '/images/products/ipamorelin.png',
    coaAvailable: true,
    weight: '5mg',
    inStock: true,
  },
];

export const STATS = [
  { value: '500+', label: 'Products Shipped' },
  { value: '347', label: '5-Star Reviews' },
  { value: '99%+', label: 'Peptide Purity' },
  { value: '3', label: 'Day Shipping' },
];

export const TRUST_ITEMS = [
  { title: 'Fast Shipping', body: '1-2 day processing,\n3-day delivery' },
  { title: 'Research Use Only', body: 'Exclusively for\nin vitro research' },
  { title: 'Third-Party\nLab Tested', body: 'Every batch verified\nfor purity' },
  { title: 'Highest Purity', body: '99%+ Peptide Purity,\nLab Confirmed' },
];

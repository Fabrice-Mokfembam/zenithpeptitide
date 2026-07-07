import { Product } from '@/types/product';

export const SHOP_PRODUCTS: Product[] = [
  {
    id: '1', name: 'TB-500', slug: 'tb-500', category: 'Peptides', price: 59.99,
    purity: '99%+', badge: 'BEST SELLER', image: '/images/products/tb500.png',
    coaAvailable: true, weight: '5mg', inStock: true,
  },
  {
    id: '2', name: 'BPC-157', slug: 'bpc-157', category: 'Peptides', price: 49.99, originalPrice: 69.99,
    purity: '99%+', badge: 'SALE', image: '/images/products/bpc157.png',
    coaAvailable: true, weight: '5mg', inStock: true,
  },
  {
    id: '3', name: 'CJC-1295 (No DAC)', slug: 'cjc-1295-no-dac', category: 'Peptide Blends', price: 69.99,
    purity: '99%+', image: '/images/products/cjc1295.png',
    coaAvailable: true, weight: '5mg', inStock: true,
  },
  {
    id: '4', name: 'Ipamorelin', slug: 'ipamorelin', category: 'Peptide Blends', price: 44.99,
    purity: '99%+', image: '/images/products/ipamorelin.png',
    coaAvailable: true, weight: '5mg', inStock: true,
  },
  {
    id: '5', name: 'Semaglutide', slug: 'semaglutide', category: 'Research Chemicals', price: 64.99,
    purity: '99%+', image: '/images/products/generic-vial.png',
    coaAvailable: true, weight: '5mg', inStock: true,
  },
  {
    id: '6', name: 'Melanotan II', slug: 'melanotan-ii', category: 'Peptides', price: 34.99,
    purity: '99%+', image: '/images/products/generic-vial.png',
    coaAvailable: true, weight: '10mg', inStock: true,
  },
  {
    id: '7', name: 'AOD-9604', slug: 'aod-9604', category: 'Research Chemicals', price: 39.99,
    purity: '99%+', image: '/images/products/generic-vial.png',
    coaAvailable: true, weight: '5mg', inStock: true,
  },
  {
    id: '8', name: 'HGH Frag 176-191', slug: 'hgh-frag', category: 'Peptides', price: 29.99,
    purity: '99%+', image: '/images/products/generic-vial.png',
    coaAvailable: true, weight: '5mg', inStock: true,
  },
  {
    id: '9', name: 'MT-2', slug: 'mt-2', category: 'Peptides', price: 59.99,
    purity: '99%+', image: '/images/products/generic-vial.png',
    coaAvailable: true, weight: '10mg', inStock: true,
  },
  {
    id: '10', name: 'NAD+', slug: 'nad-plus', category: 'Amino Acids', price: 49.99,
    purity: '99%+', image: '/images/products/generic-vial.png',
    coaAvailable: true, weight: '50mg', inStock: true,
  },
  {
    id: '11', name: 'GHRP-6', slug: 'ghrp-6', category: 'Peptides', price: 44.99,
    purity: '99%+', image: '/images/products/generic-vial.png',
    coaAvailable: true, weight: '5mg', inStock: true,
  },
  {
    id: '12', name: 'DSIP', slug: 'dsip', category: 'Peptides', price: 34.99,
    purity: '99%+', image: '/images/products/generic-vial.png',
    coaAvailable: true, weight: '5mg', inStock: true,
  },
];

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  purity: string;
  badge?: 'BEST SELLER' | 'SALE' | 'NEW' | 'LOW STOCK';
  image: string;
  coaAvailable: boolean;
  description?: string;
  weight?: string;
  inStock: boolean;
}

import type { Metadata } from 'next';
import { ProductDetailPageContent } from '@/components/store/pages/MarketingPages';

export const metadata: Metadata = {
  title: 'Product | Zenith Biopeptides',
};

export default function ProductPage({ params }: { params: { slug: string } }) {
  return <ProductDetailPageContent slug={params.slug} />;
}

import type { Metadata } from 'next';
import { FaqsPageContent } from '@/components/store/pages/MarketingPages';

export const metadata: Metadata = {
  title: 'FAQs | Zenith Biopeptides',
  description: 'Answers to common questions about Zenith Biopeptides products, shipping, COAs, and research use.',
};

export default function FaqsPage() {
  return <FaqsPageContent />;
}

import type { Metadata } from 'next';
import { ContactPageContent } from '@/components/store/pages/MarketingPages';

export const metadata: Metadata = {
  title: 'Contact Zenith Biopeptides',
  description: 'Contact Zenith Biopeptides for product, order, COA, and research-use support.',
};

export default function ContactPage() {
  return <ContactPageContent />;
}

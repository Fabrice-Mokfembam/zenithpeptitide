import type { Metadata } from 'next';
import { AboutPageContent } from '@/components/store/pages/MarketingPages';

export const metadata: Metadata = {
  title: 'About Zenith Biopeptides',
  description: 'Learn about Zenith Biopeptides, our research-use standards, testing practices, and commitment to quality.',
};

export default function AboutPage() {
  return <AboutPageContent />;
}

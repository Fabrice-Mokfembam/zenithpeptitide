import type { Metadata } from 'next';
import Hero            from '@/components/store/home/Hero';
import CountdownBanner from '@/components/store/home/CountdownBanner';
import StatsBar        from '@/components/store/home/StatsBar';
import FeaturedProducts from '@/components/store/home/FeaturedProducts';
import TrustSection    from '@/components/store/home/TrustSection';
import AboutSection    from '@/components/store/home/AboutSection';

export const metadata: Metadata = {
  title: 'Zenith Biopeptides | Advanced Research Compounds',
  description:
    'Premium purity peptides. Batch-tested. Trusted by researchers across the United States. Shop TB-500, BPC-157, CJC-1295, Ipamorelin and more.',
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <CountdownBanner />
      <StatsBar />
      <FeaturedProducts />
      <TrustSection />
      <AboutSection />
    </main>
  );
}

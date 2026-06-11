import AnnouncementBar from '@/components/store/layout/AnnouncementBar';
import Header from '@/components/store/layout/Header';
import Footer from '@/components/store/layout/Footer';
import TrustBar from '@/components/store/layout/TrustBar';
import CartDrawer from '@/components/store/cart/CartDrawer';
import MobileBottomNav from '@/components/store/layout/MobileBottomNav';

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <div className="store-content">{children}</div>
      <TrustBar />
      <Footer />
      <CartDrawer />
      <MobileBottomNav />
    </>
  );
}

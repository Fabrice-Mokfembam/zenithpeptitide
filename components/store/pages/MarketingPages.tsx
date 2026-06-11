'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { SHOP_PRODUCTS } from '@/lib/shop-data';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/lib/store';
import {
  fadeUp,
  fadeUpLarge,
  fadeIn,
  scaleIn,
  slideLeft,
  slideRight,
  staggerContainer,
  viewport,
  viewportLarge,
} from '@/lib/motion';
import styles from './MarketingPages.module.css';

type IconName =
  | 'award'
  | 'box'
  | 'checkFile'
  | 'clock'
  | 'flask'
  | 'headphones'
  | 'mail'
  | 'mapPin'
  | 'microscope'
  | 'minus'
  | 'package'
  | 'phone'
  | 'plus'
  | 'send'
  | 'shield'
  | 'star'
  | 'truck'
  | 'users';

const trustStats: Array<[IconName, string, string]> = [
  ['package', '500+', 'Products Shipped'],
  ['star', '347', '5-Star Reviews'],
  ['shield', '99%+', 'Peptide Purity'],
  ['truck', '3', 'Day Shipping'],
];

const trustStrip: Array<[IconName, string, string]> = [
  ['truck', 'Fast & Reliable Shipping', '1-3 day delivery'],
  ['microscope', 'Third-Party Tested', 'Every batch verified'],
  ['checkFile', 'COA Included', 'With every batch'],
  ['flask', 'Research Use Only', 'In vitro research'],
];

const values: Array<[IconName, string, string]> = [
  ['flask', 'Science First', 'Evidence-led sourcing and documentation.'],
  ['shield', 'Integrity Always', 'Transparent testing and batch traceability.'],
  ['users', 'Research Focused', 'Built for scientific workflows.'],
  ['award', 'Quality Guaranteed', 'Reliable standards for every order.'],
];

const contactCards: Array<[IconName, string, string]> = [
  ['mail', 'Email Us', 'support@zenithbiopeptides.com'],
  ['phone', 'Call Us', '(858) 123-4567'],
  ['headphones', 'Live Chat', 'Chat with our team'],
  ['clock', 'Response Time', 'Within 24 Hours'],
];

const faqs = [
  'Are your products for human consumption?',
  'What is the purity of your peptides?',
  'Do you provide Certificates of Analysis (COA)?',
  'How long does shipping take?',
  'Do you ship internationally?',
  'How should I store my peptides?',
  'What payment methods do you accept?',
  'Can I return or exchange a product?',
  'How can I track my order?',
  'Do you offer bulk or wholesale pricing?',
];

export function AboutPageContent() {
  return (
    <main>
      <HeroMini
        label="About Zenith Biopeptides"
        title={<>Science. Integrity.<br /><span>Performance.</span></>}
        sub="We support scientific advancement with premium research compounds, reliable testing, and transparent documentation."
      />
      <TrustRow />

      <section className={`${styles.section} ${styles.split}`}>
        <motion.div
          variants={slideLeft}
          initial="hidden"
          whileInView="show"
          viewport={viewportLarge}
        >
          <p className={styles.eyebrow}>Our Mission</p>
          <h2>Advancing Research Through Excellence</h2>
          <p>
            We exist to empower researchers with premium peptides backed by
            science, transparency, and rigorous quality control.
          </p>
          <ul className={styles.checks}>
            <li>cGMP-compliant manufacturing standards</li>
            <li>Third-party lab tested purity verification</li>
            <li>Complete traceability and COA for every batch</li>
          </ul>
        </motion.div>

        <motion.div
          className={styles.labPanel}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportLarge}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className={styles.labGrid}>
            <Icon name="flask" />
            <Icon name="microscope" />
            <Icon name="checkFile" />
          </div>
        </motion.div>

        <motion.div
          className={styles.values}
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportLarge}
        >
          {values.map(([icon, title, body]) => (
            <motion.div key={title} variants={fadeUp}>
              <InfoCard icon={icon} title={title} body={body} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <TrustStrip />

      <motion.section
        className={styles.banner}
        variants={fadeUpLarge}
        initial="hidden"
        whileInView="show"
        viewport={viewportLarge}
      >
        <motion.div
          className={styles.groupVial}
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={viewportLarge}
        >
          ZENITH
        </motion.div>
        <motion.div
          variants={slideRight}
          initial="hidden"
          whileInView="show"
          viewport={viewportLarge}
        >
          <p className={styles.eyebrow}>Research Use Only</p>
          <h2>For In Vitro Research Purposes Only</h2>
          <p>All products are strictly for laboratory research use only.</p>
        </motion.div>
      </motion.section>
    </main>
  );
}

export function ContactPageContent() {
  return (
    <main>
      <HeroMini
        label="Contact Us"
        title={<>We&apos;re Here to <span>Help</span></>}
        sub="Have a question about our products, orders, or research? Our team is ready to assist you."
      />

      <section className={`${styles.section} ${styles.contact}`}>
        <motion.form
          className={styles.form}
          variants={slideLeft}
          initial="hidden"
          whileInView="show"
          viewport={viewportLarge}
        >
          <h2>Get in Touch</h2>
          <input placeholder="Full Name *" aria-label="Full Name" />
          <input placeholder="Email Address *" aria-label="Email Address" />
          <input placeholder="Subject *" aria-label="Subject" />
          <input placeholder="Order Number (Optional)" aria-label="Order Number" />
          <textarea placeholder="Your Message *" aria-label="Your Message" />
          <button className={`${styles.btn} ${styles.full}`} type="submit">
            <Icon name="send" /> Send Message
          </button>
          <small>Your information is secure and will never be shared.</small>
        </motion.form>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportLarge}
        >
          <motion.h2 variants={fadeUp}>Other Ways to Reach Us</motion.h2>
          {contactCards.map(([icon, title, body]) => (
            <motion.div className={styles.contactCard} key={title} variants={fadeUp}>
              <span className={styles.contactIcon}><Icon name={icon} /></span>
              <b>{title}</b>
              <a>{body}</a>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <TrustStrip />

      <section className={`${styles.section} ${styles.location}`}>
        <motion.div
          className={styles.map}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportLarge}
        >
          Map Placeholder
        </motion.div>
        <motion.div
          variants={slideRight}
          initial="hidden"
          whileInView="show"
          viewport={viewportLarge}
        >
          <h2>Our Location</h2>
          <b>Zenith Biopeptides</b>
          <p>123 Research Blvd.<br />San Diego, CA 92121</p>
        </motion.div>
        <motion.div
          className={styles.buildingPanel}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportLarge}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Icon name="mapPin" />
        </motion.div>
      </section>
    </main>
  );
}

export function FaqsPageContent() {
  return (
    <main>
      <HeroMini
        label="FAQs"
        title={<>Frequently Asked<br />Questions</>}
        sub="Find answers to common questions about products, orders, shipping, and research use."
      />

      <section className={`${styles.section} ${styles.faqWrap}`}>
        <motion.aside
          className={styles.filters}
          variants={slideLeft}
          initial="hidden"
          whileInView="show"
          viewport={viewportLarge}
        >
          <h3>Browse by Category</h3>
          {['All Questions', 'Products', 'Orders & Payments', 'Shipping & Delivery', 'Returns & Refunds', 'Research Use', 'COA & Testing'].map((item, index) => (
            <p className={index === 0 ? styles.selected : ''} key={item}>
              {item}<span>{index === 0 ? 32 : index + 3}</span>
            </p>
          ))}
        </motion.aside>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportLarge}
        >
          <motion.h2 variants={fadeUp}>All Questions <small>32 results</small></motion.h2>
          {faqs.map((question, index) => (
            <motion.details className={styles.faq} key={question} open={index === 0} variants={fadeUp}>
              <summary>{question}</summary>
              <p>
                No. Products are labeled For Research Use Only and are not
                intended for human consumption, therapeutic, or diagnostic use.
              </p>
            </motion.details>
          ))}
        </motion.div>
      </section>

      <TrustStrip />
    </main>
  );
}

export function ProductDetailPageContent({ slug }: { slug: string }) {
  const product = SHOP_PRODUCTS.find((item) => item.slug === slug) ?? SHOP_PRODUCTS[0];
  const related = SHOP_PRODUCTS.filter((item) => item.slug !== product.slug).slice(0, 4);
  const { addItem } = useCartStore();
  const [selectedSize, setSelectedSize] = useState(product.weight ?? '5mg');
  const [quantity, setQuantity] = useState(1);

  return (
    <main className={styles.section}>
      <motion.p
        className={styles.crumb}
        variants={fadeIn}
        initial="hidden"
        animate="show"
      >
        Home / Shop / Peptides / {product.name}
      </motion.p>
      <section className={styles.detail}>
        <motion.div
          className={styles.thumbs}
          variants={slideLeft}
          initial="hidden"
          animate="show"
        >
          {[0, 1, 2].map((item) => (
            <div className={styles.thumb} key={item}>
              <Image src={product.image} alt="" fill sizes="72px" />
            </div>
          ))}
          <span className={styles.fileThumb}><Icon name="checkFile" /></span>
        </motion.div>

        <motion.div
          className={styles.productImage}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Image src={product.image} alt={product.name} width={320} height={430} priority />
        </motion.div>

        <motion.div
          className={styles.buy}
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUp}>
            {product.badge && <span className={styles.tag}>{product.badge}</span>}
            <span className={styles.stock}>In Stock</span>
            <h1>{product.name}</h1>
            <div className={styles.stars}>★★★★★ <span>(347 Reviews)</span></div>
            <span className={styles.pill}>{product.purity} Purity</span>
            <span className={styles.pill}>COA Available</span>
            <span className={styles.pill}>Lab Tested</span>
            <h2>{formatPrice(product.price)}</h2>
          </motion.div>

          <motion.div variants={fadeUp}>
            <p>Size</p>
            <div className={styles.sizes}>
              {['2mg', '5mg', '10mg', '20mg'].map((size) => (
                <button 
                  className={size === selectedSize ? styles.on : ''} 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <p>Quantity</p>
            <div className={styles.qty}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Icon name="minus" /></button>
              <b>{quantity}</b>
              <button onClick={() => setQuantity(quantity + 1)}><Icon name="plus" /></button>
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <button 
              className={`${styles.btn} ${styles.full}`}
              onClick={() => addItem({
                slug: product.slug,
                name: product.name,
                price: product.price,
                quantity,
                size: selectedSize,
                image: product.image
              })}
            >
              Add to Cart
            </button>
            <button className={`${styles.btn} ${styles.ghost} ${styles.full}`}>Buy Now</button>
            <a className={styles.wishlist}>♡ Add to Wishlist (12)</a>
          </motion.div>
        </motion.div>
      </section>

      <TrustStrip />
      <Tabs />

      <motion.section
        className={styles.sectionInner}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportLarge}
      >
        <div className={styles.sectionHead}>
          <div>
            <p className={styles.eyebrow}>Recommended</p>
            <h2>You May Also Like</h2>
          </div>
          <Link className={`${styles.btn} ${styles.ghost}`} href="/shop">View All Products</Link>
        </div>
        <motion.div
          className={styles.relatedGrid}
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportLarge}
        >
          {related.map((item) => (
            <motion.div key={item.id} variants={scaleIn}>
              <Link className={styles.relatedCard} href={`/product/${item.slug}`}>
                <Image src={item.image} alt={item.name} width={130} height={150} />
                <h3>{item.name}</h3>
                <p>{item.weight}</p>
                <strong>{formatPrice(item.price)}</strong>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </main>
  );
}

function HeroMini({ label, title, sub }: { label: string; title: ReactNode; sub: string }) {
  return (
    <section className={styles.heroMini}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.p
          className={styles.eyebrow}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {label}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {sub}
        </motion.p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <Molecule />
      </motion.div>
    </section>
  );
}

function Molecule() {
  return (
    <div className={styles.molecule} aria-hidden>
      <i /><i /><i /><i /><i /><i />
    </div>
  );
}

function TrustRow() {
  return (
    <motion.section
      className={styles.trust}
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      {trustStats.map(([icon, value, label]) => (
        <motion.div className={styles.stat} key={label} variants={scaleIn}>
          <Icon name={icon} />
          <b>{value}</b>
          <span>{label}</span>
        </motion.div>
      ))}
    </motion.section>
  );
}

function TrustStrip() {
  return (
    <motion.section
      className={styles.strip}
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      {trustStrip.map(([icon, title, body]) => (
        <motion.div key={title} variants={fadeUp}>
          <Icon name={icon} />
          <b>{title}</b>
          <span>{body}</span>
        </motion.div>
      ))}
    </motion.section>
  );
}

function InfoCard({ icon, title, body }: { icon: IconName; title: string; body: string }) {
  return (
    <div className={styles.card}>
      <Icon name={icon} />
      <b>{title}</b>
      <p>{body}</p>
    </div>
  );
}

function Tabs() {
  return (
    <motion.section
      className={styles.tabs}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportLarge}
    >
      <div>
        {['Description', 'Specifications', 'COA Sample', 'Reviews (347)', 'Shipping & Returns'].map((tab, index) => (
          <button className={index === 0 ? styles.active : ''} key={tab}>{tab}</button>
        ))}
      </div>
      <article>
        <p>
          TB-500 is a synthetic peptide for research applications. Each batch is
          third-party tested and includes COA documentation.
        </p>
        <ul>
          <li>Supports laboratory research workflows</li>
          <li>99%+ purity target</li>
          <li>Research use only, not for human use</li>
        </ul>
      </article>
    </motion.section>
  );
}

function Icon({ name }: { name: IconName }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeWidth: 2,
    viewBox: '0 0 24 24',
    'aria-hidden': true,
  };

  const paths: Record<IconName, ReactNode> = {
    award: <><circle cx="12" cy="8" r="6" /><path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5" /></>,
    box: <><path d="M21 8 12 3 3 8l9 5 9-5z" /><path d="M3 8v8l9 5 9-5V8" /><path d="M12 13v8" /></>,
    checkFile: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="m9 15 2 2 4-4" /></>,
    clock: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
    flask: <><path d="M9 3h6" /><path d="M10 3v7L5 21h14l-5-11V3" /></>,
    headphones: <><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1v-8h3v6z" /><path d="M3 19a2 2 0 0 0 2 2h1v-8H3v6z" /></>,
    mail: <><path d="M4 4h16v16H4z" /><path d="m22 6-10 7L2 6" /></>,
    mapPin: <><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" /><circle cx="12" cy="10" r="3" /></>,
    microscope: <><path d="M6 18h8" /><path d="M3 22h18" /><path d="M14 22a7 7 0 0 0 7-7h-4a3 3 0 0 1-3 3v4z" /><path d="M9 14 5 10l6-6 4 4-6 6z" /></>,
    minus: <path d="M5 12h14" />,
    package: <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><path d="M3.3 7 12 12l8.7-5" /><path d="M12 22V12" /></>,
    phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.1 5.18 2 2 0 0 1 5.11 3h3a2 2 0 0 1 2 1.72c.12.91.33 1.8.62 2.65a2 2 0 0 1-.45 2.11L9 10.75a16 16 0 0 0 4.25 4.25l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.74.5 2.65.62A2 2 0 0 1 22 16.92z" />,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    send: <><path d="m22 2-7 20-4-9-9-4 20-7z" /><path d="M22 2 11 13" /></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    star: <polygon points="12 2 15.1 8.3 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 8.9 8.3 12 2" />,
    truck: <><path d="M1 3h15v13H1z" /><path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></>,
    users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
  };

  return <svg {...common}>{paths[name]}</svg>;
}

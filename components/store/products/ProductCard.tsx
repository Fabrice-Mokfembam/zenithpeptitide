'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/lib/store';
import styles from './ProductCard.module.css';

interface Props {
  product: Product;
  wished?: boolean;
  onToggleWishlist?: (product: Product) => void;
  onBuyNow?: (product: Product) => void;
}

export default function ProductCard({ product, wished = false, onToggleWishlist, onBuyNow }: Props) {
  const router = useRouter();
  const { addItem } = useCartStore();
  const [localWished, setLocalWished] = useState(false);
  const isWished = onToggleWishlist ? wished : localWished;
  const addProductToCart = () => addItem({
    slug: product.slug,
    name: product.name,
    price: product.price,
    quantity: 1,
    size: product.weight ?? '5mg',
    image: product.image
  });
  const toggleWishlist = () => {
    if (onToggleWishlist) {
      onToggleWishlist(product);
    } else {
      setLocalWished((value) => !value);
    }
  };
  const buyProductNow = () => {
    if (onBuyNow) {
      onBuyNow(product);
      return;
    }

    addProductToCart();
    router.push('/checkout');
  };

  return (
    <article className={styles.card}>
      {product.badge && (
        <span className={`${styles.badge} ${product.badge === 'SALE' ? styles.sale : ''}`}>
          {product.badge}
        </span>
      )}

      <button
        className={`${styles.heart} ${isWished ? styles.wished : ''}`}
        aria-label={isWished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        onClick={toggleWishlist}
      >
        <svg width="22" height="22" fill={isWished ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      <Link href={`/product/${product.slug}`} className={styles.imageLink}>
        <div className={styles.imageWrap}>
          <Image
            src={product.image}
            alt={`${product.name} - ${product.weight}`}
            fill
            sizes="(max-width: 600px) 50vw, 25vw"
            className={styles.img}
          />
        </div>
      </Link>

      <div className={styles.info}>
        <Link href={`/product/${product.slug}`}>
          <h3 className={styles.name}>{product.name}</h3>
        </Link>

        <div className={styles.purityRow}>
          <span className={styles.purityTag}>{product.purity} Purity</span>
          {product.coaAvailable && <span className={styles.coaTag}>COA Available</span>}
        </div>

        <div className={styles.priceRow}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <del className={styles.original}>{formatPrice(product.originalPrice)}</del>
          )}
        </div>

        <button
          className={styles.cartBtn} 
          aria-label={`Add ${product.name} to cart`}
          onClick={addProductToCart}
        >
          <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          Add to Cart
        </button>

        <button
          className={styles.buyBtn}
          aria-label={`Buy ${product.name} now`}
          onClick={buyProductNow}
        >
          Buy Now
        </button>
      </div>
    </article>
  );
}

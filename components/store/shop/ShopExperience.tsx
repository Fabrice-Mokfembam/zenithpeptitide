'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Product } from '@/types/product';
import { SHOP_PRODUCTS } from '@/lib/shop-data';
import { useCartStore } from '@/lib/store';
import ProductGrid, { type ProductSort } from './ProductGrid';
import Sidebar, { type ProductCategory } from './Sidebar';

const PER_PAGE = 8;
const WISHLIST_KEY = 'zenith-wishlist';

function productMatchesSearch(product: Product, query: string) {
  const haystack = [
    product.name,
    product.slug,
    product.category,
    product.purity,
    product.weight,
    product.badge,
  ].join(' ').toLowerCase();

  return haystack.includes(query.toLowerCase().trim());
}

function sortProducts(products: Product[], sort: ProductSort) {
  return [...products].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'newest') return Number(b.id) - Number(a.id);
    return (b.badge ? 1 : 0) - (a.badge ? 1 : 0) || Number(a.id) - Number(b.id);
  });
}

export default function ShopExperience() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addItem } = useCartStore();
  const [search, setSearch] = useState(searchParams.get('q') ?? '');
  const [category, setCategory] = useState<ProductCategory>('All Products');
  const [purity, setPurity] = useState('all');
  const [maxPrice, setMaxPrice] = useState(500);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showWishlistOnly, setShowWishlistOnly] = useState(searchParams.get('wishlist') === '1');
  const [sort, setSort] = useState<ProductSort>('best-selling');
  const [page, setPage] = useState(1);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(WISHLIST_KEY);
        setWishlist(saved ? JSON.parse(saved) : []);
      } catch {
        setWishlist([]);
      }
    }, 0);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const filteredProducts = useMemo(() => {
    const filtered = SHOP_PRODUCTS.filter((product) => {
      const matchesCategory = category === 'All Products' || product.category === category;
      const matchesPurity = purity === 'all' || product.purity.startsWith(purity);
      const matchesPrice = product.price <= maxPrice;
      const matchesStock = !inStockOnly || product.inStock;
      const matchesWishlist = !showWishlistOnly || wishlist.includes(product.slug);
      const matchesSearch = !search.trim() || productMatchesSearch(product, search);

      return matchesCategory && matchesPurity && matchesPrice && matchesStock && matchesWishlist && matchesSearch;
    });

    return sortProducts(filtered, sort);
  }, [category, inStockOnly, maxPrice, purity, search, showWishlistOnly, sort, wishlist]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pageProducts = filteredProducts.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const categoryCounts = useMemo(() => {
    return SHOP_PRODUCTS.reduce<Record<string, number>>((acc, product) => {
      acc['All Products'] += 1;
      if (product.category) acc[product.category] += 1;
      return acc;
    }, {
      'All Products': 0,
      Peptides: 0,
      'Research Chemicals': 0,
      'Peptide Blends': 0,
      'Amino Acids': 0,
    });
  }, []);

  const resetFilters = () => {
    setSearch('');
    setCategory('All Products');
    setPurity('all');
    setMaxPrice(500);
    setInStockOnly(false);
    setShowWishlistOnly(false);
    setSort('best-selling');
    setPage(1);
  };

  const updateSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const updateCategory = (value: ProductCategory) => {
    setCategory(value);
    setPage(1);
  };

  const updatePurity = (value: string) => {
    setPurity(value);
    setPage(1);
  };

  const updateMaxPrice = (value: number) => {
    setMaxPrice(value);
    setPage(1);
  };

  const updateInStockOnly = (value: boolean) => {
    setInStockOnly(value);
    setPage(1);
  };

  const updateShowWishlistOnly = (value: boolean) => {
    setShowWishlistOnly(value);
    setPage(1);
  };

  const updateSort = (value: ProductSort) => {
    setSort(value);
    setPage(1);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((current) =>
      current.includes(product.slug)
        ? current.filter((slug) => slug !== product.slug)
        : [...current, product.slug]
    );
  };

  const buyNow = (product: Product) => {
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      quantity: 1,
      size: product.weight ?? '5mg',
      image: product.image,
    });
    router.push('/checkout');
  };

  return (
    <>
      <aside>
        <Sidebar
          category={category}
          categoryCounts={categoryCounts}
          inStockOnly={inStockOnly}
          maxPrice={maxPrice}
          purity={purity}
          showWishlistOnly={showWishlistOnly}
          wishlistCount={wishlist.length}
          onCategoryChange={updateCategory}
          onClear={resetFilters}
          onInStockOnlyChange={updateInStockOnly}
          onMaxPriceChange={updateMaxPrice}
          onPurityChange={updatePurity}
          onShowWishlistOnlyChange={updateShowWishlistOnly}
        />
      </aside>
      <section>
        <ProductGrid
          products={pageProducts}
          resultCount={filteredProducts.length}
          totalCount={SHOP_PRODUCTS.length}
          search={search}
          sort={sort}
          page={safePage}
          totalPages={totalPages}
          wishlist={wishlist}
          onBuyNow={buyNow}
          onPageChange={setPage}
          onSearchChange={updateSearch}
          onSortChange={updateSort}
          onToggleWishlist={toggleWishlist}
        />
      </section>
    </>
  );
}

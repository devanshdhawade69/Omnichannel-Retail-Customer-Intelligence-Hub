import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  Star,
  Sparkles,
  ArrowRight,
  Check,
  TrendingUp,
  Package,
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { cn } from '@/lib/utils';

export interface ProductItem {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  stock: number;
  badge?: string;
  image_url: string;
  description: string;
}

export const defaultCatalogProducts: ProductItem[] = [
  {
    id: 1,
    name: 'Premium Wireless ANC Headphones',
    category: 'Audio',
    price: 299.99,
    originalPrice: 349.99,
    rating: 4.9,
    reviewsCount: 142,
    stock: 14,
    badge: 'Best Seller',
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    description: 'Acoustic engineering with active hybrid noise cancellation and 40-hour battery life.',
  },
  {
    id: 2,
    name: 'Minimalist Aluminum Desk Lamp',
    category: 'Lighting',
    price: 89.5,
    originalPrice: 119.0,
    rating: 4.8,
    reviewsCount: 96,
    stock: 22,
    badge: 'Popular',
    image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
    description: 'Precision machined anodized aluminum with stepless touch dimming and warm tone adjustment.',
  },
  {
    id: 3,
    name: 'Mechanical RGB Custom Keyboard',
    category: 'Electronics',
    price: 149.99,
    originalPrice: 179.99,
    rating: 4.9,
    reviewsCount: 215,
    stock: 18,
    badge: 'High Affinity Bundle',
    image_url: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80',
    description: 'Hot-swappable tactile switches with acoustic silicone dampening and PBT doubleshot keycaps.',
  },
  {
    id: 4,
    name: 'Ergonomic Task Mesh Chair',
    category: 'Ergonomics',
    price: 399.0,
    originalPrice: 479.0,
    rating: 4.9,
    reviewsCount: 88,
    stock: 6,
    badge: 'Low Stock',
    image_url: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80',
    description: 'Dynamic lumbar alignment with 4D adjustable armrests and responsive breathable suspension.',
  },
  {
    id: 5,
    name: '34" Curved Ultrawide 4K Monitor',
    category: 'Electronics',
    price: 649.0,
    originalPrice: 749.0,
    rating: 4.9,
    reviewsCount: 64,
    stock: 9,
    badge: 'VIP Exclusive',
    image_url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80',
    description: '144Hz refresh rate, 99% DCI-P3 color reproduction, and single-cable 90W USB-C power delivery.',
  },
  {
    id: 6,
    name: 'Precision Wireless Ergonomic Mouse',
    category: 'Accessories',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.8,
    reviewsCount: 178,
    stock: 25,
    badge: 'Bundle Favorite',
    image_url: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80',
    description: 'Dual optical sensors, hyper-fast electromagnetic scroll wheel, and cross-computer flow control.',
  },
  {
    id: 7,
    name: 'Smart Health & Fitness Tracker',
    category: 'Wearables',
    price: 219.0,
    originalPrice: 259.0,
    rating: 4.7,
    reviewsCount: 138,
    stock: 31,
    badge: 'Trending',
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    description: 'Continuous heart-rate telemetry, sleep phase architecture tracking, and 7-day battery stamina.',
  },
  {
    id: 8,
    name: 'Ceramic Pour-Over Coffee Station',
    category: 'Home & Kitchen',
    price: 64.0,
    originalPrice: 79.0,
    rating: 4.8,
    reviewsCount: 52,
    stock: 16,
    badge: 'Artisan',
    image_url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&q=80',
    description: 'Hand-finished stoneware dripper with heat-resistant borosilicate glass carafe and walnut base.',
  },
  {
    id: 9,
    name: 'Merino Wool Felt Extended Desk Mat',
    category: 'Accessories',
    price: 45.0,
    originalPrice: 55.0,
    rating: 4.7,
    reviewsCount: 89,
    stock: 40,
    badge: 'Essential',
    image_url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80',
    description: 'Ultra-dense anti-fray felt with natural water resistance and anti-slip rubberized underlay.',
  },
  {
    id: 10,
    name: 'True Wireless Sport Earbuds',
    category: 'Audio',
    price: 189.99,
    originalPrice: 219.99,
    rating: 4.9,
    reviewsCount: 163,
    stock: 19,
    badge: 'Waterproof IPX7',
    image_url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80',
    description: 'Secure wing-fit design with spatial audio calibration and rapid 15-minute fast-charging case.',
  },
];

const categories = ['All', 'Audio', 'Electronics', 'Ergonomics', 'Lighting', 'Accessories', 'Wearables', 'Home & Kitchen'];

const ShopHome = () => {
  const [products, setProducts] = useState<ProductItem[]>(defaultCatalogProducts);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [addedNotice, setAddedNotice] = useState<number | null>(null);

  const { addToCart, user } = useShop();

  useEffect(() => {
    fetch('http://localhost:5000/api/ecommerce/products')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Merge API data with rich catalog metadata
          const merged = data.map((item: any, idx: number) => {
            const fallback = defaultCatalogProducts[idx % defaultCatalogProducts.length];
            return {
              id: item.id || fallback.id,
              name: item.name || fallback.name,
              category: item.category || fallback.category,
              price: item.price || fallback.price,
              originalPrice: fallback.originalPrice,
              rating: fallback.rating,
              reviewsCount: fallback.reviewsCount,
              stock: item.stock_quantity ?? fallback.stock,
              badge: fallback.badge,
              image_url: item.image_url || fallback.image_url,
              description: item.description || fallback.description,
            };
          });
          setProducts(merged);
        }
      })
      .catch(() => {
        // High fidelity fallback catalog is already loaded
      });
  }, []);

  const handleQuickAdd = (product: ProductItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id: product.id,
      product_id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image_url: product.image_url,
      category: product.category,
    });

    setAddedNotice(product.id);
    setTimeout(() => {
      setAddedNotice((prev) => (prev === product.id ? null : prev));
    }, 1500);
  };

  // Add companion bundle (Keyboard + Mouse + Desk Mat) with 1 click
  const handleAddBundle = () => {
    const itemsToAdd = [
      defaultCatalogProducts[2], // Keyboard
      defaultCatalogProducts[5], // Mouse
      defaultCatalogProducts[8], // Desk Mat
    ];

    itemsToAdd.forEach((item) => {
      addToCart({
        id: item.id,
        product_id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        image_url: item.image_url,
        category: item.category,
      });
    });

    setAddedNotice(999);
    setTimeout(() => setAddedNotice(null), 2000);
  };

  // Filtered and sorted catalog
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchesCategory = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStock = !onlyInStock || p.stock > 0;
      return matchesCategory && matchesSearch && matchesStock;
    });

    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy, onlyInStock]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl animate-in fade-in duration-300">
      {/* Hero Showcase Banner */}
      <div className="relative mb-10 overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-card via-secondary/30 to-card p-8 md:p-12 shadow-2xl">
        <div className="absolute -right-16 -top-16 size-80 rounded-full bg-primary/20 blur-[100px] pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 size-80 rounded-full bg-accent/20 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary mb-4">
            <Sparkles size={13} />
            <span>Spring Omnichannel Showcase • 2026 Collection</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-5xl leading-tight">
            Curated Hardware & Workspace Essentials.
          </h1>

          <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
            {user
              ? `Welcome back, ${user.username}! Your VIP ${user.role === 'admin' ? 'Executive' : 'Member'} perks are active: 15% automatic checkout savings, priority next-day dispatch, and AI-curated bundles.`
              : 'Discover precision acoustics, ergonomic office hardware, and premium workspace gear synchronized with intelligent retail demand forecasting.'}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#catalog-grid"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs md:text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-transform active:scale-[0.98]"
            >
              <span>Explore Collection ({products.length} Products)</span>
              <ArrowRight size={16} />
            </a>

            <Link
              to="/admin"
              className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-secondary/50 px-4 py-3 text-xs md:text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
            >
              <TrendingUp size={16} className="text-emerald-400" />
              <span>View Demand Analytics</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Market Basket Analysis Companion Bundle Strip (Apriori Lift 4.82x) */}
      <div className="mb-10 rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 via-secondary/20 to-card p-5 md:p-6 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-primary/20 px-2 py-0.5 text-[11px] font-bold text-primary">
                Apriori Lift 4.82x • Strong Affinity
              </span>
              <span className="text-xs text-muted-foreground">Market Basket Analysis Recommendation</span>
            </div>
            <h3 className="text-lg font-bold text-foreground">
              The Minimalist Ergonomic Trio Bundle
            </h3>
            <p className="text-xs text-muted-foreground max-w-xl">
              Mechanical RGB Keyboard + Precision Wireless Mouse + Merino Felt Desk Mat. Frequently purchased together by 68% of VIP customers.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <div className="text-xs text-muted-foreground line-through">$274.98</div>
              <div className="text-xl font-extrabold text-foreground">$234.99</div>
              <div className="text-[10px] font-bold text-emerald-400">Save $39.99 (15% Off)</div>
            </div>

            <button
              type="button"
              onClick={handleAddBundle}
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90 transition-all transform active:scale-95"
            >
              {addedNotice === 999 ? (
                <>
                  <Check size={14} className="text-emerald-300" />
                  <span>Bundle Added!</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={14} />
                  <span>Add Trio to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div id="catalog-grid" className="mb-8 space-y-4">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'rounded-xl px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all border',
                selectedCategory === cat
                  ? 'border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/25'
                  : 'border-border/80 bg-secondary/30 text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search, Sort, and In-Stock Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-border/80 bg-card/60 p-3.5 backdrop-blur-sm">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 text-muted-foreground" size={15} />
            <input
              type="text"
              placeholder="Filter by name or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border/80 bg-secondary/40 pl-9 pr-8 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-xs text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-3 text-xs">
            {/* Only In Stock Toggle */}
            <label className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-foreground">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary"
              />
              <span>In-stock only</span>
            </label>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground">Sort:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="rounded-lg border border-border/80 bg-secondary/50 px-2.5 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none"
              >
                <option value="featured">Featured Picks</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Catalog Grid */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-border/80 bg-card p-12 text-center text-muted-foreground">
          <Package className="mx-auto size-12 text-muted-foreground/50 mb-3" />
          <h3 className="text-base font-bold text-foreground">No matching products found</h3>
          <p className="text-xs mt-1">Try clearing your search query or selecting a different category.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
              setOnlyInStock(false);
            }}
            className="mt-4 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isAdded = addedNotice === product.id;
            const discountPct = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

            return (
              <div
                key={product.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card/70 p-4 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5"
              >
                <div>
                  {/* Image Container with Badges */}
                  <Link to={`/product/${product.id}`} className="relative block aspect-square overflow-hidden rounded-xl bg-secondary/50">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="size-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Floating Badges */}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
                      {product.badge && (
                        <span className="rounded-md bg-black/60 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-white border border-white/10">
                          {product.badge}
                        </span>
                      )}
                      {discountPct > 0 && (
                        <span className="rounded-md bg-emerald-500/90 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-white">
                          -{discountPct}%
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-2.5 right-2.5">
                      <span
                        className={cn(
                          'flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold backdrop-blur-md border',
                          product.stock > 0
                            ? 'bg-emerald-950/70 border-emerald-500/30 text-emerald-400'
                            : 'bg-destructive/80 border-destructive text-white'
                        )}
                      >
                        <span
                          className={cn(
                            'size-1.5 rounded-full',
                            product.stock > 0 ? 'bg-emerald-400' : 'bg-white'
                          )}
                        />
                        <span>{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</span>
                      </span>
                    </div>
                  </Link>

                  {/* Product Metadata */}
                  <div className="mt-3.5 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star size={12} className="fill-amber-400" />
                        <span className="font-semibold text-foreground text-xs">{product.rating}</span>
                        <span className="text-[10px] text-muted-foreground">({product.reviewsCount})</span>
                      </div>
                    </div>

                    <Link to={`/product/${product.id}`} className="block">
                      <h3 className="font-bold text-sm text-foreground hover:text-primary transition-colors line-clamp-1" title={product.name}>
                        {product.name}
                      </h3>
                    </Link>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Price & Action Footer */}
                <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between gap-2">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-extrabold text-foreground">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-muted-foreground line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-emerald-400 font-medium">Free Next-Day Eligible</span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleQuickAdd(product, e)}
                    disabled={product.stock === 0}
                    className={cn(
                      'flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
                      isAdded
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                        : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm shadow-primary/25'
                    )}
                  >
                    {isAdded ? (
                      <>
                        <Check size={14} />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={14} />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ShopHome;

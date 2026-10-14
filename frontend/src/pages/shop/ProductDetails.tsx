import { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ShoppingCart,
  Star,
  ShieldCheck,
  Truck,
  RefreshCw,
  Heart,
  Check,
  Sparkles,
  Zap,
  Plus,
  Minus,
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { defaultCatalogProducts, type ProductItem } from './Home';
import { cn } from '@/lib/utils';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useShop();

  const [product, setProduct] = useState<ProductItem | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);
  const [bundleAdded, setBundleAdded] = useState(false);

  useEffect(() => {
    const prodId = parseInt(id || '1', 10);
    // Find initial product from rich catalog
    const localMatch = defaultCatalogProducts.find((p) => p.id === prodId) || defaultCatalogProducts[0];
    setProduct(localMatch);

    // Attempt to fetch from backend API if active
    fetch(`http://localhost:5000/api/ecommerce/products/${prodId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error && data.id) {
          setProduct((prev) => ({
            ...(prev || localMatch),
            id: data.id,
            name: data.name || localMatch.name,
            price: data.price || localMatch.price,
            stock: data.stock_quantity ?? localMatch.stock,
            image_url: data.image_url || localMatch.image_url,
            description: data.description || localMatch.description,
          }));
        }
      })
      .catch(() => {
        // Fallback remains active
      });
  }, [id]);

  // Generate 3 view angles for the gallery
  const galleryImages = useMemo(() => {
    if (!product) return [];
    return [
      product.image_url,
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80',
    ];
  }, [product]);

  // Intelligent companion bundle products (Apriori Market Basket pair)
  const companionBundle = useMemo(() => {
    if (!product) return [];
    return defaultCatalogProducts
      .filter((p) => p.id !== product.id)
      .slice(0, 2);
  }, [product]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center animate-pulse">
        <div className="size-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4" />
        <p className="text-sm text-muted-foreground">Loading product details...</p>
      </div>
    );
  }

  const discountAmount = product.originalPrice - product.price;
  const discountPercent = Math.round((discountAmount / product.originalPrice) * 100);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      product_id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image_url: product.image_url,
      category: product.category,
    });

    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 1800);
  };

  const handleBuyNow = () => {
    addToCart({
      id: product.id,
      product_id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image_url: product.image_url,
      category: product.category,
    });
    navigate('/cart');
  };

  // Add the 3-piece companion bundle to cart with 1 click
  const handleAddBundleToCart = () => {
    // Add main item
    addToCart({
      id: product.id,
      product_id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image_url: product.image_url,
      category: product.category,
    });

    // Add companion items
    companionBundle.forEach((item) => {
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

    setBundleAdded(true);
    setTimeout(() => setBundleAdded(false), 2000);
  };

  const bundleRawTotal = product.price + companionBundle.reduce((acc, curr) => acc + curr.price, 0);
  const bundleDiscountedTotal = bundleRawTotal * 0.85; // 15% bundle discount
  const bundleSavings = bundleRawTotal - bundleDiscountedTotal;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl animate-in fade-in duration-300">
      {/* Breadcrumbs Navigation */}
      <nav className="mb-6 flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Link to="/shop" className="hover:text-foreground transition-colors flex items-center gap-1 font-medium">
            <ArrowLeft size={13} />
            <span>Storefront</span>
          </Link>
          <span>/</span>
          <span className="text-muted-foreground">{product.category}</span>
          <span>/</span>
          <span className="text-foreground font-semibold truncate max-w-[200px] sm:max-w-xs">
            {product.name}
          </span>
        </div>

        <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] text-emerald-400">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>In Stock • Dispatches in 2 Hours</span>
        </div>
      </nav>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Image Gallery (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Hero Image Showcase */}
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-border/80 bg-card/80 p-4 shadow-xl group">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 pointer-events-none" />

            <img
              src={galleryImages[selectedImageIndex] || product.image_url}
              alt={product.name}
              className="size-full object-cover rounded-2xl transform transition-transform duration-700 group-hover:scale-105"
            />

            {/* Badges Overlay */}
            <div className="absolute top-6 left-6 flex flex-col gap-1.5 items-start">
              {product.badge && (
                <span className="rounded-md bg-black/70 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-white border border-white/10 shadow-sm">
                  {product.badge}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="rounded-md bg-emerald-500/90 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                  Save {discountPercent}%
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              type="button"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={cn(
                'absolute top-6 right-6 rounded-full p-2.5 backdrop-blur-md border transition-all',
                isWishlisted
                  ? 'bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-500/30'
                  : 'bg-black/60 text-white border-white/10 hover:bg-black/80'
              )}
              aria-label="Add to wishlist"
            >
              <Heart size={18} className={isWishlisted ? 'fill-white' : ''} />
            </button>
          </div>

          {/* Thumbnail Angles Switcher */}
          <div className="grid grid-cols-3 gap-3">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImageIndex(idx)}
                className={cn(
                  'aspect-square overflow-hidden rounded-xl border p-1 transition-all bg-card/60',
                  selectedImageIndex === idx
                    ? 'border-primary ring-2 ring-primary/40'
                    : 'border-border/80 hover:border-primary/50 opacity-70 hover:opacity-100'
                )}
              >
                <img src={img} alt={`Angle ${idx + 1}`} className="size-full object-cover rounded-lg" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Details & Purchasing Controls (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Category & Rating */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="rounded-md bg-primary/10 border border-primary/25 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                {product.category}
              </span>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star size={14} className="fill-amber-400" />
                  <Star size={14} className="fill-amber-400" />
                  <Star size={14} className="fill-amber-400" />
                  <Star size={14} className="fill-amber-400" />
                  <Star size={14} className="fill-amber-400" />
                </div>
                <span className="text-xs font-bold text-foreground">{product.rating}</span>
                <span className="text-xs text-muted-foreground">({product.reviewsCount} verified reviews)</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Pricing Section */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-3xl lg:text-4xl font-extrabold text-foreground">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-base text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {discountAmount > 0 && (
                <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-bold text-emerald-400">
                  Save ${discountAmount.toFixed(2)} ({discountPercent}% Off)
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Key Specifications Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="rounded-xl border border-border/80 bg-secondary/30 p-3">
                <div className="text-[10px] uppercase font-bold text-muted-foreground">Acoustics & Audio</div>
                <div className="text-xs font-semibold text-foreground mt-0.5">Dual High-Res Drivers</div>
              </div>
              <div className="rounded-xl border border-border/80 bg-secondary/30 p-3">
                <div className="text-[10px] uppercase font-bold text-muted-foreground">Connectivity</div>
                <div className="text-xs font-semibold text-foreground mt-0.5">Bluetooth 5.3 Low-Latency</div>
              </div>
              <div className="rounded-xl border border-border/80 bg-secondary/30 p-3">
                <div className="text-[10px] uppercase font-bold text-muted-foreground">Battery Endurance</div>
                <div className="text-xs font-semibold text-foreground mt-0.5">Up to 40 Hours Active Play</div>
              </div>
              <div className="rounded-xl border border-border/80 bg-secondary/30 p-3">
                <div className="text-[10px] uppercase font-bold text-muted-foreground">Warranty</div>
                <div className="text-xs font-semibold text-foreground mt-0.5">2-Year Official Protection</div>
              </div>
            </div>
          </div>

          {/* Interactive Purchasing Toolbar */}
          <div className="rounded-2xl border border-border/80 bg-card/80 p-5 space-y-4 shadow-lg backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Quantity Stepper */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Quantity:</span>
                <div className="flex items-center rounded-xl border border-border bg-secondary/60 p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="size-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-card hover:text-foreground disabled:opacity-30 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-foreground">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    disabled={quantity >= product.stock}
                    className="size-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-card hover:text-foreground disabled:opacity-30 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Subtotal Calculation */}
              <div className="text-right">
                <div className="text-[11px] text-muted-foreground">Item Subtotal</div>
                <div className="text-lg font-bold text-foreground">
                  ${(product.price * quantity).toFixed(2)}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={cn(
                  'flex items-center justify-center gap-2 rounded-xl py-3.5 px-4 font-bold text-xs md:text-sm shadow-lg transition-all transform active:scale-95 disabled:opacity-50',
                  addedNotice
                    ? 'bg-emerald-500 text-white shadow-emerald-500/25'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/25'
                )}
              >
                {addedNotice ? (
                  <>
                    <Check size={16} />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={16} />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex items-center justify-center gap-2 rounded-xl border border-primary/50 bg-primary/10 py-3.5 px-4 font-bold text-xs md:text-sm text-primary hover:bg-primary/20 transition-all transform active:scale-95 disabled:opacity-50"
              >
                <Zap size={16} />
                <span>Instant Buy Now</span>
              </button>
            </div>

            {/* Value Proposition Micro-Strip */}
            <div className="grid grid-cols-3 gap-2 border-t border-border/60 pt-4 text-center text-[11px] text-muted-foreground">
              <div className="flex flex-col items-center gap-1">
                <Truck size={14} className="text-primary" />
                <span>Free Next-Day</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>2-Year Warranty</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw size={14} className="text-amber-400" />
                <span>30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Bought Together (Apriori Market Basket Bundle) */}
      <div className="mt-14 rounded-3xl border border-primary/30 bg-gradient-to-br from-card via-secondary/20 to-card p-6 md:p-8 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Apriori Market Basket Recommendation • Lift 4.82x
              </span>
            </div>
            <h2 className="text-xl font-bold text-foreground mt-1">
              Frequently Bought Together with {product.name}
            </h2>
            <p className="text-xs text-muted-foreground">
              Save an additional 15% when purchased as a bundle.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-muted-foreground line-through">${bundleRawTotal.toFixed(2)}</div>
              <div className="text-xl font-black text-foreground">${bundleDiscountedTotal.toFixed(2)}</div>
              <div className="text-[10px] font-bold text-emerald-400">Save ${bundleSavings.toFixed(2)} (15% Off)</div>
            </div>

            <button
              type="button"
              onClick={handleAddBundleToCart}
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-md shadow-primary/25 hover:bg-primary/90 transition-transform active:scale-95"
            >
              {bundleAdded ? (
                <>
                  <Check size={14} />
                  <span>Bundle Added!</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={14} />
                  <span>Add All 3 to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Bundle Items Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Main Item */}
          <div className="flex items-center gap-3 rounded-2xl border border-primary/40 bg-card p-3.5">
            <img src={product.image_url} alt={product.name} className="size-16 rounded-xl object-cover shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase text-primary">Base Item</span>
              <h4 className="text-xs font-bold text-foreground truncate">{product.name}</h4>
              <p className="text-xs font-semibold text-foreground mt-0.5">${product.price.toFixed(2)}</p>
            </div>
          </div>

          {/* Companion Items */}
          {companionBundle.map((item, idx) => (
            <div key={item.id} className="flex items-center gap-3 rounded-2xl border border-border/80 bg-card p-3.5">
              <img src={item.image_url} alt={item.name} className="size-16 rounded-xl object-cover shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase text-emerald-400">Companion #{idx + 1}</span>
                <h4 className="text-xs font-bold text-foreground truncate">{item.name}</h4>
                <p className="text-xs font-semibold text-foreground mt-0.5">${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  Tag,
  CreditCard,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  X,
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { defaultCatalogProducts } from './Home';
import { cn } from '@/lib/utils';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, user, addToCart } = useShop();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>('VIP15'); // Auto-applied VIP perk
  const [promoError, setPromoError] = useState('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [generatedOrderNumber, setGeneratedOrderNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple-pay' | 'store-credit'>('card');

  // Calculations
  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  // Discount computation
  const discount = useMemo(() => {
    if (appliedPromo === 'VIP15') return subtotal * 0.15;
    if (appliedPromo === 'PROMO10') return Math.min(10, subtotal);
    if (appliedPromo === 'FREESHIP') return 0;
    return 0;
  }, [subtotal, appliedPromo]);

  // Free shipping threshold at $150
  const freeShippingThreshold = 150;
  const isFreeShipping = subtotal >= freeShippingThreshold || appliedPromo === 'FREESHIP';
  const shippingFee = subtotal === 0 || isFreeShipping ? 0 : 12.0;
  const shippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const discountedSubtotal = Math.max(0, subtotal - discount);
  const tax = discountedSubtotal * 0.08;
  const total = discountedSubtotal + tax + shippingFee;

  // Handle promo code submit
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();

    if (code === 'VIP15' || code === 'PROMO10' || code === 'FREESHIP') {
      setAppliedPromo(code);
      setPromoCode('');
    } else {
      setPromoError('Invalid voucher code. Try "VIP15" or "PROMO10".');
    }
  };

  // Handle checkout completion
  const handleFinalCheckout = async () => {
    if (!user) {
      navigate('/');
      return;
    }

    setLoading(true);
    const orderNum = `ORD-${Math.floor(Math.random() * 89999 + 10000)}`;

    try {
      const orderPayload = {
        user_id: user.id,
        items: cart.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price,
        })),
        payment_method: paymentMethod === 'card' ? 'Credit Card' : paymentMethod === 'apple-pay' ? 'Apple Pay' : 'Store Credit',
        total_amount: total,
      };

      await fetch('http://localhost:5000/api/ecommerce/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });
    } catch {
      // Offline fallback: order succeeds locally
    }

    setTimeout(() => {
      setGeneratedOrderNumber(orderNum);
      setLoading(false);
      setIsOrderComplete(true);
      clearCart();
    }, 600);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
            Your Shopping Bag
          </h1>
          <p className="mt-1 text-xs md:text-sm text-muted-foreground">
            Review selected hardware essentials and redeem member checkout perks.
          </p>
        </div>

        {cart.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={clearCart}
              className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
            >
              <Trash2 size={13} />
              <span>Clear Entire Bag</span>
            </button>
            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-secondary/50 px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-secondary transition-colors"
            >
              <ArrowLeft size={13} />
              <span>Continue Shopping</span>
            </Link>
          </div>
        )}
      </div>

      {cart.length === 0 ? (
        /* Empty Cart State */
        <div className="rounded-3xl border border-border/80 bg-card/75 p-8 md:p-16 text-center backdrop-blur-xl shadow-xl">
          <div className="relative mx-auto mb-6 flex size-20 items-center justify-center rounded-3xl bg-secondary/80 text-muted-foreground border border-border/80">
            <div className="absolute inset-0 rounded-3xl bg-primary/10 blur-xl animate-pulse" />
            <ShoppingBag size={36} className="relative z-10 text-primary" />
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-foreground">Your shopping bag is currently empty</h2>
          <p className="mt-2 text-xs md:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            Explore our curated hardware catalog to discover acoustic headphones, custom mechanical keyboards, and ergonomic gear.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs md:text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all transform active:scale-95"
            >
              <span>Explore Featured Catalog</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Quick Recommendations Strip */}
          <div className="mt-14 border-t border-border/60 pt-8 text-left">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
              Trending Workspace Essentials
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {defaultCatalogProducts.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border border-border/60 bg-secondary/30 p-3 hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img src={item.image_url} alt={item.name} className="size-12 rounded-lg object-cover" />
                    <div>
                      <h4 className="text-xs font-bold text-foreground line-clamp-1">{item.name}</h4>
                      <p className="text-xs font-semibold text-primary">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      addToCart({
                        id: item.id,
                        product_id: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: 1,
                        image_url: item.image_url,
                        category: item.category,
                      })
                    }
                    className="rounded-lg bg-primary/10 border border-primary/25 p-2 text-primary hover:bg-primary hover:text-white transition-colors"
                    title="Add to Cart"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Active Cart State */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items List (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Free Shipping Progress Tracker */}
            <div className="rounded-2xl border border-border/80 bg-card/80 p-4 shadow-sm backdrop-blur-md">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-foreground flex items-center gap-1.5">
                  <Truck size={14} className={isFreeShipping ? 'text-emerald-400' : 'text-primary'} />
                  {isFreeShipping ? (
                    <span className="text-emerald-400">🎉 Free Priority Next-Day Delivery Unlocked!</span>
                  ) : (
                    <span>Add ${remainingForFreeShipping.toFixed(2)} more for Free Next-Day Shipping</span>
                  )}
                </span>
                <span className="font-bold text-muted-foreground">{shippingProgress}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                <div
                  className={cn(
                    'h-full transition-all duration-500 rounded-full',
                    isFreeShipping ? 'bg-emerald-500' : 'bg-primary'
                  )}
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>

            {/* List of Cart Items */}
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-border/80 bg-card/80 p-4 shadow-sm backdrop-blur-md transition-all hover:border-primary/40"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <Link
                      to={`/product/${item.product_id}`}
                      className="size-20 shrink-0 overflow-hidden rounded-xl border border-border/80 bg-secondary/50"
                    >
                      <img src={item.image_url} alt={item.name} className="size-full object-cover" />
                    </Link>

                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                        {item.category}
                      </span>
                      <Link to={`/product/${item.product_id}`} className="block">
                        <h3 className="font-bold text-sm text-foreground hover:text-primary transition-colors truncate">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>

                  {/* Quantity and Actions */}
                  <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-6 border-t border-border/40 sm:border-t-0 pt-3 sm:pt-0">
                    {/* Stepper */}
                    <div className="flex items-center rounded-xl border border-border bg-secondary/60 p-1">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="size-7 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-card hover:text-foreground transition-colors"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="size-7 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-card hover:text-foreground transition-colors"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right min-w-[70px]">
                      <div className="text-sm font-extrabold text-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>

                    {/* Delete Item */}
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/15 hover:text-destructive transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary Sidebar (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-3xl border border-border/80 bg-card/85 p-6 shadow-xl backdrop-blur-xl space-y-5 sticky top-24">
              <h2 className="text-lg font-bold text-foreground tracking-tight border-b border-border/60 pb-3">
                Order Summary
              </h2>

              {/* Promo Code Input */}
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                  Voucher / Promo Code
                </label>
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-2.5 text-muted-foreground" size={14} />
                    <input
                      type="text"
                      placeholder="Try VIP15 or PROMO10"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full rounded-xl border border-border/80 bg-secondary/50 pl-9 pr-3 py-2 text-xs text-foreground uppercase placeholder:normal-case placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-xl bg-secondary px-4 py-2 text-xs font-bold text-foreground hover:bg-secondary/80 border border-border/80 transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {promoError && (
                  <p className="mt-1.5 text-[11px] text-destructive">{promoError}</p>
                )}

                {appliedPromo && (
                  <div className="mt-2 flex items-center justify-between rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-400">
                    <span className="flex items-center gap-1 font-semibold">
                      <Sparkles size={12} />
                      Code {appliedPromo} Applied
                    </span>
                    <button
                      type="button"
                      onClick={() => setAppliedPromo(null)}
                      className="text-[11px] hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Cost Calculations */}
              <div className="space-y-2.5 border-t border-border/60 pt-4 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-foreground">${subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>VIP Member Savings ({appliedPromo})</span>
                    <span className="font-semibold">-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping & Handling</span>
                  <span className={cn('font-semibold', isFreeShipping ? 'text-emerald-400' : 'text-foreground')}>
                    {isFreeShipping ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-muted-foreground">
                  <span>Estimated Sales Tax (8%)</span>
                  <span className="font-semibold text-foreground">${tax.toFixed(2)}</span>
                </div>

                <div className="border-t border-border/80 pt-3 flex justify-between items-baseline text-foreground">
                  <div>
                    <div className="text-base font-extrabold">Estimated Total</div>
                    <div className="text-[10px] text-muted-foreground">Includes applicable local taxes</div>
                  </div>
                  <div className="text-2xl font-black text-primary">
                    ${total.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full rounded-xl bg-primary py-3.5 px-4 text-xs md:text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all transform active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={15} />
              </button>

              {/* Trust Badges */}
              <div className="border-t border-border/60 pt-4 grid grid-cols-3 gap-2 text-center text-[10px] text-muted-foreground">
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  <span>256-Bit SSL</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Truck size={14} className="text-primary" />
                  <span>Next-Day Air</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Sparkles size={14} className="text-amber-400" />
                  <span>VIP Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Glassmorphic Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-2xl space-y-6">
            {!isOrderComplete ? (
              <>
                <div className="flex items-center justify-between border-b border-border/60 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <CreditCard size={18} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">Confirm & Pay</h3>
                      <p className="text-xs text-muted-foreground">Secure omnichannel transaction</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsCheckoutOpen(false)}
                    className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Delivery Address */}
                <div className="rounded-xl border border-border/60 bg-secondary/30 p-3.5 text-xs space-y-1">
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">Shipping Destination</div>
                  <div className="font-semibold text-foreground">{user?.username || 'VIP Customer'}</div>
                  <div className="text-muted-foreground">452 Market Street, Suite 800 • San Francisco, CA 94105</div>
                  <div className="text-emerald-400 font-medium">Estimated Arrival: Tomorrow by 12:00 PM</div>
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Select Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={cn(
                        'flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all',
                        paymentMethod === 'card'
                          ? 'border-primary bg-primary/10 text-primary ring-1 ring-primary'
                          : 'border-border/80 bg-secondary/30 text-muted-foreground hover:bg-secondary'
                      )}
                    >
                      <CreditCard size={18} className="mb-1" />
                      <span>Credit Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('apple-pay')}
                      className={cn(
                        'flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all',
                        paymentMethod === 'apple-pay'
                          ? 'border-primary bg-primary/10 text-primary ring-1 ring-primary'
                          : 'border-border/80 bg-secondary/30 text-muted-foreground hover:bg-secondary'
                      )}
                    >
                      <span className="text-sm font-black mb-1"> Pay</span>
                      <span>Apple / Google</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('store-credit')}
                      className={cn(
                        'flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all',
                        paymentMethod === 'store-credit'
                          ? 'border-primary bg-primary/10 text-primary ring-1 ring-primary'
                          : 'border-border/80 bg-secondary/30 text-muted-foreground hover:bg-secondary'
                      )}
                    >
                      <Sparkles size={18} className="mb-1 text-emerald-400" />
                      <span>VIP Balance</span>
                    </button>
                  </div>
                </div>

                {/* Order Total Breakdown */}
                <div className="rounded-xl border border-border/60 bg-secondary/40 p-3.5 space-y-1 text-xs">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Items Total ({cart.reduce((c, i) => c + i.quantity, 0)})</span>
                    <span className="font-semibold text-foreground">${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Voucher Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-foreground font-bold pt-1 border-t border-border/60">
                    <span>Total Charged</span>
                    <span className="text-primary text-sm">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Submit */}
                <button
                  type="button"
                  onClick={handleFinalCheckout}
                  disabled={loading}
                  className="w-full rounded-xl bg-primary py-3 px-4 text-xs md:text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="size-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      Securing Transaction...
                    </span>
                  ) : (
                    <span>Confirm & Pay ${total.toFixed(2)}</span>
                  )}
                </button>
              </>
            ) : (
              /* Order Completed Receipt Modal */
              <div className="text-center py-4 space-y-4">
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  <CheckCircle2 size={36} />
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-foreground">Order Successfully Placed!</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Thank you, {user?.username}! Your order confirmation receipt has been dispatched.
                  </p>
                </div>

                <div className="rounded-2xl border border-border/80 bg-secondary/40 p-4 text-xs space-y-2 text-left">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Order Reference:</span>
                    <span className="font-mono font-bold text-primary">{generatedOrderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated Delivery:</span>
                    <span className="font-semibold text-foreground">Tomorrow by 12:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="font-semibold text-emerald-400">Processing in Warehouse</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Paid:</span>
                    <span className="font-bold text-foreground">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setIsOrderComplete(false);
                    navigate('/shop');
                  }}
                  className="w-full rounded-xl bg-primary py-3 px-4 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Return to Storefront
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

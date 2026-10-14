import { Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Truck, RefreshCw, Activity, Heart } from 'lucide-react';

export default function ShopFooter() {
  return (
    <footer className="mt-auto border-t border-border/80 bg-card/60 backdrop-blur-md text-slate-300">
      {/* Top Value Propositions Ribbon */}
      <div className="border-b border-border/60">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3.5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/25 text-primary">
                <Truck size={20} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">Free Next-Day Shipping</h4>
                <p className="text-xs text-muted-foreground mt-0.5">On all member orders over $150</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">2-Year Full Coverage</h4>
                <p className="text-xs text-muted-foreground mt-0.5">Zero-hassle warranty on all electronics</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400">
                <RefreshCw size={20} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">30-Day Effortless Returns</h4>
                <p className="text-xs text-muted-foreground mt-0.5">Free doorstep pickup and instant refund</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/25 text-purple-400">
                <Activity size={20} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">AI Behavioral Personalization</h4>
                <p className="text-xs text-muted-foreground mt-0.5">Curated with RFM segmentation models</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/shop" className="inline-flex items-center gap-2 text-2xl font-black italic tracking-tighter text-foreground group">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground group-hover:scale-105 transition-transform">
                <ShoppingBag size={18} />
              </div>
              <span>FlipStore</span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              Next-generation omnichannel retail platform merging high-touch e-commerce with real-time customer intelligence, predictive demand forecasting, and automated market-basket recommendations.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Star Schema OLAP & E-Commerce API Active</span>
            </div>
          </div>

          {/* Store Catalog */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">Storefront</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/shop" className="text-muted-foreground hover:text-foreground transition-colors">
                  All Featured Products
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-muted-foreground hover:text-foreground transition-colors">
                  Electronics & Audio
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-muted-foreground hover:text-foreground transition-colors">
                  Office & Ergonomics
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-muted-foreground hover:text-foreground transition-colors">
                  VIP Companion Bundles
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-muted-foreground hover:text-foreground transition-colors">
                  Shopping Bag
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Intelligence Hub */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">Intelligence Hub</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/admin" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  <span>Executive Dashboard</span>
                  <span className="text-[10px]">↗</span>
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  <span>Revenue Regression Engine</span>
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  <span>Customer RFM Segmentation</span>
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  <span>Loyalty Classifier Faceoff</span>
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  <span>Apriori Association Mining</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Experience */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">Customer Care</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="text-muted-foreground">Order Tracking & Receipt</span>
              </li>
              <li>
                <span className="text-muted-foreground">30-Day Express Returns</span>
              </li>
              <li>
                <span className="text-muted-foreground">Privacy & Cookie Settings</span>
              </li>
              <li>
                <span className="text-muted-foreground">Terms of Service</span>
              </li>
              <li>
                <span className="text-muted-foreground">VIP Concierge Support</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 FlipStore Omnichannel Retail Hub. Engineered with Antigravity.</p>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Crafted with</span>
            <Heart size={12} className="text-rose-500 fill-rose-500" />
            <span>for enterprise omnichannel commerce</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

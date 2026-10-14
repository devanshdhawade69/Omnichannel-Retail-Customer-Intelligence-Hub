import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  User,
  Activity,
  LogOut,
  ShoppingBag,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const { user, logout, cart } = useShop();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-card/85 backdrop-blur-xl shadow-md">
      {/* Top Intelligence & Perk Ticker */}
      <div className="border-b border-border/40 bg-secondary/30 px-4 py-1 text-xs">
        <div className="container mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground text-[11px]">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              OLAP Connected
            </span>
            <span className="hidden sm:inline text-border">•</span>
            <span className="hidden sm:inline">Free Priority Delivery on Orders Over $150</span>
            <span className="hidden md:inline text-border">•</span>
            <span className="hidden md:inline text-primary">VIP Member 15% Automatic Discount Enabled</span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <Link
              to="/admin"
              className="inline-flex items-center gap-1 font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <Activity size={12} className="text-primary" />
              <span>Customer Intelligence Hub</span>
              <ChevronRight size={11} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-6">
            <Link
              to={user ? '/shop' : '/'}
              className="flex items-center gap-2.5 text-foreground group"
            >
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
                <ShoppingBag size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black italic tracking-tighter text-foreground leading-none">
                  FlipStore
                </span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-primary">
                  Retail Intelligence
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
              <Link
                to="/shop"
                className={cn(
                  'rounded-lg px-3 py-1.5 transition-colors',
                  location.pathname === '/shop'
                    ? 'bg-secondary text-foreground font-semibold'
                    : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                )}
              >
                Storefront
              </Link>
              <Link
                to="/shop"
                className="rounded-lg px-3 py-1.5 text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors"
              >
                Featured
              </Link>
              <Link
                to="/shop"
                className="rounded-lg px-3 py-1.5 text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors"
              >
                VIP Bundles
              </Link>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products, audio, ergonomics..."
                className="w-full rounded-xl border border-border/80 bg-secondary/50 pl-9 pr-9 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-card focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
              <Search
                className="absolute left-3 top-2.5 text-muted-foreground pointer-events-none"
                size={15}
              />
              <kbd className="absolute right-2.5 top-2 rounded bg-card/80 border border-border/80 px-1.5 py-0.5 text-[9px] font-mono text-muted-foreground">
                /
              </kbd>
            </div>
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-3">
            {/* Shopping Cart Button */}
            <Link
              to="/cart"
              className={cn(
                'relative flex items-center gap-2 rounded-xl border border-border/80 bg-secondary/40 px-3 py-2 text-xs font-semibold transition-all hover:border-primary/50 hover:bg-primary/5',
                cartItemCount > 0 ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              <div className="relative">
                <ShoppingCart size={17} className={cartItemCount > 0 ? 'text-primary' : ''} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-in zoom-in-50">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">
                {cartItemCount > 0 ? `$${cartSubtotal.toFixed(2)}` : 'Cart'}
              </span>
            </Link>

            {/* Intelligence Hub Switcher */}
            <Link
              to="/admin"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 px-3 py-2 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors shadow-sm"
              title="Open ML Customer Intelligence Dashboard"
            >
              <Activity size={14} />
              <span>Admin Hub</span>
            </Link>

            {/* User Account / Profile */}
            {user ? (
              <div className="flex items-center gap-2 rounded-xl border border-border/80 bg-secondary/40 p-1 pl-2.5">
                <div className="flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-primary/15 text-primary text-xs font-bold border border-primary/20">
                    {user.username.slice(0, 1).toUpperCase()}
                  </div>
                  <div className="hidden xl:flex flex-col text-left">
                    <span className="text-xs font-semibold leading-tight text-foreground truncate max-w-[100px]">
                      {user.username}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                      {user.role === 'admin' ? 'Executive' : 'VIP Member'}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/15 hover:text-destructive transition-colors"
                  title="Sign Out"
                >
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
              >
                <User size={14} />
                <span>Sign In</span>
              </Link>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex md:hidden rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="mt-3 rounded-xl border border-border/80 bg-card p-4 space-y-3 md:hidden animate-in slide-in-from-top-2">
            <div className="relative w-full mb-2">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-lg border border-border bg-secondary/50 pl-8 pr-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Search className="absolute left-2.5 top-2.5 text-muted-foreground" size={14} />
            </div>

            <nav className="flex flex-col gap-1 text-sm font-medium">
              <Link
                to="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 hover:bg-secondary text-foreground"
              >
                Storefront Catalog
              </Link>
              <Link
                to="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-secondary text-foreground"
              >
                <span>Shopping Cart</span>
                {cartItemCount > 0 && (
                  <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-primary hover:bg-primary/10 font-semibold"
              >
                <Activity size={16} />
                <span>Customer Intelligence Hub (Admin)</span>
              </Link>
            </nav>

            {user && (
              <div className="border-t border-border pt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-7 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                    {user.username[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground">{user.username}</div>
                    <div className="text-[10px] text-muted-foreground uppercase">{user.role}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="text-xs text-destructive hover:underline flex items-center gap-1"
                >
                  <LogOut size={14} /> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

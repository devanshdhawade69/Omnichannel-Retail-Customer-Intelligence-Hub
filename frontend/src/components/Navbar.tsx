import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Activity, LogOut } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const Navbar = () => {
  const { user, logout, cart } = useShop();
  
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <nav className="bg-primary text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-black italic tracking-tighter flex items-center gap-2">
          FlipStore
        </Link>
        <div className="flex-1 px-8 relative max-w-2xl">
          <input 
            type="text" 
            placeholder="Search for products, brands and more..." 
            className="w-full px-4 py-2 pl-10 rounded-md text-slate-800 border-none focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <Search className="absolute left-10 top-2.5 text-slate-400" size={18} />
        </div>
        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="font-medium flex items-center gap-2">
                <User size={20} /> {user.username}
              </span>
              <button onClick={logout} className="flex items-center gap-1 hover:text-red-300 transition-colors text-sm">
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-1 hover:text-accent transition-colors font-medium">
              <User size={20} />
              <span>Login</span>
            </Link>
          )}
          <Link to="/cart" className="flex items-center gap-1 hover:text-accent transition-colors font-medium relative">
            <ShoppingCart size={20} />
            <span>Cart</span>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-accent text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartItemCount}
              </span>
            )}
          </Link>
          <Link to="/admin" className="flex items-center gap-1 text-sm bg-white/20 px-3 py-1.5 rounded hover:bg-white/30 transition-colors">
            <Activity size={16} />
            <span>Admin</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

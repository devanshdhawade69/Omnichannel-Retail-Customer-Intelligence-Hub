import { NavLink } from 'react-router-dom';
import { BarChart3, PieChart, Target, ShoppingCart, Activity, Package } from 'lucide-react';

const Sidebar = () => {
  const links = [
    { to: '/admin', icon: <Activity size={20} />, label: 'Overview' },
    { to: '/admin/products', icon: <Package size={20} />, label: 'Products' },
    { to: '/admin/regression', icon: <BarChart3 size={20} />, label: 'Revenue Predictor' },
    { to: '/admin/clustering', icon: <PieChart size={20} />, label: 'Customer Segments' },
    { to: '/admin/classification', icon: <Target size={20} />, label: 'Loyalty Classifier' },
    { to: '/admin/association', icon: <ShoppingCart size={20} />, label: 'Market Basket' },
  ];

  return (
    <aside className="w-64 bg-surface h-screen border-r border-slate-700 flex flex-col p-4 shrink-0 shadow-2xl z-10 relative">
      <div className="flex items-center gap-3 mb-10 mt-4 px-2 text-primary">
        <Activity size={32} className="animate-pulse" />
        <h1 className="text-2xl font-bold text-white tracking-wide">Retail<span className="text-primary bg-clip-text bg-gradient-to-r from-primary to-accent">Hub</span></h1>
      </div>
      <nav className="flex flex-col gap-2 flex-grow">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive ? 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_15px_rgba(59,130,246,0.15)] transform scale-[1.02]' : 'text-slate-400 hover:text-white hover:bg-slate-800 hover:translate-x-1'
              }`
            }
          >
            {link.icon}
            <span className="font-medium tracking-wide">{link.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="text-xs text-slate-500 text-center mt-auto border-t border-slate-800 pt-4">
        &copy; 2026 Data Intelligence
      </div>
    </aside>
  );
};

export default Sidebar;

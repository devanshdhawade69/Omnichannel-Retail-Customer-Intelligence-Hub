import { Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import RegressionEngine from './pages/RegressionEngine';
import ClusteringEngine from './pages/ClusteringEngine';
import ClusteringClassificationEngine from './pages/ClassificationEngine';
import AssociationEngine from './pages/AssociationEngine';
import AdminProducts from './pages/AdminProducts';

import ShopHome from './pages/shop/Home';
import ProductDetails from './pages/shop/ProductDetails';
import Cart from './pages/shop/Cart';
import Login from './pages/shop/Login';
import Register from './pages/shop/Register';
import { ShopProvider } from './context/ShopContext';

import CapitalioDashboardDemo from './demo';
import { DashboardPage } from './components/capitalio/dashboard-page';
import { AnalyticsPage } from './components/capitalio/analytics-page';
import { DashboardNavigationProvider } from './components/capitalio/navigation';

const AdminOverview = () => (
  <DashboardNavigationProvider>
    <div className="capitalio-dashboard min-h-full">
      <DashboardPage />
    </div>
  </DashboardNavigationProvider>
);

const AdminAnalytics = () => (
  <DashboardNavigationProvider>
    <div className="capitalio-dashboard min-h-full">
      <AnalyticsPage />
    </div>
  </DashboardNavigationProvider>
);

const AdminLayout = () => (
  <div className="flex h-screen overflow-hidden bg-background text-slate-100 font-sans selection:bg-primary/30 w-full">
    <Sidebar />
    <main className="flex-1 overflow-y-auto relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px] pointer-events-none"></div>
      
      <div className="relative z-10 min-h-full">
        <Outlet />
      </div>
    </main>
  </div>
);

const ShopLayout = () => (
  <div className="min-h-screen bg-background text-slate-100 font-sans flex flex-col">
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
  </div>
);

function App() {
  return (
    <ShopProvider>
      <Routes>
        {/* E-Commerce Public Routes */}
        <Route element={<ShopLayout />}>
          <Route path="/" element={<ShopHome />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Admin / Data Mining Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="regression" element={<RegressionEngine />} />
          <Route path="clustering" element={<ClusteringEngine />} />
          <Route path="classification" element={<ClusteringClassificationEngine />} />
          <Route path="association" element={<AssociationEngine />} />
        </Route>

        {/* Standalone Capitalio Experience */}
        <Route path="/demo" element={<CapitalioDashboardDemo />} />
        <Route path="/capitalio" element={<CapitalioDashboardDemo />} />
      </Routes>
    </ShopProvider>
  );
}

export default App;

import { Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import RegressionEngine from './pages/RegressionEngine';
import ClusteringEngine from './pages/ClusteringEngine';
import ClassificationEngine from './pages/ClassificationEngine';
import AssociationEngine from './pages/AssociationEngine';
import AdminProducts from './pages/AdminProducts';

import ShopHome from './pages/shop/Home';
import ProductDetails from './pages/shop/ProductDetails';
import Cart from './pages/shop/Cart';
import Login from './pages/shop/Login';
import Register from './pages/shop/Register';
import { ShopProvider } from './context/ShopContext';


const AdminOverview = () => (
  <div className="p-8 flex flex-col items-center justify-center h-full text-center animate-in fade-in zoom-in-95 duration-500">
    <h2 className="text-5xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">E-Shop Analytics Hub</h2>
    <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
      Welcome to your central data mining dashboard. Select an engine from the sidebar to analyze regression, segmentation, classification, and association rules based on your e-commerce dataset.
    </p>
  </div>
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
        {/* Placeholder routes for full e-commerce */}
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Admin / Data Mining Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminOverview />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="regression" element={<RegressionEngine />} />
        <Route path="clustering" element={<ClusteringEngine />} />
        <Route path="classification" element={<ClassificationEngine />} />
        <Route path="association" element={<AssociationEngine />} />
      </Route>
      </Routes>
    </ShopProvider>
  );
}

export default App;

import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ShopHome from "./pages/shop/Home";
import ProductDetails from "./pages/shop/ProductDetails";
import Cart from "./pages/shop/Cart";
import Login from "./pages/shop/Login";
import Register from "./pages/shop/Register";
import { ShopProvider, useShop } from "./context/ShopContext";
import CapitalioDashboardDemo from "./components/demo";

import ShopFooter from "./components/ShopFooter";

const ShopLayout = () => (
  <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <ShopFooter />
  </div>
);

// Protected route component: verifies user is authenticated before accessing shop
const ProtectedRoute = () => {
  const { user } = useShop();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

// Public only route: if user is already logged in, redirects directly to /shop
const PublicOnlyRoute = () => {
  const { user } = useShop();
  if (user) {
    return <Navigate to="/shop" replace />;
  }
  return <Outlet />;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Root & Auth Routes */}
      <Route element={<PublicOnlyRoute />}>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected E-Commerce Storefront Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<ShopLayout />}>
          <Route path="/shop" element={<ShopHome />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Route>

      {/* Admin / Data Mining Intelligence Hub */}
      <Route path="/admin" element={<CapitalioDashboardDemo />} />

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <ShopProvider>
      <AppRoutes />
    </ShopProvider>
  );
}

export default App;

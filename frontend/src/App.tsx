import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import ShopHome from "./pages/shop/Home";
import ProductDetails from "./pages/shop/ProductDetails";
import Cart from "./pages/shop/Cart";
import Login from "./pages/shop/Login";
import Register from "./pages/shop/Register";
import { ShopProvider } from "./context/ShopContext";
import CapitalioDashboardDemo from "./demo";

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
        <Route path="/admin" element={<CapitalioDashboardDemo />}></Route>
      </Routes>
    </ShopProvider>
  );
}

export default App;

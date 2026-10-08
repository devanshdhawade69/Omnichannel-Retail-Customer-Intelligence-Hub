import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, user } = useShop();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleCheckout = async () => {
    if (!user) {
      alert('Please login to checkout.');
      navigate('/login');
      return;
    }
    
    setLoading(true);
    try {
      const orderPayload = {
        user_id: user.id,
        items: cart.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price
        })),
        payment_method: 'Credit Card'
      };

      const res = await fetch('http://localhost:5000/api/ecommerce/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      
      if (res.ok) {
        alert('Checkout successful!');
        clearCart();
        navigate('/');
      } else {
        alert('Checkout failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Error during checkout');
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-20 bg-surface/30 backdrop-blur-md rounded-2xl border border-slate-700/50">
          <svg className="w-20 h-20 mx-auto text-slate-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
          <h2 className="text-2xl font-semibold text-white mb-2">Your cart is empty</h2>
          <p className="text-slate-400 mb-8">Looks like you haven't added anything yet.</p>
          <Link to="/" className="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors shadow-lg shadow-primary/20">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center bg-surface/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 gap-6 hover:bg-surface/80 transition-colors group">
                <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-slate-800 flex items-center justify-center">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <span className="text-xs text-slate-500">No Img</span>
                  )}
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-xs text-primary font-semibold mb-1 uppercase tracking-wider">{item.category}</p>
                  <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                  <p className="text-slate-400 font-medium">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-slate-600 rounded-lg bg-slate-900/50 p-1">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors">-</button>
                    <span className="w-8 text-center font-semibold text-white">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors">+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-b from-surface/80 to-surface/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 sticky top-8 shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Estimated Tax</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Shipping</span>
                  <span className="font-semibold text-emerald-400">Free</span>
                </div>
                <div className="h-px bg-slate-700 w-full my-4"></div>
                <div className="flex justify-between text-white text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
              <button 
                onClick={handleCheckout}
                disabled={loading}
                className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all transform active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Checkout Now'}
              </button>
              <div className="mt-4 text-center">
                <Link to="/" className="text-sm text-slate-400 hover:text-white transition-colors">or Continue Shopping</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const { addToCart } = useShop();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/ecommerce/products/${id}`)
      .then(res => res.json())
      .then(data => {
         if (data && !data.error) setProduct(data);
         else {
             // Mock fallback
             setProduct({
              id: parseInt(id!),
              name: 'Premium Wireless Headphones',
              description: 'Experience crystal-clear audio with our latest noise-cancelling technology.',
              price: 299.99,
              image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
              category_id: 1,
              stock_quantity: 12
            });
         }
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      product_id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image_url: product.image_url,
      category: product.category_id || 'Product'
    });
    navigate('/cart');
  };

  if (!product) return <div className="p-8 text-center animate-pulse">Loading...</div>;

  return (
    <div className="container mx-auto p-8 max-w-6xl">
      <Link to="/" className="inline-flex items-center text-slate-400 hover:text-primary mb-8 transition-colors">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Back to Shop
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="relative group rounded-2xl overflow-hidden bg-surface border border-slate-700/50 aspect-square">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
          <img 
            src={product.image_url} 
            alt={product.name} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
        </div>
        
        {/* Details Section */}
        <div className="flex flex-col justify-center">
          <div className="mb-2">
            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full border border-primary/20">{product.category}</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4 leading-tight">{product.name}</h1>
          <p className="text-3xl font-light text-slate-300 mb-6">${product.price}</p>
          <p className="text-slate-400 mb-8 leading-relaxed text-lg">{product.description}</p>
          
          <div className="flex items-center space-x-4 mb-8">
            <span className={`flex items-center text-sm font-medium ${product.stock > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              <span className={`w-2 h-2 rounded-full mr-2 ${product.stock > 0 ? 'bg-emerald-400' : 'bg-red-400'}`}></span>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>
          
          <div className="flex space-x-4">
            <button onClick={handleAddToCart} className="flex-1 py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all transform active:scale-95 flex justify-center items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              Add to Cart
            </button>
            <button className="p-4 bg-surface hover:bg-surface/80 border border-slate-700 text-slate-300 hover:text-white rounded-xl transition-all transform active:scale-95">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

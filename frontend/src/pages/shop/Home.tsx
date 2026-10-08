import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ShopHome = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // In a real app this would fetch from /api/ecommerce/products
    // For now we mock it or fetch if backend is running
    fetch('http://localhost:5000/api/ecommerce/products')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          // Use mock data if database is empty so the page isn't blank
          setProducts([
            { id: 1, name: 'Premium Wireless Headphones', price: 299.99, image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80' },
            { id: 2, name: 'Minimalist Desk Lamp', price: 89.50, image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80' },
            { id: 3, name: 'Mechanical Keyboard', price: 149.99, image_url: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80' },
            { id: 4, name: 'Ergonomic Chair', price: 399.00, image_url: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80' },
          ]);
        }
      })
      .catch(err => {
        console.error('Error fetching products:', err);
      });
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product: any) => (
          <Link key={product.id} to={`/product/${product.id}`} className="block border border-slate-800 rounded-lg overflow-hidden bg-slate-900 hover:border-primary transition-all">
            <div className="aspect-square bg-slate-800 relative">
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} className="object-cover w-full h-full opacity-80 mix-blend-screen" />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-slate-500">No Image</div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg truncate mb-2">{product.name}</h3>
              <p className="text-primary font-bold">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShopHome;

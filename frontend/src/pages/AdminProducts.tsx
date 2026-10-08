import { useState, useEffect } from 'react';
import { Edit, Trash, Plus, Package, X } from 'lucide-react';

const AdminProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image_url: '',
    stock_quantity: '100',
    category_id: ''
  });

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/ecommerce/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error('Failed to fetch products', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenModal = (product: any = null) => {
    if (product) {
      setCurrentProduct(product);
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description || '',
        image_url: product.image_url || '',
        stock_quantity: product.stock_quantity || '100',
        category_id: product.category_id || ''
      });
    } else {
      setCurrentProduct(null);
      setFormData({
        name: '',
        price: '',
        description: '',
        image_url: '',
        stock_quantity: '100',
        category_id: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = currentProduct 
      ? `http://localhost:5000/api/ecommerce/products/${currentProduct.id}`
      : 'http://localhost:5000/api/ecommerce/products';
      
    const method = currentProduct ? 'PUT' : 'POST';
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsModalOpen(false);
        fetchProducts();
      }
    } catch (err) {
      console.error('Failed to save product', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/ecommerce/products/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) fetchProducts();
    } catch (err) {
      console.error('Failed to delete product', err);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto animate-in fade-in zoom-in-95 duration-500 relative">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center">
            <Package className="mr-3 text-primary" size={32} />
            Product Management
          </h2>
          <p className="text-slate-400 mt-2">Add, update, and remove products from the catalog.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all transform active:scale-95"
        >
          <Plus size={18} className="mr-2" /> New Product
        </button>
      </div>

      <div className="bg-surface/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl relative z-10">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-800/80 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-6 py-4 font-semibold">Image</th>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Stock</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No products found. Add some to the catalog.
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-3">
                      {p.image_url ? (
                         <img src={p.image_url} alt={p.name} className="w-12 h-12 rounded object-cover border border-slate-600 bg-slate-800" />
                      ) : (
                         <div className="w-12 h-12 rounded bg-slate-800 flex items-center justify-center border border-slate-700 text-xs">No img</div>
                      )}
                    </td>
                    <td className="px-6 py-3 font-medium text-white">{p.name}</td>
                    <td className="px-6 py-3 text-emerald-400 font-semibold">${p.price}</td>
                    <td className="px-6 py-3">{p.stock_quantity}</td>
                    <td className="px-6 py-3 text-right space-x-2">
                      <button onClick={() => handleOpenModal(p)} className="p-2 text-primary hover:bg-primary/10 rounded-md transition-colors inline-flex items-center" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-md transition-colors inline-flex items-center" title="Delete">
                        <Trash size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl p-6 relative overflow-hidden">
            {/* Modal Glassmorphism Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex justify-between items-center mb-6 relative z-10">
              <h3 className="text-xl font-bold text-white">{currentProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="space-y-4 relative z-10">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Name *</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Price *</label>
                  <input required type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Stock Quantity</label>
                  <input type="number" value={formData.stock_quantity} onChange={e => setFormData({...formData, stock_quantity: e.target.value})} className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Image URL</label>
                <input type="url" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-white" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
                <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-white"></textarea>
              </div>
              
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors shadow-lg shadow-primary/20">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;

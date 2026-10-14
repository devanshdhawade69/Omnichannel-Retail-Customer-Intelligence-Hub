import { useState, useEffect, useMemo } from 'react'
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  Search,
  X,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Boxes,
} from 'lucide-react'
import { DashboardCard, DetailHeader, DetailTag } from '../components/capitalio/shared'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type Product = {
  id: number
  name: string
  price: number
  stock_quantity: number
  category: string
  image_url: string
  description?: string
}

// Seed retail inventory items aligned with data warehouse catalog
const seedProducts: Product[] = [
  {
    id: 1,
    name: 'Regency Cakestand 3 Tier',
    price: 24.95,
    stock_quantity: 85,
    category: 'Home & Kitchen',
    image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=150&q=80',
    description: 'Classic 3-tier porcelain cakestand for afternoon tea dining collections.',
  },
  {
    id: 2,
    name: 'Green Regency Teacup and Saucer',
    price: 12.5,
    stock_quantity: 42,
    category: 'Home & Kitchen',
    image_url: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=150&q=80',
    description: 'Fine bone china teacup in classic pastel green glaze.',
  },
  {
    id: 3,
    name: 'White Hanging Heart T-Light Holder',
    price: 8.9,
    stock_quantity: 14,
    category: 'Decor & Lighting',
    image_url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=150&q=80',
    description: 'Distressed white metal filigree heart tealight ornament.',
  },
  {
    id: 4,
    name: 'Jumbo Bag Red Retrospot',
    price: 6.25,
    stock_quantity: 120,
    category: 'Bags & Storage',
    image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=150&q=80',
    description: 'Heavy-duty reusable woven shopping bag in vintage red polka dot.',
  },
  {
    id: 5,
    name: 'Alarm Clock Bakelike Red',
    price: 18.0,
    stock_quantity: 19,
    category: 'Clocks & Tech',
    image_url: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=150&q=80',
    description: 'Retro 1950s twin bell mechanical alarm clock in gloss cherry red.',
  },
  {
    id: 6,
    name: 'Set of 3 Cake Tins Pantry Design',
    price: 32.0,
    stock_quantity: 54,
    category: 'Home & Kitchen',
    image_url: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=150&q=80',
    description: 'Stackable airtight tinplate biscuit and bakery storage containers.',
  },
  {
    id: 7,
    name: 'Paper Chain Kit 50s Christmas',
    price: 9.5,
    stock_quantity: 8,
    category: 'Seasonal Gifts',
    image_url: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=150&q=80',
    description: 'DIY festive decorative paper chain link kit for holiday styling.',
  },
  {
    id: 8,
    name: 'Lunch Bag Red Retrospot',
    price: 5.95,
    stock_quantity: 92,
    category: 'Bags & Storage',
    image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=150&q=80',
    description: 'Insulated thermal zipper lunch carrier with waterproof foil lining.',
  },
  {
    id: 9,
    name: 'Pink Regency Teacup and Saucer',
    price: 12.5,
    stock_quantity: 38,
    category: 'Home & Kitchen',
    image_url: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=150&q=80',
    description: 'Matching companion cup to the Green Regency series in soft rose.',
  },
  {
    id: 10,
    name: 'Red Hanging Heart T-Light Holder',
    price: 8.9,
    stock_quantity: 64,
    category: 'Decor & Lighting',
    image_url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=150&q=80',
    description: 'Warm metallic red edition of the popular filigree pendant lamp.',
  },
  {
    id: 11,
    name: 'Alarm Clock Bakelike Green',
    price: 18.0,
    stock_quantity: 28,
    category: 'Clocks & Tech',
    image_url: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=150&q=80',
    description: 'Vintage mint green bedside alarm clock with luminous dial markers.',
  },
  {
    id: 12,
    name: 'Vintage Jam Making Set',
    price: 15.8,
    stock_quantity: 45,
    category: 'Home & Kitchen',
    image_url: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=150&q=80',
    description: 'Complete canning kit including labels, gingham covers, and rubber seals.',
  },
]

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>(seedProducts)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [isLiveConnected, setIsLiveConnected] = useState(false)

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [stockFilter, setStockFilter] = useState<'all' | 'healthy' | 'low' | 'out'>('all')
  const [sortBy, setSortBy] = useState<'name' | 'price-asc' | 'price-desc' | 'stock'>('name')

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock_quantity: '50',
    category: 'Home & Kitchen',
    image_url: '',
    description: '',
  })

  // Synchronize with Flask API if running
  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/ecommerce/products')
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data) && data.length > 0) {
          // Normalize API response shape
          const normalized: Product[] = data.map((item: any, i: number) => ({
            id: item.id || i + 1,
            name: item.name,
            price: Number(item.price) || 19.99,
            stock_quantity: Number(item.stock_quantity) || 50,
            category: item.category || 'General Catalog',
            image_url: item.image_url || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=150&q=80',
            description: item.description || '',
          }))
          setProducts(normalized)
          setIsLiveConnected(true)
        }
      }
    } catch {
      setIsLiveConnected(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // KPI calculations
  const totalValuation = useMemo(() => {
    return products.reduce((acc, p) => acc + p.price * p.stock_quantity, 0)
  }, [products])

  const totalUnits = useMemo(() => {
    return products.reduce((acc, p) => acc + p.stock_quantity, 0)
  }, [products])

  const lowStockCount = useMemo(() => {
    return products.filter((p) => p.stock_quantity < 20).length
  }, [products])

  const avgPrice = useMemo(() => {
    if (products.length === 0) return 0
    return products.reduce((acc, p) => acc + p.price, 0) / products.length
  }, [products])

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesQuery =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))

        const matchesCategory =
          selectedCategory === 'All' || p.category === selectedCategory

        let matchesStock = true
        if (stockFilter === 'healthy') matchesStock = p.stock_quantity >= 20
        if (stockFilter === 'low') matchesStock = p.stock_quantity > 0 && p.stock_quantity < 20
        if (stockFilter === 'out') matchesStock = p.stock_quantity === 0

        return matchesQuery && matchesCategory && matchesStock
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price
        if (sortBy === 'price-desc') return b.price - a.price
        if (sortBy === 'stock') return b.stock_quantity - a.stock_quantity
        return a.name.localeCompare(b.name)
      })
  }, [products, searchQuery, selectedCategory, stockFilter, sortBy])

  // Modal Handlers
  const handleOpenModal = (product: Product | null = null) => {
    if (product) {
      setCurrentProduct(product)
      setFormData({
        name: product.name,
        price: product.price.toString(),
        stock_quantity: product.stock_quantity.toString(),
        category: product.category,
        image_url: product.image_url,
        description: product.description || '',
      })
    } else {
      setCurrentProduct(null)
      setFormData({
        name: '',
        price: '',
        stock_quantity: '50',
        category: 'Home & Kitchen',
        image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=150&q=80',
        description: '',
      })
    }
    setIsModalOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()

    const newProductData: Product = {
      id: currentProduct ? currentProduct.id : Date.now(),
      name: formData.name,
      price: parseFloat(formData.price) || 0,
      stock_quantity: parseInt(formData.stock_quantity, 10) || 0,
      category: formData.category,
      image_url: formData.image_url || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=150&q=80',
      description: formData.description,
    }

    // Try backend REST update
    if (isLiveConnected) {
      try {
        const url = currentProduct
          ? `http://localhost:5000/api/ecommerce/products/${currentProduct.id}`
          : 'http://localhost:5000/api/ecommerce/products'
        const method = currentProduct ? 'PUT' : 'POST'

        await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProductData),
        })
      } catch (err) {
        console.error('API sync failed, applying locally', err)
      }
    }

    // Update local state smoothly
    if (currentProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === currentProduct.id ? newProductData : p))
      )
    } else {
      setProducts((prev) => [newProductData, ...prev])
    }

    setIsModalOpen(false)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to remove this product from the inventory catalog?')) return

    if (isLiveConnected) {
      try {
        await fetch(`http://localhost:5000/api/ecommerce/products/${id}`, {
          method: 'DELETE',
        })
      } catch (err) {
        console.error('API delete failed', err)
      }
    }

    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <section className="flex min-h-full flex-col gap-6 p-4 pb-12 md:p-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl flex items-center gap-2">
              <Package className="size-7 text-primary" />
              <span>Product Inventory Management</span>
            </h1>
            <DetailTag color="var(--chart-4)">E-Commerce Catalog</DetailTag>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage active storefront products, pricing models, SKU units, and warehouse stock replenishment.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={cn(
              'flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border',
              isLiveConnected
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                : 'border-primary/30 bg-primary/10 text-primary'
            )}
          >
            <span
              className={cn(
                'size-2 rounded-full',
                isLiveConnected ? 'bg-emerald-500 animate-pulse' : 'bg-primary'
              )}
            />
            <span>{isLiveConnected ? 'Live Storefront Sync' : 'Enterprise Seed Inventory'}</span>
          </div>

          <Button
            type="button"
            onClick={() => handleOpenModal()}
            className="gap-1.5 font-semibold text-xs shadow-md"
          >
            <Plus className="size-4" />
            <span>Add New Product</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard className="p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Active Catalog SKUs
            </span>
            <Boxes className="size-4 text-primary" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-foreground">{products.length}</span>
            <span className="text-xs text-muted-foreground font-semibold">SKUs</span>
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">
            Active products listed across omnichannel retail storefronts.
          </p>
        </DashboardCard>

        <DashboardCard className="p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Total Inventory Valuation
            </span>
            <DollarSign className="size-4 text-emerald-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-foreground">
              ${totalValuation.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-xs text-emerald-400 font-semibold">{totalUnits.toLocaleString()} units</span>
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">
            Cumulative market valuation based on current warehouse stock holding.
          </p>
        </DashboardCard>

        <DashboardCard className="p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Low Stock Warnings
            </span>
            <AlertTriangle className={cn('size-4', lowStockCount > 0 ? 'text-amber-400' : 'text-muted-foreground')} />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className={cn('text-3xl font-extrabold', lowStockCount > 0 ? 'text-amber-400' : 'text-foreground')}>
              {lowStockCount}
            </span>
            <span className="text-xs text-amber-400 font-semibold">&lt; 20 units threshold</span>
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">
            SKUs requiring automated purchase orders to prevent out-of-stock events.
          </p>
        </DashboardCard>

        <DashboardCard className="p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Average Unit Price
            </span>
            <TrendingUp className="size-4 text-primary" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-foreground">
              ${avgPrice.toFixed(2)}
            </span>
            <span className="text-xs text-muted-foreground font-semibold">Mean MSRP</span>
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">
            Average transaction price per catalog SKU item.
          </p>
        </DashboardCard>
      </div>

      {/* Main Catalog Table with Search & Category Filters */}
      <DashboardCard className="p-5 flex flex-col gap-4">
        {/* Table Controls Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
          <DetailHeader
            title={`Catalog Inventory (${filteredProducts.length} items)`}
            subtitle="Search, filter by category and stock, or perform CRUD operations"
          />

          <div className="flex flex-wrap items-center gap-2">
            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-border/80 bg-background/90 pl-8 pr-3 py-1.5 text-xs text-foreground outline-none focus:border-primary shadow-xs"
              />
            </div>

            {/* Stock Level Filter */}
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value as any)}
              className="rounded-md border border-border/80 bg-background/90 px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-primary shadow-xs"
            >
              <option value="all">All Stock Statuses</option>
              <option value="healthy">In Stock (&gt; 20)</option>
              <option value="low">Low Stock (&lt; 20)</option>
              <option value="out">Out of Stock (0)</option>
            </select>

            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-md border border-border/80 bg-background/90 px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-primary shadow-xs"
            >
              <option value="name">Sort: Name (A-Z)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="stock">Stock: Highest First</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs pb-1">
          <span className="text-[11px] text-muted-foreground mr-1">Category:</span>
          {[
            'All',
            'Home & Kitchen',
            'Decor & Lighting',
            'Bags & Storage',
            'Clocks & Tech',
            'Seasonal Gifts',
          ].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'rounded-full px-2.5 py-1 text-xs transition-colors',
                selectedCategory === cat
                  ? 'bg-primary text-primary-foreground font-semibold'
                  : 'bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Table Component */}
        <div className="overflow-x-auto rounded-lg border border-border/60">
          <table className="w-full text-left text-xs">
            <thead className="bg-secondary/40 text-muted-foreground uppercase text-[10px]">
              <tr>
                <th className="px-4 py-3 font-semibold">SKU / Item</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold text-right">Price</th>
                <th className="px-4 py-3 font-semibold text-center">Stock Level</th>
                <th className="px-4 py-3 font-semibold text-right">Inventory Value</th>
                <th className="px-4 py-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 text-foreground">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    No products found matching your current filter criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const isLow = p.stock_quantity < 20
                  const isOut = p.stock_quantity === 0
                  const itemTotalValuation = p.price * p.stock_quantity

                  return (
                    <tr key={p.id} className="hover:bg-secondary/20 transition-colors">
                      {/* Product Thumbnail & Title */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image_url}
                            alt={p.name}
                            onError={(e) => {
                              ;(e.target as any).src =
                                'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=150&q=80'
                            }}
                            className="size-11 rounded-lg border border-border/70 object-cover bg-secondary/50 shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="font-semibold text-foreground text-sm leading-tight truncate">
                              {p.name}
                            </div>
                            <div className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
                              {p.description || `SKU #${1000 + p.id}`}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category Badge */}
                      <td className="px-4 py-3">
                        <span className="rounded-md border border-border/60 bg-secondary/40 px-2 py-0.5 text-[11px] font-medium text-foreground">
                          {p.category}
                        </span>
                      </td>

                      {/* Unit Price */}
                      <td className="px-4 py-3 text-right font-mono font-bold text-sm text-foreground">
                        ${p.price.toFixed(2)}
                      </td>

                      {/* Stock Level with Progress Bar */}
                      <td className="px-4 py-3 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <div className="flex items-center gap-1.5 text-xs font-bold">
                            <span
                              className={cn(
                                isOut
                                  ? 'text-red-400'
                                  : isLow
                                  ? 'text-amber-400'
                                  : 'text-emerald-400'
                              )}
                            >
                              {p.stock_quantity} units
                            </span>
                            {isLow && !isOut && (
                              <span className="text-[10px] rounded-sm bg-amber-500/20 px-1 font-semibold text-amber-400">
                                Low
                              </span>
                            )}
                            {isOut && (
                              <span className="text-[10px] rounded-sm bg-red-500/20 px-1 font-semibold text-red-400">
                                Out
                              </span>
                            )}
                          </div>
                          {/* Progress bar */}
                          <div className="h-1.5 w-20 rounded-full bg-secondary overflow-hidden">
                            <div
                              className={cn(
                                'h-full transition-all',
                                isOut
                                  ? 'bg-red-400'
                                  : isLow
                                  ? 'bg-amber-400'
                                  : 'bg-emerald-400'
                              )}
                              style={{ width: `${Math.min(100, (p.stock_quantity / 100) * 100)}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Total Value */}
                      <td className="px-4 py-3 text-right font-mono text-xs font-semibold text-emerald-400">
                        ${itemTotalValuation.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenModal(p)}
                            className="size-7 p-0 text-muted-foreground hover:text-primary hover:bg-primary/10"
                            title="Edit Product"
                          >
                            <Edit2 className="size-3.5" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(p.id)}
                            className="size-7 p-0 text-muted-foreground hover:text-red-400 hover:bg-red-400/10"
                            title="Delete Product"
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </DashboardCard>

      {/* Modern Glassmorphic Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-2xl border border-border/80 bg-card p-6 shadow-2xl overflow-hidden">
            {/* Modal Ambient Glow */}
            <div className="absolute top-0 right-0 size-48 bg-primary/15 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/60 pb-4 relative z-10">
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  {currentProduct ? 'Edit Catalog Product' : 'Add New Retail Product'}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Update inventory parameters, pricing, and category classification.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="space-y-4 pt-4 relative z-10 text-xs">
              <div>
                <label className="block font-semibold text-foreground mb-1">Product Title *</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Regency Cakestand 3 Tier"
                  className="w-full rounded-md border border-border/80 bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-foreground mb-1">Unit Price ($) *</label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="24.95"
                    className="w-full rounded-md border border-border/80 bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-foreground mb-1">Stock Quantity (Units) *</label>
                  <input
                    required
                    type="number"
                    value={formData.stock_quantity}
                    onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                    placeholder="50"
                    className="w-full rounded-md border border-border/80 bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-foreground mb-1">Category Classification</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full rounded-md border border-border/80 bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-primary"
                >
                  <option value="Home & Kitchen">Home & Kitchen</option>
                  <option value="Decor & Lighting">Decor & Lighting</option>
                  <option value="Bags & Storage">Bags & Storage</option>
                  <option value="Clocks & Tech">Clocks & Tech</option>
                  <option value="Seasonal Gifts">Seasonal Gifts</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-foreground mb-1">Product Image URL</label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full rounded-md border border-border/80 bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-semibold text-foreground mb-1">Product Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide merchandising details for catalog listings..."
                  className="w-full rounded-md border border-border/80 bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-primary"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-border/60 flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm">
                  {currentProduct ? 'Save Changes' : 'Create Product'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}


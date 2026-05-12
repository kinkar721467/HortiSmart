import React, { useState } from 'react';
import { Search, Filter, ShoppingCart, Star, Plus, X, Package } from 'lucide-react';
import { marketplaceProducts } from '../data/mockData';

const MarketplacePage = () => {
  // Get role from authentication
  const role = (localStorage.getItem('userRole') || 'Buyer').toLowerCase();

  
  // Products state initialized with mock data
  const [products, setProducts] = useState(marketplaceProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form state
  const [newProduct, setNewProduct] = useState({
    name: '',
    desc: '',
    category: 'Vegetables',
    price: '',
    available: '',
    storage: '',
    icon: '📦'
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    const productToAdd = {
      ...newProduct,
      price: `₹${newProduct.price}`,
      unit: '/kg',
      available: `${newProduct.available} kg available`,
      seller: 'You (Local Farmer)', // Mocking current farmer details
      rating: 5.0,
      desc: `${newProduct.desc} | Storage: ${newProduct.storage}`
    };
    
    setProducts([productToAdd, ...products]);
    setIsModalOpen(false);
    setNewProduct({
      name: '', desc: '', category: 'Vegetables', price: '', available: '', storage: '', icon: '📦'
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.seller.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative">
      {/* Header and Role Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Marketplace</h1>
          <p className="text-gray-500 mt-1">Browse and buy fresh produce directly from farmers</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Search products, farmers, or location..."
          />
        </div>
        
        {/* If Farmer, show Add Product button */}
        {role === 'farmer' && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 shrink-0 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar mb-6">
        {['All', 'Vegetables', 'Leafy Greens', 'Fruits', 'Grains'].map(cat => (
          <button 
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 text-sm font-medium rounded-full shrink-0 transition-colors ${
              selectedCategory === cat 
                ? 'bg-green-600 text-white' 
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
            <div className="h-48 bg-[#f4f7f4] flex items-center justify-center relative">
              <span className="text-6xl group-hover:scale-110 transition-transform">{product.icon}</span>
            </div>
            
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-gray-800">{product.name}</h3>
                <span className="bg-green-50 text-green-700 text-[10px] px-2 py-0.5 rounded border border-green-100 font-medium shrink-0">Certified</span>
              </div>
              <p className="text-xs text-gray-500 mb-3 line-clamp-2" title={product.desc}>{product.desc}</p>
              
              <div className="flex items-center text-xs text-gray-600 mb-2">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1" />
                <span className="font-medium mr-1">{product.rating}</span>
                <span className="mx-1">•</span>
                <span className="truncate">{product.seller}</span>
              </div>
              
              <div className="mt-auto">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <span className="text-xl font-bold text-gray-800">{product.price}</span>
                    <span className="text-xs text-gray-500">{product.unit}</span>
                  </div>
                  <span className="text-xs text-green-600 font-medium">{product.available}</span>
                </div>
                
                {/* Conditional Action Button based on Role */}
                {role === 'buyer' ? (
                  <button className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                    <ShoppingCart className="w-4 h-4" />
                    <span>Buy Now</span>
                  </button>
                ) : (
                  <button className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-200 transition-colors cursor-default">
                    <Package className="w-4 h-4" />
                    <span>Listed by Farmer</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Product Modal for Farmer */}
      {isModalOpen && role === 'farmer' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">Add New Product</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddProduct} className="p-5 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700">Product Name</label>
                <input required type="text" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none" placeholder="e.g. Organic Carrots" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700">Category</label>
                  <select required value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none bg-white">
                    <option value="Vegetables">Vegetables</option>
                    <option value="Leafy Greens">Leafy Greens</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Grains">Grains</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700">Emoji / Icon</label>
                  <input required type="text" value={newProduct.icon} onChange={e => setNewProduct({...newProduct, icon: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none" placeholder="e.g. 🥕" />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700">Description</label>
                <textarea required value={newProduct.desc} onChange={e => setNewProduct({...newProduct, desc: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none" placeholder="Provide product details..."></textarea>
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700">Storage Information</label>
                <input required type="text" value={newProduct.storage} onChange={e => setNewProduct({...newProduct, storage: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none" placeholder="e.g. Stored at 4°C in Green Valley Cold Storage" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700">Price (₹ per kg)</label>
                  <input required type="number" min="1" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none" placeholder="e.g. 45" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700">Available Quantity (kg)</label>
                  <input required type="number" min="1" value={newProduct.available} onChange={e => setNewProduct({...newProduct, available: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none" placeholder="e.g. 200" />
                </div>
              </div>
              
              <div className="pt-4 flex space-x-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-white border border-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                  List Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketplacePage;

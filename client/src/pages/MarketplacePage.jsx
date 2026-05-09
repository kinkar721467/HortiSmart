import React from 'react';
import { Search, Filter, ShoppingCart, Star } from 'lucide-react';
import { marketplaceProducts } from '../data/mockData';

const MarketplacePage = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Marketplace</h1>
        <p className="text-gray-500 mt-1">Browse and buy fresh produce directly from farmers</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </span>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Search products, farmers, or location..."
          />
        </div>
        <div className="flex space-x-3">
          <select className="border border-gray-200 rounded-lg text-sm px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 min-w-[120px]">
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
          </select>
          <button className="flex items-center justify-center space-x-2 bg-white border border-green-500 text-green-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-50 shrink-0">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar mb-6">
        <button className="px-4 py-1.5 bg-green-600 text-white text-sm font-medium rounded-full shrink-0">All</button>
        <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium rounded-full shrink-0">Vegetables</button>
        <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium rounded-full shrink-0">Leafy Greens</button>
        <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium rounded-full shrink-0">Fruits</button>
        <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium rounded-full shrink-0">Grains</button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {marketplaceProducts.map((product, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
            {/* Image placeholder with big icon */}
            <div className="h-48 bg-[#f4f7f4] flex items-center justify-center relative">
              <span className="text-6xl group-hover:scale-110 transition-transform">{product.icon}</span>
            </div>
            
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-gray-800">{product.name}</h3>
                <span className="bg-green-50 text-green-700 text-[10px] px-2 py-0.5 rounded border border-green-100 font-medium shrink-0">Certified</span>
              </div>
              <p className="text-xs text-gray-500 mb-3 line-clamp-2">{product.desc}</p>
              
              <div className="flex items-center text-xs text-gray-600 mb-2">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1" />
                <span className="font-medium mr-1">{product.rating}</span>
                <span className="mx-1">•</span>
                <span>{product.seller}</span>
              </div>
              
              <div className="mt-auto">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <span className="text-xl font-bold text-gray-800">{product.price}</span>
                    <span className="text-xs text-gray-500">{product.unit}</span>
                  </div>
                  <span className="text-xs text-green-600 font-medium">{product.available}</span>
                </div>
                
                <button className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketplacePage;

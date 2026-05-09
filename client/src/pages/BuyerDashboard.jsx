import React from 'react';
import { buyerStats, marketplaceProducts, buyerInquiriesData } from '../data/mockData';
import { Search } from 'lucide-react';

const BuyerDashboard = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Buyer Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back, Demo Buyer! Here's your procurement overview.</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
            Saved Searches
          </button>
          <button className="bg-[#2e7d32] hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
            New Order
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {buyerStats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`${stat.iconBgColor} p-3 rounded-lg`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              {stat.trend && (
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trend.includes('↑') ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'}`}>
                  {stat.trend}
                </span>
              )}
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
              <p className="text-xs text-gray-400 mt-1">{stat.trendLabel}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Crops */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900">Recommended for You</h2>
              <button className="text-[#2e7d32] text-sm font-medium hover:underline">View all</button>
            </div>
            
            <div className="space-y-4">
              {marketplaceProducts.slice(0, 3).map((product, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                      {product.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{product.name}</h4>
                      <p className="text-xs text-gray-500">{product.seller}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[#2e7d32]">{product.price}<span className="text-xs text-gray-500 font-normal">{product.unit}</span></div>
                    <div className="text-xs text-gray-500">{product.available}</div>
                  </div>
                  <button className="px-3 py-1.5 bg-green-50 text-[#2e7d32] font-medium text-xs rounded hover:bg-green-100 transition-colors">
                    Contact
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
            </div>
            
            <div className="space-y-6">
              {buyerInquiriesData.map((inquiry, idx) => (
                <div key={idx} className="flex space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${inquiry.color}`}>
                    {inquiry.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{inquiry.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{inquiry.details}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{inquiry.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              View All Activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;

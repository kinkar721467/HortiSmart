import React from 'react';
import { buyerStats, marketplaceProducts, buyerInquiriesData } from '../data/mockData';
import { Search } from 'lucide-react';

const BuyerDashboard = () => {
  const userName = localStorage.getItem('userName') || sessionStorage.getItem('userName') || 'Buyer';

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Buyer Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back, {userName}! Here's your procurement overview.</p>
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

    </div>
  );
};

export default BuyerDashboard;

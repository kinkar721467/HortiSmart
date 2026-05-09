import React from 'react';
import { Search, Filter, CheckCircle2 } from 'lucide-react';
import { allMarketPrices } from '../data/mockData';

const CropPricesPage = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Crop Prices</h1>
        <p className="text-gray-500 mt-1">Real-time market prices across India</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </span>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Search crops or markets..."
          />
        </div>
        <div className="flex space-x-3">
          <select className="border border-gray-200 rounded-lg text-sm px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-500">
            <option>All States</option>
            <option>Delhi</option>
            <option>Maharashtra</option>
            <option>Karnataka</option>
          </select>
          <button className="flex items-center space-x-2 bg-white border border-green-500 text-green-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-50">
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Top Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {['Tomato', 'Potato', 'Onion', 'Cabbage'].map((crop, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-green-100 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-800">{crop}</h3>
                <p className="text-xs text-gray-500">Delhi</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
            <div className="flex justify-between items-end mt-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Average Price</p>
                <h2 className="text-2xl font-bold text-gray-800">₹{idx === 0 ? '38' : idx === 1 ? '22' : idx === 2 ? '28' : '18'}</h2>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 mb-1">Range</p>
                <p className="text-sm font-medium text-gray-700">₹{idx === 0 ? '32-42' : idx === 1 ? '15-25' : idx === 2 ? '21-31' : '14-22'}</p>
              </div>
            </div>
            <div className={`mt-3 text-xs font-medium ${idx === 1 ? 'text-red-500' : 'text-green-500'}`}>
              {idx === 1 ? '↓ 5% from last week' : '↑ 12% from last week'}
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800 mb-6">Price Trends - Last 6 Weeks</h3>
        <div className="relative h-64 w-full">
          <div className="absolute left-0 top-0 bottom-6 w-8 flex flex-col justify-between text-xs text-gray-400">
            <span>40</span>
            <span>30</span>
            <span>20</span>
            <span>10</span>
            <span>0</span>
          </div>
          <div className="absolute left-8 right-0 top-2 bottom-6 border-b border-l border-gray-100">
            <div className="absolute w-full top-[25%] border-t border-gray-50 border-dashed"></div>
            <div className="absolute w-full top-[50%] border-t border-gray-50 border-dashed"></div>
            <div className="absolute w-full top-[75%] border-t border-gray-50 border-dashed"></div>
            
            <svg className="w-full h-full" viewBox="0 0 1000 100" preserveAspectRatio="none">
              <path d="M 0,30 L 200,25 L 400,35 L 600,20 L 800,15 L 1000,10" fill="none" stroke="#16a34a" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              <path d="M 0,60 L 200,55 L 400,60 L 600,50 L 800,45 L 1000,55" fill="none" stroke="#f97316" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              <path d="M 0,80 L 200,75 L 400,70 L 600,65 L 800,60 L 1000,55" fill="none" stroke="#84cc16" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          <div className="absolute left-8 right-0 bottom-0 flex justify-between text-xs text-gray-400 pt-2">
            <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span><span>Week 5</span><span>Week 6</span>
          </div>
        </div>
        <div className="flex justify-center mt-4 space-x-6 text-xs text-gray-500">
          <span className="flex items-center"><span className="w-3 h-3 bg-green-600 rounded-full mr-2"></span>Tomato</span>
          <span className="flex items-center"><span className="w-3 h-3 bg-orange-500 rounded-full mr-2"></span>Potato</span>
          <span className="flex items-center"><span className="w-3 h-3 bg-lime-500 rounded-full mr-2"></span>Onion</span>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800">All Market Prices</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 bg-gray-50 uppercase">
              <tr>
                <th className="px-6 py-3 font-medium">Crop Name</th>
                <th className="px-6 py-3 font-medium">Market</th>
                <th className="px-6 py-3 font-medium">State</th>
                <th className="px-6 py-3 font-medium text-right">Min Price (₹/kg)</th>
                <th className="px-6 py-3 font-medium text-right">Max Price (₹/kg)</th>
                <th className="px-6 py-3 font-medium text-right">Avg Price (₹/kg)</th>
                <th className="px-6 py-3 font-medium text-right">Trend</th>
              </tr>
            </thead>
            <tbody>
              {allMarketPrices.map((item, index) => (
                <tr key={index} className="bg-white border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-medium text-gray-900">{item.crop}</td>
                  <td className="px-6 py-4 text-gray-600">{item.market}</td>
                  <td className="px-6 py-4 text-gray-600">{item.state}</td>
                  <td className="px-6 py-4 text-right text-gray-600">{item.minPrice}</td>
                  <td className="px-6 py-4 text-right text-gray-600">{item.maxPrice}</td>
                  <td className="px-6 py-4 text-right font-medium text-gray-800">{item.avgPrice}</td>
                  <td className={`px-6 py-4 text-right font-medium ${item.isUp ? 'text-green-500' : 'text-red-500'}`}>
                    {item.isUp ? '↑' : '↓'} {item.trend}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CropPricesPage;

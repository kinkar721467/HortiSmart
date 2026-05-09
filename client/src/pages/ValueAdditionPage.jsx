import React from 'react';
import { Lightbulb, TrendingUp, BookOpen, ChevronRight } from 'lucide-react';
import { valueAdditionCrops } from '../data/mockData';

const ValueAdditionPage = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Value Addition Ideas</h1>
        <p className="text-gray-500 mt-1">Increase your income by creating value-added products from your crops</p>
      </div>

      {/* Top 3 Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl text-white shadow-sm flex flex-col justify-center min-h-[140px]">
          <Lightbulb className="w-6 h-6 mb-3 text-green-100" />
          <h2 className="text-2xl font-bold mb-1">50+ Ideas</h2>
          <p className="text-green-50 text-sm">Value-added products across different crops</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-100 to-orange-200 p-6 rounded-2xl text-gray-800 shadow-sm flex flex-col justify-center min-h-[140px]">
          <TrendingUp className="w-6 h-6 mb-3 text-orange-600" />
          <h2 className="text-2xl font-bold mb-1">Up to 70%</h2>
          <p className="text-gray-600 text-sm">Potential profit increase on your produce</p>
        </div>

        <div className="bg-gradient-to-br from-orange-400 to-green-600 p-6 rounded-2xl text-white shadow-sm flex flex-col justify-center min-h-[140px]">
          <BookOpen className="w-6 h-6 mb-3 text-orange-100" />
          <h2 className="text-2xl font-bold mb-1">Free Guide</h2>
          <p className="text-orange-50 text-sm">Step-by-step tutorials for each product</p>
        </div>
      </div>

      {/* Select Crop Section */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Select Your Crop</h3>
        <div className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar">
          {valueAdditionCrops.map((crop, idx) => (
            <button key={idx} className="flex flex-col items-center justify-center p-4 min-w-[140px] bg-white border border-gray-200 rounded-xl hover:border-green-500 hover:shadow-md transition-all group shrink-0">
              <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">{crop.icon}</span>
              <span className="font-medium text-gray-800 text-sm">{crop.name}</span>
              <span className="text-xs text-gray-500 mt-1">{crop.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Empty State / Placeholder */}
      <div className="bg-white border border-gray-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center min-h-[300px] mb-8">
        <Lightbulb className="w-12 h-12 text-gray-300 mb-4" />
        <h3 className="text-lg font-bold text-gray-800 mb-2">Select a crop to view value-added products</h3>
        <p className="text-gray-500 max-w-sm">Choose from the crop options above to see profitable product ideas, tutorials, and market potential.</p>
      </div>

      {/* Bottom Banner */}
      <div className="bg-green-600 rounded-2xl p-8 text-white shadow-md flex flex-col md:flex-row items-center justify-between">
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-bold mb-2">Need Help Getting Started?</h3>
          <p className="text-green-50">Our experts can guide you through the entire process from setup to market sales.</p>
        </div>
        <div className="flex space-x-4 shrink-0">
          <button className="bg-white text-green-700 px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-green-50 transition-colors shadow-sm">
            Schedule Consultation
          </button>
          <button className="bg-transparent border border-white text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-white/10 transition-colors">
            Download Guide
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValueAdditionPage;

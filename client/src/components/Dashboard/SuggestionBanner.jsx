import React from 'react';

const SuggestionBanner = () => {
  return (
    <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-xl p-6 text-white shadow-md flex flex-col md:flex-row items-center justify-between">
      <div className="mb-4 md:mb-0">
        <h3 className="text-lg font-bold mb-1">Best Market Suggestion</h3>
        <p className="text-green-50 text-sm mb-3">
          Based on current prices, we recommend selling your tomatoes in Delhi market for maximum profit.
        </p>
        <div className="flex items-center space-x-6 text-sm">
          <div>
            <span className="text-green-200 block text-xs">Expected Price</span>
            <span className="font-bold text-lg">₹38/kg</span>
          </div>
          <div>
            <span className="text-green-200 block text-xs">Profit Increase</span>
            <span className="font-bold text-lg">+12%</span>
          </div>
        </div>
      </div>
      <button className="bg-white text-green-700 px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-green-50 transition-colors whitespace-nowrap shadow-sm">
        List Product
      </button>
    </div>
  );
};

export default SuggestionBanner;

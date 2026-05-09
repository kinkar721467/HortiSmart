import React from 'react';
import { cropPricesData } from '../../data/mockData';

const CropPrices = () => {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-gray-800">Current Crop Prices</h3>
        <button className="text-xs text-green-600 hover:text-green-700 font-medium">View all</button>
      </div>
      
      <div className="space-y-4">
        {cropPricesData.map((crop, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0 last:pb-0">
            <div>
              <p className="text-sm font-medium text-gray-800">{crop.name}</p>
              <p className="text-xs text-gray-500">{crop.location}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">{crop.price}</p>
              <p className={`text-xs ${crop.isUp ? 'text-green-500' : 'text-red-500'}`}>
                {crop.isUp ? '↑' : '↓'} {crop.trend}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CropPrices;

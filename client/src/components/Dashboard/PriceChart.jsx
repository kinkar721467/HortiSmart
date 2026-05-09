import React from 'react';

const PriceChart = () => {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm col-span-1 md:col-span-2 lg:col-span-3">
      <h3 className="text-sm font-semibold text-gray-800 mb-6">Price Trends</h3>
      
      {/* Chart Container */}
      <div className="relative h-64 w-full">
        {/* Y-Axis Labels */}
        <div className="absolute left-0 top-0 bottom-6 w-8 flex flex-col justify-between text-xs text-gray-400">
          <span>40</span>
          <span>30</span>
          <span>20</span>
          <span>10</span>
          <span>0</span>
        </div>
        
        {/* Chart Area */}
        <div className="absolute left-8 right-0 top-2 bottom-6 border-b border-l border-gray-100">
          {/* Horizontal Grid Lines */}
          <div className="absolute w-full top-[25%] border-t border-gray-50 border-dashed"></div>
          <div className="absolute w-full top-[50%] border-t border-gray-50 border-dashed"></div>
          <div className="absolute w-full top-[75%] border-t border-gray-50 border-dashed"></div>
          
          {/* SVG Line Graph */}
          <svg className="w-full h-full" viewBox="0 0 1000 100" preserveAspectRatio="none">
            {/* Defs for gradient if needed, but the design just has a solid green line */}
            <path 
              d="M 0,70 L 200,60 L 400,50 L 600,65 L 800,40 L 1000,30" 
              fill="none" 
              stroke="#16a34a" 
              strokeWidth="2" 
              vectorEffect="non-scaling-stroke"
            />
            {/* Data Points */}
            <circle cx="0" cy="70" r="4" fill="#16a34a" vectorEffect="non-scaling-stroke" />
            <circle cx="200" cy="60" r="4" fill="#16a34a" vectorEffect="non-scaling-stroke" />
            <circle cx="400" cy="50" r="4" fill="#16a34a" vectorEffect="non-scaling-stroke" />
            <circle cx="600" cy="65" r="4" fill="#16a34a" vectorEffect="non-scaling-stroke" />
            <circle cx="800" cy="40" r="4" fill="#16a34a" vectorEffect="non-scaling-stroke" />
            <circle cx="1000" cy="30" r="4" fill="#16a34a" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
        
        {/* X-Axis Labels */}
        <div className="absolute left-8 right-0 bottom-0 flex justify-between text-xs text-gray-400 pt-2">
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>
        </div>
      </div>
    </div>
  );
};

export default PriceChart;

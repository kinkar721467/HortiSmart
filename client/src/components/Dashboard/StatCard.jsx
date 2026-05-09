import React from 'react';

const StatCard = ({ title, value, subtitle, trend, trendLabel, icon: Icon, iconBgColor, iconColor }) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
          </div>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <div className={`p-2 rounded-lg ${iconBgColor}`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>
      
      {trend && (
        <div className="mt-4 flex items-center text-sm">
          {trend.startsWith('+') || trend.startsWith('↑') ? (
             <span className="text-green-500 font-medium mr-1">{trend}</span>
          ) : (
            <span className="text-gray-500 font-medium mr-1">{trend}</span>
          )}
          <span className="text-gray-400">{trendLabel}</span>
        </div>
      )}
      
      {!trend && trendLabel && (
         <div className="mt-4 flex items-center text-sm">
             <span className="text-gray-600 font-medium hover:text-green-600 cursor-pointer flex items-center">
                 {trendLabel} <span className="ml-1">→</span>
             </span>
         </div>
      )}
    </div>
  );
};

export default StatCard;

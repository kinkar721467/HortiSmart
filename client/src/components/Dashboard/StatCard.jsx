import React from 'react';

const StatCard = ({ title, value, subtitle, trend, trendLabel, icon: Icon, iconBgColor, iconColor, onClick, loading }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between ${onClick ? 'cursor-pointer hover:shadow-md hover:border-green-200 transition-all duration-200 group' : ''}`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
          <div className="flex items-baseline space-x-2">
            {loading ? (
              <div className="w-16 h-7 bg-gray-100 rounded animate-pulse" />
            ) : (
              <h3 className={`text-2xl font-bold text-gray-800 ${onClick ? 'group-hover:text-green-700 transition-colors' : ''}`}>{value}</h3>
            )}
          </div>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <div className={`p-2 rounded-lg ${iconBgColor} ${onClick ? 'group-hover:scale-110 transition-transform' : ''}`}>
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
          <span className={`font-medium flex items-center ${onClick ? 'text-green-600' : 'text-gray-600 hover:text-green-600 cursor-pointer'}`}>
            {trendLabel} <span className="ml-1">→</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default StatCard;

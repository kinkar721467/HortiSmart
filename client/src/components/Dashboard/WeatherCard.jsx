import React from 'react';
import { CloudSun, Droplets, Wind, CloudRain } from 'lucide-react';
import { weatherData } from '../../data/mockData';

const WeatherCard = () => {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm h-full flex flex-col">
      <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">Weather Today</h3>
      
      <div className="flex items-center mb-6">
        <CloudSun className="w-10 h-10 text-orange-400 mr-4 shrink-0" />
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{weatherData.temp}</h2>
          <p className="text-gray-500">{weatherData.condition}</p>
        </div>
      </div>
      
      <div className="space-y-4 flex-1 justify-end flex flex-col">
        <div className="flex justify-between items-center py-2 border-b border-gray-50">
          <div className="flex items-center text-gray-600">
            <Droplets className="w-4 h-4 mr-2 text-blue-400 shrink-0" />
            <span className="text-sm">Humidity</span>
          </div>
          <span className="text-sm font-medium">{weatherData.humidity}</span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-gray-50">
          <div className="flex items-center text-gray-600">
            <Wind className="w-4 h-4 mr-2 text-teal-400 shrink-0" />
            <span className="text-sm">Wind Speed</span>
          </div>
          <span className="text-sm font-medium">{weatherData.windSpeed}</span>
        </div>
        
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center text-gray-600">
            <CloudRain className="w-4 h-4 mr-2 text-indigo-400 shrink-0" />
            <span className="text-sm">Rainfall</span>
          </div>
          <span className="text-sm font-medium">{weatherData.rainfall}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;

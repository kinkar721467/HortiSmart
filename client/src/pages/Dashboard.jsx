import React from 'react';
import StatCard from '../components/Dashboard/StatCard';
import PriceChart from '../components/Dashboard/PriceChart';
import WeatherCard from '../components/Dashboard/WeatherCard';
import CropPrices from '../components/Dashboard/CropPrices';
import BuyerInquiries from '../components/Dashboard/BuyerInquiries';
import SuggestionBanner from '../components/Dashboard/SuggestionBanner';
import { dashboardStats } from '../data/mockData';

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Welcome back, Demo Farmer!</h1>
        <p className="text-gray-500 mt-1">Here's what's happening with your farm today.</p>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Chart and Weather Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 overflow-x-auto">
          <PriceChart />
        </div>
        <div className="lg:col-span-1">
          <WeatherCard />
        </div>
      </div>

      {/* Bottom Row - Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CropPrices />
        <BuyerInquiries />
      </div>

      {/* Bottom Banner */}
      <div className="pt-2">
        <SuggestionBanner />
      </div>
    </div>
  );
};

export default Dashboard;

import React from 'react';
import { adminStats } from '../data/mockData';
import { Activity, Users, AlertCircle, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Platform overview and system health.</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
            Generate Report
          </button>
          <button className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
            System Settings
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminStats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`${stat.iconBgColor} p-3 rounded-lg`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              {stat.trend && (
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trend.includes('↑') ? 'text-green-700 bg-green-50' : 'text-gray-700 bg-gray-100'}`}>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Registrations */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center"><Users className="w-5 h-5 mr-2 text-blue-500" /> Recent Registrations</h2>
            <button className="text-blue-600 text-sm font-medium hover:underline">View all</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">User</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 rounded-r-lg">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">Ramesh Kumar</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-medium">Farmer</span></td>
                  <td className="px-4 py-3 text-gray-500">Today, 10:45 AM</td>
                  <td className="px-4 py-3"><span className="text-green-500">Verified</span></td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">AgriCorp India</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">Buyer</span></td>
                  <td className="px-4 py-3 text-gray-500">Today, 09:12 AM</td>
                  <td className="px-4 py-3"><span className="text-orange-500">Pending</span></td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">Suresh Reddy</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-medium">Farmer</span></td>
                  <td className="px-4 py-3 text-gray-500">Yesterday</td>
                  <td className="px-4 py-3"><span className="text-green-500">Verified</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center"><Activity className="w-5 h-5 mr-2 text-red-500" /> System Alerts</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start p-4 bg-orange-50 rounded-lg border border-orange-100">
              <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 mr-3 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-orange-800">High API Latency Detected</h4>
                <p className="text-xs text-orange-600 mt-1">Mandi price fetch API is responding 200ms slower than usual. Auto-scaling initiated.</p>
                <span className="text-[10px] text-orange-400 mt-2 block">10 mins ago</span>
              </div>
            </div>
            
            <div className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-100">
              <TrendingUp className="w-5 h-5 text-gray-500 mt-0.5 mr-3 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-gray-800">Traffic Spike Alert</h4>
                <p className="text-xs text-gray-500 mt-1">Platform traffic increased by 45% in the last hour. Servers handling load normally.</p>
                <span className="text-[10px] text-gray-400 mt-2 block">1 hour ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

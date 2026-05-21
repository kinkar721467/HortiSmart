import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/Dashboard/StatCard';
import WeatherCard from '../components/Dashboard/WeatherCard';
import CropPrices from '../components/Dashboard/CropPrices';
import { TrendingUp, ShoppingBag, Database, IndianRupee } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || sessionStorage.getItem('userName') || 'Farmer';
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  const [stats, setStats] = useState({
    bestPrice: null,
    totalProducts: null,
    storageAvailable: null,
    cropBestPrice: null,
  });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      // 1. Fetch products from marketplace
      const productsRes = await fetch('http://127.0.0.1:8000/api/products', { headers });
      let totalProducts = '—';
      let bestProductPrice = null;
      if (productsRes.ok) {
        const products = await productsRes.json();
        totalProducts = products.length;
        if (products.length > 0) {
          const maxPriceProduct = products.reduce((max, p) =>
            Number(p.price) > Number(max.price) ? p : max, products[0]
          );
          bestProductPrice = { price: `₹${maxPriceProduct.price}/${maxPriceProduct.unit || 'kg'}`, name: maxPriceProduct.name };
        }
      }

      // 2. Fetch crop prices for best price
      let bestCropPrice = null;
      try {
        const priceRes = await fetch('http://localhost:8000/api/crop-prices');
        if (priceRes.ok) {
          const priceData = await priceRes.json();
          const records = priceData.records || [];
          if (records.length > 0) {
            const top = records.reduce((max, r) =>
              Number(r.modal_price) > Number(max.modal_price) ? r : max, records[0]
            );
            bestCropPrice = {
              price: `₹${(Number(top.modal_price) / 100).toFixed(0)}/kg`,
              name: `${top.commodity} - ${top.market}`,
            };
          }
        }
      } catch { /* ignore */ }

      // 3. Storage: Count how many facilities have availability
      // Using mock data stats since there's no backend storage API
      const storageAvailable = '6/8 Facilities';

      setStats({
        totalProducts,
        bestPrice: bestCropPrice,
        storageAvailable,
        bestProductPrice,
      });
    } catch (err) {
      console.error('Dashboard stats error:', err);
    } finally {
      setLoadingStats(false);
    }
  };

  const statCards = [
    {
      title: "Today's Best Price",
      value: stats.bestPrice?.price || '—',
      subtitle: stats.bestPrice?.name || 'Crop Market',
      trend: null,
      trendLabel: 'View Prices →',
      icon: TrendingUp,
      iconBgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      onClick: () => navigate('/prices'),
    },
    {
      title: 'Products in Marketplace',
      value: stats.totalProducts !== null ? String(stats.totalProducts) : '—',
      subtitle: 'Total active listings',
      trend: null,
      trendLabel: 'View Marketplace',
      icon: ShoppingBag,
      iconBgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      onClick: () => navigate('/marketplace'),
    },
    {
      title: 'Best Listed Price',
      value: stats.bestProductPrice?.price || '—',
      subtitle: stats.bestProductPrice?.name || 'Your listings',
      trend: null,
      trendLabel: 'Manage Products',
      icon: IndianRupee,
      iconBgColor: 'bg-orange-50',
      iconColor: 'text-orange-500',
      onClick: () => navigate('/marketplace'),
    },
    {
      title: 'Storage Available',
      value: stats.storageAvailable || '—',
      subtitle: 'Cold storage facilities',
      trend: null,
      trendLabel: 'Find Storage',
      icon: Database,
      iconBgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      onClick: () => navigate('/storage-finder'),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Welcome back, {userName}! 👋
        </h1>
        <p className="text-gray-500 mt-1">Here's what's happening with your farm today.</p>
      </div>

      {/* Top Stats Row - All clickable */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <StatCard
            key={index}
            {...stat}
            loading={loadingStats}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CropPrices />
        </div>
        <div className="lg:col-span-1">
          <WeatherCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import Dashboard from '../pages/Dashboard';
import BuyerDashboard from '../pages/BuyerDashboard';
import AdminDashboard from '../pages/AdminDashboard';
import CropPricesPage from '../pages/CropPricesPage';
import MarketplacePage from '../pages/MarketplacePage';
import StorageFinderPage from '../pages/StorageFinderPage';
import ValueAdditionPage from '../pages/ValueAdditionPage';
import PlaceholderPage from '../pages/PlaceholderPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      
      {/* Dashboard Routes wrapped in MainLayout */}
      <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
      <Route path="/buyer-dashboard" element={<MainLayout><BuyerDashboard /></MainLayout>} />
      <Route path="/admin-dashboard" element={<MainLayout><AdminDashboard /></MainLayout>} />
      <Route path="/prices" element={<MainLayout><CropPricesPage /></MainLayout>} />
      <Route path="/marketplace" element={<MainLayout><MarketplacePage /></MainLayout>} />
      <Route path="/storage-finder" element={<MainLayout><StorageFinderPage /></MainLayout>} />
      <Route path="/value-addition" element={<MainLayout><ValueAdditionPage /></MainLayout>} />
      <Route path="/notifications" element={<MainLayout><PlaceholderPage title="Notifications" /></MainLayout>} />
      <Route path="/settings" element={<MainLayout><PlaceholderPage title="Settings" /></MainLayout>} />
      <Route path="*" element={<MainLayout><PlaceholderPage title="Page Not Found" /></MainLayout>} />
    </Routes>
  );
};

export default AppRoutes;




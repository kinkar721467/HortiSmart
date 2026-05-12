import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Mail, Lock, Check } from 'lucide-react';

const LoginPage = () => {
  const [userType, setUserType] = useState('Farmer');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('userRole', userType);
    if (userType === 'Farmer') {
      navigate('/dashboard');
    } else if (userType === 'Buyer') {
      navigate('/buyer-dashboard');
    }
  };

  const benefits = [
    'Real-time crop prices',
    'Direct buyer connections',
    'Cold storage network'
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f8f9fa] font-sans">
      
      {/* Left Side - Green Branding */}
      <div className="w-full md:w-1/2 bg-[#529b58] text-white p-8 md:p-16 flex flex-col justify-center min-h-[40vh] md:min-h-screen">
        <div className="max-w-md mx-auto w-full">
          <Leaf className="w-12 h-12 mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Welcome Back to<br />HortiSmart
          </h1>
          <p className="text-green-50 text-lg mb-10">
            Continue your journey towards smarter farming and better profits.
          </p>

          <div className="space-y-4">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center space-x-3">
                <div className="bg-white/20 p-1 rounded-full">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10 w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign In</h2>
            <p className="text-sm text-gray-500">Enter your credentials to access your account</p>
          </div>

          {/* User Type Toggles */}
          <div className="flex space-x-3 mb-8">
            {['Farmer', 'Buyer'].map((type) => (
              <button
                key={type}
                onClick={() => setUserType(type)}
                className={`flex-1 py-2 text-sm font-medium rounded-full border transition-colors ${
                  userType === type
                    ? 'bg-[#2e7d32] border-[#2e7d32] text-white'
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="w-5 h-5 text-gray-400" />
              </span>
              <input
                type="email"
                placeholder="Email address"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                required
              />
            </div>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="w-5 h-5 text-gray-400" />
              </span>
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                <span className="text-gray-600 font-medium">Remember me</span>
              </label>
              <a href="#" className="text-[#2e7d32] hover:text-green-700 font-medium">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#2e7d32] hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors shadow-sm"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#2e7d32] hover:text-green-700 font-medium">
              Sign up here
            </Link>
          </div>

          <div className="mt-8 text-center">
            <Link to="/" className="text-sm text-gray-400 hover:text-gray-600 font-medium">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default LoginPage;

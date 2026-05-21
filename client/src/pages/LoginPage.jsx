import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Mail, Lock, Check } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const LoginPage = () => {
  const { showToast } = useToast();
  const [userType, setUserType] = useState('Farmer'); // Not strictly needed for API, but keeping for UI
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password, role: userType.toLowerCase() }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('token', data.token);
      storage.setItem('userRole', data.user.role);
      storage.setItem('userName', data.user.name);
      
      showToast(`Welcome back, ${data.user.name}!`, 'success');
      
      if (data.user.role === 'farmer') {
        navigate('/dashboard');
      } else {
        navigate('/buyer-dashboard');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
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
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="w-5 h-5 text-gray-400" />
              </span>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500" 
                />
                <span className="text-gray-600 font-medium">Remember me</span>
              </label>
              <a href="#" className="text-[#2e7d32] hover:text-green-700 font-medium">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2e7d32] hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors shadow-sm disabled:opacity-50"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
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

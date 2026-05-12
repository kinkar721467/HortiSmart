import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, User, Mail, Phone, MapPin, Lock } from 'lucide-react';

const SignupPage = () => {
  const [userType, setUserType] = useState('Farmer');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    localStorage.setItem('userRole', userType);
    if (userType === 'Farmer') {
      navigate('/dashboard');
    } else if (userType === 'Buyer') {
      navigate('/buyer-dashboard');
    }
  };

  const steps = [
    'Create your free account',
    'Complete your profile',
    'Start connecting and trading'
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f8f9fa] font-sans">
      
      {/* Left Side - Green Branding */}
      <div className="w-full md:w-1/2 bg-[#529b58] text-white p-8 md:p-16 flex flex-col justify-center min-h-[40vh] md:min-h-screen relative overflow-hidden">
        <div className="max-w-md mx-auto w-full z-10">
          <Leaf className="w-12 h-12 mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Start Your Smart<br />Farming Journey
          </h1>
          <p className="text-green-50 text-lg mb-10">
            Join thousands of farmers and buyers who trust HortiSmart for better agriculture business.
          </p>

          <div className="space-y-6">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center space-x-4">
                <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                  {idx + 1}
                </div>
                <span className="font-medium text-lg">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 overflow-y-auto max-h-screen">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10 w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h2>
            <p className="text-sm text-gray-500">Join HortiSmart to get started</p>
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
                I'm a {type}
              </button>
            ))}
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSignup}>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <User className="w-5 h-5 text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Full name"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                required
              />
            </div>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="w-5 h-5 text-gray-400" />
              </span>
              <input
                type="email"
                placeholder="Email address"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                required
              />
            </div>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Phone className="w-5 h-5 text-gray-400" />
              </span>
              <input
                type="tel"
                placeholder="Phone number"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                required
              />
            </div>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <MapPin className="w-5 h-5 text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="City, State"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
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
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                required
              />
            </div>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="w-5 h-5 text-gray-400" />
              </span>
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                required
              />
            </div>

            <div className="flex items-start text-sm pt-2">
              <label className="flex items-start space-x-2 cursor-pointer mt-1">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500 mt-0.5" required />
                <span className="text-gray-600">
                  I agree to the <a href="#" className="text-[#2e7d32] hover:underline">Terms of Service</a> and <a href="#" className="text-[#2e7d32] hover:underline">Privacy Policy</a>
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#2e7d32] hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors shadow-sm mt-2"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-[#2e7d32] hover:text-green-700 font-medium">
              Sign in here
            </Link>
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-gray-400 hover:text-gray-600 font-medium">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default SignupPage;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, User, Mail, Phone, MapPin, Lock } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const SignupPage = () => {
  const { showToast } = useToast();
  const [userType, setUserType] = useState('Farmer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          location,
          password,
          role: userType.toLowerCase()
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', data.user.role);
      localStorage.setItem('userName', data.user.name);
      
      showToast(`Welcome to HortiSmart, ${data.user.name}! Your account has been created.`, 'success');
      
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
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <User className="w-5 h-5 text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
                value={location}
                onChange={(e) => setLocation(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              disabled={isLoading}
              className="w-full bg-[#2e7d32] hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors shadow-sm mt-2 disabled:opacity-50"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
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

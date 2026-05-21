import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Globe, TrendingUp, Building2, ShoppingCart, Users, BarChart2, MessageSquare, Shield, Star, ArrowRight } from 'lucide-react';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const role = localStorage.getItem('userRole') || sessionStorage.getItem('userRole');
    if (token) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      await fetch('http://127.0.0.1:8000/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userName');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userRole');
      sessionStorage.removeItem('userName');
      setIsLoggedIn(false);
      setUserRole(null);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      
      {/* Top Ticker */}
      <div className="bg-[#1a1a1a] text-xs py-2 flex items-center overflow-hidden whitespace-nowrap">
        <div className="bg-[#f97316] text-white px-4 py-1 font-bold tracking-wider mr-4 shrink-0">
          LIVE MANDI
        </div>
        <div className="flex space-x-8 animate-marquee">
          <span className="flex items-center text-gray-300"><span className="text-red-500 mr-1">🍅</span> Tomato - Delhi <span className="text-white mx-2">₹3,040.27</span> <span className="text-green-500">↑+15.76%</span></span>
          <span className="flex items-center text-gray-300"><span className="text-red-500 mr-1">🍅</span> Tomato - Kolkata <span className="text-white mx-2">₹2,652.88</span> <span className="text-green-500">↑+1.27%</span></span>
          <span className="flex items-center text-gray-300"><span className="text-red-500 mr-1">🍅</span> Tomato - Lucknow <span className="text-white mx-2">₹2,457.11</span> <span className="text-red-500">↓-2.39%</span></span>
          <span className="flex items-center text-gray-300"><span className="text-orange-300 mr-1">🧅</span> Onion - Chennai <span className="text-white mx-2">₹1,419.08</span> <span className="text-red-500">↓-18.15%</span></span>
        </div>
      </div>

      {/* Navbar */}
      <nav className="border-b border-green-700 bg-[#2e7d32] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Leaf className="w-6 h-6 text-white" />
              <span className="text-xl font-bold text-white">HortiSmart</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-green-50 hover:text-white font-medium text-sm transition-colors">Features</a>
              <a href="#benefits" className="text-green-50 hover:text-white font-medium text-sm transition-colors">Benefits</a>
              <a href="#testimonials" className="text-green-50 hover:text-white font-medium text-sm transition-colors">Testimonials</a>
              <div className="flex items-center space-x-4">
                {isLoggedIn ? (
                  <>
                    <Link to={userRole === 'farmer' ? '/dashboard' : '/buyer-dashboard'} className="text-white border border-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors">
                      Dashboard
                    </Link>
                    <button onClick={handleLogout} className="bg-white text-[#2e7d32] px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors shadow-sm">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="text-white border border-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors">
                      Login
                    </Link>
                    <Link to="/signup" className="bg-white text-[#2e7d32] px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors shadow-sm">
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div 
        className="relative bg-[#fafafa] pt-16 pb-20 overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(to right, #f0f0f0 1px, transparent 1px), linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* Left Content */}
            <div className="flex-1 max-w-2xl">
              <div className="inline-flex items-center space-x-2 bg-white border border-gray-200 px-3 py-1 rounded-full text-xs font-bold text-gray-500 tracking-widest mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#f97316]"></span>
                <span>ICAR • MINISTRY OF AGRICULTURE</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-6">
                Sell smart.<br />
                Store smart.<br />
                <span className="text-[#f97316]">Earn more.</span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
                Crop-specific market intelligence for Indian horticulture — real-time mandi prices, ML forecasts, storage and value-addition guidance.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-12">
                <Link to={isLoggedIn ? (userRole === 'farmer' ? '/dashboard' : '/buyer-dashboard') : '/signup'} className="bg-[#f97316] text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center justify-center">
                  {isLoggedIn ? 'Go to Dashboard' : 'Get Started'} <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link to="/prices" className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
                  Explore Live Mandi
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200/60 max-w-md">
                <div>
                  <div className="text-2xl font-bold text-gray-900">18+</div>
                  <div className="text-xs text-gray-500 mt-1">Major mandis</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">12</div>
                  <div className="text-xs text-gray-500 mt-1">Horticultural crops</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">14d</div>
                  <div className="text-xs text-gray-500 mt-1">ML forecast</div>
                </div>
              </div>
            </div>

            {/* Right Image/Cards */}
            <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                {/* Farmer Image */}
                <div className="bg-green-800 h-[400px] w-full relative">
                   <img 
                    src="/hero-farmer.png" 
                    alt="Farmer in field" 
                    className="w-full h-full object-cover opacity-90"
                  />
                </div>
                
                {/* Floating Card Top Right */}
                <div className="absolute top-4 right-4 bg-white rounded-xl p-3 shadow-lg border border-gray-100">
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Forecast 14d</div>
                  <div className="flex items-center text-green-600 font-bold text-lg">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                    +12.4%
                  </div>
                </div>

                {/* Floating Card Bottom */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 flex justify-between items-center">
                  <div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Today's Best Decision</div>
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">🍅</span>
                      <div>
                        <div className="font-bold text-gray-900 text-sm">Tomato - Lasalgaon</div>
                        <div className="text-xs text-gray-500">10q - 142km from Pune</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[#f97316]">₹24,180</div>
                    <div className="text-[10px] text-gray-500 uppercase">Net realised</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* The Problem Section */}
      <div className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <div className="text-[#f97316] text-xs font-bold tracking-widest uppercase mb-4">The Problem</div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Farmers lose ₹92,000 crore every year to information gaps.
              </h2>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-gray-600 mb-4 leading-relaxed">
                Middlemen capture 60% of the value chain. Farmers don't know which mandi pays best, where to store, or how to add value when prices crash. Tomatoes rot. Onions rot. Mangoes rot.
              </p>
              <p className="text-gray-900 font-medium">
                HortiSmart closes that gap with one decision per crop, every day.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Powerful Features Section */}
      <div id="features" className="bg-gray-50 py-20 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Powerful Features for Farmers</h2>
            <p className="text-gray-500 text-lg">Everything you need to succeed in modern agriculture</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Real-Time Crop Prices', icon: <TrendingUp className="w-6 h-6 text-green-700" />, desc: 'Get live market prices for your crops across different cities and states. Make informed selling decisions.' },
              { title: 'Cold Storage Finder', icon: <Building2 className="w-6 h-6 text-green-700" />, desc: 'Find nearby cold storage facilities with real-time capacity, pricing, and contact information.' },
              { title: 'Direct Marketplace', icon: <ShoppingCart className="w-6 h-6 text-green-700" />, desc: 'Sell directly to verified buyers. No middlemen, better prices, faster transactions.' },
              { title: 'Buyer Network', icon: <Users className="w-6 h-6 text-green-700" />, desc: 'Connect with thousands of verified buyers looking for quality produce from farmers like you.' },
              { title: 'Value Addition Ideas', icon: <BarChart2 className="w-6 h-6 text-green-700" />, desc: 'Discover profitable value-added products you can create from your crops to increase revenue.' },
              { title: 'AI Assistant', icon: <MessageSquare className="w-6 h-6 text-green-700" />, desc: 'Get instant answers to your agriculture questions with our intelligent chatbot assistant.' },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-green-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Farmers Choose Section */}
      <div id="benefits" className="bg-[#eaf7ef] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Farmers Choose HortiSmart</h2>
            <p className="text-green-800 text-lg">Join thousands of successful farmers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              { title: 'Verified Buyers Only', icon: <Shield className="w-5 h-5 text-white" />, desc: 'All buyers are verified and rated by other farmers. Trade with confidence.' },
              { title: 'Better Prices', icon: <TrendingUp className="w-5 h-5 text-white" />, desc: 'Cut out middlemen and get up to 30% better prices for your produce.' },
              { title: 'Market Intelligence', icon: <BarChart2 className="w-5 h-5 text-white" />, desc: 'Access price trends, demand forecasts, and market analytics to plan better.' },
              { title: '24/7 Support', icon: <MessageSquare className="w-5 h-5 text-white" />, desc: 'Get help anytime with our AI assistant and dedicated support team.' },
            ].map((benefit, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-start space-x-4">
                <div className="bg-[#2e7d32] p-3 rounded-xl shrink-0">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div id="testimonials" className="bg-white py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Farmers Say</h2>
            <p className="text-gray-500 text-lg">Success stories from our community</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { quote: "HortiSmart helped me get 25% better prices for my tomatoes. The storage finder feature is a game-changer!", name: "Rajesh Kumar", location: "Punjab" },
              { quote: "Direct connection with buyers eliminated middlemen. I'm making more profit than ever before.", name: "Priya Patel", location: "Gujarat" },
              { quote: "The value addition ideas helped me start making pickles. My income doubled in 6 months!", name: "Suresh Reddy", location: "Telangana" }
            ].map((test, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-gray-600 mb-6 italic leading-relaxed">"{test.quote}"</p>
                <div>
                  <div className="font-bold text-gray-900">{test.name}</div>
                  <div className="text-sm text-gray-500">{test.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#2e7d32] py-20 text-center text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Farming Business?</h2>
          <p className="text-green-50 text-lg mb-10">Join thousands of farmers already using HortiSmart to increase their profits</p>
          <Link to={isLoggedIn ? (userRole === 'farmer' ? '/dashboard' : '/buyer-dashboard') : '/signup'} className="inline-block bg-white text-[#2e7d32] font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-gray-50 transition-colors">
            {isLoggedIn ? 'Go to Dashboard' : 'Get Started Free'}
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="w-6 h-6 text-green-600" />
                <span className="text-xl font-bold text-green-700">HortiSmart</span>
              </div>
              <p className="text-sm text-gray-500 pr-4">
                Empowering farmers with technology for better agriculture and higher profits.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-green-600">Features</a></li>
                <li><a href="#" className="hover:text-green-600">Pricing</a></li>
                <li><a href="#" className="hover:text-green-600">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-green-600">About Us</a></li>
                <li><a href="#" className="hover:text-green-600">Careers</a></li>
                <li><a href="#" className="hover:text-green-600">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-green-600">Help Center</a></li>
                <li><a href="#" className="hover:text-green-600">Community</a></li>
                <li><a href="#" className="hover:text-green-600">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-100 text-center text-sm text-gray-500">
            © 2026 HortiSmart. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;

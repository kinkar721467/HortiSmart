import React from 'react';
import { Search, Bell, Menu, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole') || sessionStorage.getItem('userRole') || 'farmer';
  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 z-10 sticky top-0">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="p-2 mr-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <div className="flex items-center space-x-4 md:space-x-6 ml-auto">
        <button className="hidden sm:flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900">
          <span>English</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </button>
        
        {userRole.toLowerCase() === 'buyer' ? (
          <button onClick={() => navigate('/buyer/cart')} className="relative p-1 text-gray-400 hover:text-gray-500">
            <ShoppingCart className="h-5 w-5" />
            {cartItems.length > 0 && (
              <span className="absolute top-0 -right-1 h-4 w-4 rounded-full bg-green-500 border border-white text-white flex items-center justify-center text-[10px] font-bold">
                {cartItems.length}
              </span>
            )}
          </button>
        ) : null}
        
        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold border border-green-200 shrink-0">
          {(() => {
            const name = localStorage.getItem('userName') || sessionStorage.getItem('userName') || 'F';
            return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
          })()}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

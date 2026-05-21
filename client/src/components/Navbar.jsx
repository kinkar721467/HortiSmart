import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, Menu, ShoppingCart, Globe, ChevronDown, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole') || sessionStorage.getItem('userRole') || 'farmer';
  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  
  const { locale, changeLocale } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Dark/Light Mode state
  const [theme, setTheme] = useState(() => sessionStorage.getItem('theme') || 'light');

  // Sync theme with HTML class and sessionStorage
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    sessionStorage.setItem('theme', theme);
  }, [theme]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = SUPPORTED_LANGUAGES.find(lang => lang.code === locale) || SUPPORTED_LANGUAGES[0];

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
        {/* Language Selector Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 text-sm font-semibold text-gray-700 hover:text-gray-900 focus:outline-none bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200 transition-all cursor-pointer"
          >
            <span>{currentLang.flag}</span>
            <span className="hidden sm:inline">{currentLang.name}</span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden py-1 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 border-b border-gray-100">
                Select Language
              </div>
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    changeLocale(lang.code);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-3 transition-colors cursor-pointer ${
                    locale === lang.code 
                      ? 'bg-green-50 text-green-700 font-semibold' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dark/Light Mode Switcher */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="flex items-center justify-center p-2 text-gray-500 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-all cursor-pointer"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4 text-amber-500 fill-amber-500" />
          ) : (
            <Moon className="h-4 w-4 text-indigo-600 fill-indigo-600" />
          )}
        </button>
        
        {userRole.toLowerCase() === 'buyer' ? (
          <button onClick={() => navigate('/buyer/cart')} className="relative p-1 text-gray-400 hover:text-gray-500 cursor-pointer">
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

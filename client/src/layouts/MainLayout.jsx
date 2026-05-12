import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Bot } from 'lucide-react';

const MainLayout = ({ children }) => {
  // By default minimized as requested
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  
  // Also we might want to handle mobile sidebar (drawer)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Close mobile sidebar when window resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if (window.innerWidth >= 1024) {
      setIsSidebarMinimized(!isSidebarMinimized);
    } else {
      setIsMobileSidebarOpen(!isMobileSidebarOpen);
    }
  };

  return (
    <div className="flex h-screen bg-[#f8f9fa] text-gray-800 font-sans overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar Component */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 transform transition-all duration-300 ease-in-out
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar isMinimized={isSidebarMinimized} closeMobile={() => setIsMobileSidebarOpen(false)} />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full h-screen overflow-hidden">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 w-full relative">
          {children}
        </main>
      </div>

      {/* Floating AI Chat Button */}
      <Link to="/chat" className="fixed bottom-6 right-6 z-50 flex items-center bg-[#2e7d32] text-white p-3.5 rounded-full shadow-lg hover:bg-green-700 hover:shadow-xl transition-all duration-300 hover:scale-105 group">
        <Bot className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap font-medium px-0 group-hover:px-2 text-sm">
          Chat with AI
        </span>
        <span className="absolute top-0 right-0 h-3.5 w-3.5 rounded-full bg-green-400 border-2 border-[#2e7d32] animate-pulse"></span>
      </Link>
    </div>
  );
};

export default MainLayout;

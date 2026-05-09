import React from 'react';
import { Search, MapPin, Star, Building2, Map } from 'lucide-react';
import { storageFacilities } from '../data/mockData';

const StorageFinderPage = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Cold Storage Finder</h1>
        <p className="text-gray-500 mt-1">Find nearby cold storage facilities for your produce</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </span>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Search by name or location..."
          />
        </div>
        <button className="flex items-center justify-center space-x-2 bg-white border border-green-500 text-green-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-50">
          <MapPin className="w-4 h-4" />
          <span>Use My Location</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: List */}
        <div className="lg:col-span-2 space-y-4">
          {storageFacilities.map((facility, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-50 p-3 rounded-lg text-green-600 shrink-0">
                    <Building2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{facility.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <MapPin className="w-3 h-3 mr-1" /> {facility.location}
                    </p>
                    <div className="flex items-center mt-1 text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="font-medium mr-1">{facility.rating}</span>
                      <span>({facility.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${facility.availColor}`}>
                  {facility.availability}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-gray-500 text-xs">Capacity</p>
                  <p className="font-medium text-gray-800">{facility.capacity}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Available</p>
                  <p className="font-medium text-green-600">{facility.available}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Price</p>
                  <p className="font-medium text-gray-800">{facility.price}</p>
                </div>
              </div>

              <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4">
                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {facility.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-md border border-green-100">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-3">
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                  Contact
                </button>
                <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Map View Dummy */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm h-[600px] flex flex-col">
            <h3 className="text-sm font-semibold text-gray-800 mb-4">Map View</h3>
            <div className="bg-green-50 rounded-lg flex-1 flex flex-col items-center justify-center border border-green-100 relative">
              <Map className="w-12 h-12 text-green-300 mb-2" />
              <p className="text-green-700 font-medium text-sm">Map Integration</p>
              <p className="text-green-600/70 text-xs">Showing 4 locations</p>
              
              {/* Dummy Map Pins */}
              <div className="absolute top-1/4 left-1/4">
                <MapPin className="w-6 h-6 text-green-600 fill-white drop-shadow-md" />
              </div>
              <div className="absolute top-1/2 right-1/3">
                <MapPin className="w-6 h-6 text-green-600 fill-white drop-shadow-md" />
              </div>
              <div className="absolute bottom-1/3 left-1/3">
                <MapPin className="w-6 h-6 text-orange-500 fill-white drop-shadow-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorageFinderPage;

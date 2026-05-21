import React, { useState } from 'react';
import { MapPin, Star, Building2, Map, Phone, Mail, User } from 'lucide-react';
import { storageFacilities } from '../data/mockData';

const StorageFinderPage = () => {
  const [selectedState, setSelectedState] = useState('All States');

  const filteredFacilities = storageFacilities.filter(facility => {
    if (selectedState === 'All States') return true;
    if (selectedState === 'Haryana' && facility.location.includes('HR')) return true;
    return facility.location.toLowerCase().includes(selectedState.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Cold Storage Finder</h1>
        <p className="text-gray-500 mt-1">Find nearby cold storage facilities for your produce</p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">Filter by State</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <MapPin className="h-5 w-5 text-green-500" />
            </span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white appearance-none"
            >
              <option value="All States">All States</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Punjab">Punjab</option>
              <option value="Haryana">Haryana</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Delhi">Delhi</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
          {filteredFacilities.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-500 shadow-sm">
              No storage facilities found in {selectedState}. Try selecting another state.
            </div>
          ) : (
            filteredFacilities.map((facility, idx) => (
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

              <div className="mt-2 pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-black dark:text-white">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="font-bold text-black dark:text-white">Owner: {facility.owner || 'Rajesh Yadav'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="font-bold text-black dark:text-white">{facility.phone || '+91 98765 01234'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="font-bold text-black dark:text-white">{facility.email || 'contact@storage.com'}</span>
                </div>
              </div>
              </div>
            ))
          )}
        </div>
    </div>
  );
};

export default StorageFinderPage;

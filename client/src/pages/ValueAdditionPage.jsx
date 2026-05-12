import React, { useState } from 'react';
import { Lightbulb, TrendingUp, BookOpen, ChevronRight, PlayCircle, FileText, ExternalLink } from 'lucide-react';
import { valueAdditionCrops, valueAdditionTutorials } from '../data/mockData';

const ValueAdditionPage = () => {
  const [selectedCrop, setSelectedCrop] = useState(null);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Value Addition Ideas</h1>
        <p className="text-gray-500 mt-1">Increase your income by creating value-added products from your crops</p>
      </div>

      {/* Top 3 Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl text-white shadow-sm flex flex-col justify-center min-h-[140px]">
          <Lightbulb className="w-6 h-6 mb-3 text-green-100" />
          <h2 className="text-2xl font-bold mb-1">50+ Ideas</h2>
          <p className="text-green-50 text-sm">Value-added products across different crops</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-100 to-orange-200 p-6 rounded-2xl text-gray-800 shadow-sm flex flex-col justify-center min-h-[140px]">
          <TrendingUp className="w-6 h-6 mb-3 text-orange-600" />
          <h2 className="text-2xl font-bold mb-1">Up to 70%</h2>
          <p className="text-gray-600 text-sm">Potential profit increase on your produce</p>
        </div>

        <div className="bg-gradient-to-br from-orange-400 to-green-600 p-6 rounded-2xl text-white shadow-sm flex flex-col justify-center min-h-[140px]">
          <BookOpen className="w-6 h-6 mb-3 text-orange-100" />
          <h2 className="text-2xl font-bold mb-1">Free Guide</h2>
          <p className="text-orange-50 text-sm">Step-by-step tutorials for each product</p>
        </div>
      </div>

      {/* Select Crop Section */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Select Your Crop</h3>
        <div className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar">
          {valueAdditionCrops.map((crop, idx) => (
            <button 
              key={idx} 
              onClick={() => setSelectedCrop(crop.name)}
              className={`flex flex-col items-center justify-center p-4 min-w-[140px] bg-white border rounded-xl hover:shadow-md transition-all group shrink-0 ${
                selectedCrop === crop.name ? 'border-green-500 ring-2 ring-green-100 bg-green-50' : 'border-gray-200 hover:border-green-500'
              }`}
            >
              <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">{crop.icon}</span>
              <span className="font-medium text-gray-800 text-sm">{crop.name}</span>
              <span className="text-xs text-gray-500 mt-1">{crop.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tutorials Section */}
      {!selectedCrop ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center min-h-[300px] mb-8">
          <Lightbulb className="w-12 h-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-bold text-gray-800 mb-2">Select a crop to view value-added products</h3>
          <p className="text-gray-500 max-w-sm">Choose from the crop options above to see profitable product ideas, tutorials, and market potential.</p>
        </div>
      ) : (
        <div className="space-y-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            Value Addition Tutorials for {selectedCrop}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {valueAdditionTutorials[selectedCrop]?.map((tutorial, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{tutorial.title}</h3>
                <p className="text-gray-600 text-sm mb-6">{tutorial.description}</p>
                
                <div className="space-y-4">
                  {/* Videos */}
                  {tutorial.videos && tutorial.videos.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Video Tutorials</h4>
                      <div className="space-y-3">
                        {tutorial.videos.map((vid, vIdx) => (
                          <div key={vIdx} className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group">
                            <div className="bg-red-100 text-red-600 p-2 rounded-lg mr-4 group-hover:bg-red-600 group-hover:text-white transition-colors">
                              <PlayCircle className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <h5 className="text-sm font-semibold text-gray-800 line-clamp-1">{vid.title}</h5>
                              <p className="text-xs text-gray-500">{vid.duration}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Articles */}
                  {tutorial.articles && tutorial.articles.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 mt-4">Related Articles</h4>
                      <div className="space-y-2">
                        {tutorial.articles.map((art, aIdx) => (
                          <a key={aIdx} href={art.link} className="flex items-start p-3 border border-gray-100 rounded-xl hover:border-green-200 hover:bg-green-50 transition-colors group">
                            <FileText className="w-4 h-4 text-green-600 mr-3 mt-0.5 shrink-0" />
                            <span className="text-sm text-gray-700 font-medium group-hover:text-green-700 flex-1">{art.title}</span>
                            <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-green-600 shrink-0 mt-0.5" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Banner */}
      <div className="bg-green-600 rounded-2xl p-8 text-white shadow-md flex flex-col md:flex-row items-center justify-between">
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-bold mb-2">Need Help Getting Started?</h3>
          <p className="text-green-50">Our experts can guide you through the entire process from setup to market sales.</p>
        </div>
        <div className="flex space-x-4 shrink-0">
          <button className="bg-white text-green-700 px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-green-50 transition-colors shadow-sm">
            Schedule Consultation
          </button>
          <button className="bg-transparent border border-white text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-white/10 transition-colors">
            Download Guide
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValueAdditionPage;

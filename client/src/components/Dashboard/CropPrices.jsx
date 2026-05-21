import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, ExternalLink, Loader2 } from 'lucide-react';

const CropPrices = () => {
  const navigate = useNavigate();
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLivePrices();
  }, []);

  const fetchLivePrices = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/crop-prices');
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      const records = (data.records || []).slice(0, 5);
      setPrices(records.map((r, i) => ({
        name: r.commodity,
        location: `${r.market}, ${r.state}`,
        price: `₹${r.modal_price}/q`,
        perKg: `₹${(Number(r.modal_price) / 100).toFixed(2)}/kg`,
        isUp: i % 2 === 0, // trend not available in API, alternate as placeholder
      })));
    } catch {
      // Fallback to mock if API fails
      setPrices([
        { name: 'Tomato', location: 'Delhi', price: '₹3800/q', perKg: '₹38/kg', isUp: true },
        { name: 'Potato', location: 'Mumbai', price: '₹2200/q', perKg: '₹22/kg', isUp: false },
        { name: 'Onion', location: 'Pune', price: '₹2800/q', perKg: '₹28/kg', isUp: true },
        { name: 'Cabbage', location: 'Bangalore', price: '₹1500/q', perKg: '₹15/kg', isUp: false },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-gray-800">Current Crop Prices</h3>
        <button
          onClick={() => navigate('/prices')}
          className="flex items-center gap-1 text-xs text-green-600 hover:text-green-700 font-medium transition-colors group"
        >
          View all
          <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-5 h-5 text-green-500 animate-spin mr-2" />
          <span className="text-sm text-gray-400">Loading prices...</span>
        </div>
      ) : (
        <div className="space-y-3">
          {prices.map((crop, index) => (
            <div
              key={index}
              onClick={() => navigate('/prices')}
              className="flex items-center justify-between py-2.5 px-3 rounded-lg border border-gray-50 hover:bg-green-50 hover:border-green-100 cursor-pointer transition-all group last:mb-0"
            >
              <div>
                <p className="text-sm font-semibold text-gray-800 group-hover:text-green-700 transition-colors">{crop.name}</p>
                <p className="text-xs text-gray-400">{crop.location}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-800">{crop.perKg}</p>
                <div className={`flex items-center justify-end gap-0.5 text-xs font-medium ${crop.isUp ? 'text-green-500' : 'text-red-500'}`}>
                  {crop.isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span>{crop.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => navigate('/prices')}
        className="w-full mt-4 py-2 text-xs font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-lg border border-green-100 transition-colors"
      >
        View All Crop Prices →
      </button>
    </div>
  );
};

export default CropPrices;

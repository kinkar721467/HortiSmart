import React, { useEffect, useState } from "react";
import {
  Search,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const CropPricesPage = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedState, setSelectedState] = useState("");

  // Fetch API
  useEffect(() => {
    fetchPrices();
  }, [search, selectedState]);

  const fetchPrices = async () => {
    try {
      setLoading(true);

      let url = "http://localhost:8000/api/crop-prices";

      let params = [];

      if (search) {
        params.push(`commodity=${search}`);
      }

      if (selectedState) {
        params.push(`state=${selectedState}`);
      }

      if (params.length > 0) {
        url += "?" + params.join("&");
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("API not working");
      }

      const data = await response.json();

      setPrices(data.records || []);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Convert quintal to kg
  const getKgPrice = (price) => {
    return (Number(price) / 100).toFixed(2);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* Heading */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Crop Prices
        </h1>

        <p className="text-gray-500 mt-1">
          Real-time market prices across India
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4">

        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />

          <input
            type="text"
            placeholder="Search fruits or vegetables..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* State Filter */}
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">All States</option>
          <option value="Punjab">Punjab</option>
          <option value="Kerala">Kerala</option>
          <option value="Gujarat">Gujarat</option>
          <option value="Maharashtra">Maharashtra</option>
        </select>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-10 text-gray-500">
          Loading prices...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center justify-center gap-2 py-10 text-red-500">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {/* Cards */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          {prices.slice(0, 4).map((crop, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl border border-green-100 shadow-sm"
            >
              <div className="flex justify-between">

                <div>
                  <h3 className="font-bold text-gray-800">
                    {crop.commodity}
                  </h3>

                  <p className="text-xs text-gray-500">
                    {crop.market}, {crop.state}
                  </p>
                </div>

                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>

              <div className="mt-4">
                <p className="text-xs text-gray-500">
                  Modal Price
                </p>

                <h2 className="text-2xl font-bold text-gray-800">
                  ₹{crop.modal_price}/quintal
                </h2>

                <p className="text-sm text-green-600 mt-1 font-medium">
                  ₹{getKgPrice(crop.modal_price)}/kg
                </p>
              </div>

              <div className="mt-3 text-xs text-gray-500">
                Range: ₹{crop.min_price} - ₹{crop.max_price}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table */}
      {!loading && !error && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

          <div className="p-5 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-800">
              All Market Prices
            </h3>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-sm text-left">

              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-6 py-3">Commodity</th>
                  <th className="px-6 py-3">Market</th>
                  <th className="px-6 py-3">State</th>
                  <th className="px-6 py-3">Variety</th>
                  <th className="px-6 py-3 text-right">Modal</th>
                  <th className="px-6 py-3 text-right">Per KG</th>
                </tr>
              </thead>

              <tbody>
                {prices.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-50 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium">
                      {item.commodity}
                    </td>

                    <td className="px-6 py-4">
                      {item.market}
                    </td>

                    <td className="px-6 py-4">
                      {item.state}
                    </td>

                    <td className="px-6 py-4">
                      {item.variety}
                    </td>

                    <td className="px-6 py-4 text-right font-medium">
                      ₹{item.modal_price}
                    </td>

                    <td className="px-6 py-4 text-right text-green-600 font-medium">
                      ₹{getKgPrice(item.modal_price)}/kg
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropPricesPage;
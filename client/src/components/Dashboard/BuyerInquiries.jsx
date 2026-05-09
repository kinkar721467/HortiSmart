import React from 'react';
import { buyerInquiriesData } from '../../data/mockData';

const BuyerInquiries = () => {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-gray-800">Recent Buyer Inquiries</h3>
        <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-medium">12 New</span>
      </div>
      
      <div className="space-y-4">
        {buyerInquiriesData.map((inquiry, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0 last:pb-0">
            <div className="flex items-center">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold mr-3 shrink-0 ${inquiry.color}`}>
                {inquiry.avatar}
              </div>
              <div className="min-w-0 pr-2">
                <p className="text-sm font-medium text-gray-800 truncate">{inquiry.name}</p>
                <p className="text-xs text-gray-500 truncate">{inquiry.details} • {inquiry.time}</p>
              </div>
            </div>
            <button className="px-3 py-1 border border-green-500 text-green-600 rounded-lg text-xs font-medium hover:bg-green-50 transition-colors shrink-0">
              Reply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyerInquiries;

import React from 'react';

const PlaceholderPage = ({ title }) => {
  return (
    <div className="flex items-center justify-center h-full min-h-[60vh]">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
        <p className="text-gray-500">This page is under construction.</p>
      </div>
    </div>
  );
};

export default PlaceholderPage;

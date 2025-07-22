import React from 'react';
import { FaSearch } from 'react-icons/fa';

export const TourSearch = () => {
  return (
    <div className="w-2/5 mx-auto relative">
      <input
        type="text"
        placeholder="Search tours..."
        className="w-full text-black bg-white pl-5 pr-12 py-3 rounded-full   border-black border-2 focus:outline-none focus:ring-1 focus:ring-black"
      />
      <button className="absolute -right-1 top-1/2 -translate-y-1/2 bg-[#0F2E3C] text-white p-5 rounded-full">
        <FaSearch size={16} />
      </button>
    </div>
  );
};

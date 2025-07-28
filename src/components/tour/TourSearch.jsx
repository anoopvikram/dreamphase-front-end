import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const TourSearch = () => {

  useGSAP(() => {
  gsap.from('.search-input ', {
    x: 150,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  });

  gsap.from('.search-button ', {
    scale:2,
    opacity: 0,
    duration: .3,
    ease: 'b',
  },'-=0.1');
}, []);
  return (
    <div className="w-2/5 mx-auto relative search-bar">
      <input
        type="text"
        placeholder="Search tours..."
        className="w-full text-black bg-white pl-5 pr-12 py-3 rounded-full search-input relative z-20 border-black border-2 focus:outline-none focus:ring-1 focus:ring-black"
      />
      <button className="search-button absolute z-30 -right-1 top-1/2 -translate-y-1/2 bg-[#0F2E3C] text-white p-5 rounded-full">
        <FaSearch size={16} />
      </button>
    </div>
  );
};

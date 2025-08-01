import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { fetchDestinations } from '../../api/visaApi'; // adjust path

export const TourSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allCities, setAllCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useGSAP(() => {
    gsap.from('.search-input', { x: 150, opacity: 0, duration: 1, ease: 'power3.out' });
    gsap.from('.search-button', { scale: 2, opacity: 0, duration: 0.3, ease: 'power1.out' }, '-=0.1');
  }, []);

  useEffect(() => {
    fetchDestinations().then(data => {
      const cityNames = data.map(dest => dest.name);
      setAllCities(cityNames);
    });
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 0) {
      const matches = allCities.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCities(matches);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSelect = (city) => {
    setSearchTerm(city);
    setShowDropdown(false);
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    navigate('/tour-details', {
      state: {
        destination: searchTerm.trim(),
        allTripTypes: ['Leisure', 'Business', 'Adventure'], // Example trip types
        tripType: 'Leisure',
      },
    });
  };

  return (
    <div className="w-2/5 mx-auto text-black relative search-bar">
      <input
        type="text"
        placeholder="Search tours..."
        value={searchTerm}
        onChange={handleChange}
        className="w-full text-black bg-white pl-5 pr-12 py-3 rounded-full search-input relative z-20 border-black border-2 focus:outline-none focus:ring-1 focus:ring-black"
      />
      {showDropdown && filteredCities.length > 0 && (
        <ul className="absolute z-40 w-full mt-1 bg-white border rounded-lg max-h-60 overflow-y-auto">
          {filteredCities.map((city, index) => (
            <li
              key={index}
              onClick={() => handleSelect(city)}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            >
              {city}
            </li>
          ))}
        </ul>
      )}
      <button
        className="search-button absolute z-30 -right-1 top-1/2 -translate-y-1/2 bg-[#0F2E3C] text-white p-5 rounded-full"
        onClick={handleSearch}
      >
        <FaSearch size={16} />
      </button>
    </div>
  );
};

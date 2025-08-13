import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaCalendar } from 'react-icons/fa';
import { MdOutlineFlight } from "react-icons/md";
import { BiHomeAlt2 } from "react-icons/bi";
import { getPopularCountries } from '../../api/visaApi';
import { useNavigate } from 'react-router-dom';

export const SearchBar = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [depart, setDepart] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();
  const containerRef = useRef(null); // ref for outside click

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getPopularCountries();
        setCountries(data);
      } catch (err) {
        console.error('Failed to load countries:', err);
      }
    };
    fetchCountries();
  }, []);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setFromSuggestions([]);
        setToSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (!from || !to || !depart || !returnDate) {
      alert('Please fill in all fields');
      return;
    }

    const matched = countries.find(
      (c) => c.name.toLowerCase() === to.toLowerCase()
    );

    if (!matched) {
      alert('Invalid destination selected');
      return;
    }

    navigate(`/visa/${matched.name.toLowerCase()}?from=${from}&depart=${depart}&return=${returnDate}`, {
      state: {
        countryId: matched.id,
        countryName: matched.name,
        from,
        depart,
        return: returnDate,
      }
    });
  };

  const filterSuggestions = (input, setSuggestions) => {
    const filtered = countries
      .map((c) => c.name)
      .filter((name) => name.toLowerCase().startsWith(input.toLowerCase()));
    setSuggestions(filtered.slice(0, 5));
  };

  return (
    <div className="visa-search-bar relative z-[1000] text-black" ref={containerRef}>
      {/* FROM + TO */}
<div className="flex items-center border bg-[#D9D9D9] text-black rounded-xl px-4 py-2 relative z-50">
  {/* FROM */}
  <div className="flex items-center gap-2 relative">
    <BiHomeAlt2 className="w-4 h-4" />  
    <input
      type="text"
      placeholder="Citizen of"
      value={from}
      onChange={(e) => {
        setFrom(e.target.value);
        filterSuggestions(e.target.value, setFromSuggestions);
      }}
      className="bg-transparent outline-none border-none text-sm w-[120px] md:w-[140px] text-black placeholder:text-black"
    />

    {fromSuggestions.length > 0 && (
      <div className="absolute top-full -left-4 mt-1 w-49 bg-white border rounded shadow z-[9999]">
        {fromSuggestions.map((item, i) => (
          <div
            key={i}
            onClick={() => {
              setFrom(item);
              setFromSuggestions([]);
            }}
            className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
          >
            {item}
          </div>
        ))}
      </div>
    )}
  </div>

  <span className="mx-4 h-6 border-l border-black/30" />

  {/* TO */}
  <div className="flex items-center gap-2 relative">
    <MdOutlineFlight className="w-5 h-5 rotate-90" />
    <input
      type="text"
      placeholder="Going to"
      value={to}
      onChange={(e) => {
        setTo(e.target.value);
        filterSuggestions(e.target.value, setToSuggestions);
      }}
      className="bg-transparent outline-none border-none text-sm w-[120px] md:w-[140px] placeholder:text-black"
    />

    {toSuggestions.length > 0 && (
      <div className="absolute top-full -left-4 mt-1 w-50 bg-white border rounded shadow z-[9999]">
        {toSuggestions.map((item, i) => (
          <div
            key={i}
            onClick={() => {
              setTo(item);
              setToSuggestions([]);
            }}
            className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
          >
            {item}
          </div>
        ))}
      </div>
    )}
  </div>
</div>



      {/* DATE SECTION */}
      <div className="z-20 relative visa-search-group">
        <div className="visa-search-side z-20">
          <FaCalendar />
          <input
            type="text"
            placeholder="Travel Date"
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }}
            value={depart}
            onChange={(e) => setDepart(e.target.value)}
            className="visa-search-field placeholder:text-black"
          />
        </div>

        <span className="divider" />

        <div className="visa-search-side">
          <FaCalendar />
          <input
            type="text"
            placeholder="Return Date"
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }}
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="visa-search-field placeholder:text-black"
          />
        </div>
      </div>

      <button className="visa-search-button" onClick={handleSearch}>
        <div className='flex flex-row gap-5 items-center font-medium text-xl'>
          <p className='lg:hidden'>Search</p>
          <FaSearch />
        </div>
      </button>
    </div>
  );
};

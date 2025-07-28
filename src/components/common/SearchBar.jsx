import React, { useState } from 'react';
import { FaHome, FaPlaneDeparture, FaCalendarAlt, FaSearch } from 'react-icons/fa';
import { countryList } from '../../api/visaApi';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { MdOutlineFlight} from "react-icons/md";
import { FaCalendar } from "react-icons/fa6";
import { BiHomeAlt2 } from "react-icons/bi";

export const SearchBar = () => {
  const [params] = useSearchParams();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [depart, setDepart] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const id = params.get('id');

  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!from || !to || !depart || !returnDate) {
      alert('Please fill in all fields');
      return;
    }

    navigate(`/visa/${selectedCountry}?from=${from}&depart=${departDate}&return=${returnDateState}&id=${countryId}`);

    // navigate(`/visa/${to.toLowerCase()}`)
  };

  const filterSuggestions = (input, setSuggestions) => {
    const filtered = countryList.filter((c) =>
      c.toLowerCase().startsWith(input.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 5));
  };

  return (
    <div className="visa-search-bar  text-black">
      {/* FROM + TO */}
      <div className="visa-search-group relative">
        <div className="visa-search-side">
          <BiHomeAlt2 className='w-4 h-4' />
          <input
            type="text"
            placeholder="Home"
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              filterSuggestions(e.target.value, setFromSuggestions);
            }}
            className="visa-search-field text-black placeholder:text-black"
          />
        </div>

        <span className="divider" />

        <div className="visa-search-side">
          <MdOutlineFlight className='w-5 h-5 rotate-90' />
          <input
            type="text"
            placeholder="Going to"
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              filterSuggestions(e.target.value, setToSuggestions);
            }}
            className="visa-search-field placeholder:text-black"
          />
        </div>

        {/* FROM suggestions */}
        {fromSuggestions.length > 0 && (
          <div className="autocomplete-box">
            {fromSuggestions.map((item, i) => (
              <div key={i} onClick={() => {
                setFrom(item);
                setFromSuggestions([]);
              }}>
                {item}
              </div>
            ))}
          </div>
        )}

        {/* TO suggestions */}
        {toSuggestions.length > 0 && (
          <div className="autocomplete-box to-autocomplete">
            {toSuggestions.map((item, i) => (
              <div key={i} onClick={() => {
                setTo(item);
                setToSuggestions([]);
              }}>
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DATE BLOCK */}
<div className="visa-search-group">
  <div className="visa-search-side">
    <FaCalendar/>
    <input
      type="text"
      placeholder="Travel Date"
      onFocus={(e) => (e.target.type = 'date')}
      onBlur={(e) => {
        if (!e.target.value) e.target.type = 'text';
      }}
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
      onBlur={(e) => {
        if (!e.target.value) e.target.type = 'text';
      }}
      value={returnDate}
      onChange={(e) => setReturnDate(e.target.value)}
      className="visa-search-field placeholder:text-black"
    />
  </div>
</div>


      <button className="visa-search-button" onClick={handleSearch}>
        <FaSearch />
      </button>
    </div>
  );
};

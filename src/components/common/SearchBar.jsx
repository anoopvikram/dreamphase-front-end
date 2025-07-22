import React, { useState } from 'react';
import { FaHome, FaPlaneDeparture, FaCalendarAlt, FaSearch } from 'react-icons/fa';
import { countryList } from '../../api/visaApi';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';


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
    <div className="visa-search-bar">
      {/* FROM + TO */}
      <div className="visa-search-group relative">
        <div className="visa-search-side">
          <FaHome />
          <input
            type="text"
            placeholder="From"
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              filterSuggestions(e.target.value, setFromSuggestions);
            }}
            className="visa-search-field"
          />
        </div>

        <span className="divider" />

        <div className="visa-search-side">
          <FaPlaneDeparture />
          <input
            type="text"
            placeholder="To"
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              filterSuggestions(e.target.value, setToSuggestions);
            }}
            className="visa-search-field"
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
    <FaCalendarAlt />
    <input
      type="text"
      placeholder="Travel Date"
      onFocus={(e) => (e.target.type = 'date')}
      onBlur={(e) => {
        if (!e.target.value) e.target.type = 'text';
      }}
      value={depart}
      onChange={(e) => setDepart(e.target.value)}
      className="visa-search-field"
    />
  </div>

  <span className="divider" />

  <div className="visa-search-side">
    <FaCalendarAlt />
    <input
      type="text"
      placeholder="Return Date"
      onFocus={(e) => (e.target.type = 'date')}
      onBlur={(e) => {
        if (!e.target.value) e.target.type = 'text';
      }}
      value={returnDate}
      onChange={(e) => setReturnDate(e.target.value)}
      className="visa-search-field"
    />
  </div>
</div>


      <button className="visa-search-button" onClick={handleSearch}>
        <FaSearch />
      </button>
    </div>
  );
};

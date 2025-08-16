import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { FaPlane, FaSearch } from 'react-icons/fa';
import { FaCalendar } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { VisaCard } from '../../components/visa/VisaCard';
import { getVisaOptions, getPopularCountries } from '../../api/visaApi';

export const VisaTypeSelect = () => {
  const location = useLocation();
  const { country: paramCountry } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [visaOptions, setVisaOptions] = useState([]);
  const [allCountries, setAllCountries] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(paramCountry);
  const [countryId, setCountryId] = useState(location.state?.countryId || null);
  const [countryQuery, setCountryQuery] = useState(paramCountry || '');
  const [suggestions, setSuggestions] = useState([]);
  const [processingType, setProcessingType] = useState('');
  const [filteredVisas, setFilteredVisas] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);

  const from = location.state?.from || params.get('from') || 'India';
  const [departDate, setDepartDate] = useState(location.state?.depart || params.get('depart') || '');
  const [returnDateState, setReturnDateState] = useState(location.state?.return || params.get('return') || '');

  // Fetch all countries (for search suggestions)
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const result = await getPopularCountries();
        setAllCountries(result);
      } catch (err) {
        console.error("Failed to load countries", err);
      }
    };
    fetchCountries();
  }, []);

  // When route param or location provides a country name, set selectedCountry
  useEffect(() => {
    const incomingCountry = location.state?.countryName || paramCountry;
    if (incomingCountry) {
      setSelectedCountry(incomingCountry);
      setCountryQuery(incomingCountry);
    }
  }, [location.state, paramCountry]);

  // If we have a country name but no countryId, try to resolve it from allCountries once they load
  useEffect(() => {
    if (!countryId && selectedCountry && allCountries.length) {
      const matched = allCountries.find(
        (c) => c.name.toLowerCase() === String(selectedCountry).toLowerCase()
      );
      if (matched) {
        setCountryId(matched.id);
      }
    }
  }, [countryId, selectedCountry, allCountries]);

  // Helper: fetch visa options for a country id and set filtered/complete lists
  const fetchVisasForCountry = async (cId) => {
    try {
      const res = await getVisaOptions(cId);
      const allVisas = res.visa_options || [];
      setVisaOptions(allVisas);
      const filtered = allVisas.filter((visa) =>
        !processingType || visa.processingTime === processingType
      );
      setFilteredVisas(filtered);
    } catch (err) {
      console.error("Failed to load visa options:", err);
      setVisaOptions([]);
      setFilteredVisas([]);
    }
  };

  // If a countryId is present on page load (or becomes present), fetch visas immediately
  useEffect(() => {
    if (countryId) {
      fetchVisasForCountry(countryId);
      setSearchClicked(true);
    }
  }, [countryId]); // runs when countryId changes (including initial)

  // Update filteredVisas when processingType or visaOptions change
  useEffect(() => {
    if (visaOptions.length) {
      const filtered = visaOptions.filter((visa) =>
        !processingType || visa.processingTime === processingType
      );
      setFilteredVisas(filtered);
    }
  }, [processingType, visaOptions]);

  const handleSuggestionClick = (name, id) => {
    setSelectedCountry(name);
    setCountryQuery(name);
    setSuggestions([]);
    setCountryId(id); // triggers fetch via effect above
  };

  const handleSearch = async () => {
    if (!selectedCountry || !countryId) {
      alert("Please select a country");
      return;
    }

    try {
      await fetchVisasForCountry(countryId);
      setSearchClicked(true);

      navigate(`/visa/${selectedCountry.toLowerCase()}?from=${from}&depart=${departDate}&return=${returnDateState}`, {
        state: {
          countryId,
          countryName: selectedCountry,
        },
      });

    } catch (err) {
      console.error("Failed to load visa options:", err);
    }
  };

  return (
    <div className="flex flex-col bg-white text-black px-6 py-8 space-y-6 pt-30">
      {/* Route Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-center mx-auto w-fit gap-2 text-xl font-bold bg-[#D9D9D9] py-3 px-8 border-black border-2 rounded-full">
          <span>{from}</span>
          <FaPlane className="text-black" />
          <span>{selectedCountry}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="w-3/4 mx-auto flex flex-col md:flex-row gap-4 items-center justify-start relative">
        {/* Country Autocomplete */}
        <div className="min-w-[239px] relative">
          <input
            type="text"
            placeholder="Search Countries"
            value={countryQuery}
            onChange={(e) => {
              const input = e.target.value;
              setCountryQuery(input);
              const matches = allCountries.filter((c) =>
                c.name.toLowerCase().startsWith(input.toLowerCase())
              );
              setSuggestions(matches.slice(0, 5));
            }}
            className="px-4 py-2 rounded-lg bg-white border-[#0062CC] w-full border focus:outline-0"
          />
          {suggestions.length > 0 && (
            <div className="absolute left-0 top-full mt-1 border w-full z-10 rounded-2xl bg-white shadow">
              {suggestions.map((c, i) => (
                <div
                  key={i}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(c.name, c.id)}
                >
                  {c.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Processing Type Dropdown */}
        <div className="relative min-w-[239px] border bg-white border-[#0062CC] rounded-lg">
          <select
            value={processingType}
            onChange={(e) => setProcessingType(e.target.value)}
            className="px-2 py-2 min-w-[239px] focus:outline-0"
          >
            <option value="">All Processing Types</option>
            <option value="standard">Standard</option>
            <option value="priority">Priority</option>
          </select>
          <IoMdArrowDropdown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800 pointer-events-none" />
        </div>

        {/* Departure */}
        <div className="flex flex-row min-w-[135px] border items-center rounded-lg bg-white border-[#0062CC] px-3 gap-3 py-1 text-sm text-gray-700">
          <FaCalendar className="text-black" size={20} />
          <div className="flex flex-col w-full text-xs">
            <span className="text-xs font-semibold mb-0">Departure Date:</span>
            <input
              type="date"
              value={departDate}
              onChange={(e) => setDepartDate(e.target.value)}
              className="text-gray-700 focus:outline-0"
            />
          </div>
        </div>

        {/* Return */}
        <div className="flex flex-row items-center min-w-[135px] border gap-3 rounded-lg bg-white border-[#0062CC] px-3 py-1 text-sm text-gray-700">
          <FaCalendar className="text-black" size={20} />
          <div className="flex flex-col w-full text-xs">
            <span className="text-xs font-semibold mb-0">Return Date:</span>
            <input
              type="date"
              value={returnDateState}
              onChange={(e) => setReturnDateState(e.target.value)}
              className="text-gray-700 focus:outline-0"
            />
          </div>
        </div>

        {/* Search */}
        <button
          onClick={handleSearch}
          className="relative flex items-center gap-2 bg-[#0068A3] text-white px-3 py-3 rounded-full hover:bg-blue-700 w-auto"
        >
          <FaSearch />
        </button>
      </div>

      {/* Visa Cards */}
      <div className="flex flex-col gap-6 w-full lg:w-3/4 mx-auto">
        {filteredVisas.length > 0 ? (
          filteredVisas.map((visa, i) => (
            <VisaCard
              key={i}
              visa={visa}
              onApply={() =>
                navigate(`/visa/apply/${selectedCountry.toLowerCase()}/${visa.name.toLowerCase().replace(/\s+/g, '-')}`, {
                  state: {
                    from,
                    to: selectedCountry,
                    depart: departDate,
                    return: returnDateState,
                    visa,
                  },
                })
              }
            />
          ))
        ) : (
          <p className="text-center text-gray-500 text-sm">No visa options found.</p>
        )}
      </div>
    </div>
  );
};

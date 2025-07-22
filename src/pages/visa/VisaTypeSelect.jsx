    import React, { useState, useEffect } from 'react';
    import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
    import { FaPlane, FaCalendarAlt, FaSearch } from 'react-icons/fa';
    import { VisaCard } from '../../components/visa/VisaCard';
    import { countryList } from '../../api/visaApi';
    import ImageCarousel from '../../components/visa/ImageCarousel';
    import { getVisaOptions } from '../../api/visaApi';
import { useLocation } from 'react-router-dom';

export const VisaTypeSelect = () => {
      const location = useLocation(); // 👈 move this to top
      const { country: paramCountry } = useParams();
      const [params] = useSearchParams();
      const navigate = useNavigate();
      const countryId = location.state?.countryId;
      const countryName = location.state?.countryName;
      const [visaOptions, setVisaOptions] = useState([]);

        console.log("➡️ location.state:", location.state);
  console.log("➡️ paramCountry:", paramCountry);
  console.log("➡️ final countryId used:", countryId);


      const from = params.get('from') || 'India';
      const depart = params.get('depart') || '2025-08-01';
      const returnDate = params.get('return') || '2025-08-15';

      const [selectedCountry, setSelectedCountry] = useState(paramCountry);
      const [countryQuery, setCountryQuery] = useState('');
      const [suggestions, setSuggestions] = useState([]);
      const [processingType, setProcessingType] = useState('');
      const [filteredVisas, setFilteredVisas] = useState([]);
      const [searchClicked, setSearchClicked] = useState(false);

      const [departDate, setDepartDate] = useState(depart);
      const [returnDateState, setReturnDateState] = useState(returnDate);

      const handleSearch = () => {
        if (!selectedCountry) return;

        const filtered = visaOptions.filter((visa) =>
          !processingType || visa.processingTime === processingType
        );

        setFilteredVisas(filtered);
        setSearchClicked(true);
        navigate(`/visa/${selectedCountry}?from=${from}&depart=${departDate}&return=${returnDateState}`);
      };

      const handleSuggestionClick = (name) => {
        setSelectedCountry(name);
        setCountryQuery(name);
        setSuggestions([]);
      };

      useEffect(() => {
        if (paramCountry) {
          setSelectedCountry(paramCountry);
          setCountryQuery(paramCountry);
          handleSearch();
        }
      }, [paramCountry]);

      useEffect(() => {
        if (!countryId) return;
        const fetch = async () => {
          try {
            const res = await getVisaOptions(countryId);
            setVisaOptions(res.visa_options);
          } catch (err) {
            console.error('Failed to load visa options:', err);
          }
        };
        fetch();
      }, [countryId]);

      return (
        <div className="min-h-screen flex flex-col bg-white text-black px-6 py-8 space-y-6 pt-30">
          
          {/* Header: From ➝ To above Carousel */}
          <div className="flex flex-col gap-4">
            {/* Route Info */}
            <div className="flex items-center justify-center mx-auto w-fit gap-2 text-xl font-bold bg-[#D9D9D9] py-3 px-8 border-black border-2 rounded-full">
              <span>{from}</span>
              <FaPlane className="text-black" />
              <span>{selectedCountry || paramCountry}</span>
            </div>

            <ImageCarousel/>
          </div>

          {/* Filters */}
          <div className="w-3/4 mx-auto flex flex-col md:flex-row gap-4 items-center justify-start relative">
            {/* Country Search with Suggestions */}
            <div className="w-full md:w-[22%] p-0 relative">
              <input
                type="text"
                placeholder="Search Countries"
                value={countryQuery}
                onChange={(e) => {
                  setCountryQuery(e.target.value);
                  const matches = countryList.filter((c) =>
                    c.toLowerCase().startsWith(e.target.value.toLowerCase())
                  );
                  setSuggestions(matches.slice(0, 5));
                }}
                className="px-4 py-4 rounded-2xl bg-[#D9D9D9] w-full border-1"
              />
              {suggestions.length > 0 && (
                <div className="absolute left-0 top-full mt-1 border w-full z-10 rounded-2xl bg-white shadow">
                  {suggestions.map((c, i) => (
                    <div
                      key={i}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSuggestionClick(c)}
                    >
                      {c}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Processing Type */}
            <select
              value={processingType}
              onChange={(e) => setProcessingType(e.target.value)}
              className="px-4 py-4  border rounded-2xl bg-[#D9D9D9] w-full md:w-[22%]"
            >
              <option value="">All Processing Types</option>
              <option value="standard">Standard</option>
              <option value="priority">Priority</option>
            </select>

    {/* Departure Date */}
    <div className="flex flex-row w-full md:w-[22%] border items-center rounded-2xl bg-[#D9D9D9] px-3 gap-3 py-2 text-sm text-gray-700">
      <FaCalendarAlt className="text-black mb-2" />
      <div className="flex flex-col w-full">
        <span className="font-semibold mb-0">Departure Date: </span>
        <input
          type="date"
          value={departDate}
          onChange={(e) => setDepartDate(e.target.value)}
          className="text-gray-700"
        />
      </div>
    </div>

    {/* Return Date */}
    <div className="flex flex-row items-center w-full md:w-[20%] border gap-3 rounded-2xl bg-[#D9D9D9] px-3 py-2 text-sm  text-gray-700">
      <FaCalendarAlt className="text-black mb-2" />
      <div className="flex flex-col w-full">
        <span className="font-semibold mb-0">Return Date: </span>
        <input
          type="date"
          value={returnDateState}
          onChange={(e) => setReturnDateState(e.target.value)}
          className="text-gray-700"
        />
      </div>
    </div>


            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="relative flex items-center gap-2 bg-[#0068A3] text-white px-3 py-3 rounded-full hover:bg-blue-700 w-full md:w-auto"
            >
              <FaSearch />
            </button>
          </div>

          {/* Visa Cards */}
          <div className="flex flex-col gap-6 w-full md:w-3/4 mx-auto">
  {visaOptions.length > 0 ? (
    visaOptions.map((visa, i) => (
      <VisaCard
        key={i}
        visa={visa}
        onApply={() =>
          navigate(
            `/visa/apply/${selectedCountry.toLowerCase()}/${visa.type.toLowerCase().replace(/\s+/g, '-')}`,
            {
              state: {
                from,
                to: selectedCountry,
                depart: departDate,
                return: returnDateState,
                visa,
              },
            }
          )
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

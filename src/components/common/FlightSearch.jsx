// File: src/components/flights/FlightSearch.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaDotCircle } from 'react-icons/fa';
import { MdOutlineRadioButtonUnchecked } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDOM from 'react-dom';

const FlightSearch = ({
  // legacy props kept, but variant will override defaults for return page
  tripOptions = ['one-way', 'round-trip', 'multi-city'],
  travelerLabel = 'Travelers & Class',
  showClass = true,
  showPurpose = false,
  variant = 'flight', // "flight" (default) or "return"
}) => {
  // Apply variant overrides (only necessary changes)
  const isReturn = variant === 'return';
  const localTripOptions = isReturn ? ['return', 'round-trip'] : tripOptions;
  const localTravelerLabel = isReturn ? 'No. of Travelers' : travelerLabel;
  const localShowClass = isReturn ? false : showClass;
  const localShowPurpose = isReturn ? true : showPurpose;
  const showSearchButton = isReturn ? false : true;

  const [tripType, setTripType] = useState(localTripOptions[0]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  // react-datepicker uses Date | null
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  // Travelers
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const totalTravelers = adults + children + infants;

  const [travelClass, setTravelClass] = useState('Economy');
  const [purpose, setPurpose] = useState('Travelling');

  const [travelerPopupOpen, setTravelerPopupOpen] = useState(false);
  const travelerRef = useRef(null);
  const popupRef = useRef(null);

  // purpose dropdown state for return variant (inline)
  const [purposeOpen, setPurposeOpen] = useState(false);
  const purposeRef = useRef(null);

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  // helper: format date into day, month, year
  const formatParts = (date) => {
    if (!date) return null;
    const optionsDay = { day: '2-digit' };
    const optionsMonthYear = { month: 'short', year: 'numeric' };
    return {
      day: new Intl.DateTimeFormat('en-US', optionsDay).format(date),
      monthYear: new Intl.DateTimeFormat('en-US', optionsMonthYear).format(date),
    };
  };

  // Custom input for react-datepicker
  const DateDisplay = React.forwardRef(({ onClick, label, selected }, ref) => {
    const parts = selected ? formatParts(selected) : null;

    return (
      <button
        type="button"
        onClick={onClick}
        ref={ref}
        className="cursor-pointer w-full text-center"
      >
        <label className=" text-xl text-gray-300">{label}</label>
        <div className="mt-1 bg-transparent px-4 py-2 rounded-md min-w-[120px]">
          {parts ? (
            <div className="flex flex-row items-center gap-2 justify-start">
              <span className="text-3xl font-bold text-white leading-tight">
                {parts.day}
              </span>
              <span className="text-sm text-white/80">{parts.monthYear}</span>
            </div>
          ) : (
            <p className="text-white/60">Select date</p>
          )}
        </div>
      </button>
    );
  });
  DateDisplay.displayName = 'DateDisplay';

  // Close popup(s) on outside click (traveler popup + purpose dropdown)
  useEffect(() => {
    const onDocClick = (e) => {
      // traveler popup
      if (
        travelerRef.current &&
        !travelerRef.current.contains(e.target) &&
        popupRef.current &&
        !popupRef.current.contains(e.target)
      ) {
        setTravelerPopupOpen(false);
      }

      // purpose dropdown
      if (purposeRef.current && !purposeRef.current.contains(e.target)) {
        setPurposeOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  return (
    <div className="landing-options z-20 bg-opacity-40 backdrop-blur-sm rounded-xl p-5 w-11/12 max-w-6xl mx-auto mt-5 md:-mt-10 lg:-mt-16 text-white">
      {/* Trip Type */}
      <div className="selectors flex gap-4 mb-6">
        {localTripOptions.map((type) => (
          <button
            key={type}
            onClick={() => setTripType(type)}
            className={`text-sm px-4 py-2 rounded-full border flex items-center gap-2 ${
              tripType === type ? 'bg-[#164B71] border-[#164B71]' : 'border-gray-400'
            }`}
          >
            <span>{tripType === type ? <FaDotCircle /> : <MdOutlineRadioButtonUnchecked />}</span>
            {type === 'one-way' && 'One Way'}
            {type === 'round-trip' && 'Round Trip'}
            {type === 'multi-city' && 'Multi-City'}
            {type === 'return' && 'Return'}
            {type === 'rounded-trip' && 'Rounded Trip'}
          </button>
        ))}
      </div>

      {/* Selection Area */}
      <div className="grid grid-cols-2 xl:grid-cols-5 bg-black/60 rounded-3xl px-5 py-10 gap-4 items-center text-sm">
        {/* From - To */}
        <div className="col-span-2 flex items-center gap-10 border-r-2 border-white/60 pr-6">
          <div className="flex flex-col gap-5">
            <p className="text-xl">From</p>
            <div className="flex flex-col">
              <span className="uppercase text-2xl text-gray-300">Departure</span>
              <input
                type="text"
                placeholder="Location, Country"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="bg-transparent w-40 focus:outline-0 text-white"
              />
            </div>
          </div>

          <div className="swap-button">
            <img
              src="/images/icons/swap.png"
              className="min-w-[50px] max-w-[50px] bg-white rounded-full p-2 -ml-4 cursor-pointer"
              onClick={handleSwap}
              alt="swap"
            />
          </div>

          <div className="flex flex-col gap-5">
            <p className="text-xl">To</p>
            <div className="flex flex-col">
              <span className="uppercase text-2xl text-gray-300">Arrival</span>
              <input
                type="text"
                placeholder="Location, Country"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="bg-transparent w-40 focus:outline-0 text-white"
              />
            </div>
          </div>
        </div>

        {/* Departure */}
        <div className="flex flex-col gap-2 border-r-2 border-white/60 pr-6 justify-center items-center h-full">
          <DatePicker
            selected={departureDate}
            onChange={(date) => setDepartureDate(date)}
            customInput={<DateDisplay label="Departure" selected={departureDate} />}
            popperPlacement="bottom-start"
            minDate={new Date()}
          />
        </div>

        {/* Return */}
        <div className="flex flex-col gap-2 border-r-2 border-white/60 pr-6 justify-center items-center h-full">
          <DatePicker
            selected={returnDate}
            onChange={(date) => setReturnDate(date)}
            customInput={<DateDisplay label="Return" selected={returnDate} />}
            popperPlacement="bottom-start"
            minDate={departureDate || new Date()}
          />
        </div>

        {/* Travelers / Class / Purpose */}
        <div className="flex h-full items-center justify-between relative">
          <div>
            {/* Main display differs for return variant */}
            {!isReturn ? (
              <div
                className="cursor-pointer"
                onClick={() => setTravelerPopupOpen((s) => !s)}
                ref={travelerRef}
              >
                <p className="uppercase text-xl text-gray-300">
                  {localTravelerLabel} {totalTravelers}
                </p>
                {localShowClass && <p className="text-sm">{travelClass}</p>}
                {localShowPurpose && <p className="text-sm">{purpose}</p>}
              </div>
            ) : (
              // Return layout: show No. of Travelers (big) and Purpose selector inline
              <div className="w-full flex flex-col gap-4 ">
                <div className="flex items-center justify-between">
                  <p className=" text-xl text-gray-300">{localTravelerLabel}</p>
                  <p className="text-4xl font-bold">{totalTravelers}</p>
                </div>

                <div className="flex items-center gap-2 justify-between">
                  <p className="uppercase text-sm text-gray-300">Purpose</p>

                  <div className="relative" ref={purposeRef}>
                    <button
                      type="button"
                      onClick={() => setPurposeOpen((s) => !s)}
                      className="bg-[#164B71] text-white px-4 py-2 rounded-md flex items-center gap-2"
                    >
                      <span className="capitalize">{purpose}</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="ml-1">
                        <path d="M6 9l6 6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>

                    {purposeOpen && (
                      <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-44 z-50 overflow-hidden">
                        {['Travelling', 'Business', 'Education', 'Other'].map((opt) => (
                          <div
                            key={opt}
                            onClick={() => { setPurpose(opt); setPurposeOpen(false); }}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Traveler popup (for changing counts & class) - only for non-return where class exists */}
            {!isReturn && travelerPopupOpen &&
              ReactDOM.createPortal(
                <div
                  ref={popupRef}
                  className="absolute right-0 mt-3 bg-white text-black rounded-lg shadow-lg p-4 w-64 z-50"
                  style={{
                    position: 'absolute',
                    top: travelerRef.current?.getBoundingClientRect().bottom + window.scrollY + 8,
                    left: travelerRef.current?.getBoundingClientRect().right - 256 + window.scrollX,
                  }}
                >
                  <div className="flex flex-col gap-3">
                    {/* Travelers */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-600">Adults</p>
                        <p className="text-sm">Age 12+</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="px-2 py-1 rounded-full border" onClick={() => setAdults((a) => Math.max(1, a - 1))}>-</button>
                        <span className="w-6 text-center">{adults}</span>
                        <button className="px-2 py-1 rounded-full border" onClick={() => setAdults((a) => a + 1)}>+</button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-600">Children</p>
                        <p className="text-sm">Age 2-11</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="px-2 py-1 rounded-full border" onClick={() => setChildren((c) => Math.max(0, c - 1))}>-</button>
                        <span className="w-6 text-center">{children}</span>
                        <button className="px-2 py-1 rounded-full border" onClick={() => setChildren((c) => c + 1)}>+</button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-600">Infants</p>
                        <p className="text-sm">Under 2</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="px-2 py-1 rounded-full border" onClick={() => setInfants((i) => Math.max(0, i - 1))}>-</button>
                        <span className="w-6 text-center">{infants}</span>
                        <button className="px-2 py-1 rounded-full border" onClick={() => setInfants((i) => i + 1)}>+</button>
                      </div>
                    </div>

                    {/* Class Dropdown */}
                    {localShowClass && (
                      <div className="pt-2">
                        <label className="block text-xs text-gray-600 mb-1">Class</label>
                        <select className="w-full border px-2 py-1 rounded" value={travelClass} onChange={(e) => setTravelClass(e.target.value)}>
                          <option>Economy</option>
                          <option>Business</option>
                          <option>First</option>
                        </select>
                      </div>
                    )}

                    <div className="flex justify-end pt-3">
                      <button className="px-4 py-2 rounded bg-[#164B71] text-white" onClick={() => setTravelerPopupOpen(false)}>Done</button>
                    </div>
                  </div>
                </div>,
                document.body
              )}
          </div>

          {/* Search Button → Only show in flight variant */}
          {showSearchButton && (
            <button className="bg-[#164B71] text-white px-8 py-4 rounded-full self-end ">
              <FaSearch />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;

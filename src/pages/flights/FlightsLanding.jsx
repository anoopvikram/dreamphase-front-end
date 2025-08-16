import React, { useState, useRef, useEffect } from 'react';
import { LandingHero } from '../../components/common/LandingHero';
import { FaExchangeAlt, FaSearch, FaPlaneDeparture, FaPlaneArrival, FaDotCircle } from 'react-icons/fa';
import { MdOutlineRadioButtonUnchecked } from 'react-icons/md';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

/**
 * FlightsLanding
 * - Replaces native date inputs with react-datepicker + custom clickable display.
 * - Adds Travelers & Class popup (adults/children/infants + class dropdown).
 * - Only necessary changes applied; other logic kept intact.
 */

export const FlightsLanding = () => {
  const blurVariants = {
    initial: { opacity: 1, filter: 'blur(5px)' },
    animate: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.6, ease: 'easeOut' } },
    exit: { opacity: 1, filter: 'blur(5px)', transition: { duration: 0.6, ease: 'easeIn' } },
  };

  const [tripType, setTripType] = useState('one-way');
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

  const [travelerPopupOpen, setTravelerPopupOpen] = useState(false);
  const travelerRef = useRef(null);

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  // Format date to: 14 May ‘25  (uses left single quotation mark U+2018)
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const day = `${d.getDate()}`;
    const month = d.toLocaleString('default', { month: 'short' });
    const year = d.getFullYear().toString().slice(-2);
    return `${day} ${month} \u2018${year}`;
  };

  // Close popup on outside click
  useEffect(() => {
    const onDocClick = (e) => {
      if (travelerRef.current && !travelerRef.current.contains(e.target)) {
        setTravelerPopupOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  // Custom input for react-datepicker to render styled clickable display
  const DateDisplay = React.forwardRef(({ value, onClick, label }, ref) => (
    <div onClick={onClick} ref={ref} className="cursor-pointer">
      <label className="uppercase text-xl text-gray-300">{label}</label>
      <div className="mt-1 bg-transparent border border-white/40 px-4 py-2 rounded-md min-w-[120px]">
        {value ? (
          <p className="text-white text-base">{value}</p>
        ) : (
          <p className="text-white/60">Select date</p>
        )}
      </div>
    </div>
  ));
  DateDisplay.displayName = 'DateDisplay';

  return (
    <motion.div variants={blurVariants} initial="initial" animate="animate" exit="exit">
      <div className="flight-landing flex flex-col overflow-y-auto mb-10 bg-white">
        <div className="relative z-10">
          <LandingHero activeTab="Flight" />
        </div>

        <div className="landing-options z-20 bg-opacity-40 backdrop-blur-sm rounded-xl p-5 w-11/12 max-w-6xl mx-auto mt-5 md:-mt-10 lg:-mt-16 text-white">
          {/* Trip Type */}
          <div className="selectors flex gap-4 mb-6">
            {['one-way', 'round-trip', 'multi-city'].map((type) => (
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
              </button>
            ))}
          </div>

          {/* Selection Area */}
          <div className="grid grid-cols-2 xl:grid-cols-5 bg-black/60 rounded-3xl px-5 py-10 gap-4 items-center text-sm">
            {/* From - To */}
            <div className="col-span-2 flex items-center gap-10">
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
            <div className="flex flex-col gap-2">
              <DatePicker
                selected={departureDate}
                onChange={(date) => setDepartureDate(date)}
                customInput={<DateDisplay label="Departure" />}
                popperPlacement="bottom-start"
                minDate={new Date()}
                renderCustomHeader={({ date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => null}
              />
              {departureDate && <p className="text-sm mt-2">{formatDate(departureDate)}</p>}
            </div>

            {/* Return */}
            <div className="flex flex-col gap-2">
              <DatePicker
                selected={returnDate}
                onChange={(date) => setReturnDate(date)}
                customInput={<DateDisplay label="Return" />}
                popperPlacement="bottom-start"
                minDate={departureDate || new Date()}
                renderCustomHeader={({ date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => null}
              />
              {returnDate && <p className="text-sm mt-2">{formatDate(returnDate)}</p>}
            </div>

            {/* Travelers & Class */}
            <div className="flex items-center justify-between relative">
              <div>
                <div
                  className="cursor-pointer"
                  onClick={() => setTravelerPopupOpen((s) => !s)}
                  ref={travelerRef}
                >
                  <p className="uppercase text-xl text-gray-300">Travelers & Class {totalTravelers}</p>
                  <p className="text-sm">{travelClass}</p>
                </div>

                {travelerPopupOpen && (
                  <div className="absolute right-0 mt-3 bg-white text-black rounded-lg shadow-lg p-4 w-64 z-50">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-600">Adults</p>
                          <p className="text-sm">Age 12+</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            className="px-2 py-1 rounded-full border"
                            onClick={() => setAdults((a) => Math.max(1, a - 1))}
                          >
                            -
                          </button>
                          <span className="w-6 text-center">{adults}</span>
                          <button className="px-2 py-1 rounded-full border" onClick={() => setAdults((a) => a + 1)}>
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-600">Children</p>
                          <p className="text-sm">Age 2-11</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="px-2 py-1 rounded-full border" onClick={() => setChildren((c) => Math.max(0, c - 1))}>
                            -
                          </button>
                          <span className="w-6 text-center">{children}</span>
                          <button className="px-2 py-1 rounded-full border" onClick={() => setChildren((c) => c + 1)}>
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-600">Infants</p>
                          <p className="text-sm">Under 2</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="px-2 py-1 rounded-full border" onClick={() => setInfants((i) => Math.max(0, i - 1))}>
                            -
                          </button>
                          <span className="w-6 text-center">{infants}</span>
                          <button className="px-2 py-1 rounded-full border" onClick={() => setInfants((i) => i + 1)}>
                            +
                          </button>
                        </div>
                      </div>

                      <div className="pt-2">
                        <label className="block text-xs text-gray-600 mb-1">Class</label>
                        <select className="w-full border px-2 py-1 rounded" value={travelClass} onChange={(e) => setTravelClass(e.target.value)}>
                          <option>Economy</option>
                          <option>Business</option>
                          <option>First</option>
                        </select>
                      </div>

                      <div className="flex justify-end pt-3">
                        <button className="px-4 py-2 rounded bg-[#164B71] text-white" onClick={() => setTravelerPopupOpen(false)}>
                          Done
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button className="bg-[#164B71] text-white p-3 rounded-full">
                <FaSearch />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

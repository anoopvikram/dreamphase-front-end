import React, { useState } from 'react';
import { LandingHero } from '../../components/common/LandingHero';
import { FaExchangeAlt, FaSearch, FaPlaneDeparture, FaPlaneArrival, FaDotCircle } from 'react-icons/fa';
import { MdOutlineRadioButtonUnchecked } from 'react-icons/md';

export const FlightsLanding = () => {
  const [tripType, setTripType] = useState('one-way');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [travelerCount, setTravelerCount] = useState(1);
  const [travelClass, setTravelClass] = useState('Economy');

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} '${date.getFullYear().toString().slice(-2)}`;
  };

  return (
    <div className="flight-landing flex flex-col overflow-y-auto  bg-white">
      <div className="relative z-10">
        <LandingHero activeTab="Flight"/>
      </div>

      <div className="landing-options z-20  bg-opacity-40 backdrop-blur-sm rounded-xl p-5 w-11/12 max-w-6xl mx-auto mt-5 md:-mt-10 lg:-mt-16 text-white">
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

            <div className='swap-button'>
              <img src='/images/icons/swap.png' className='min-w-[50px] max-w-[50px] bg-white rounded-full p-2 -ml-4' onClick={handleSwap}/>
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
  <label className="uppercase text-xl text-gray-300">Departure</label>
  <input
  type="date"
  value={departureDate}
  onChange={(e) => setDepartureDate(e.target.value)}
  className="bg-transparent border border-white/40 px-3 py-1 rounded-md text-white appearance-none cursor-pointer"
/>
  {departureDate && <p className="text-sm">{formatDate(departureDate)}</p>}
</div>

{/* Return */}
<div className="flex flex-col gap-2">
  <label className="uppercase text-xl text-gray-300">Return</label>
  <input
    type="date"
    value={returnDate}
    onChange={(e) => setReturnDate(e.target.value)}
    className="bg-transparent border border-white/40 px-3 py-1 rounded-md text-white appearance-none cursor-pointer"
  />
  {returnDate && <p className="text-sm">{formatDate(returnDate)}</p>}
</div>

          {/* Travelers & Class */}
          <div className="flex items-center justify-between">
            <div>
              <p className="uppercase text-xl text-gray-300">Travelers & Class</p>
              <div className="flex items-center gap-2 mb-2">
                <button
                  onClick={() => setTravelerCount(Math.max(1, travelerCount - 1))}
                  className="text-white px-2 rounded-full"
                >
                  -
                </button>
                <span className='text-xl'>{travelerCount}</span>
                <button
                  onClick={() => setTravelerCount(travelerCount + 1)}
                  className="text-white px-2 rounded-full"
                >
                  +
                </button>
              </div>
              <select
                value={travelClass}
                onChange={(e) => setTravelClass(e.target.value)}
                className="bg-transparent text-white"
              >
                {['Economy', 'Business', 'First'].map((cls) => (
                  <option key={cls} value={cls} className="text-black">
                    {cls}
                  </option>
                ))}
              </select>
            </div>

            <button className="bg-[#164B71] text-white p-3 rounded-full">
              <FaSearch />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

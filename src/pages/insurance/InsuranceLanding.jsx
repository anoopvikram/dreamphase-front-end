import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LandingHero } from '../../components/common/LandingHero';

export const InsuranceLanding = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [duration, setDuration] = useState(0);
  const [isMultiTrip, setIsMultiTrip] = useState(false);
  const [travelerCount, setTravelerCount] = useState(1);
  const [travelers, setTravelers] = useState([{ dob: '' }]);
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [showSecondBox, setShowSecondBox] = useState(false); // 🔵 NEW
  const navigate = useNavigate(); // 🔵 NEW

    useEffect(() => {
  setTravelers((prev) => {
    const updated = [...prev];
    while (updated.length < travelerCount) updated.push({ dob: '' });
    while (updated.length > travelerCount) updated.pop();
    return updated;
  });
}, [travelerCount]);

const handleDOBChange = (index, value) => {
  const updated = [...travelers];
  updated[index].dob = value;
  setTravelers(updated);
};

const calculateAge = (dob) => {
  if (!dob) return 0;
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
};

  const calculateDuration = (start, end) => {
    if (!start || !end) return 0;

    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    const diff = endTime - startTime;

    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const handleDateChange = (type, value) => {
    if (type === 'start') {
      setStartDate(value);
      setDuration(calculateDuration(value, endDate));
    } else {
      setEndDate(value);
      setDuration(calculateDuration(startDate, value));
    }
  };

    const handleContinue = () => {
    setShowSecondBox(true);
  };

  const handleSubmit = () => {
    // Optional: You can validate fields here before navigating
    navigate('/insurance/plan'); // Change this path as per your route setup
  };

  return (
    <div className='insurance-landing flex flex-col overflow-y-auto h-screen bg-white'>
      <div className='relative z-10'>
        <LandingHero activeTab='Insurance' />
      </div>

      {/* FIRST BOX */}
      <div className="first-box z-50 w-[90%] max-w-5xl mx-auto -mt-10 bg-white border border-[#a9c6f5] rounded-2xl p-6 shadow-sm space-y-6">
        {/* Top row: Region and Country */}
        <div className="flex flex-row w-1/2 gap-10">
          <div className="flex flex-col w-full md:w-1/2">
            <label className="text-sm font-semibold text-[#4b4b4b] mb-1">
              Travel Region<span className="text-red-500">*</span>
            </label>
            <select className="border border-[#a9c6f5] rounded-lg px-4 py-2 text-sm focus:outline-blue-400">
              <option value="">Select Travel Region</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
            </select>
          </div>
          <div className="flex flex-col w-full md:w-1/2">
            <label className="text-sm font-semibold text-[#4b4b4b] mb-1">
              Country of Visit<span className="text-red-500">*</span>
            </label>
            <select className="border border-[#a9c6f5] rounded-lg px-4 py-2 text-sm focus:outline-blue-400">
              <option value="">Select Country</option>
              <option value="Germany">Germany</option>
              <option value="USA">USA</option>
            </select>
          </div>
        </div>

        {/* Middle: Toggle and Note */}
        <div>
          <p className="font-semibold text-[#4b4b4b]">Do you travel multiple times a year?</p>
          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={() => setIsMultiTrip((prev) => !prev)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${
                isMultiTrip ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition duration-300 ${
                  isMultiTrip ? 'translate-x-5' : 'translate-x-0'
                }`}
              ></div>
            </button>
            <p className="text-xs text-gray-600">
              Note: The Multi-Trip Plan covers a maximum of 60 days per trip.
            </p>
          </div>
        </div>

        {/* Dates and Duration */}
        <div className="flex flex-wrap md:flex-nowrap items-end justify-between gap-6 w-full">
          {/* Start Date */}
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-sm font-semibold text-[#4b4b4b] mb-1">
              Start Date<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => handleDateChange('start', e.target.value)}
              className="border text-black border-[#a9c6f5] rounded-lg px-4 py-2 text-sm"
            />
          </div>

          {/* End Date */}
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-sm font-semibold text-[#4b4b4b] mb-1">
              End Date<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => handleDateChange('end', e.target.value)}
              className="border text-black border-[#a9c6f5] rounded-lg px-4 py-2 text-sm"
            />
          </div>

          {/* Duration */}
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-sm font-semibold text-[#4b4b4b] mb-0">Duration</label>
            <p className="text-sm py-2 px-1 text-black rounded-lg">
              {duration} {duration === 1 ? 'day' : 'days'}
            </p>
          </div>

          {/* Continue Button */}
          <div className="mt-6 md:mt-0">
            <button
              onClick={handleContinue}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              CONTINUE
            </button>
          </div>
        </div>

        <p className="text-xs text-center text-gray-500 mt-2">
          Note: Overseas Travel Insurance is only valid for Indian passport holders, commencing their journey from India.
        </p>
      </div>

      {/* SECOND BOX */}
        {showSecondBox && (
        <div className="second-box text-black z-50 w-[90%] max-w-5xl mx-auto bg-white border border-[#a9c6f5] rounded-2xl p-6 shadow-sm space-y-6 my-10">
          

        {/* Traveler Count */}
        <div className="sb-top flex flex-col">
            <label className="text-sm font-semibold mb-2">Number Of Traveller</label>
            <div className="flex items-center gap-4 border border-[#a9c6f5] w-fit rounded-full px-4 py-2">
            <button onClick={() => setTravelerCount(prev => Math.max(1, prev - 1))} className="text-lg font-bold">−</button>
            <div className="flex items-center gap-2 text-sm">
                <span>👤</span>
                <span>{travelerCount}</span>
            </div>
            <button onClick={() => setTravelerCount(prev => prev + 1)} className="text-lg font-bold">+</button>
            </div>
        </div>

        {/* DOB Inputs */}
        <div className="sb-middle flex flex-wrap gap-6">
            {travelers.map((traveler, index) => (
            <div key={index} className="flex flex-col">
                <label className="text-sm font-semibold mb-1">Traveller {index + 1} DOB</label>
                <input
                type="date"
                value={traveler.dob}
                onChange={(e) => handleDOBChange(index, e.target.value)}
                className="border border-[#a9c6f5] rounded-lg px-4 py-2 text-sm"
                />
                <p className="text-xs mt-1">Age: {calculateAge(traveler.dob)}</p>
            </div>
            ))}
        </div>

        {/* Contact Info */}
        <div className="sb-bottom flex justify-evenly flex-row gap-10">
            <div className="flex flex-col w-full md:w-1/4">
            <label className="text-sm font-semibold mb-1">Email ID</label>
            <input
                type="email"
                placeholder="Enter Email ID"
                className="border border-[#a9c6f5] rounded-lg px-4 py-2 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </div>
            <div className="flex flex-col w-full md:w-1/4">
            <label className="text-sm font-semibold mb-1">Mobile Number</label>
            <input
                type="tel"
                placeholder="Enter Mobile Number"
                className="border border-[#a9c6f5] rounded-lg px-4 py-2 text-sm"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
            />
            </div>
        </div>

        <div className="flex justify-center">
            <button className="bg-blue-600 text-white px-12 py-2 rounded-lg hover:bg-blue-700" onClick={handleSubmit}>
                Submit
            </button>   
        </div>
        </div>
         )}

    </div>
  );
};

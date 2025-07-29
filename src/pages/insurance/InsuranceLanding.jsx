import React, { useState, useEffect, useRef } from 'react';
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
  const [showSecondBox, setShowSecondBox] = useState(false);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const secondBoxRef = useRef();
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
const [selectedCountry, setSelectedCountry] = useState('');

useEffect(() => {
  const fetchRegions = async () => {
    try {
      const res = await fetch('https://website-0suz.onrender.com/api/get_category/');
      const data = await res.json();
      console.log('API raw response:', data);
      setRegions(data.categories || []);
      setCountries(data.countries || []);

    } catch (err) {
      console.error('Fetch regions failed:', err);
      setRegions([]); // fallback to empty array
    }
  };

  fetchRegions();
}, []);



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
    setTimeout(() => {
      secondBoxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const handleSubmit = async () => {
  const age = calculateAge(travelers[0]?.dob);
  const days = calculateDuration(startDate, endDate);

  const payload = {
    email,
    phone_number: mobile,
    category_code: selectedRegion,
    dob: travelers[0]?.dob || '',
    type_of_trip: isMultiTrip ? 'multi' : 'single',
    from_date: startDate,
    to_date: endDate
  };

  try {
    const res = await fetch('https://website-0suz.onrender.com/api/add_audience/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(`Status: ${res.status}`);

    const data = await res.json();

    // 🔐 Save form data to localStorage
    const formDataToSave = {
      startDate,
      endDate,
      duration: days,
      isMultiTrip,
      travelers,
      travelerCount,
      email,
      mobile,
      selectedRegion,
      age,
      days
    };
    localStorage.setItem('insuranceForm', JSON.stringify(formDataToSave));

    // 👉 Navigate to plan selection
    navigate('/insurance/plan');
  } catch (err) {
    console.error('Submission error:', err);
    alert('Submission failed. Please try again.');
  }
};




  return (
    <div className='insurance-landing flex flex-col text-black overflow-y-auto bg-white pb-10'>
      <div className='relative z-10'>
        <LandingHero activeTab='Insurance' />
      </div>

      {/* First Box */}
      <div className="first-box z-20 w-[90%] max-w-5xl mx-auto -mt-10 bg-white border border-[#a9c6f5] rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex flex-row w-1/2 gap-10">
          <div className="flex flex-col w-full md:w-1/2">
            <label className="text-sm font-semibold text-[#4b4b4b] mb-1">
              Travel Region<span className="text-red-500">*</span>
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="border border-[#a9c6f5] rounded-lg px-4 py-2 text-sm focus:outline-[#164B71]"
            >
              {console.log('regions:', regions)}
              <option value="">Select Travel Region</option>
              {regions.map((region) => (
                <option key={region.category_code} value={region.category_code}>
                  {region.description}
                </option> 
              ))}

            </select>
          </div>
          <div className="flex flex-col w-full md:w-1/2">
  <label className="text-sm font-semibold text-[#4b4b4b] mb-1">
    Country of Visit<span className="text-red-500">*</span>
  </label>
  <select
    className="border border-[#a9c6f5] rounded-lg px-4 py-2 text-sm focus:outline-[#164B71]"
    value={selectedCountry}
    onChange={(e) => setSelectedCountry(e.target.value)}
  >
    <option value="">Select Country</option>
    {countries.map((country) => (
      <option key={country.country_code} value={country.country_code}>
        {country.description}
      </option>
    ))}
  </select>
</div>

        </div>

        <div>
          <p className="font-semibold text-[#4b4b4b]">Do you travel multiple times a year?</p>
          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={() => setIsMultiTrip((prev) => !prev)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${
                isMultiTrip ? 'bg-[#164B71]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition duration-300 ${
                  isMultiTrip ? 'translate-x-5' : 'translate-x-0'
                }`}
              ></div>
            </button>
            <p className="text-xs text-gray-600">Note: The Multi-Trip Plan covers a maximum of 60 days per trip.</p>
          </div>
        </div>

        <div className="flex flex-wrap md:flex-nowrap items-end justify-between gap-6 w-full">
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-sm font-semibold text-[#4b4b4b] mb-1">Start Date<span className="text-red-500">*</span></label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => handleDateChange('start', e.target.value)}
              className="border text-black border-[#a9c6f5] rounded-lg px-4 py-2 text-sm"
            />
          </div>

          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-sm font-semibold text-[#4b4b4b] mb-1">End Date<span className="text-red-500">*</span></label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => handleDateChange('end', e.target.value)}
              className="border text-black border-[#a9c6f5] rounded-lg px-4 py-2 text-sm"
            />
          </div>

          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-sm font-semibold text-[#4b4b4b] mb-0">Duration</label>
            <p className="text-sm py-2 px-1 text-black rounded-lg">{duration} {duration === 1 ? 'day' : 'days'}</p>
          </div>

          <div className="mt-6 md:mt-0">
            <button onClick={handleContinue} className="bg-[#164B71] text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              CONTINUE
            </button>
          </div>
        </div>

        <p className="text-xs text-center text-gray-500 mt-2">
          Note: Overseas Travel Insurance is only valid for Indian passport holders, commencing their journey from India.
        </p>
      </div>

      {/* Second Box */}
      {showSecondBox && (
        <div ref={secondBoxRef} className="second-box text-black z-20 w-[90%] max-w-5xl mx-auto bg-white border border-[#a9c6f5] rounded-2xl p-6 shadow-sm space-y-6 my-10">
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
            <button className="bg-[#164B71] text-white px-12 py-2 rounded-lg hover:bg-blue-700" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

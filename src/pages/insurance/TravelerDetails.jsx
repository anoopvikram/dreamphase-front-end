import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TravelerCard from '../../components/insurance/TravelerCard';
import { ProgressBar } from '../../components/common/ProgressBar';
import { saveFormData, getFormData } from '../../utils/formStorage'; // <- added

export const TravelerDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // prefer persisted data, fallback to location.state, then default 1
  const existing = getFormData();
  const initialCount = existing.travelerCount || location?.state?.travelerCount || 1;
  const [travelerCount, setTravelerCount] = useState(initialCount);

  // initialize local travelers array from saved data or empty objects
  const [travelers, setTravelers] = useState(() => {
    const saved = existing.travelers || [];
    if (saved.length >= initialCount) return saved.slice(0, initialCount);
    // fill missing slots
    return [
      ...saved,
      ...Array.from({ length: Math.max(0, initialCount - saved.length) }, () => ({ dob: '', name: '', passport: '' }))
    ];
  });

  useEffect(() => {
    // if travelerCount changes (rare), ensure travelers array length matches
    setTravelers((prev) => {
      if (prev.length === travelerCount) return prev;
      if (prev.length > travelerCount) return prev.slice(0, travelerCount);
      return [...prev, ...Array.from({ length: travelerCount - prev.length }, () => ({ dob: '', name: '', passport: '' }))];
    });
  }, [travelerCount]);

  // called by each TravelerCard when its data updates
  const handleTravelerChange = (index, data) => {
    setTravelers((prev) => {
      const next = [...prev];
      next[index] = { ...(next[index] || {}), ...data };
      return next;
    });
  };

  const handleContinue = () => {
    // persist travelers into shared storage
    saveFormData({ travelers, travelerCount });
    navigate('/insurance/payment');
  };

  return (
    <div className='flex flex-col items-center py-50 md:py-30 w-full sm:w-3/4 text-black mx-auto'>
      <ProgressBar currentStepIndex={3} steps={['Travel Details', 'Choose Plan', 'Choose Add-ons', 'Traveller Details', 'Review and Payment']} />

      {/* Render Traveler Cards based on travelerCount */}
      {travelers.map((trav, index) => (
        <TravelerCard
          key={index}
          index={index}
          data={trav}                     // pass initial data (if TravelerCard supports it)
          onChange={(data) => handleTravelerChange(index, data)} // expects TravelerCard to call onChange(updatedData)
        />
      ))}

      {/* Navigation Buttons */}
      <div className='buttons flex flex-row my-5 gap-15'>
        <button
          className="mt-2 px-4 py-1 rounded-lg bg-white border border-[#004c99] text-[#004c99] hover:text-white hover:bg-[#004c99]"
          onClick={() => navigate(-1)}
        >
          Go back
        </button>
        <button
          className="mt-2 px-4 py-1 rounded-lg bg-[#004c99] border border-[#004c99] text-white hover:bg-white hover:text-[#004c99]"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default TravelerDetails;

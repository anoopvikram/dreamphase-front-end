import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TravelerCard from '../../components/insurance/TravelerCard';
import { ProgressBar } from '../../components/common/ProgressBar';

export const TravelerDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const travelerCount = location?.state?.travelerCount || 1;
  const steps = ['Travel Details', 'Choose Plan', 'Choose Add-ons', 'Traveller Details', 'Review and Payment'];

  return (
    <div className='flex flex-col items-center py-50 md:py-30 w-full sm:w-3/4 text-black mx-auto'>
      {/* Progress Steps (keep this unchanged) */}
      <ProgressBar currentStepIndex={3} steps={steps} />

      {/* Render Traveler Cards based on travelerCount */}
      {[...Array(travelerCount)].map((_, index) => (
        <TravelerCard key={index} index={index} />
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
          onClick={() => navigate('/insurance/details')}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default TravelerDetails;

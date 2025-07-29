import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TravelerCard from '../../components/insurance/TravelerCard';

export const TravelerDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const travelerCount = location?.state?.travelerCount || 1;

  return (
    <div className='flex flex-col items-center py-50 md:py-30 w-full sm:w-3/4 text-black mx-auto'>
      {/* Progress Steps (keep this unchanged) */}
      <div className="flex items-center justify-between w-full max-w-4xl mx-auto mb-15 px-4 mt-8">
        {['Travel Details', 'Choose Plan', 'Choose Add-ons', 'Traveller Details', 'Review and Payment'].map((step, i) => (
          <div key={i} className="relative flex-1 flex items-center justify-center">
            {i !== 0 && (
              <div className={`absolute -translate-x-1/2 top-1/2 transform -translate-y-1/2 h-1 ${i <= 3 ? 'bg-[#164B71]' : 'bg-gray-300'} w-full z-0`}></div>
            )}
            <div className={`relative z-10 w-5 h-5 rounded-full border-2 ${
              i === 3 ? 'bg-white border-[#164B71]' :
              i < 3 ? 'bg-[#164B71] border-[#164B71]' :
              'bg-gray-300 border-gray-300'
            }`}></div>
            <div className="absolute top-8 text-[13px] font-semibold text-center w-max -translate-x-1/2 left-1/2">
              <p className={`${i <= 2 ? 'text-[#164B71]' : 'text-gray-500'}`}>{step}</p>
            </div>
          </div>
        ))}
      </div>

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

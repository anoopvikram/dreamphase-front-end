import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

export const InsuranceAddon = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const travelerCount = state?.travelerCount || 1;
  const riderList = state?.riderList || [];

  const fallbackAddons = [
    {
      id: 1,
      name: 'Gadget Cover',
      amount: 999,
    },
    {
      id: 2,
      name: 'Trip Delay Cover',
      amount: 499,
    },
    {
      id: 3,
      name: 'Medical Emergency Cover',
      amount: 1499,
    },
  ];

  const [addons, setAddons] = useState([]);

  useEffect(() => {
    if (riderList.length > 0) {
      setAddons(riderList);
    } else {
      setAddons(fallbackAddons);
    }
  }, [riderList]);

  return (
    <div className='flex flex-col items-center py-50 md:py-30 w-3/4 text-black mx-auto'>

      {/* Progress bar remains unchanged */}
      <div className="flex items-center justify-between w-full max-w-4xl mx-auto mb-15 px-4 mt-8">
        {['Travel Details', 'Choose Plan', 'Choose Add-ons', 'Traveller Details', 'Review and Payment'].map((step, i) => (
          <div key={i} className="relative flex-1 flex items-center justify-center">
            {i !== 0 && (
              <div className={`absolute -translate-x-1/2 top-1/2 transform -translate-y-1/2 h-1 ${
                i <= 2 ? 'bg-[#164B71]' : 'bg-gray-300'
              } w-full z-0`}></div>
            )}
            <div className={`relative z-10 w-5 h-5 rounded-full border-2 ${
              i === 2 
              ? 'bg-white border-[#164B71]'
              : i < 2 
              ? 'bg-[#164B71] border-[#164B71]'
              : 'bg-gray-300 border-gray-300'
            }`}></div>
            <div className="absolute top-8 text-[13px] font-semibold text-center w-max -translate-x-1/2 left-1/2">
              <p className={`${i <= 2 ? 'text-[#164B71]' : 'text-gray-500'}`}>{step}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Addon cards */}
      <div>
        {addons.map((addon, index) => (
          <div
            key={index}
            className="addon-card flex flex-row border border-[#0062CC] rounded-xl p-4 m-4 justify-between items-center gap-4"
          >
            <img
              src={`https://picsum.photos/300/200?random=${index + 1}`}
              alt="addon"
              className="h-40 w-40 object-cover rounded-lg"
            />

            <div className="flex flex-col flex-1 px-4">
              <h2 className="text-lg font-semibold mb-2">{addon.name}</h2>
              <p className="text-sm text-gray-600">This is a special rider benefit for extra protection.</p>
            </div>

            <div className="flex flex-col items-center px-4 gap-0">
              <p className="text-xs">{travelerCount} Traveler(s)</p>
              <p className="text-lg">₹{addon.amount}</p>
              <button className="mt-2 px-4 py-1 rounded-lg bg-white border border-[#004c99] text-[#004c99] hover:text-white hover:bg-[#004c99]">
                Select
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className='buttons flex flex-row gap-5'>
        <button className="mt-2 px-4 py-1 rounded-lg bg-white border border-[#004c99] text-[#004c99] hover:text-white hover:bg-[#004c99]" onClick={() => navigate(-1)}>
          Go back
        </button>
        <button className="mt-2 px-4 py-1 rounded-lg bg-white border border-[#004c99] text-[#004c99] hover:text-white hover:bg-[#004c99]" onClick={() => navigate('/insurance/details')}>
          Continue
        </button>
      </div>

    </div>
  );
};

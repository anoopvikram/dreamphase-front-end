import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { ProgressBar } from '../../components/common/ProgressBar';


export const InsuranceAddon = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const travelerCount = state?.travelerCount || 1;
  const riderList = state?.riderList || [];
  const steps = ['Travel Details', 'Choose Plan', 'Choose Add-ons', 'Traveller Details', 'Review and Payment'];

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
  const [selectedAddons, setSelectedAddons] = useState([]);

  useEffect(() => {
    if (riderList.length > 0) {
      setAddons(riderList);
    } else {
      setAddons(fallbackAddons);
    }
  }, [riderList]);

  const handleSelectAddon = (addon) => {
  const isSelected = selectedAddons.includes(addon.rider_code);
  if (isSelected) {
    setSelectedAddons(selectedAddons.filter(code => code !== addon.rider_code));
  } else {
    setSelectedAddons([...selectedAddons, addon.rider_code]);
  }
};

  return (
    <div className='flex flex-col items-center py-50 md:py-30 w-3/4 text-black mx-auto'>

      {/* Progress bar remains unchanged */}
      <ProgressBar currentStepIndex={2} steps={steps} />

      {/* Addon cards */}
      <div>
        {addons.map((addon, index) => (
          <div
            key={index}
            className="addon-card flex flex-row border bg-[#F0F6FF] border-[#0062CC] rounded-xl p-4 m-4 justify-between items-center gap-4"
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
              <button
                className={`mt-2 px-3 py-1 rounded-lg border transition-all duration-300 ease-in-out ${
                  selectedAddons.includes(addon.rider_code)
                    ? 'bg-[#0E3755] text-white border-[#0E3755]'
                    : 'bg-[#f6faff] text-[#0062CC] border-[#0062CC] hover:text-white hover:bg-[#0068A3]'
                }`}
                onClick={() => handleSelectAddon(addon)}
              >
                {selectedAddons.includes(addon.rider_code) ? (
                  <span className="flex items-center gap-1">
                    Selected
                    <img src='/images/icons/check.png' className='w-6'/>
                  </span>
                ) : (
                  'Select'
                )}
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
        <button className="mt-2 px-4 py-1 rounded-lg bg-[#0062CC] border border-[#004c99] text-white hover:text-white hover:bg-[#004c99]" 
          onClick={() =>{
            
            console.log('Navigating with data:', {
            travelerCount,
            selectedRiderCodes: selectedAddons,
          });

            navigate('/insurance/details', {
              state: {
                travelerCount,
                selectedRiderCodes: selectedAddons, // array of rider_code strings
              }
            })
          }
            
          }>
          Continue
        </button>
      </div>

    </div>
  );
};

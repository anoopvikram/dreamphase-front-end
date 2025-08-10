import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { ProgressBar } from '../../components/common/ProgressBar';
import { saveFormData, getFormData } from '../../utils/formStorage';

export const InsuranceAddon = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // prefer persisted data, then navigation state, then default
  const existing = getFormData();
  const travelerCount = state?.travelerCount || existing.travelerCount || 1;
  const incomingRiderList = state?.riderList || existing.riderList || [];

  const steps = ['Travel Details', 'Choose Plan', 'Choose Add-ons', 'Traveller Details', 'Review and Payment'];

  const fallbackAddons = [
    { id: 1, name: 'Gadget Cover', amount: 999, rider_code: 'GADGET' },
    { id: 2, name: 'Trip Delay Cover', amount: 499, rider_code: 'TRIP_DELAY' },
    { id: 3, name: 'Medical Emergency Cover', amount: 1499, rider_code: 'MEDICAL' },
  ];

  const [addons, setAddons] = useState([]);
  const [selectedAddons, setSelectedAddons] = useState(existing.selectedRiderCodes || []);

  useEffect(() => {
    // normalize incoming riders to expected shape: { rider_code, name, amount, ... }
    if (Array.isArray(incomingRiderList) && incomingRiderList.length > 0) {
      const normalized = incomingRiderList.map((r, idx) => ({
        ...r,
        rider_code: r.rider_code || r.code || r.riderCode || r.riderId || `RIDER_${idx}`,
        name: r.name || r.rider_name || r.title || `Rider ${idx + 1}`,
        amount: r.amount ?? r.rider_amount ?? r.price ?? 0,
      }));
      setAddons(normalized);
      // persist riderList shape so later pages can read if user refreshes
      saveFormData({ riderList: normalized });
    } else {
      setAddons(fallbackAddons);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incomingRiderList]);

  const handleSelectAddon = (addon) => {
    const code = addon.rider_code;
    setSelectedAddons(prev => {
      if (prev.includes(code)) return prev.filter(c => c !== code);
      return [...prev, code];
    });
  };

  const handleContinue = () => {
    // save merged data
    saveFormData({
      travelerCount,
      selectedRiderCodes: selectedAddons,
    });

    navigate('/insurance/details');
  };

  return (
    <div className='flex flex-col items-center py-50 md:py-30 w-3/4 text-black mx-auto'>
      <ProgressBar currentStepIndex={2} steps={steps} />

      <div>
        {addons.map((addon, index) => (
          <div
            key={addon.rider_code || index}
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
                    <img src='/images/icons/check.png' className='w-6' alt="selected" />
                  </span>
                ) : (
                  'Select'
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className='buttons flex flex-row gap-5'>
        <button
          className="mt-2 px-4 py-1 rounded-lg bg-white border border-[#004c99] text-[#004c99] hover:text-white hover:bg-[#004c99]"
          onClick={() => navigate(-1)}
        >
          Go back
        </button>
        <button
          className="mt-2 px-4 py-1 rounded-lg bg-[#0062CC] border border-[#004c99] text-white hover:text-white hover:bg-[#004c99]"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

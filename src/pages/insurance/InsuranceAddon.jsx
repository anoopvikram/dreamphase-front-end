
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


export const InsuranceAddon = () => {
    const navigate = useNavigate();

  const { state } = useLocation();
  const travelerCount = state?.travelerCount || 1;

  const [addons, setAddons] = useState([]);

    

  const fallbackAddons = [
    {
      id: 1,
      title: 'Gadget Cover',
      description: 'Safeguard the losses suffered due to theft or robbery of gadgets while on an overseas trip.',
      price: 999,
      image: 'https://picsum.photos/300/200?random=1',
    },
    {
      id: 2,
      title: 'Trip Delay Cover',
      description: 'Compensates for trip delays while traveling abroad.',
      price: 499,
      image: 'https://picsum.photos/300/200?random=2',
    },
    {
      id: 3,
      title: 'Medical Emergency Cover',
      description: 'Get reimbursed for emergency hospital expenses while abroad.',
      price: 1499,
      image: 'https://picsum.photos/300/200?random=3',
    },
  ];

  useEffect(() => {
    const fetchAddons = async () => {
      try {
        const res = await fetch('/api/addons');
        if (!res.ok) throw new Error('API failed');
        const data = await res.json();
        setAddons(data);
      } catch (err) {
        console.error('Using fallback addons');
        setAddons(fallbackAddons);
      }
    };

    fetchAddons();
  }, []);
  return (
    <div className='flex flex-col items-center py-50 md:py-30 w-3/4 text-black mx-auto'>
        <div className="flex items-center justify-between w-full max-w-4xl mx-auto mb-15 px-4 mt-8">
        {['Travel Details', 'Choose Plan', 'Choose Add-ons', 'Traveller Details', 'Review and Payment'].map((step, i) => (
            <div key={i} className="relative flex-1 flex items-center justify-center">
            
            {/* Line Before */}
            {i !== 0 && (
                <div className={`absolute -translate-x-1/2 top-1/2 transform -translate-y-1/2 h-1 ${
                i <= 2 ? 'bg-[#164B71]' : 'bg-gray-300'
                } w-full z-0`}></div>
            )}

            {/* Circle */}
            <div className={`relative z-10 w-5 h-5 rounded-full border-2 ${
                i === 2 
                ? 'bg-white border-[#164B71]'           // current
                : i < 2 
                ? 'bg-[#164B71] border-[#164B71]'       // previous
                : 'bg-gray-300 border-gray-300'         // upcoming
            }`}></div>

            {/* Label */}
            <div className="absolute top-8 text-[13px] font-semibold text-center w-max -translate-x-1/2 left-1/2">
                <p className={`${i <= 2 ? 'text-[#164B71]' : 'text-gray-500'}`}>{step}</p>
            </div>
            </div>
        ))}
        </div>

        <div>
      {addons.map((addon) => (
        <div
          key={addon.id}
          className="addon-card flex flex-row border border-[#0062CC] rounded-xl p-4 m-4 justify-between items-center gap-4"
        >
          <img
            src={addon.image}
            alt="addon"
            className="h-40 w-40 object-cover rounded-lg"
          />

          <div className="flex flex-col flex-1 px-4">
            <h2 className="text-lg font-semibold mb-2">{addon.title}</h2>
            <p className="text-sm text-gray-600">{addon.description}</p>
          </div>

          <div className="flex flex-col items-center  px-4 gap-0">
            <p className="text-xs">{travelerCount} Traveler(s)</p>
            <p className="text-lg">₹{addon.price}</p>
            <button className="mt-2 px-4 py-1 rounded-lg bg-white border border-[#004c99] text-[#004c99] hover:text-white hover:bg-[#004c99]">
              Select
            </button>
          </div>
        </div>
      ))}
    </div>

        <div className='buttons flex flex-row gap-5'>
            <button className="mt-2 px-4 py-1 rounded-lg bg-white border border-[#004c99] text-[#004c99] hover:text-white hover:bg-[#004c99]" onClick={() => navigate(-1)}>
            Go back
            </button>
            <button className="mt-2 px-4 py-1 rounded-lg bg-white border border-[#004c99] text-[#004c99] hover:text-white hover:bg-[#004c99]" onClick={()=> navigate('/insurance/details')}>
            Continue
            </button>
        </div>
        
    </div>
  )
}

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const InsurancePlan = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    startDate,
    endDate,
    duration,
    isMultiTrip,
    travelers,
    email,
    mobile
  } = state || {};

  const plans = [
    {
      name: 'Elite Plan',
      details: 'Overseas Travel | Including USA and CANADA',
      price: 1578,
      features: ['Emergency Medical Assistance', 'Lifestyle Assistance', 'Domestic Roadside Assistance']
    },
    {
      name: 'Magna Plan',
      details: 'Overseas Travel | Including USA and CANADA',
      price: 1578,
      features: ['Emergency Medical Assistance', 'Lifestyle Assistance', 'Domestic Roadside Assistance']
    },
    {
      name: 'Icon Plan',
      details: 'Overseas Travel | Including USA and CANADA',
      price: 1578,
      features: ['Emergency Medical Assistance', 'Lifestyle Assistance', 'Domestic Roadside Assistance']
    }
  ];

  return (
    <div className="insurance-plan text-black bg-white py-30 w-3/4 mx-auto p-6 space-y-10">
      {/* Progress Bar */}
    <div className="flex items-center justify-between w-full max-w-4xl mx-auto mb-15 px-4 mt-8">
    {['Travel Details', 'Choose Plan', 'Choose Add-ons', 'Traveller Details', 'Review and Payment'].map((step, i, arr) => (
        <div key={i} className="relative flex-1 flex items-center justify-center">
        {/* Line Before */}
        {i !== 0 && (
            <div className={`absolute -translate-x-1/2 top-1/2 transform -translate-y-1/2 h-1 ${i <= 1 ? 'bg-[#164B71]' : 'bg-gray-300'} w-full z-0`}></div>
        )}
        
        {/* Circle */}
        <div className={`relative z-10 w-5 h-5 rounded-full border-2 ${i === 0 ? 'bg-[#164B71] border-[#164B71]' : i === 1 ? 'bg-white border-[#164B71]' : 'bg-gray-300 border-gray-300'}`}></div>

        {/* Label */}
        <div className="absolute top-8 text-[13px] font-semibold text-center w-max -translate-x-1/2 left-1/2">
            <p className={`${i <= 1 ? 'text-[#164B71]' : 'text-gray-500'}`}>{step}</p>
        </div>
        </div>
    ))}
    </div>



      {/* Filters */}
      <div className="flex gap-6">
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Sum Insured</label>
          <select className="border border-blue-300 px-4 py-2 rounded-lg text-sm">
            <option value="">All</option>
            <option value="10000">₹10,000</option>
            <option value="50000">₹50,000</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Sort Price</label>
          <select className="border border-blue-300 px-4 py-2 rounded-lg text-sm">
            <option value="">All</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>

      {/* Plan List */}
      <div className="space-y-6">
        {plans.map((plan, index) => (
          <div key={index} className="border border-blue-300 rounded-xl p-6 flex justify-between">
            <div className="flex flex-col">
              <h2 className="text-xl font-bold text-[#164B71] mb-1">{plan.name}</h2>
              <p className="text-sm mb-3">{plan.details}</p>

              <div className="flex flex-wrap gap-4 mb-3 text-sm text-[#164B71]">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span>📌</span> <p>{feature}</p>
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-500">
                By clicking 'Buy Now', you confirm that you have read, understood, and agree to the{' '}
                <a href="#" className="underline">Terms & Conditions</a>.
              </p>
            </div>

            <div className="flex flex-col items-end justify-between">
              <div className="text-right">
                <p className="text-sm">{travelers?.length} Traveller(s)</p>
                <h2 className="text-2xl font-semibold">₹ {plan.price}</h2>
              </div>
              <button
                onClick={() => console.log('Selected:', plan.name)}
                className="mt-4 border border-[#164B71] text-[#164B71] px-6 py-1 rounded hover:bg-blue-50"
              >
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <button onClick={() => navigate('/insurance')} className="px-6 py-2 border rounded text-sm border-[#164B71] text-[#164B71] hover:bg-blue-100">
          Go Back
        </button>
      </div>
    </div>
  );
};

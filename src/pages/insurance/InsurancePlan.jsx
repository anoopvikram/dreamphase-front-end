import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const InsurancePlan = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [sumInsured, setSumInsured] = useState('');
  const [formData, setFormData] = useState(null);
  const [allPlans, setAllPlans] = useState([]);
  const [plans, setPlans] = useState([]);
  const [sortOrder, setSortOrder] = useState('');

  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);

    let sorted = [...allPlans];
    if (order === 'asc') sorted.sort((a, b) => a.price - b.price);
    else if (order === 'desc') sorted.sort((a, b) => b.price - a.price);

    setPlans(sorted);
  };

  const fallbackPlans = [
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

  useEffect(() => {
    let savedData = state || JSON.parse(localStorage.getItem('insuranceForm'));
    if (!savedData) {
      alert('Form data missing. Please fill the form again.');
      navigate('/insurance');
      return;
    }

    setFormData(savedData);
    const country_code = savedData.selectedCountry || '';
    const age = savedData.travelers?.[0]?.age || 25;
    const category_code = savedData.selectedRegion || 1;
    const days = savedData.duration || 30;


      console.log('Sending to backend:', {
        country_code,
        category_code,
        age,
        days
      });



    fetch("https://website-0suz.onrender.com/api/get_plan/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category_code,
        age,
        days,
        country_code,
      }),
    })
      .then(res => {
        if (!res.ok) throw new Error(`Status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        const fetchedPlans = data.matched_plans || [];
        setAllPlans(fetchedPlans);
        setPlans(fetchedPlans);
      })
      .catch(err => {
        console.error("Fetch failed. Using fallback plans.", err);
        setAllPlans(fallbackPlans);
        setPlans(fallbackPlans);
      });

  }, [state, navigate]);

  const travelers = formData?.travelers || [];
  const travelerCount = formData?.travelerCount || travelers.length;

  return (
    <div className="insurance-plan text-black bg-white py-30 w-3/4 mx-auto p-6 space-y-10">
      {/* Progress Bar */}
      <div className="flex items-center justify-between w-full max-w-4xl mx-auto mb-15 px-4 mt-8">
        {['Travel Details', 'Choose Plan', 'Choose Add-ons', 'Traveller Details', 'Review and Payment'].map((step, i) => (
          <div key={i} className="relative flex-1 flex items-center justify-center">
            {i !== 0 && (
              <div className={`absolute -translate-x-1/2 top-1/2 transform -translate-y-1/2 h-1 ${i <= 1 ? 'bg-[#164B71]' : 'bg-gray-300'} w-full z-0`}></div>
            )}
            <div className={`relative z-10 w-5 h-5 rounded-full border-2 ${i === 0 ? 'bg-[#164B71] border-[#164B71]' : i === 1 ? 'bg-white border-[#164B71]' : 'bg-gray-300 border-gray-300'}`}></div>
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
          <select 
            className="border border-blue-300 px-4 py-2 rounded-lg text-sm"
            value={sumInsured} onChange={(e) => setSumInsured(e.target.value)}>
            <option value="">All</option>
            <option value="10000">₹10,000</option>
            <option value="50000">₹50,000</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Sort Price</label>
          <select
            className="border border-blue-300 px-4 py-2 rounded-lg text-sm"
            onChange={handleSortChange}
            value={sortOrder}
          >
            <option value="">All</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>

      {/* Plan List */}
      <div className="space-y-6">
        {plans.map((plan, index) => (
          <div key={index} className="border bg-[#F0F6FF] border-[#0062CC] rounded-xl p-6 flex justify-between">
            <div className="flex flex-col">
              <h2 className="text-xl font-bold text-[#0062CC] mb-1">{plan.plan_name}</h2>
              <p className="text-sm mb-3">
                {formData?.categoryLabel || 'Region'} | {formData?.selectedCountryLabel || 'Country'}
              </p>

          
              <div className="flex flex-wrap gap-4 mb-3 text-sm text-[#0062CC]">
                {[
                    { text: "Emergency Medical Assistance", icon: "🩺" },
                    { text: "Lifestyle Assistance", icon: "💼" },
                    { text: "Domestic Roadside Assistance", icon: "🚗" }
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span>{feature.icon}</span>
                      <p>{feature.text}</p>
                    </div>
                  ))
                  }
              </div>

              <p className="text-xs text-gray-500">
                By clicking 'Buy Now', you confirm that you have read, understood, and agree to the{' '}
                <a href="#" className="underline">Terms & Conditions</a>.
              </p>
            </div>

            <div className="flex flex-col items-center justify-between">
              <div className="text-right">
                <p className="text-sm">{travelerCount} Traveller(s)</p>
                <h2 className="text-2xl font-semibold">₹ {plan.premium}</h2>
              </div>
              <button
                onClick={() =>
                  navigate('/insurance/addon', {
                    state: {
                      travelerCount,
                      selectedPlan: plan.name,
                    }
                  })
                }
                className="mt-4 border border-[#0062CC] text-[#0062CC] px-6 py-1 rounded-lg hover:bg-blue-50"
              >
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <button onClick={() => navigate(-1)} className="px-6 py-2 border rounded text-sm border-[#0062CC] text-[#0062CC] hover:bg-blue-100">
          Go Back
        </button>
      </div>
    </div>
  );
};

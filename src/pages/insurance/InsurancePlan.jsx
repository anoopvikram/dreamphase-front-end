import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoMdArrowDropdown } from "react-icons/io";
import { ProgressBar } from '../../components/common/ProgressBar';
import { saveFormData, getFormData } from '../../utils/formStorage'; // ✅ added

export const InsurancePlan = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [sumInsured, setSumInsured] = useState('');
  const [formData, setFormData] = useState(null);
  const [allPlans, setAllPlans] = useState([]);
  const [plans, setPlans] = useState([]);
  const [sortOrder, setSortOrder] = useState('');

  const steps = ['Travel Details', 'Choose Plan', 'Choose Add-ons', 'Traveller Details', 'Review and Payment'];

  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);

    let sorted = [...allPlans];
    if (order === 'asc') sorted.sort((a, b) => a.premium - b.premium);
    else if (order === 'desc') sorted.sort((a, b) => b.premium - a.premium);

    setPlans(sorted);
  };

  const fallbackPlans = [
    {
      plan_name: 'Elite Plan',
      premium: 1578,
      plan_code: 'ELT01',
    },
    {
      plan_name: 'Magna Plan',
      premium: 1578,
      plan_code: 'MGN01',
    },
    {
      plan_name: 'Icon Plan',
      premium: 1578,
      plan_code: 'ICN01',
    }
  ];

  // small helper to compute age from dob if needed
  const computeAgeFromDOB = (dob) => {
    if (!dob) return null;
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  useEffect(() => {
    // prefer persisted data, fallback to navigate state
    let savedData = getFormData();
    if (!savedData || Object.keys(savedData).length === 0) {
      savedData = state || {};
    }

    if (!savedData || Object.keys(savedData).length === 0) {
      alert('Form data missing. Please fill the form again.');
      navigate('/insurance');
      return;
    }

    setFormData(savedData);

    const { selectedCountry, selectedRegion, travelers, duration, age: savedAge } = savedData;
    const country_code = selectedCountry || '';
    const category_code = selectedRegion || 1;
    const days = duration || 30;

    // derive age: use saved age, else try dob, else fallback 25
    let age = savedAge || (travelers?.[0]?.dob ? computeAgeFromDOB(travelers[0].dob) : 25);

    fetch("https://website-0suz.onrender.com/api/get_plan/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category_code, age, days, country_code }),
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
  const travelerCount = formData?.travelerCount || travelers.length || 1;

  const handleApply = async (planCode, planName, planPremium) => {
    try {
      const response = await fetch('https://website-0suz.onrender.com/api/get_rider_details/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan_code: planCode }),
      });

      const data = await response.json();

      if (data.riders) {
        // persist selected plan so next pages can read it
        saveFormData({
          selectedPlan: planName,
          planCode,
          planPremium
        });

        // navigate and pass riderList via state (keeps UI immediate)
        navigate('/insurance/addon', {
          state: {
            riderList: data.riders,
            travelerCount
          },
        });
      } else {
        console.error('No riders found');
      }
    } catch (err) {
      console.error('Error fetching rider details:', err);
    }
  };

  return (
    <div className="insurance-plan text-black bg-white py-30 w-3/4 mx-auto p-6 space-y-10">
      <ProgressBar currentStepIndex={1} steps={steps} />

      {/* Filters */}
      <div className="flex gap-6">
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Sum Insured</label>
          <div className='relative'>
            <select
              className="border border-blue-300 px-4 py-2 rounded-lg text-sm"
              value={sumInsured}
              onChange={(e) => setSumInsured(e.target.value)}
            >
              <option value="">All</option>
              <option value="10000">₹10,000</option>
              <option value="50000">₹50,000</option>
            </select>
            <IoMdArrowDropdown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Sort Price</label>
          <div className='relative'>
            <select
              className="border border-blue-300 px-4 py-2 rounded-lg text-sm"
              onChange={handleSortChange}
              value={sortOrder}
            >
              <option value="">All</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
            <IoMdArrowDropdown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Plan List */}
      <div className="space-y-6">
        {plans.map((plan, index) => (
          <div key={index} className="border bg-[#F0F6FF] border-[#0062CC] rounded-xl p-6 flex justify-between">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold text-[#0062CC] mb-1">{plan.plan_name}</h2>
              <p className="text-sm mb-3">
                {formData?.categoryLabel || 'Region'} | {formData?.selectedCountryLabel || 'Country'}
              </p>

              <div className="flex flex-wrap gap-4 mb-3 text-sm text-[#0062CC]">
                {[
                  { text: "Emergency Medical Assistance", icon: "/images/icons/health-insurance.ico" },
                  { text: "Lifestyle Assistance", icon: "/images/icons/policy.ico" },
                  { text: "Domestic Roadside Assistance", icon: "/images/icons/car-insurance.ico" }
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <img src={feature.icon} alt={feature.text} className="w-5 h-5" />
                    <p>{feature.text}</p>
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-500">
                By clicking 'Apply', you confirm that you have read, understood, and agree to the{' '}
                <a href="#" className="underline">Terms & Conditions</a>.
              </p>
            </div>

            <div className="flex flex-col items-center justify-between">
              <div className="text-right">
                <p className="text-sm">{travelerCount} Traveller(s)</p>
                <h2 className="text-2xl font-semibold">₹ {plan.premium}</h2>
              </div>
              <button
                onClick={() => handleApply(plan.plan_code, plan.plan_name, plan.premium)}
                className="mt-4 border px-6 py-1 rounded-lg bg-[#f6faff] text-[#0062CC] border-[#0062CC] hover:text-white hover:bg-[#0068A3]"
              >
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 border rounded text-sm border-[#0062CC] text-[#0062CC] hover:bg-blue-100"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

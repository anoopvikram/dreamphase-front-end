// src/components/insurance/ReviewCard.jsx
import React from 'react';


// helpers
const formatDate = (d) => {
  if (!d) return '-';
  try {
    const dt = new Date(d);
    return dt.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return d;
  }
};

const computeAge = (dob) => {
  if (!dob) return '-';
  const b = new Date(dob);
  const t = new Date();
  let age = t.getFullYear() - b.getFullYear();
  const m = t.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && t.getDate() < b.getDate())) age--;
  return age;
};

const formatCurrency = (n, symbol = '₹') => {
  const num = Number(n) || 0;
  return symbol + num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const ReviewCard = ({ data = {} }) => {
    console.log("ReviewCard data:", data);
  // travel info
  const tripType = data.isMultiTrip ? 'Multi Trip' : 'Single Trip';   
  const region = data.categoryLabel || data.selectedRegion || '—';
  const destination = data.selectedCountryLabel || data.selectedCountry || '—';
  const start = data.startDate || data.from_date || '';
  const end = data.endDate || data.to_date || '';
  const duration = data.duration || data.days || '—';

  // travelers array
  const travelers = Array.isArray(data.travelers) && data.travelers.length ? data.travelers : [];

  // top-level contact fallbacks
  const topMobile = data.mobile || data.phone_number || '—';
  const topEmail = data.email || '—';

  // product details
  const insurer = data.insurer || data.insurerName || '—';
  const sumInsured = data.sumInsured || data.sum_insured || data.selectedSumInsured || '—';
  const planName = data.selectedPlan || data.planName || data.plan_name || '—';

  // addons & amounts
  const riderList = data.riderList || data.riders || data.savedRiderList || [];
  const selectedRiderCodes = data.selectedRiderCodes || data.selectedRiders || [];
  const addons = (Array.isArray(selectedRiderCodes) && selectedRiderCodes.length)
    ? selectedRiderCodes.map(code => {
        const r = riderList.find(rr => rr.rider_code === code || rr.code === code) || {};
        return { code, name: r.name || r.rider_name || r.title || code, amount: r.amount ?? r.rider_amount ?? r.price ?? 0 };
      })
    : [];

  const planPremium = Number(data.planPremium ?? data.selectedPlanPremium ?? data.plan_premium ?? 0);
  const addonsTotal = addons.reduce((s, a) => s + Number(a.amount || 0), 0);
  const subTotal = planPremium + addonsTotal;
  const gst = +(subTotal * 0.18);
  const total = subTotal + gst;

  return (
    <div className="w-full border-2 rounded-xl overflow-hidden" style={{ borderColor: '#123b55' }}>
      {/* top row */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-700"><span className="font-medium">Trip Type :</span> <span className="font-semibold">{tripType}</span></p>
            <p className="text-sm text-gray-700 mt-3"><span className="font-medium">Start Date :</span> <span className="font-semibold">{formatDate(start)}</span></p>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-700"><span className="font-medium">Region :</span> <span className="font-semibold">{region}</span></p>
            <p className="text-sm text-gray-700 mt-3"><span className="font-medium">End Date :</span> <span className="font-semibold">{formatDate(end)}</span></p>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-700"><span className="font-medium">Destination :</span> <span className="font-semibold">{destination}</span></p>
            <p className="text-sm text-gray-700 mt-3"><span className="font-medium">Duration :</span> <span className="font-semibold">{duration} {duration === 1 ? 'Day' : 'Days'}</span></p>
          </div>
        </div>
      </div>

      {/* For each traveler: header strip + details block */}
      {travelers.length ? travelers.map((trav, i) => {
        const name = trav.name || trav.fullName || trav.passport || `Traveller ${i + 1}`;
        const dob = trav.dob || trav.DOB || '';
        const age = computeAge(dob);
        const mobile = trav.mobile || topMobile;
        const email = trav.email || topEmail;

        return (
          <div key={i}>
            {/* traveler strip */}
            <div className="bg-[#92B7E6] px-6 py-3">
              <div className="font-semibold text-[#0f3550]">Traveller {i + 1} : {name}</div>
            </div>

            {/* traveler details */}
            <div className="p-6 ">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                <div>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Date of Birth :</span>{' '}
                    <span className="font-semibold">{dob || '-'}</span>{' '}
                    <span className="text-gray-500">({age === '-' ? '-' : `Age ${age}`})</span>
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Mobile Number :</span>{' '}
                    <span className="font-semibold">{mobile}</span>
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Email Address :</span>{' '}
                    <span className="font-semibold">{email}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      }) : (
        <>
          <div className="bg-[#92B7E6] px-6 py-3">
            <div className="font-semibold text-[#0f3550]">Traveller 1 : Name</div>
          </div>
          <div className="p-6 border-b">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              <div>
                <p className="text-sm text-gray-700"><span className="font-medium">Date of Birth :</span> <span className="font-semibold">-</span></p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-700"><span className="font-medium">Mobile Number :</span> <span className="font-semibold">{topMobile}</span></p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-700"><span className="font-medium">Email Address :</span> <span className="font-semibold">{topEmail}</span></p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Product Details and right-side amounts */}
      <div className="p-6 ">
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-4">
            <h3 className="text-lg font-semibold mb-3">Product Details</h3>
            <p className="text-sm text-gray-800"><span className="font-medium">Insurer :</span> {insurer}</p>
            <p className="text-sm text-gray-800 mt-2"><span className="font-medium">Sum Insured :</span> {sumInsured}</p>
            <div className="flex justify-between mt-2 text-sm text-gray-800 border-b border-gray-200 pb-1">
            <span>
                <span className="font-medium">Plan :</span> {planName}
            </span>
            <span className="font-semibold">{formatCurrency(planPremium)}</span>
            </div>


            <div className="mt-4">
                <p className="font-medium">Add-ons :</p>
                {addons.length ? (
                    <ul className="mt-2 list-none space-y-1 text-sm text-gray-800">
                    {addons.map(a => (
                        <li
                        key={a.code}
                        className="flex justify-between border-b border-gray-200 pb-1"
                        >
                        <span>{a.name}</span>
                        <span>{formatCurrency(a.amount)}</span>
                        </li>
                    ))}
                    </ul>
                ) : (
                    <p className="mt-2 text-sm text-gray-700">None</p>
                )}
            </div>

          </div>

          
        </div>
      </div>

      {/* bottom total bar */}
      <div className="bg-[#123b55] text-white px-6 py-4 flex justify-between items-center">
        <div className="font-medium">Total Amount Payable (including 18% GST)</div>
        <div className="text-xl font-bold">{formatCurrency(total)}</div>
      </div>
    </div>
  );
};

export default ReviewCard;

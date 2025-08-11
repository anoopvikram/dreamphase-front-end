import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaWallet, FaCreditCard, FaCheckCircle } from 'react-icons/fa';
import { IoMdCard } from "react-icons/io";
import { TiDocumentText } from "react-icons/ti";
import { ProgressBar } from '../../components/common/ProgressBar';
import { saveFormData, getFormData } from '../../utils/formStorage';
import ReviewCard from '../../components/insurance/ReviewCard';

export const InsurancePayment = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
  const cards = ['**** **** 3535', '**** **** 9823'];
  const steps = ['Travel Details', 'Choose Plan', 'Choose Add-ons', 'Traveller Details', 'Review and Payment'];

  // <-- minimal change: guard against null returned from getFormData()
  const [formData, setFormData] = useState(() => getFormData() ?? {});
  const [showPayment, setShowPayment] = useState(false);
  const paymentRef = useRef(null);

  const handleContinue = () => {
    setShowPayment(true);
    // give React a tick to render payment section then scroll
    setTimeout(() => {
      paymentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  // --- minimal copy of ReviewCard's extraction logic (so order summary matches exactly) ---
  const formatCurrency = (n, symbol = '₹') => {
    const num = Number(n) || 0;
    return symbol + num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const planName = formData?.selectedPlan || formData?.planName || formData?.plan_name || '—';
  const planPremium = Number(formData?.planPremium ?? formData?.selectedPlanPremium ?? formData?.plan_premium ?? 0);

  const riderList = formData?.riderList || formData?.riders || formData?.savedRiderList || [];
  const selectedRiderCodes = formData?.selectedRiderCodes || formData?.selectedRiders || [];
  const addons = (Array.isArray(selectedRiderCodes) && selectedRiderCodes.length)
    ? selectedRiderCodes.map(code => {
        const r = riderList.find(rr => rr.rider_code === code || rr.code === code) || {};
        return { code, name: r.name || r.rider_name || r.title || code, amount: r.amount ?? r.rider_amount ?? r.price ?? 0 };
      })
    : [];

  const addonsTotal = addons.reduce((s, a) => s + Number(a.amount || 0), 0);
  const subTotal = planPremium + addonsTotal;
  const gst = +(subTotal * 0.18);
  const total = Number(formData?.totalAmount ?? (subTotal + gst));

  return (
    <div className='flex flex-col items-center gap-5 py-50 md:py-30 w-3/4 text-black mx-auto'>
      <ProgressBar currentStepIndex={4} steps={steps} />

      <div className='w-full bg-white p-4'>
        {/* safe: formData is always an object now */}
        <ReviewCard data={formData} />

        <div className='w-1/2 mx-auto flex justify-evenly gap-2 my-14'>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-md bg-white border border-[#004c99] text-[#004c99] hover:bg-[#004c99] hover:text-white"
          >
            Go back
          </button>

          <button
            onClick={handleContinue}
            className="px-4 py-2 rounded-md bg-[#0062CC] text-white hover:bg-[#005293]"
          >
            Continue
          </button>
        </div>
      </div>

      {/* PAYMENT SECTION (hidden until continue) */}
      {showPayment && (
        <div ref={paymentRef} className='w-full'>
          <div className='flex flex-col md:flex-row w-full justify-center gap-5'>

            {/* LEFT SIDE */}
            <div className='payment-left flex flex-col gap-5 w-1/2'>
              <div className='flex flex-col'>
                <h2 className='text-xl font-semibold'>Complete Payment</h2>
                <p className='text-sm text-gray-600'>Review your order and complete your payment securely</p>
              </div>

              <div className='payment-method flex flex-col gap-5'>
                <div className='method-head flex items-center gap-2 text-lg font-medium'>
                  <IoMdCard className='text-[#0F3753]' size='25' />
                  <p>Payment Method</p>
                </div>

                <div
                  className={`dreamphase-wallet flex items-center gap-3  bg-[#F6F5F8] p-3 rounded cursor-pointer ${selectedMethod === 'wallet' ? 'border border-[#0F3753]' : ''}`}
                  onClick={() => setSelectedMethod('wallet')}
                >
                  <FaWallet className='text-[#0F3753]' />
                  <p>Pay With Dreamphase Wallet</p>
                  {selectedMethod === 'wallet' && <FaCheckCircle className="text-green-600 ml-auto" />}
                </div>

                <div className='card-payment flex flex-col gap-2'>
                  <h2 className='text-lg font-semibold'>Choose the card</h2>
                  <div className='flex flex-row gap-2'>
                    <div className='payment-cards flex flex-row gap-2'>
                      {cards.map((card, index) => (
                        <div
                          key={index}
                          className={`flex items-center gap-2 bg-[#F6F5F8] p-3 rounded cursor-pointer ${selectedCard === index ? 'border border-[#0F3753]' : ''}`}
                          onClick={() => {
                            setSelectedMethod('card');
                            setSelectedCard(index);
                          }}
                        >
                          <FaCreditCard />
                          <p>{card}</p>
                          {selectedMethod === 'card' && selectedCard === index && <FaCheckCircle className="text-green-600 ml-auto" />}
                        </div>
                      ))}
                    </div>
                    <button className='bg-[#0F3753] text-white p-3 rounded'>Add a new card</button>
                  </div>
                </div>

                <div className='online-payment flex flex-col gap-3'>
                  <div className='online-methods flex flex-col md:flex-row gap-4 justify-between'>
                    <div
                      className={`upi flex-1 bg-[#F6F5F8] p-3 rounded cursor-pointer flex justify-center items-center ${selectedMethod === 'upi' ? 'border border-[#0F3753]' : ''}`}
                      onClick={() => setSelectedMethod('upi')}
                    >
                      <img src='/images/icons/upi.png' className='min-w-25 max-w-25' alt='upi' />
                    </div>
                    <div
                      className={`apple-pay flex-1 bg-[#F6F5F8] p-3 rounded cursor-pointer flex justify-center items-center ${selectedMethod === 'apple' ? 'border border-[#0F3753]' : ''}`}
                      onClick={() => setSelectedMethod('apple')}
                    >
                      <img src='/images/icons/applepay.png' className='min-w-25 max-w-25' alt='applepay' />
                    </div>
                    <div
                      className={`pay-pal flex-1 bg-[#F6F5F8] p-3 rounded cursor-pointer flex justify-center items-center ${selectedMethod === 'paypal' ? 'border border-[#0F3753]' : ''}`}
                      onClick={() => setSelectedMethod('paypal')}
                    >
                      <img src='/images/icons/paypal.png' className='min-w-25 max-w-25' alt='paypal' />
                    </div>
                  </div>

                  {selectedMethod === 'upi' && (
                    <input
                      type='text'
                      placeholder='Enter UPI ID'
                      className='bg-[#F6F5F8] p-2 rounded w-full border'
                    />
                  )}

                  {selectedMethod === 'apple' && (
                    <p className='text-sm text-gray-600'>Apple Pay will open a secure session after clicking Pay</p>
                  )}

                  {selectedMethod === 'paypal' && (
                    <p className='text-sm text-gray-600'>You will be redirected to PayPal for secure payment</p>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className='payment-right flex flex-col gap-4 bg-[#F6F5F8] p-4 w-3/4 md:w-1/3 h-fit rounded shadow-sm'>
              <div className='flex items-center gap-2 text-lg font-semibold'>
                <TiDocumentText className='text-[#0F3753]' size='25' />
                <h2>Order Summary</h2>
              </div>

              <ul className='flex flex-col gap-2 text-sm'>
                {/* Plan */}
                <li className="flex justify-between">
                  <span>Plan: {planName}</span>
                  <span>{planPremium ? `₹${planPremium.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '-'}</span>
                </li>

                {/* Add-ons */}
                {addons.length > 0 && (
                  <>
                    <li className="font-semibold">Add-ons:</li>
                    {addons.map((addon, idx) => (
                      <li key={idx} className="flex justify-between">
                        <span>{addon.name}</span>
                        <span>₹{Number(addon.amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </li>
                    ))}
                  </>
                )}
              </ul>

              <hr className='w-full mx-auto border-black' />

              {/* Total */}
              <div className='flex justify-between font-semibold'>
                <h2>Total Amount Payable (incl. 18% GST)</h2>
                <p>₹{Number(total || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
            </div>

          </div>

          <div className='w-full flex justify-center mt-6'>
            <button className='p-2 bg-[#0068A3] border font-bold text-white border-white rounded-lg hover:border-[#0068A3] hover:bg-white hover:text-[#0068A3]'>
              Pay Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsurancePayment;

// src/pages/insurance/InsurancePayment.jsx
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaWallet, FaCheckCircle } from 'react-icons/fa';
import { IoMdCard } from "react-icons/io";
import { TiDocumentText } from "react-icons/ti";
import { ProgressBar } from '../../components/common/ProgressBar';
import { getFormData } from '../../utils/formStorage';
import ReviewCard from '../../components/insurance/ReviewCard';
import AddCard from '../../components/insurance/AddCard';
import { AnimatePresence, motion } from "framer-motion";
import { Visa, Mastercard, Amex, Discover } from "react-pay-icons";

// helper to detect card type
const getCardType = (number) => {
  const cleaned = (number || "").replace(/\D/g, "");
  const re = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,                 // Visa
    mastercard: /^(5[1-5][0-9]{14}|2(?:2[2-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/, // Mastercard broader 2221-2720 + 51-55
    amex: /^3[47][0-9]{13}$/,                          // American Express
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,         // Discover
    diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,        // Diners Club
    jcb: /^(?:2131|1800|35\d{3})\d{11}$/,              // JCB
    rupay: /^(60|65|81|82|508)\d+$/,                   // RuPay (approx)
  };

  for (const card in re) {
    if (re[card].test(cleaned)) {
      return card;
    }
  }
  return "unknown";
};

export const InsurancePayment = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const steps = ['Travel Details', 'Choose Plan', 'Choose Add-ons', 'Traveller Details', 'Review and Payment'];

  const [formData, setFormData] = useState(() => getFormData() ?? {});
  const [showPayment, setShowPayment] = useState(false);

  // NEW: modal state
  const [showAddCard, setShowAddCard] = useState(false);
  const overlayRef = useRef(null);

  const handleContinue = () => {
    setShowPayment(true);
    setTimeout(() => {
      paymentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  // close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setShowAddCard(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // animation variants for popup
  const popupVariants = {
    initial: {
      y: '100%',
      opacity: 1,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    exit: {
      y: '100%',
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeIn' },
    },
  };

  // rest of your order summary calculations (unchanged)
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

  const paymentRef = React.useRef(null);

  return (
    <div className='flex flex-col items-center gap-5 py-50 md:py-30 w-3/4 text-black mx-auto'>
      <ProgressBar currentStepIndex={4} steps={steps} />

      <div className='w-full bg-white p-4'>
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
                  <div className='flex flex-row gap-2 items-center'>
                    <div className='payment-cards flex flex-row gap-2'>
                      {cards.map((card, index) => {
                        // detect from raw if available, otherwise try whatever is present
                        const detectSource = card.raw || card.number || "";
                        const type = getCardType(detectSource);
                        return (
                          <div
                            key={index}
                            className={`flex items-center gap-2 bg-[#F6F5F8] p-3 rounded cursor-pointer ${selectedCard === index ? 'border border-[#0F3753]' : ''}`}
                            onClick={() => {
                              setSelectedMethod('card');
                              setSelectedCard(index);
                            }}
                          >
                            {type === "visa" && <Visa style={{ margin: 4, width: 48, height: 'auto' }} />}
                            {type === "mastercard" && <Mastercard style={{ margin: 4, width: 48, height: 'auto' }} />}
                            {type === "amex" && <Amex style={{ margin: 4, width: 48, height: 'auto' }} />}
                            {type === "discover" && <Discover style={{ margin: 4, width: 48, height: 'auto' }} />}
                            {type === "rupay" && <img src="/icons/rupay.png" alt="RuPay" className="w-8" />}
                            {type === "unknown" && <IoMdCard className="text-[#0F3753]" />}
                            <p>{card.number}</p>
                            {selectedMethod === 'card' && selectedCard === index && <FaCheckCircle className="text-green-600 ml-auto" />}
                          </div>
                        );
                      })}
                    </div>

                    {/* OPEN ADD-CARD MODAL */}
                    <button
                      onClick={() => setShowAddCard(true)}
                      className='bg-[#0F3753] text-white p-3 rounded'
                    >
                      Add a new card
                    </button>
                  </div>
                </div>

                {/* online payment methods unchanged */}
                <div className='online-payment flex flex-col gap-3'>
                  <div className='online-methods flex flex-col w-25 md:flex-row gap-4 justify-between'>
                    <div
                      className={`upi flex-1 bg-[#F6F5F8] p-3 rounded  cursor-pointer flex justify-center items-center ${selectedMethod === 'upi' ? 'border border-[#0F3753]' : ''}`}
                      onClick={() => setSelectedMethod('upi')}
                    >
                      <img src='/images/icons/upi.png' className='min-w-25 max-w-25' alt='upi' />
                    </div>
                  </div>

                  {selectedMethod === 'upi' && (
                    <input
                      type='text'
                      placeholder='Enter UPI ID'
                      className='bg-[#F6F5F8] p-2 rounded w-full border'
                    />
                  )}
                </div>
              </div>
            </div>

            <div className='payment-right flex flex-col gap-4 bg-[#F6F5F8] p-4 w-3/4 md:w-1/3 h-fit rounded shadow-sm'>
              <div className='flex items-center gap-2 text-lg font-semibold'>
                <TiDocumentText className='text-[#0F3753]' size='25' />
                <h2>Order Summary</h2>
              </div>

              <ul className='flex flex-col gap-2 text-sm'>
                <li className="flex justify-between">
                  <span>Plan: {planName}</span>
                  <span>{planPremium ? `₹${planPremium.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '-'}</span>
                </li>

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

          {/* ADD-CARD MODAL with animation */}
          <AnimatePresence>
            {showAddCard && (
              <motion.div
                ref={overlayRef}
                onMouseDown={(e) => {
                  if (e.target === overlayRef.current) setShowAddCard(false);
                }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  variants={popupVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  onMouseDown={(e) => e.stopPropagation()}
                  className="p-4"
                >
                  <AddCard
                    onClose={() => setShowAddCard(false)}
                    onAdd={(newCard) => setCards((prev) => [...prev, newCard])}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}
    </div>
  );
};

export default InsurancePayment;

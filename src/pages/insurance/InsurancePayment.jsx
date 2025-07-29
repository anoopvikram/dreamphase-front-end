import React, { useState } from 'react';
import { FaWallet, FaCreditCard, FaGooglePay, FaApplePay, FaPaypal, FaCheckCircle } from 'react-icons/fa';

export const InsurancePayment = () => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
  const cards = ['**** **** 3535', '**** **** 9823'];

  return (
    <div className='flex flex-col items-center py-50 md:py-30 w-3/4 text-black mx-auto'>

      {/* Progress bar remains unchanged */}
      <div className="flex items-center justify-between w-full max-w-4xl mx-auto mb-15 px-4 mt-8">
        {['Travel Details', 'Choose Plan', 'Choose Add-ons', 'Traveller Details', 'Review and Payment'].map((step, i) => (
          <div key={i} className="relative flex-1 flex items-center justify-center">
            {i !== 0 && (
              <div className={`absolute -translate-x-1/2 top-1/2 transform -translate-y-1/2 h-1 ${i <= 4 ? 'bg-[#164B71]' : 'bg-gray-300'} w-full z-0`}></div>
            )}
            <div className={`relative z-10 w-5 h-5 rounded-full border-2 ${
              i === 4 ? 'bg-white border-[#164B71]' : i < 4 ? 'bg-[#164B71] border-[#164B71]' : 'bg-gray-300 border-gray-300'
            }`}></div>
            <div className="absolute top-8 text-[13px] font-semibold text-center w-max -translate-x-1/2 left-1/2">
              <p className={`${i <= 4 ? 'text-[#164B71]' : 'text-gray-500'}`}>{step}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='flex flex-row w-full justify-between gap-10'>

        {/* LEFT SIDE */}
        <div className='payment-left flex flex-col gap-6 w-2/3'>
          <h2 className='text-xl font-semibold'>Complete Payment</h2>
          <p className='text-sm text-gray-600'>Review your order and complete your payment securely</p>

          <div className='payment-method flex flex-col gap-5'>

            {/* Payment Method Header */}
            <div className='method-head flex items-center gap-2 text-lg font-medium'>
              <FaWallet className='text-[#0F3753]' />
              <p>Payment Method</p>
            </div>

            {/* Dreamphase Wallet */}
            <div 
              className={`dreamphase-wallet flex items-center gap-3 bg-[#F6F5F8] p-3 rounded cursor-pointer ${selectedMethod === 'wallet' && 'border border-[#0F3753]'}`}
              onClick={() => setSelectedMethod('wallet')}
            >
              <FaWallet className='text-[#0F3753]' />
              <p>Pay With Dreamphase Wallet</p>
              {selectedMethod === 'wallet' && <FaCheckCircle className="text-green-600 ml-auto" />}
            </div>

            {/* Card Payment */}
            <div className='card-payment flex flex-col gap-3'>
              <h2 className='text-lg font-semibold'>Choose the card</h2>
              <div className='flex flex-row gap-2'>
                <div className='payment-cards flex flex-row gap-2'>
                {cards.map((card, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 bg-[#F6F5F8] p-3 rounded cursor-pointer ${selectedCard === index && 'border border-[#0F3753]'}`}
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

            {/* Online Payments */}
            <div className='online-payment flex flex-col gap-3'>
              <div className='online-methods flex gap-4'>
                <div
                  className={`upi bg-[#F6F5F8] p-3 rounded cursor-pointer ${selectedMethod === 'upi' && 'border border-[#0F3753]'}`}
                  onClick={() => setSelectedMethod('upi')}
                >
                  <FaGooglePay size={24} />
                </div>
                <div
                  className={`apple-pay bg-[#F6F5F8] p-3 rounded cursor-pointer ${selectedMethod === 'apple' && 'border border-[#0F3753]'}`}
                  onClick={() => setSelectedMethod('apple')}
                >
                  <FaApplePay size={24} />
                </div>
                <div
                  className={`pay-pal bg-[#F6F5F8] p-3 rounded cursor-pointer ${selectedMethod === 'paypal' && 'border border-[#0F3753]'}`}
                  onClick={() => setSelectedMethod('paypal')}
                >
                  <FaPaypal size={24} />
                </div>
              </div>

              {/* Conditional Inputs */}
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
        <div className='payment-right flex flex-col gap-4 bg-[#F6F5F8] p-4 w-1/3 rounded shadow-sm'>
          <div className='flex items-center gap-2 text-lg font-semibold'>
            <FaWallet className='text-[#0F3753]' />
            <h2>Order Summary</h2>
          </div>

          <ul className='flex flex-col gap-1 text-sm'>
            <li>Travel Insurance - Basic Plan</li>
            <li>2 Travelers</li>
            <li>10 Days Coverage</li>
          </ul>
          <hr className='w-full mx-auto border-black' />
          <div className='flex justify-between font-semibold'>
            <h2>Total</h2>
            <p>$139.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

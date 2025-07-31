import React, { useState } from 'react';
import { FaWallet, FaCreditCard, FaGooglePay, FaApplePay, FaPaypal, FaCheckCircle } from 'react-icons/fa';
import { IoMdCard } from "react-icons/io";
import { TiDocumentText } from "react-icons/ti";

export const InsurancePayment = () => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
  const cards = ['**** **** 3535', '**** **** 9823'];

  return (
    <div className='flex flex-col items-center gap-5 py-50 md:py-30 w-3/4 text-black mx-auto'>

      {/* Progress bar remains unchanged */}
      {/* Progress bar remains unchanged */}
      <div className="flex items-center justify-between w-full max-w-4xl mx-auto mb-15 px-4 mt-8">
        {['Travel Details', 'Choose Plan', 'Choose Add-ons', 'Traveller Details', 'Review and Payment'].map((step, i) => (
          <div key={i} className="relative flex-1 flex items-center justify-center">
            {i !== 0 && (
              <div className={`absolute z-30 -translate-x-13/32 md:-translate-x-14/32 lg:-translate-x-15/32 top-1/2 transform -translate-y-1/2 h-1 ${
                i <= 4 ? 'bg-[#0068A3]' : 'bg-gray-300'
              } w-full z-0`}></div>
            )}
            
            <div className={`relative z-10  rounded-full border-2 ${
              i === 4 
              ? 'bg-[#0068A3] w-7 h-7 border-[#D9D9D9] border-8'
              : i < 4 
              ? 'bg-[#0068A3] w-6 h-6 border-[#0068A3]'
              : 'bg-gray-300 w-6 h-6 border-gray-300'
            }`}></div>
            
            <div className="absolute top-8 text-[13px] font-semibold text-center w-max -translate-x-1/2 left-1/2">
              <p className={`${i <= 4 ? 'text-[#164B71]' : 'text-gray-500'}`}>{step}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='flex flex-col md:flex-row w-full justify-center gap-5'>

        {/* LEFT SIDE */}
        <div className='payment-left flex flex-col gap-5 w-1/2'>
        <div className='flex flex-col'>
            <h2 className='text-xl font-semibold'>Complete Payment</h2>
            <p className='text-sm text-gray-600'>Review your order and complete your payment securely</p>
        </div>
          

          <div className='payment-method flex flex-col gap-5'>

            {/* Payment Method Header */}
            <div className='method-head flex items-center gap-2 text-lg font-medium'>
              <IoMdCard className='text-[#0F3753]' size='25' />
              <p>Payment Method</p>
            </div>

            {/* Dreamphase Wallet */}
            <div 
              className={`dreamphase-wallet flex items-center gap-3  bg-[#F6F5F8] p-3 rounded cursor-pointer ${selectedMethod === 'wallet' && 'border border-[#0F3753]'}`}
              onClick={() => setSelectedMethod('wallet')}
            >
              <FaWallet className='text-[#0F3753]' />
              <p>Pay With Dreamphase Wallet</p>
              {selectedMethod === 'wallet' && <FaCheckCircle className="text-green-600 ml-auto" />}
            </div>

            {/* Card Payment */}
            <div className='card-payment flex flex-col gap-2'>
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
              <div className='online-methods flex flex-col md:flex-row gap-4 justify-between'>
  <div
    className={`upi flex-1 bg-[#F6F5F8] p-3 rounded cursor-pointer flex justify-center items-center ${
      selectedMethod === 'upi' && 'border border-[#0F3753]'
    }`}
    onClick={() => setSelectedMethod('upi')}
  >
    <img src='/images/icons/upi.png' className='min-w-25 max-w-25'/>
  </div>
  <div
    className={`apple-pay flex-1 bg-[#F6F5F8] p-3 rounded cursor-pointer flex justify-center items-center ${
      selectedMethod === 'apple' && 'border border-[#0F3753]'
    }`}
    onClick={() => setSelectedMethod('apple')}
  >
    <img src='/images/icons/applepay.png' className='min-w-25 max-w-25'/>

  </div>
  <div
    className={`pay-pal flex-1 bg-[#F6F5F8] p-3 rounded cursor-pointer flex justify-center items-center ${
      selectedMethod === 'paypal' && 'border border-[#0F3753]'
    }`}
    onClick={() => setSelectedMethod('paypal')}
  >
    <img src='/images/icons/paypal.png' className='min-w-25 max-w-25'/>
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
        <div className='payment-right flex flex-col gap-4 bg-[#F6F5F8] p-4 w-3/4 md:w-1/3 h-fit rounded shadow-sm'>
          <div className='flex items-center gap-2 text-lg font-semibold'>
            <TiDocumentText className='text-[#0F3753]' size='25' />
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
      <button className='p-2 bg-[#0068A3] border font-bold text-white border-white rounded-lg hover:border-[#0068A3] hover:bg-white hover:text-[#0068A3]'>Pay Now</button>
    </div>
  );
};

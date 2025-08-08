import React, { useState } from 'react';
import { FaUser, FaRegCreditCard, FaRegClock } from 'react-icons/fa';

export const Info = () => {
  const [travelerCount, setTravelerCount] = useState(1);

  const visaFee = 2600;
  const processingFee = 400;
  const totalPrice = visaFee + processingFee;

  return (
    <div className="w-[160px] bg-white rounded-lg shadow-md border relative text-xs">
      
      {/* Blue header */}
      <div className="bg-[#164B71] mt-3 -mx-3 text-white px-3 py-2 rounded-lg flex items-center gap-2">
        <span className="text-base">🛡</span>
        <p className="leading-tight">
          Assure your guaranteed Visa by <br />
          <span className="font-bold">30th Aug 2025</span>
        </p>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col gap-2">
        
        {/* Travellers row */}
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center gap-1">
            <FaUser className="text-gray-600 text-sm" />
            <span>Travellers</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTravelerCount(Math.max(1, travelerCount - 1))}
              className="px-1"
            >
              −
            </button>
            <span>{travelerCount}</span>
            <button
              onClick={() => setTravelerCount(travelerCount + 1)}
              className="px-1"
            >
              +
            </button>
          </div>
        </div>

        {/* Visa Fee */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <FaRegCreditCard className="text-gray-600 text-sm" />
            <span>Visa Fee</span>
          </div>
          <span className="font-bold">₹{visaFee.toLocaleString()}</span>
        </div>

        {/* Processing Fee */}
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center gap-1">
            <FaRegClock className="text-gray-600 text-sm" />
            <span>Processing Fee</span>
          </div>
          <span className="font-bold">₹{processingFee.toLocaleString()}</span>
        </div>

        {/* Total Amount */}
        <div className="flex items-center justify-between font-bold">
          <span>Total</span>
          <span>₹{totalPrice.toLocaleString()}</span>
        </div>

        {/* Button */}
        <button className="bg-[#F4B728] text-black py-1 px-2 rounded mt-1 text-[10px] font-medium hover:brightness-95 transition">
          Get Visa / Refund
        </button>
      </div>
    </div>
  );
};

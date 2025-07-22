import React from 'react';
import { FaShieldAlt } from 'react-icons/fa';

export const VisaCard = ({ visa, onApply }) => {
  return (
    <div className="rounded-2xl shadow border p-4 bg-white">
      {/* Header */}
      <div className="flex justify-between items-end border-b pb-2 mb-3">
        <h3 className="text-lg font-semibold">{visa.type}</h3>
      </div>

      <div className="flex flex-col md:flex-row w-full gap-4">
        {/* LEFT SIDE */}
        <div className="flex-1">
          {/* Arrival Estimate */}
          <div className="flex items-center gap-2 text-sm text-gray-700 mb-4">
            <FaShieldAlt className="text-blue-700" />
            Estimated visa arrival by <strong>{visa.estimatedArrival || '9th Jul, 2025'}</strong>
          </div>

          {/* Labels */}
          <div className="grid grid-cols-6 text-sm font-medium bg-gray-100 px-4 py-2 rounded-t-md">
            <div>Entry</div>
            <div>Validity</div>
            <div>Duration</div>
            <div>Documents</div>
            <div>Processing Time</div>
            <div>Absconding fees</div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-6 text-sm text-gray-600 px-4 py-2 items-center border-t border-gray-200">
            <div>{visa.entry}</div>
            <div>{visa.validity}</div>
            <div>{visa.duration}</div>
            <div>
              <a href="#" className="text-blue-600 underline text-sm">View Here</a>
            </div>
            <div>{visa.processingTime}</div>
            <div>{visa.abscondingFee}</div>
          </div>
        </div>

        {/* RIGHT SIDE - Price + Button */}
        <div className="min-w-[150px] flex flex-col items-center justify-center">
          <p className="text-xl font-bold mb-2">{visa.price}</p>
          <button
            onClick={onApply}
            className="px-5 py-2 rounded-md border border-blue-900 text-blue-900 font-semibold hover:bg-blue-50"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

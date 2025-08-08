import React, { useState, useRef, useEffect } from 'react';
import { FaShieldAlt } from 'react-icons/fa';
import { FiInfo } from "react-icons/fi";
import { Info } from './Info';

export const VisaCard = ({ visa, onApply }) => {
  const [showInfo, setShowInfo] = useState(false);
  const cardRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setShowInfo(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative rounded-2xl shadow border p-4 bg-white"
    >
      {/* Header */}
      <div className="flex justify-between items-end border-b pb-2 mb-3">
        <h3 className="text-lg font-semibold">{visa.name}</h3>
        <p className='p-1 px-2 bg-[#0068A3] text-white rounded-lg'>3-5 Business Days</p>
      </div>

      <div className="flex flex-col md:flex-row w-full gap-4">
        {/* LEFT SIDE */}
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm text-gray-700 mb-4">
            <FaShieldAlt className="text-[#164B71]" />
            Estimated visa arrival by <strong>28th Jul, 2025</strong>
          </div>

          <div className="grid grid-cols-6 text-sm font-medium bg-gray-100 px-4 py-2 rounded-t-md">
            <div>Entry</div>
            <div>Validity</div>
            <div>Duration</div>
            <div>Documents</div>
            <div>Processing Time</div>
            <div>Absconding fees</div>
          </div>

          <div className="grid grid-cols-6 text-sm text-gray-600 px-4 py-2 items-center border-t border-gray-200">
            <div>{visa.entry_type}</div>
            <div>{visa.validity_days} days</div>
            <div>{visa.duration_days} days</div>
            <div>
              <a href="#" className="text-[#164B71] underline text-sm">View Here</a>
            </div>
            <div>{visa.processing_time}</div>
            <div>—</div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="min-w-[150px] flex flex-col items-center justify-center">
          <div className="flex flex-row items-center gap-2">
            <p className="text-xl font-bold mb-2">₹{visa.total_chaerges}</p>
            <button onClick={() => setShowInfo((prev) => !prev)}>
              <FiInfo color="gray" size="18" />
            </button>
          </div>

          <button
            onClick={onApply}
            className="px-5 py-2 rounded-md border border-[#164B71] text-[#164B71] font-semibold hover:bg-blue-50"
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* POPUP: positioned next to the VisaCard */}
      {showInfo && (
        <div
          className="absolute top-0 left-full ml-4 z-50"
        >
          <Info />
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { FaPlane, FaShieldAlt, FaCalendarAlt, FaArrowRight, FaTimes } from 'react-icons/fa';
import { TravelerForm } from '../../components/visa/TravelerForm';
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export const VisaApplicationForm = () => {
  const { country, visaType } = useParams();
  const location = useLocation();
  const { from, to, depart, return: returnDate, visa } = location.state || {};

  const [travelers, setTravelers] = useState([1]);
  const [travelerData, setTravelerData] = useState([{}]);
  const navigate = useNavigate();


  const handleAddTraveler = () => {
    setTravelers((prev) => [...prev, prev.length + 1]);
    setTravelerData((prev) => [...prev, {}]);
  };

  const handleRemoveTraveler = (indexToRemove) => {
    if (travelers.length === 1) return;
    setTravelers((prev) => prev.filter((_, i) => i !== indexToRemove));
    setTravelerData((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleTravelerChange = (index, updatedData) => {
    setTravelerData((prev) => {
      const copy = [...prev];
      copy[index] = updatedData;
      return copy;
    });
  };

  if (!from || !to || !visa) {
    return <p className="text-center text-red-600">Missing required data. Please go back and reselect your visa.</p>;
  }

  return (
    <div className="w-full bg-white text-black px-6 pt-30 space-y-12 pb-12">
      {/* Header From -> To */}
      <div className="flex justify-center items-center gap-3 text-xl font-bold bg-[#D9D9D9] py-2 px-6 w-fit mx-auto border-2 border-black rounded-full">
        <span>{from}</span>
        <FaPlane />
        <span>{to}</span>
      </div>

      {/* Date Pickers */}
      <div className="flex justify-center items-center w-fit mx-auto border-1 bg-[#D9D9D9] shadow-2xl rounded-full px-5 gap-6 text-sm">
        <div className="flex items-center gap-2 rounded px-4 py-2">
          <FaCalendarAlt className="text-black text-2xl" />
          <div className="flex flex-col">
            <span className="text-[10px]">Departure Date</span>
            <span>{depart}</span>
          </div>
        </div>
        <div className='devider text-2xl'><span >|</span></div>
        <div className="flex items-center gap-2 rounded px-4 py-2">
          <FaCalendarAlt className="text-black text-2xl" />
          <div className="flex flex-col">
            <span className="text-xs">Return Date</span>
            <span>{returnDate}</span>
          </div>
        </div>
      </div>

      {/* Authorization Note */}
      <div className="flex justify-center items-center gap-3 text-sm text-gray-800">
        <FaShieldAlt className="text-blue-500" />
        <span>Dreamphase is authorized by the Government of Vietnam</span>
      </div>

      {/* Processing Time */}
      <div className="flex flex-col items-center space-y-1">
        <p className="font-semibold">Processing Time</p>
        <p className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs">5–7 Business Days</p>
        <div className="w-3/4 bg-gray-300 h-2 rounded-full mt-2">
          <div className="bg-blue-500 h-2 rounded-full w-3/4" />
        </div>
      </div>

      {/* Visa Details */}
      <div className="flex flex-wrap gap-6 justify-start">
        {[ 
          { label: 'Visa Type', value: visa?.type },
          { label: 'Visa Term', value: visa?.validity },
          { label: 'Visa Time', value: visa?.duration },
          { label: 'Visa Stage', value: visa?.processingTime }
        ].map(({ label, value }, idx) => (
          <div key={idx} className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md">
            <div className="w-6 h-6 bg-gray-400 rounded-full" />
            <div>
              <p className="text-sm text-gray-600">{label}:</p>
              <p className="font-semibold">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Passport Upload Section Info */}
      <div>
        <h2 className="text-3xl font-bold">Upload Traveler's Passport (Front & Back Pages)</h2>
        <p className="text-xl">
          {to?.charAt(0).toUpperCase() + to?.slice(1).toLowerCase()} requires a clear scan of your passport. Dreamphase uses OCR to autofill your info. Review before submitting.
        </p>
      </div>

      {/* Traveler Forms */}
      <div className="space-y-10">
        {travelers.map((_, i) => (
          <div key={i} className="relative space-y-4">
            <div className="flex items-center justify-between px-6 md:px-16">
              <h2 className="text-lg font-bold">Traveler {i + 1}</h2>
              {travelers.length > 1 && (
                <button
                  onClick={() => handleRemoveTraveler(i)}
                  className="text-red-600 text-sm flex items-center gap-1"
                >
                  <FaTimes className="text-xs" /> Remove Traveler
                </button>
              )}
            </div>
            <TravelerForm index={i} onChange={handleTravelerChange} />
          </div>
        ))}
      </div>

      {/* Add Another Traveler */}
      <div className="w-full flex justify-center">
        <button
          onClick={handleAddTraveler}
          className="flex items-center gap-2 text-sm px-4 py-2 border border-gray-400 rounded-full"
        >
          <FaArrowRight className="rotate-90" />
          Add Another Traveler
        </button>
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={() => {
            const fullData = {
              from,
              to,
              depart,
              return: returnDate,
              visa,
              travelers: travelerData,
            };

            navigate(`/visa/review/temp-id`, { state: fullData });
          }}
          className="bg-blue-600 text-white px-6 py-2 rounded-full"
        >
          Continue to Review
        </button>
      </div>


      <div className="px-6 md:px-16 space-y-12">
        {/* General Information Section */}
        <div>
          <h2 className="text-xl font-bold text-blue-800 mb-2">General Information</h2>
          <p className="text-sm text-gray-800 mb-4">
            Lorem ipsum dolor sit amet, consectetur
          </p>
          <p className="text-sm text-gray-800">
            <strong>Yes</strong>, {to?.charAt(0).toUpperCase() + to?.slice(1).toLowerCase()} citizens must have a valid visa to visit {to?.charAt(0).toUpperCase() + to?.slice(1).toLowerCase()}. They can apply for a visa, which allows short stays for tourism, business or family visits.
          </p>
        </div>

        {/* What is a Visa */}
        <div>
          <h3 className="text-md font-bold mb-2">What is a {to?.charAt(0).toUpperCase() + to?.slice(1).toLowerCase()} visa?</h3>
          <p className="text-sm text-gray-800">
            A visa allows individuals to enter, transit through, or stay within the country for specific reasons like tourism, work, or family.
          </p>
        </div>

        {/* Visa Requirements Section */}
        <div>
          <h3 className="text-md font-bold mb-2">
            What are the {to?.charAt(0).toUpperCase() + to?.slice(1).toLowerCase()} visa requirements for travelers?
          </h3>
          <p className="text-sm text-gray-800 mb-2">To apply for a visa to {to?.charAt(0).toUpperCase() + to?.slice(1).toLowerCase()}, the following documents are required:</p>
          <ul className="list-disc list-inside text-sm space-y-2 text-gray-700">
            <li>Completed and signed visa application form.</li>
            <li>Recent passport-sized photograph as per visa photo rules.</li>
            <li>Valid passport with at least 2 blank pages, valid for 3+ months beyond departure.</li>
            <li>Previous passports (if any).</li>
            <li><span className="underline text-blue-600">Cover letter</span> outlining personal info, trip purpose, financial proof, return intent.</li>
            <li>Employer letter with a <strong>‘No Objection Statement’</strong>.</li>
            <li>Travel insurance with minimum €30,000 coverage.</li>
            <li>Roundtrip tickets (if applicable).</li>
            <li>Hotel bookings or invitation letter (if invited).</li>
            <li><strong>Proof of financial means</strong> (bank statements, tax returns).</li>
          </ul>
          <p className="text-xs text-gray-500 mt-2">Note: Depending on circumstances, more documents may be needed.</p>
        </div>

        {/* Application Steps Section */}
        <div>
          <h3 className="text-md font-bold mb-3">How do I apply for a {to?.charAt(0).toUpperCase() + to?.slice(1).toLowerCase()} visa?</h3>
          <ol className="list-decimal list-inside text-sm text-gray-800 space-y-1">
            <li>Gather the required documents.</li>
            <li>Fill out and print the application form.</li>
            <li>Book an appointment at the official VAC website.</li>
            <li>Attend appointment and submit biometrics, documents, and fees.</li>
            <li>Track your visa status online after submission.</li>
            <li>Once approved, collect your passport with the visa sticker.</li>
          </ol>
        </div>

        {/* Rejection Reasons */}
        <div>
          <h3 className="font-semibold border-b pb-1 mb-2 text-sm">{to?.charAt(0).toUpperCase() + to?.slice(1).toLowerCase()} Visa Rejection Reasons</h3>
          <ul className="list-disc text-xs text-gray-600 space-y-1 pl-6">
            <li>Expired Passport</li>
            <li>Insufficient Funds</li>
            <li>Criminal Record</li>
            <li>Fake/Incorrect Documents</li>
            <li>Invalid or Inconsistent Travel Info</li>
          </ul>
        </div>
      </div>

    </div>
  );
};

// src/pages/VisaReviewPage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

export const VisaReviewPage = () => {
  const location = useLocation();
  const { from, to, depart, return: returnDate, visa, travelers } = location.state || {};

  if (!from || !to || !depart || !returnDate || !visa || !travelers || travelers.length === 0) {
    return <p className="text-center text-red-600 mt-10">Missing visa or traveler data. Please go back and fill the form.</p>;
  }

  return (
    <div className="w-full px-6 pt-20 pb-12 space-y-10 text-black bg-white">
      <h1 className="text-3xl font-bold text-center">Review Your Visa Application</h1>

      {/* General Trip Info */}
      <div className="bg-gray-100 rounded-lg p-6 shadow space-y-2">
        <h2 className="text-xl font-semibold mb-4">Trip Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <p><strong>From:</strong> {from}</p>
          <p><strong>To:</strong> {to}</p>
          <p><strong>Departure:</strong> {depart}</p>
          <p><strong>Return:</strong> {returnDate}</p>
        </div>
      </div>

      {/* Visa Info */}
      <div className="bg-gray-100 rounded-lg p-6 shadow space-y-2">
        <h2 className="text-xl font-semibold mb-4">Visa Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <p><strong>Type:</strong> {visa?.type}</p>
          <p><strong>Validity:</strong> {visa?.validity}</p>
          <p><strong>Duration:</strong> {visa?.duration}</p>
          <p><strong>Processing:</strong> {visa?.processingTime}</p>
        </div>
      </div>

      {/* Traveler Data */}
      {travelers.map((traveler, index) => (
        <div key={index} className="border rounded-xl p-6 shadow-md space-y-4 bg-gray-50">
          <h2 className="text-xl font-semibold">Traveler {index + 1}</h2>

          {/* Basic Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <p><strong>Name:</strong> {traveler.firstName} {traveler.lastName}</p>
            <p><strong>Passport Number:</strong> {traveler.passportNumber}</p>
            <p><strong>Date of Birth:</strong> {traveler.dateOfBirth}</p>
            <p><strong>Place of Birth:</strong> {traveler.placeOfBirth}</p>
            <p><strong>Sex:</strong> {traveler.sex}</p>
            <p><strong>Nationality:</strong> {traveler.nationality}</p>
            <p><strong>Place of Issue:</strong> {traveler.placeOfIssue}</p>
            <p><strong>Date of Issue:</strong> {traveler.dateOfIssue}</p>
            <p><strong>Date of Expiry:</strong> {traveler.dateOfExpiry}</p>
            <p><strong>Phone:</strong> {traveler.phoneCode} {traveler.phoneNumber}</p>
            <p><strong>Email:</strong> {traveler.email}</p>
            <p><strong>Father's Name:</strong> {traveler.fatherName}</p>
            <p><strong>Mother's Name:</strong> {traveler.motherName}</p>
            <p><strong>Address:</strong> {traveler.address}</p>
            <p><strong>Postal Code:</strong> {traveler.postalCode}</p>
            <p><strong>State:</strong> {traveler.state}</p>
          </div>

          {/* Image Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
            {traveler.passportFront && (
              <div className="text-center">
                <p className="text-xs text-gray-600 mb-2">Passport Front</p>
                <img
                  src={URL.createObjectURL(traveler.passportFront)}
                  alt="Passport Front"
                  className="w-full max-w-xs h-48 object-cover rounded-md border mx-auto"
                />
              </div>
            )}
            {traveler.passportBack && (
              <div className="text-center">
                <p className="text-xs text-gray-600 mb-2">Passport Back</p>
                <img
                  src={URL.createObjectURL(traveler.passportBack)}
                  alt="Passport Back"
                  className="w-full max-w-xs h-48 object-cover rounded-md border mx-auto"
                />
              </div>
            )}
            {traveler.travelerPhoto && (
              <div className="text-center">
                <p className="text-xs text-gray-600 mb-2">Traveler Photo</p>
                <img
                  src={URL.createObjectURL(traveler.travelerPhoto)}
                  alt="Traveler"
                  className="w-full max-w-xs h-48 object-cover rounded-md border mx-auto"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

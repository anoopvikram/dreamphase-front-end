import React, { useState, useEffect } from 'react';
import { PhotoUpload } from './PhotoUpload';
import { countryCodes } from '../../api/visaApi';

export const TravelerForm = ({ index, onChange }) => {
  const [formData, setFormData] = useState({
    passportNumber: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    placeOfBirth: '',
    sex: '',
    nationality: '',
    placeOfIssue: '',
    dateOfIssue: '',
    dateOfExpiry: '',
    phoneCode: countryCodes[0]?.code || '',
    phoneNumber: '',
    email: '',
    fatherName: '',
    motherName: '',
    address: '',
    postalCode: '',
    state: '',
    passportFront: null,
    passportBack: null,
    travelerPhoto: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    onChange(index, formData);
  }, [formData]);

  return (
    <div className="w-full flex flex-col items-center gap-10 my-10 border-t pt-10">
      {/* Passport Front Image Upload Section */}
      <div className="w-3/4 mx-auto flex flex-col items-center gap-5">
        <PhotoUpload
          label="Upload Passport (Front Page)"
          name="passportFront"
          onChange={(file) =>
            setFormData((prev) => ({ ...prev, passportFront: file }))
          }
          onPassportExtracted={(data) =>
            setFormData((prev) => ({
              ...prev,
              passportNumber: data.passport_number || '',
              firstName: data.first_name || '',
              lastName: data.last_name || '',
              nationality: data.nationality || '',
              sex: data.sex || '',
              dateOfBirth: data.dob || '',
              placeOfBirth: data.place_of_birth || '',
              placeOfIssue: '', // not extracted
              dateOfIssue: data.date_of_issue || '',
              dateOfExpiry: data.date_of_expiry || '',
            }))
          }
        />

        {/* Row 1 */}
        <div className="flex flex-wrap gap-10 mx-auto w-full">
          <div className="w-full md:w-[30%]">
            <label className="text-sm font-medium">Passport Number <span className="text-red-500">*</span></label>
            <input name="passportNumber" value={formData.passportNumber} onChange={handleChange} type="number" required className="border px-4 py-2 rounded-full w-full" />
          </div>
          <div className="w-full md:w-[30%]">
            <label className="text-sm font-medium">First Name <span className="text-red-500">*</span></label>
            <input name="firstName" value={formData.firstName} onChange={handleChange} type="text" required className="border px-4 py-2 rounded-full w-full" />
          </div>
          <div className="w-full md:w-[30%]">
            <label className="text-sm font-medium">Last Name <span className="text-red-500">*</span></label>
            <input name="lastName" value={formData.lastName} onChange={handleChange} type="text" required className="border px-4 py-2 rounded-full w-full" />
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-wrap gap-5 mx-auto w-full">
          <div className="w-full md:w-[22%]">
            <label className="text-sm font-medium">Date of Birth <span className="text-red-500">*</span></label>
            <input name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} type="date" required className="border px-4 py-2 rounded-full w-full" />
          </div>
          <div className="w-full md:w-[22%]">
            <label className="text-sm font-medium">Place of Birth <span className="text-red-500">*</span></label>
            <input name="placeOfBirth" value={formData.placeOfBirth} onChange={handleChange} type="text" required className="border px-4 py-2 rounded-full w-full" />
          </div>
          <div className="w-full md:w-[22%]">
            <label className="text-sm font-medium">Sex <span className="text-red-500">*</span></label>
            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              required
              className="border px-4 py-2 rounded-full w-full bg-white"
            >
              <option value="" disabled>Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="w-full md:w-[22%]">
            <label className="text-sm font-medium">Nationality <span className="text-red-500">*</span></label>
            <input name="nationality" value={formData.nationality} onChange={handleChange} type="text" required className="border px-4 py-2 rounded-full w-full" />
          </div>
        </div>

        {/* Row 3 */}
        <div className="flex flex-wrap gap-4 w-full">
          <div className="w-full md:w-[30%]">
            <label className="text-sm font-medium">Place of Issue <span className="text-red-500">*</span></label>
            <input name="placeOfIssue" value={formData.placeOfIssue} onChange={handleChange} type="text" required className="border px-4 py-2 rounded-full w-full" />
          </div>
          <div className="w-full md:w-[30%]">
            <label className="text-sm font-medium">Date of Issue <span className="text-red-500">*</span></label>
            <input name="dateOfIssue" value={formData.dateOfIssue} onChange={handleChange} type="date" required className="border px-4 py-2 rounded-full w-full" />
          </div>
          <div className="w-full md:w-[30%]">
            <label className="text-sm font-medium">Date of Expiry <span className="text-red-500">*</span></label>
            <input name="dateOfExpiry" value={formData.dateOfExpiry} onChange={handleChange} type="date" required className="border px-4 py-2 rounded-full w-full" />
          </div>
        </div>

        {/* Row 4 */}
        <div className="flex flex-wrap gap-10 w-full">
          
          <div className="flex w-full flex-col md:w-[35%]">
            <label className="text-sm font-medium mb-1">Phone Number <span className="text-red-500">*</span></label>
            <div className='flex w-full'>
              <select
                value={formData.phoneCode}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phoneCode: e.target.value }))
                }
                className="border px-2 py-2 rounded-l-full bg-gray-100"
              >
                {countryCodes.map(({ country, code }) => (
                  <option key={code} value={code}>
                    {code} ({country})
                  </option>
                ))}
              </select>
              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                type="tel"
                required
                className="border-t border-b border-r px-4 py-2 rounded-r-full w-full"
              />
            </div>
          </div>
          <div className="w-full md:w-[56%]">
            <label className="text-sm font-medium">Email <span className="text-red-500">*</span></label>
            <input name="email" value={formData.email} onChange={handleChange} type="email" required className="border px-4 py-2 rounded-full w-full" />
          </div>
        </div>
      </div>

      {/* Passport Back Image Upload Section */}
      <div className="w-full flex flex-col items-center mt-20 space-y-6">
        <PhotoUpload
          label="Upload Passport (Back Page)"
          name="passportBack"
          onChange={(file) =>
            setFormData((prev) => ({ ...prev, passportBack: file }))
          }
        />

        <div className="flex flex-row gap-30 w-3/4">
          {/* Left Column */}
          <div className="flex flex-col gap-4 w-full md:w-3/4">
            <label className="text-sm font-medium">Father's Name <span className="text-red-500">*</span></label>
            <input name="fatherName" value={formData.fatherName} onChange={handleChange} type="text" required className="border px-4 py-2 rounded-full" />

            <label className="text-sm font-medium">Address <span className="text-red-500">*</span></label>
            <textarea name="address" value={formData.address} onChange={handleChange} rows="6" required className="border px-4 py-2 rounded-3xl resize-none" />
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6 w-full md:w-3/4">
            <label className="text-sm font-medium">Mother's Name <span className="text-red-500">*</span></label>
            <input name="motherName" value={formData.motherName} onChange={handleChange} type="text" required className="border px-4 py-2 rounded-full" />

            <label className="text-sm font-medium">Postal Code <span className="text-red-500">*</span></label>
            <input name="postalCode" value={formData.postalCode} onChange={handleChange} type="number" required className="border px-4 py-2 rounded-full" />

            <label className="text-sm font-medium">State <span className="text-red-500">*</span></label>
            <input name="state" value={formData.state} onChange={handleChange} type="text" required className="border px-4 py-2 rounded-full" />
          </div>
        </div>
      </div>

      {/* Traveler Photo */}
      <div className="w-full px-6 md:px-16 mt-8">
        <h3 className="font-semibold text-sm mb-2">Upload Traveler's Photo</h3>
        <PhotoUpload
          label="Upload Traveler Photo"
          name="travelerPhoto"
          onChange={(file) =>
            setFormData((prev) => ({ ...prev, travelerPhoto: file }))
          }
        />
      </div>
    </div>
  );
};

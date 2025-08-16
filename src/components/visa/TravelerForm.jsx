import React, { useState, useEffect } from 'react';
import { PhotoUpload } from './PhotoUpload';
import { countryCodes } from '../../api/visaApi';
import { IoMdArrowDropdown } from "react-icons/io";

/**
 * TravelerForm
 * - Adds country-aware passport validation using a regex map.
 * - If country not in map, falls back to a generic alphanumeric 6-9 length rule.
 * - onChange(index, data) now receives the full form data plus `passportValid` boolean.
 */

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

  const [errors, setErrors] = useState({
    passportNumber: '',
  });

  // Passport regex map keyed by ISO-like short codes or common keys
  const passportRegexByCountry = {
    IN: /^[A-PR-WY][0-9]{7}$/i,     // India: Letter (except Q,O,I,Z) + 7 digits (common rule)
    US: /^[0-9]{9}$/,               // USA: 9 digits
    UK: /^([0-9]{9}|[A-Z]{2}[0-9]{7})$/i, // UK: 9 digits or 2 letters + 7 digits
    GB: /^([0-9]{9}|[A-Z]{2}[0-9]{7})$/i, // alias GB
    CA: /^[A-Z]{2}\d{6}$/i,         // Canada: 2 letters + 6 digits
    AU: /^[NPM]\d{7}$/i,            // Australia: common series start with N/P/M + 7 digits
    SG: /^[A-Z]\d{7}[A-Z]?$/i,      // Singapore variations
    PH: /^[A-Z]\d{7}$/i,            // Philippines
    PK: /^[A-Z]{2}\d{7}$/i,         // Pakistan
    AE: /^[A-Z0-9]{6,9}$/i,         // UAE flexible (fallback-ish)
    DE: /^[CFGHJKLMNPRTVWXYZ0-9]{9}$/i, // Germany (varies) - using flexible pattern
    // Add more as you need...
  };

  // mapping common country name inputs to keys above
  const countryNameToKey = {
    INDIA: 'IN',
    'UNITED STATES': 'US',
    'UNITED STATES OF AMERICA': 'US',
    USA: 'US',
    'UNITED KINGDOM': 'UK',
    ENGLAND: 'UK',
    BRITAIN: 'UK',
    AUSTRALIA: 'AU',
    CANADA: 'CA',
    SINGAPORE: 'SG',
    PHILIPPINES: 'PH',
    PAKISTAN: 'PK',
    UAE: 'AE',
    'UNITED ARAB EMIRATES': 'AE',
    GERMANY: 'DE',
    DEUTSCHLAND: 'DE',
  };

  // Normalize user input nationality to a key we can look up
  const resolveCountryKey = (nationalityRaw) => {
    if (!nationalityRaw) return null;
    const raw = String(nationalityRaw).trim().toUpperCase();
    // If user already provided an ISO-like code (2 letters), try that first
    if (/^[A-Z]{2}$/.test(raw) && passportRegexByCountry[raw]) return raw;
    // If user entered common names, map them
    if (countryNameToKey[raw]) return countryNameToKey[raw];
    // If user typed full name that matches mapping partially, attempt simple matches
    for (const nameKey of Object.keys(countryNameToKey)) {
      if (raw.includes(nameKey)) return countryNameToKey[nameKey];
    }
    // fallback: return raw if matches a map key
    if (passportRegexByCountry[raw]) return raw;
    return null;
  };

  // Validate passport using the map; fallback to generic rule if unknown country
  const validatePassport = (nationality, passportNumber) => {
    const cleaned = String(passportNumber || '').trim().replace(/\s+/g, '').toUpperCase();
    if (!cleaned) {
      return { valid: false, message: '' };
    }

    const countryKey = resolveCountryKey(nationality);

    if (countryKey && passportRegexByCountry[countryKey]) {
      const regex = passportRegexByCountry[countryKey];
      const ok = regex.test(cleaned);
      return {
        valid: ok,
        message: ok ? '' : 'Invalid passport format for selected country',
      };
    }

    // Generic fallback: allow 6-9 alphanumeric characters
    const generic = /^[A-Z0-9]{6,9}$/i;
    const ok = generic.test(cleaned);
    return {
      valid: ok,
      message: ok ? '' : 'Invalid passport format (6-9 alphanumeric characters expected)',
    };
  };

  // unified handler for normal inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // specific handler for passport number field (keeps uppercase & no spaces)
  const handlePassportChange = (e) => {
    const raw = e.target.value || '';
    const normalized = raw.toUpperCase();
    setFormData((prev) => ({ ...prev, passportNumber: normalized }));
    // validation runs in useEffect below
  };

  // When passportNumber or nationality changes, validate and send upstream
  useEffect(() => {
    const { passportNumber, nationality } = formData;
    const { valid, message } = validatePassport(nationality, passportNumber);

    setErrors((prev) => ({ ...prev, passportNumber: message }));

    // call parent with passportValid flag included
    onChange(index, { ...formData, passportValid: valid });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.passportNumber, formData.nationality]); // only run validation when these change

  // Also call onChange whenever any other field changes (so parent always has latest)
  useEffect(() => {
    // send current formData + last known passport validity
    const { passportNumber, nationality } = formData;
    const { valid } = validatePassport(nationality, passportNumber);
    onChange(index, { ...formData, passportValid: valid });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.firstName, formData.lastName, formData.dateOfBirth, formData.placeOfBirth, formData.sex, formData.placeOfIssue, formData.dateOfIssue, formData.dateOfExpiry, formData.phoneCode, formData.phoneNumber, formData.email, formData.fatherName, formData.motherName, formData.address, formData.postalCode, formData.state, formData.passportFront, formData.passportBack, formData.travelerPhoto]);

  return (
    <div className="w-full flex flex-col items-center gap-10 my-10 pt-10">
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
              passportNumber: (data.passport_number || '').toUpperCase(),
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
            <input
              name="passportNumber"
              value={formData.passportNumber}
              onChange={handlePassportChange}
              type="text"
              required
              className="border px-4 py-2 rounded-full w-full"
              placeholder="E.g. A1234567"
            />
            {errors.passportNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.passportNumber}</p>
            )}
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
            <input
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              type="text"
              required
              className="border px-4 py-2 rounded-full w-full"
              
            />
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
              <div className='relative'>
                <select
                  value={formData.phoneCode}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phoneCode: e.target.value }))
                  }
                  className="border px-4 py-2 rounded-l-full bg-gray-100"
                >
                  {countryCodes.map(({ country, code }) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
                <IoMdArrowDropdown className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-800 pointer-events-none" />
              </div>

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

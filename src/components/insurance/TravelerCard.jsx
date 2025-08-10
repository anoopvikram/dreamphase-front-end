// components/insurance/TravelerCard.jsx
import React from 'react';

const Input = ({ type = 'text', label, name, value, onChange }) => (
  <div className='flex w-full mb-2 items-start flex-col'>
    <label className='text-sm text-black' htmlFor={name}>{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      value={value ?? ''}
      onChange={(e) => onChange && onChange(e.target.value)}
      className="w-full px-4 py-1 my-1 bg-[#FFFFFF] rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
    />
  </div>
);

const TravelerCard = ({ index, data = {}, onChange = () => {} }) => {
  const handle = (field, value) => {
    onChange({ [field]: value });
  };

  return (
    <div className='w-3/4 mx-auto flex flex-col rounded-lg border bg-[#edf4f7] mt-6'>
      <h1 className='bg-[#1E7291] p-2 text-white pl-10 rounded-t-lg'>Traveller {index + 1}</h1>

      {/* Traveler Info */}
      <div className='flex flex-col md:flex-row justify-between gap-4 p-4'>
        <div className='flex flex-col'>
          <Input
            type='text'
            label='Passport Number'
            name={`passport_${index}`}
            value={data.passport || ''}
            onChange={(val) => handle('passport', val)}
          />

          <div className='flex flex-col'>
            <label className='block text-sm font-medium mb-1' htmlFor={`address_${index}`}>Address</label>
            <textarea
              id={`address_${index}`}
              name={`address_${index}`}
              value={data.address || ''}
              onChange={(e) => handle('address', e.target.value)}
              className='w-full p-2 rounded-sm bg-[#FFFFFF] resize-none h-[60px]'
            />
          </div>
        </div>

        <div className='flex flex-col'>
          <Input
            type='text'
            label='Name'
            name={`name_${index}`}
            value={data.name || ''}
            onChange={(val) => handle('name', val)}
          />
          <Input
            type='number'
            label='Pincode'
            name={`pincode_${index}`}
            value={data.pincode || ''}
            onChange={(val) => handle('pincode', val)}
          />
          <Input
            type='number'
            label='Mobile No.'
            name={`mobile_${index}`}
            value={data.mobile || ''}
            onChange={(val) => handle('mobile', val)}
          />
        </div>

        <div className='flex flex-col'>
          <Input
            type='date'
            label='Date of Birth'
            name={`dob_${index}`}
            value={data.dob || ''}
            onChange={(val) => handle('dob', val)}
          />
          <Input
            type='text'
            label='City'
            name={`city_${index}`}
            value={data.city || ''}
            onChange={(val) => handle('city', val)}
          />
          <Input
            type='email'
            label='Email'
            name={`email_${index}`}
            value={data.email || ''}
            onChange={(val) => handle('email', val)}
          />
        </div>
      </div>

      <hr className='my-2 w-90/100 text-[#A7A6A6] mx-auto' />

      {/* Nominee Details */}
      <div className='px-4 flex sm:w-3/4 flex-col pb-4'>
        <h2 className='text-lg font-semibold mb-2'>Nominee Details</h2>
        <div className='grid grid-cols-2 gap-4'>
          <Input
            type='text'
            label='Nominee Name'
            name={`nomineeName_${index}`}
            value={data.nomineeName || ''}
            onChange={(val) => handle('nomineeName', val)}
          />
          <Input
            type='text'
            label='Relationship of Nominee'
            name={`nomineeRelationship_${index}`}
            value={data.nomineeRelationship || ''}
            onChange={(val) => handle('nomineeRelationship', val)}
          />
        </div>

        {/* Medical Condition */}
        <div className='flex items-center gap-4 mt-4'>
          <div className='flex items-center gap-2'>
            <input
              type='radio'
              name={`medicalCondition_${index}`}
              id={`yes_${index}`}
              checked={data.medicalCondition === true}
              onChange={() => handle('medicalCondition', true)}
            />
            <label htmlFor={`yes_${index}`}>Yes</label>
          </div>
          <div className='flex items-center gap-2'>
            <input
              type='radio'
              name={`medicalCondition_${index}`}
              id={`no_${index}`}
              checked={data.medicalCondition === false}
              onChange={() => handle('medicalCondition', false)}
            />
            <label htmlFor={`no_${index}`}>No</label>
          </div>
          <p className='ml-2 text-sm'>Does the traveller have a pre-existing medical condition?</p>
          <input
            type='text'
            value={data.medicalNote || ''}
            onChange={(e) => handle('medicalNote', e.target.value)}
            className='ml-auto border px-2 py-1 rounded w-1/3'
            placeholder='Specify if yes'
          />
        </div>
      </div>
    </div>
  );
};

export default TravelerCard;
